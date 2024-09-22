import { useEffect, useState } from 'react';
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

let setTimeoutTmp;

function ModalCreate({ setModalCreate, handleFindSms, members, date }) {
    const [dateCreate, setDateCreate] = useState(date);
    const [loading, setLoading] = useState(false);
    const [idMember, setIdMember] = useState(members[0]._id);
    const [content, setContent] = useState('');

    const [kqxsMB, setKqxsMB] = useState([]);
    const [kqxsMN, setKqxsMN] = useState([]);
    const [kqxsMT, setKqxsMT] = useState([]);

    
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
                resKQXS.data.data.map((e) => {
                    if (e.domain === 'mb') {
                        mb.push(e);
                    } else if (e.domain === 'mt') {
                        mt.push(e);
                    } else if (e.domain === 'mn') {
                        mn.push(e);
                    }
                });
            }

            let smsDetailList = convertContentDetail(content, dateCreate);
            let mien = smsDetailList[0] && smsDetailList[0].domain;
            let kqxs = mien === 'mn' ? mn : mien === 'mt' ? mt : mb;

            const resMember = await axios.post(`${process.env.REACT_APP_API_URL}/v1/member/findMemberById/${idMember}`);
            smsDetailList = payBySms(smsDetailList, resMember?.data?.member, kqxs);

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

            if (
                (mien === 'mn' && mn.length >= 3) ||
                (mien === 'mt' && mt.length >= 2) ||
                (mien === 'mb' && mb.length === 1)
            ) {
                let revenue = resMember?.data?.member.runNumber ? 0 - (tongxac - tongtrung) : tongxac - tongtrung;

                const resRevenue = await axios.post(`${process.env.REACT_APP_API_URL}/v1/revenue/findRevenueBy`, {
                    idMember: idMember,
                    domain: mien,
                    resultDate: formattedDate,
                });

                if (resRevenue.data.revenue.length > 0) {
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
                } else {
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

                    await axios.post(`${process.env.REACT_APP_API_URL}/v1/revenue/create`, formRevenue);
                }

                form = {
                    idUser: user.login.currentUser._id,
                    idMember,
                    domain: mien,
                    content,
                    statusSms: 'Đã xổ',
                    resultDate: dateTmp,
                    diem2con,
                    diem34con,
                    tongdiem,
                    tongxac,
                    tongtrung,
                    revenue,
                };
            } else {
                form = {
                    idUser: user.login.currentUser._id,
                    idMember,
                    domain: mien,
                    content,
                    statusSms: 'Đang xử lý',
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
                    return { ...e, idSms: resSms.data.sms._id };
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
                    className="bg-[#fff] animate-modalDownSlide text-[12px] w-[600px] h-fit pb-[20px] shadow-xl rounded-[6px] mt-[30px] py-[14px]"
                >
                    <div className="flex justify-between items-center pb-[12px] border-b-[1px] border-solid border-[#f0f0f0] px-[26px]">
                        <h1 className="text-[14px] capitalize text-[#000] font-[620]">Thêm mới</h1>
                        <div onClick={() => setModalCreate(false)} className="cursor-pointer">
                            <AiOutlineClose />
                        </div>
                    </div>
                    <div className="mt-[16px] px-[26px]">
                        <div className="flex items-center">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[20%]">
                                Người chơi <span className="text-[#e92d2d] ml-[2px]">*</span>
                            </label>

                            <select
                                onChange={handleMember}
                                className="px-[4px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            >
                                {members?.map((member, index) => {
                                    return <option key={index} value={`${member._id}`}>{`${member.name}`}</option>;
                                })}
                            </select>
                        </div>

                        <div className="flex items-start mt-[16px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[20%]">
                                Nội dung <span className="text-[#e92d2d] ml-[2px]">*</span>
                            </label>

                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="rounded-[4px] flex-1 outline-none border-[1px] border-solid border-[#bdc3d1] text-[12px] py-[4px] px-[8px]"
                                rows={4}
                                cols={60}
                                placeholder="Nội dung"
                            ></textarea>
                        </div>

                        <div className="flex items-center mt-[16px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[20%]">
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