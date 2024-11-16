import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineClose } from 'react-icons/ai';
import { BsArrowRepeat } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { noticeAdminSelector, userSelector } from '~/redux/selectors';
import convertContentDetail from '../../utils/convertContentDetail';
import axios from 'axios';
import moment from 'moment';
import payBySms from '../../utils/payBySms';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';
import Select from 'react-select';

let setTimeoutTmp;

function ModalCreate({ setModalCreate, handleFindSms, members, date }) {
    const [dateCreate, setDateCreate] = useState(date);
    const [loading, setLoading] = useState(false);
    const [idMember, setIdMember] = useState(members[1]?.value);
    const [idMemberSelect, setIdMemberSelect] = useState(members[1]);
    const [content, setContent] = useState('');
    const [errorLocation, setErrorLocation] = useState([]);

    const textareaRef = useRef(null);

    const notice = useSelector(noticeAdminSelector);
    useEffect(() => {
        if (!notice.state) {
            clearTimeout(setTimeoutTmp);
        }
    }, [notice.state]);

    const tmp = useSelector(userSelector);
    const [user, setUser] = useState(tmp);
    useEffect(() => {
        setUser(tmp);
    }, [tmp]);

    const handleMember = async (e) => {
        setIdMember(e.target.value);
    };

    const handleDateChange = (e) => {
        setDateCreate(e);
    };

    const dispatch = useDispatch();
    const handleSave = async () => {
        let resSms;

        try {
            setLoading(true);
            dispatch(noticeAdminSlice.actions.processingNotice('Đang xử lí nội dung tin nhắn'));

            const formattedDate = moment(dateCreate).format('DD/MM/YYYY');
            const resKQXS = await axios.post(`${process.env.REACT_APP_API_URL}/v1/kqxs/findKqxsByDate`, {
                date: formattedDate,
            });

            const mn = [];
            const mt = [];
            const mb = [];
            if (resKQXS.data.success) {
                resKQXS.data.data?.map((e) => {
                    if (e.domain === 'mb') {
                        mb.push(e);
                    } else if (e.domain === 'mt') {
                        mt.push(e);
                    } else if (e.domain === 'mn') {
                        mn.push(e);
                    }
                });
            }

            let { arr, errorSyntax, locationError } = await convertContentDetail(content, dateCreate);
            let smsDetailList = arr;

            if (locationError?.location?.length >= 2) {
                if (locationError?.location[0] === undefined || locationError?.location[1] === undefined) {
                    setErrorLocation([0, 0]);
                } else {
                    setErrorLocation(locationError?.location);
                }
            }

            if (errorSyntax) {
                dispatch(
                    noticeAdminSlice.actions.errorNotice(
                        `${locationError?.code === 'dai' ? 'Hôm nay không có đài này' : 'Lỗi cú pháp!!!'}`,
                    ),
                );

                setTimeoutTmp = setTimeout(() => {
                    setLoading(false);
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [5000]);

                return;
            }

            let mien = smsDetailList[0] && smsDetailList[0].domain;
            let kqxs = mien === 'mn' ? mn : mien === 'mt' ? mt : mb;

            const resMember = await axios.post(`${process.env.REACT_APP_API_URL}/v1/member/findMemberById/${idMember}`);
            smsDetailList = await payBySms(smsDetailList, resMember?.data?.member, kqxs);

            let tongxac = 0;
            let tongtrung = 0;
            let tongdiem = 0;
            let diem2con = 0;
            let diem34con = 0;

            smsDetailList.map((e) => {
                tongxac += e.tienxac;
                tongtrung += e.tientrung;
                tongdiem += e.diem;
                if (e.number[0].length === 2) {
                    diem2con += e.diem;
                } else {
                    diem34con += e.diem;
                }
            });

            if (tongxac === 0) {
                dispatch(noticeAdminSlice.actions.errorNotice('Lỗi nội dung!!!'));
                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                    setLoading(false);
                }, [5000]);
                return;
            }

            let form = {};
            const date = moment(dateCreate).format('YYYY-MM-DD');
            let dateTmp = new Date(date);

            dateTmp.setUTCHours(0, 0, 0, 0);

            console.log('1111: ', mb);

            if (
                (mien === 'mn' &&
                    mn.length >= 3 &&
                    mn[0].result.length === 18 &&
                    mn[1].result.length === 18 &&
                    mn[2].result.length === 18 &&
                    (mn.length === 4 ? mn[3].result.length === 18 : true)) ||
                (mien === 'mt' &&
                    mt.length >= 2 &&
                    mt[0].result.length === 18 &&
                    mt[1].result.length === 18 &&
                    (mt.length === 3 ? mt[2].result.length === 18 : true)) ||
                (mien === 'mb' && mb.length === 1 && mb[0].result.length === 27)
            ) {
                let revenue = resMember?.data?.member.runNumber ? 0 - (tongxac - tongtrung) : tongxac - tongtrung;

                const resRevenue = await axios.post(`${process.env.REACT_APP_API_URL}/v1/revenue/findRevenueBy`, {
                    idMember: idMember,
                    domain: mien,
                    resultDate: formattedDate,
                });

                console.log({
                    idMember: idMember,
                    domain: mien,
                    resultDate: formattedDate,
                });

                if (resRevenue.data.revenue?.length > 0 && !errorSyntax) {
                    await axios.post(
                        `${process.env.REACT_APP_API_URL}/v1/revenue/update/${resRevenue.data.revenue[0]._id}`,
                        {
                            diem2con: diem2con + resRevenue.data.revenue[0].diem2con,
                            diem34con: diem34con + resRevenue.data.revenue[0].diem34con,
                            tongxac: tongxac + resRevenue.data.revenue[0].tongxac,
                            tongtrung: tongtrung + resRevenue.data.revenue[0].tongtrung,
                            revenue: revenue + resRevenue.data.revenue[0].revenue,
                        },
                    );

                    console.log('0000000000');
                } else if (!errorSyntax) {
                    const formRevenue = {
                        idMember,
                        idUser: user.login.currentUser._id,
                        domain: mien,
                        diem2con,
                        diem34con,
                        tongxac,
                        tongtrung,
                        revenue,
                        resultDate: formattedDate,
                    };

                    console.log('11111111111');
                    await axios.post(`${process.env.REACT_APP_API_URL}/v1/revenue/create`, formRevenue);
                }

                console.log('22222222222');
                form = {
                    idUser: user.login.currentUser._id,
                    idMember,
                    domain: mien,
                    content,
                    statusSms: errorSyntax ? 'Chưa xử lý' : 'Đã xổ',
                    resultDate: dateTmp,
                    diem2con,
                    diem34con,
                    tongdiem,
                    tongxac,
                    tongtrung,
                    revenue,
                };
            } else {
                console.log('333333333333');
                form = {
                    idUser: user.login.currentUser._id,
                    idMember,
                    domain: mien,
                    content,
                    statusSms: errorSyntax ? 'Chưa xử lý' : 'Đang xử lý',
                    resultDate: dateTmp,
                    diem2con,
                    diem34con,
                    tongdiem,
                    tongxac,
                };
            }

            resSms = await axios.post(`${process.env.REACT_APP_API_URL}/v1/sms/create`, form);

            if (resSms.data.success) {
                smsDetailList = smsDetailList.map((e) => {
                    return {
                        ...e,
                        idSms: resSms.data.sms._id,
                        idUser: user.login.currentUser._id,
                        idMember,
                        resultDate: dateTmp,
                    };
                });

                console.log('SMS: ', resSms.data.sms);

                const resSmsDetail = await axios.post(`${process.env.REACT_APP_API_URL}/v1/smsDetail/create`, {
                    data: smsDetailList,
                });

                if (resSmsDetail.data.success) {
                    setLoading(false);
                    setModalCreate(false);

                    console.log('SMSDetail: ', resSmsDetail.data.smsDetail);

                    handleFindSms();

                    dispatch(noticeAdminSlice.actions.successNotice('Thêm tin nhắn thành công'));

                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [5000]);
                } else {
                    await axios.post(`${process.env.REACT_APP_API_URL}/v1/sms/update/${resSms.data.sms._id}`, {
                        statusSms: 'Chưa xử lý',
                    });
                    await axios.post(`${process.env.REACT_APP_API_URL}/v1/smsDetail/delete/${resSms.data.sms._id}`);

                    dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống!!!'));
                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [5000]);
                }
            } else {
                dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống!!!'));
                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [5000]);
            }
        } catch (error) {
            console.log(error);
            await axios.post(`${process.env.REACT_APP_API_URL}/v1/sms/update/${resSms?.data?.sms?._id}`, {
                statusSms: 'Chưa xử lý',
            });
            await axios.post(`${process.env.REACT_APP_API_URL}/v1/smsDetail/delete/${resSms?.data?.sms?._id}`);
            setLoading(false);
            setModalCreate(false);
            dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống!!!'));
            setTimeoutTmp = setTimeout(() => {
                dispatch(noticeAdminSlice.actions.hiddenNotice());
            }, [5000]);
        }
    };

    return (
        <div
            onClick={() => {
                setModalCreate(false);
            }}
            className="fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 z-[9999]"
        >
            <div className="top-0 absolute left-0 right-0 bottom-0 bg-[#000] opacity-[.4] z-[99]"></div>
            <div className="fixed flex justify-center overflow-y-auto overflow-x-hidden top-0 left-0 right-0 bottom-0 pb-[60px] opacity-[1] z-[999]">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#fff] animate-modalDownSlide text-[12px] lg:w-[600px] w-[96%] h-fit pb-[20px] shadow-xl rounded-[6px] mt-[30px] py-[14px]"
                >
                    <div className="flex justify-between items-center pb-[12px] border-b-[1px] border-solid border-[#f0f0f0] px-[26px]">
                        <h1 className="text-[14px] capitalize text-[#000] font-[620]">Thêm mới</h1>
                        <div onClick={() => setModalCreate(false)} className="cursor-pointer">
                            <AiOutlineClose />
                        </div>
                    </div>
                    <div className="mt-[16px] flex flex-col gap-[12px] px-[26px]">
                        <div className="flex flex-col gap-[4px] lg:gap-[0px] lg:flex-row lg:items-center">
                            <label className="text-[12px] lg:mr-[20px] flex lg:justify-end text-[#000] lg:w-[20%]">
                                Người chơi <span className="text-[#e92d2d] ml-[2px]">*</span>
                            </label>

                            <div className="flex-1 text-[#000] font-[500] outline-none text-[12px]">
                                <Select
                                    options={members.slice(1)}
                                    value={idMemberSelect}
                                    onChange={(selectedOption) => {
                                        setIdMemberSelect(selectedOption);
                                        setIdMember(selectedOption.value);
                                    }}
                                    placeholder="Tên hoặc SĐT"
                                    isSearchable={true} // Kích hoạt ô tìm kiếm
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            minHeight: '26px', // Chiều cao tối thiểu
                                            height: '26px', // Chiều cao cố định
                                        }),
                                        input: (provided) => ({
                                            ...provided,
                                            margin: '0', // Loại bỏ khoảng cách thừa
                                        }),
                                        indicatorsContainer: (provided) => ({
                                            ...provided,
                                            height: '26px', // Độ cao của vùng chứa các icon
                                        }),
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-[4px] lg:gap-[0px] lg:flex-row lg:items-center">
                            <label className="text-[12px] lg:mr-[20px] flex lg:justify-end text-[#000] lg:w-[20%]">
                                Nội dung <span className="text-[#e92d2d] ml-[2px]">*</span>
                            </label>

                            {errorLocation?.length >= 2 && (
                                <div
                                    onClick={() => {
                                        setErrorLocation([]);
                                        if (textareaRef.current) {
                                            textareaRef.current.focus();
                                        }
                                    }}
                                    className="rounded-[4px] max-h-[82px] min-h-[82px] h-[82px] overflow-y-auto flex-1 outline-none border-[1px] border-solid border-[#bdc3d1] text-[12px] py-[4px] px-[8px] whitespace-pre-wrap"
                                >
                                    {content.slice(0, errorLocation[0])}
                                    <span className="bg-[#F1AF00]">
                                        {content.slice(errorLocation[0], errorLocation[1])}
                                    </span>
                                    {content.slice(errorLocation[1])}
                                </div>
                            )}
                            <textarea
                                ref={textareaRef}
                                value={errorLocation?.length >= 2 ? '' : content}
                                onChange={(e) => setContent(e.target.value)}
                                className={`${
                                    errorLocation?.length >= 2
                                        ? 'none h-0 w-0 flex-none resize-none overflow-hidden py-[0px] px-[0px]'
                                        : 'block py-[4px] px-[8px]'
                                } rounded-[4px] flex-1 outline-none border-[1px] border-solid border-[#bdc3d1] text-[12px]`}
                                rows={errorLocation?.length >= 2 ? 0 : 4}
                                cols={errorLocation?.length >= 2 ? 0 : 60}
                                placeholder="Nội dung"
                            ></textarea>
                        </div>

                        <div className="flex flex-col gap-[4px] lg:gap-[0px] lg:flex-row lg:items-center">
                            <label className="text-[12px] lg:mr-[20px] flex lg:justify-end text-[#000] lg:w-[20%]">
                                Ngày xổ <span className="text-[#e92d2d] ml-[2px]">*</span>
                            </label>

                            <DatePicker
                                maxDate={new Date()}
                                wrapperClassName="flex-1"
                                selected={dateCreate}
                                dateFormat="dd-MM-yyyy"
                                onChange={handleDateChange}
                                className="border-[1px] w-full flex-1 border-solid px-[6px] py-[4px] outline-none rounded-[4px] text-[12px] border-[#ccc]"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-[10px] items-center mt-[20px] pt-[12px] border-t-[1px] border-solid border-[#f0f0f0] px-[26px]">
                        <button
                            disabled={loading}
                            onClick={handleSave}
                            className={`${
                                loading ? 'opacity-[.7] hover:opacity-[.7]' : 'hover:opacity-[.9]'
                            } uppercase font-[620] text-[10px] w-[60px] h-[30px] flex justify-center items-center bg-[#2574ab] rounded-[4px] text-[#fff] active:opacity-[.7]`}
                        >
                            {loading ? (
                                <div className="text-[20px] animate-loading">
                                    <BsArrowRepeat />
                                </div>
                            ) : (
                                'Lưu'
                            )}
                        </button>
                        <button
                            onClick={() => setModalCreate(false)}
                            className={`hover:opacity-[.9] uppercase font-[650] text-[10px] border-[1px] border-solid border-[#ccc] w-[60px] h-[30px] flex justify-center items-center rounded-[4px] text-[#000] active:opacity-[.7]`}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalCreate;
