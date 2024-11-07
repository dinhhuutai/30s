import axios from 'axios';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsArrowRepeat, BsArrowRightCircleFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';
import convertContentDetail from '../../utils/convertContentDetail';
import payBySms from '../../utils/payBySms';
import { noticeAdminSelector } from '~/redux/selectors';

let setTimeoutTmp;

function ModalUpdate({ setModalUpdate, handleFindSms, selectorSmsTmp, members }) {
    const [smsDetails, setSmsDetails] = useState([]);
    const [selectorSms, setSelectorSms] = useState(selectorSmsTmp);
    const [selecMember, setSelecMember] = useState(selectorSmsTmp.sm.idMember?._id);
    const [contentEdit, setContentEdit] = useState(selectorSmsTmp.sm?.contentEdit);
    const [errorLocation, setErrorLocation] = useState(selectorSmsTmp.sm?.locationError);

    const textareaRef = useRef(null);

    const [loading, setLoading] = useState(false);

    const notice = useSelector(noticeAdminSelector);
    useEffect(() => {
        if (!notice.state) {
            clearTimeout(setTimeoutTmp);
        }
    }, [notice.state]);

    useEffect(() => {
        handleFindSmsDetails();
    }, [selectorSms]);

    const handleFindSmsDetails = async () => {
        const resSmsDeatils = await axios.post(
            `${process.env.REACT_APP_API_URL}/v1/smsDetail/findSmsDetailByIdSms/${selectorSms.sm._id}`,
        );

        if (resSmsDeatils.data.success) {
            setSmsDetails(resSmsDeatils.data.smsDetails);
        }
    };

    const dispatch = useDispatch();
    const handleSave = async (typeModal) => {
        let resSms;
        try {
            // Sửa nội dung
            setLoading(true);
            dispatch(noticeAdminSlice.actions.processingNotice('Đang xử lí nội dung tin nhắn'));

            const formattedDate = moment(selectorSms.sm.resultDate).format('DD/MM/YYYY');
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

            const date = new Date(selectorSms.sm.resultDate);

            let { arr, errorSyntax, locationError } = convertContentDetail(contentEdit, date);
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

            const resMember = await axios.post(
                `${process.env.REACT_APP_API_URL}/v1/member/findMemberById/${selecMember}`,
            );

            console.log('MEMBER: ', resMember?.data?.member);
            smsDetailList = payBySms(smsDetailList, resMember?.data?.member, kqxs);

            let tongxac = 0;
            let tongtrung = 0;
            let tongdiem = 0;
            let diem2con = 0;
            let diem34con = 0;

            smsDetailList.map(async (e) => {
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
                (mien === 'mb' && mb.length === 1 && mb[0].result.length === 27) ||
                mien !== selectorSms?.sm?.domain ||
                selectorSmsTmp.sm.idMember._id !== selecMember
            ) {
                let revenue = resMember?.data?.member.runNumber ? 0 - (tongxac - tongtrung) : tongxac - tongtrung;

                console.log('Tin cũ: ', selectorSms);

                if (selectorSmsTmp.sm.idMember._id !== selecMember) {
                    const resRevenue = await axios.post(`${process.env.REACT_APP_API_URL}/v1/revenue/findRevenueBy`, {
                        idMember: selectorSmsTmp?.sm?.idMember?._id,
                        domain: selectorSmsTmp?.sm?.domain,
                        resultDate: formattedDate,
                    });

                    if (resRevenue.data.revenue.length > 0) {
                        await axios.post(
                            `${process.env.REACT_APP_API_URL}/v1/revenue/update/${resRevenue.data.revenue[0]._id}`,
                            {
                                diem2con: resRevenue.data.revenue[0]?.diem2con - selectorSms?.sm?.diem2con,
                                diem34con: resRevenue.data.revenue[0]?.diem34con - selectorSms?.sm?.diem34con,
                                tongxac: resRevenue.data.revenue[0]?.tongxac - selectorSms?.sm?.tongxac,
                                tongtrung: resRevenue.data.revenue[0]?.tongtrung - selectorSms?.sm?.tongtrung,
                                revenue: resRevenue.data.revenue[0]?.revenue - selectorSms?.sm?.revenue,
                            },
                        );
                    }

                    if ([mien].length >= 1) {
                        const resRevenueNew = await axios.post(
                            `${process.env.REACT_APP_API_URL}/v1/revenue/findRevenueBy`,
                            {
                                idMember: selecMember,
                                domain: mien,
                                resultDate: formattedDate,
                            },
                        );

                        if (resRevenueNew.data.revenue.length > 0) {
                            await axios.post(
                                `${process.env.REACT_APP_API_URL}/v1/revenue/update/${resRevenueNew.data.revenue[0]._id}`,
                                {
                                    diem2con: diem2con + resRevenueNew.data.revenue[0]?.diem2con,
                                    diem34con: diem34con + resRevenueNew.data.revenue[0]?.diem34con,
                                    tongxac: tongxac + resRevenueNew.data.revenue[0]?.tongxac,
                                    tongtrung: tongtrung + resRevenueNew.data.revenue[0]?.tongtrung,
                                    revenue: revenue + resRevenueNew.data.revenue[0]?.revenue,
                                },
                            );
                        } else {
                            const formRevenue = {
                                idMember: selecMember,
                                idUser: resMember?.data?.member?.idUser,
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
                    }

                    setModalUpdate(false);
                } else {
                    if (mien !== selectorSms?.sm?.domain) {
                        const resRevenue = await axios.post(
                            `${process.env.REACT_APP_API_URL}/v1/revenue/findRevenueBy`,
                            {
                                idMember: selecMember,
                                domain: selectorSms?.sm?.domain,
                                resultDate: formattedDate,
                            },
                        );

                        if (resRevenue.data.revenue.length > 0) {
                            await axios.post(
                                `${process.env.REACT_APP_API_URL}/v1/revenue/update/${resRevenue.data.revenue[0]._id}`,
                                {
                                    diem2con: resRevenue.data.revenue[0]?.diem2con - selectorSms?.sm?.diem2con,
                                    diem34con: resRevenue.data.revenue[0]?.diem34con - selectorSms?.sm?.diem34con,
                                    tongxac: resRevenue.data.revenue[0]?.tongxac - selectorSms?.sm?.tongxac,
                                    tongtrung: resRevenue.data.revenue[0]?.tongtrung - selectorSms?.sm?.tongtrung,
                                    revenue: resRevenue.data.revenue[0]?.revenue - selectorSms?.sm?.revenue,
                                },
                            );
                        }

                        if ([mien].length >= 1) {
                            const resRevenueNew = await axios.post(
                                `${process.env.REACT_APP_API_URL}/v1/revenue/findRevenueBy`,
                                {
                                    idMember: selecMember,
                                    domain: mien,
                                    resultDate: formattedDate,
                                },
                            );

                            if (resRevenueNew.data.revenue.length > 0) {
                                await axios.post(
                                    `${process.env.REACT_APP_API_URL}/v1/revenue/update/${resRevenueNew.data.revenue[0]._id}`,
                                    {
                                        diem2con: diem2con + resRevenueNew.data.revenue[0]?.diem2con,
                                        diem34con: diem34con + resRevenueNew.data.revenue[0]?.diem34con,
                                        tongxac: tongxac + resRevenueNew.data.revenue[0]?.tongxac,
                                        tongtrung: tongtrung + resRevenueNew.data.revenue[0]?.tongtrung,
                                        revenue: revenue + resRevenueNew.data.revenue[0]?.revenue,
                                    },
                                );
                            } else {
                                const formRevenue = {
                                    idMember: selecMember,
                                    idUser: resMember?.data?.member?.idUser,
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
                        }
                    } else {
                        const resRevenue = await axios.post(
                            `${process.env.REACT_APP_API_URL}/v1/revenue/findRevenueBy`,
                            {
                                idMember: selecMember,
                                domain: mien,
                                resultDate: formattedDate,
                            },
                        );

                        if (resRevenue.data.revenue.length > 0) {
                            await axios.post(
                                `${process.env.REACT_APP_API_URL}/v1/revenue/update/${resRevenue.data.revenue[0]._id}`,
                                {
                                    diem2con:
                                        diem2con + (resRevenue.data.revenue[0]?.diem2con - selectorSms?.sm?.diem2con),
                                    diem34con:
                                        diem34con +
                                        (resRevenue.data.revenue[0]?.diem34con - selectorSms?.sm?.diem34con),
                                    tongxac: tongxac + (resRevenue.data.revenue[0]?.tongxac - selectorSms?.sm?.tongxac),
                                    tongtrung:
                                        tongtrung +
                                        (resRevenue.data.revenue[0]?.tongtrung - selectorSms?.sm?.tongtrung),
                                    revenue: revenue + (resRevenue.data.revenue[0]?.revenue - selectorSms?.sm?.revenue),
                                },
                            );
                        } else {
                            const formRevenue = {
                                idMember: selecMember,
                                idUser: resMember?.data?.member?.idUser,
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
                    }
                }

                form = {
                    idMember: selecMember,
                    contentEdit,
                    statusSms: errorSyntax ? 'Chưa xử lý' : 'Đã xổ',
                    domain: mien,
                    diem2con,
                    diem34con,
                    tongdiem,
                    tongxac,
                    tongtrung,
                    revenue,
                };
            } else {
                form = {
                    idMember: selecMember,
                    contentEdit,
                    statusSms: errorSyntax ? 'Chưa xử lý' : 'Đã xử lý',
                    domain: mien,
                    diem2con,
                    diem34con,
                    tongdiem,
                    tongxac,
                };
            }

            resSms = await axios.post(`${process.env.REACT_APP_API_URL}/v1/sms/update/${selectorSms.sm._id}`, form);

            if (resSms.data.success) {
                smsDetailList = smsDetailList.map((e) => {
                    return { ...e, idSms: resSms.data.sms._id };
                });

                setSelectorSms({
                    index: selectorSmsTmp.index + 1,
                    sm: resSms.data.sms,
                });
                setSelecMember(resSms.data.sms.idMember._id);
                setContentEdit(resSms.data.sms.contentEdit);

                //console.log('SMSEdit: ', resSms.data.sms);

                // Xóa các smsDetail cũ

                const resSmsDetailDele = await axios.post(
                    `${process.env.REACT_APP_API_URL}/v1/smsDetail/delete/${resSms.data.sms._id}`,
                );

                // Thêm các smsDetai mới

                const resSmsDetail = await axios.post(`${process.env.REACT_APP_API_URL}/v1/smsDetail/create`, {
                    data: smsDetailList,
                });

                if (resSmsDetail.data.success) {
                    setLoading(false);
                    setModalUpdate(typeModal);

                    //console.log('SMSDetailEdit: ', resSmsDetail.data.smsDetail);

                    handleFindSmsDetails();
                    handleFindSms();

                    dispatch(noticeAdminSlice.actions.successNotice('Chỉnh sửa tin nhắn thành công'));

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
            dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống!!!'));
            setTimeoutTmp = setTimeout(() => {
                dispatch(noticeAdminSlice.actions.hiddenNotice());
            }, [5000]);
        }
    };

    return (
        <div
            onClick={() => {
                setModalUpdate(false);
            }}
            className="fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 z-[9999]"
        >
            <div className="top-0 absolute left-0 right-0 bottom-0 bg-[#000] opacity-[.4] z-[99]"></div>
            <div className="fixed flex justify-center overflow-y-auto overflow-x-hidden top-0 left-0 right-0 bottom-0 pb-[60px] opacity-[1] z-[999]">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#fff] animate-modalDownSlide text-[12px] lg:w-[900px] w-[96%] h-fit pb-[20px] shadow-xl rounded-[6px] mt-[30px] py-[14px]"
                >
                    <div className="flex justify-between items-center pb-[12px] border-b-[1px] border-solid border-[#f0f0f0] px-[26px]">
                        <h1 className="text-[14px] capitalize text-[#000] font-[620]">{`Chỉnh sửa tin nhắn STT #${selectorSms.index} - ${selectorSms?.sm?.idMember?.name}`}</h1>
                        <div onClick={() => setModalUpdate(false)} className="cursor-pointer">
                            <AiOutlineClose />
                        </div>
                    </div>
                    <div className="mt-[16px] px-[26px] flex flex-col lg:flex-row justify-between">
                        <div className="flex flex-col lg:items-center lg:flex-row gap-[4px] lg:gap-[0px">
                            <label className="text-[12px] font-[600]">
                                Người chơi <span className="text-[#e92d2d] ml-[2px]">*</span>
                            </label>
                            <select
                                value={selecMember}
                                onChange={(e) => setSelecMember(e.target.value)}
                                className="px-[4px] w-full lg:ml-[8px] py-[4px] lg:w-[150px] text-[#000] font-[500] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            >
                                {members?.map((member, index) => {
                                    return (
                                        <option key={index} value={`${member._id}`}>
                                            {`${member.name}`}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="flex gap-[6px] mt-[10px] lg:mt-[0px]">
                            <button
                                disabled={loading}
                                onClick={() => handleSave(true)}
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
                                disabled={loading}
                                onClick={() => handleSave(false)}
                                className={`${
                                    loading ? 'opacity-[.7] hover:opacity-[.7]' : 'hover:opacity-[.9]'
                                } uppercase font-[620] text-[10px] w-[80px] h-[30px] flex justify-center items-center bg-[#e6ad5c] rounded-[4px] text-[#fff] active:opacity-[.7]`}
                            >
                                {loading ? (
                                    <div className="text-[20px] animate-loading">
                                        <BsArrowRepeat />
                                    </div>
                                ) : (
                                    'Lưu & Đóng'
                                )}
                            </button>
                            <button
                                onClick={() => setModalUpdate(false)}
                                className={`hover:opacity-[.9] uppercase font-[650] text-[10px] border-[1px] border-solid border-[#ccc] w-[60px] h-[30px] flex justify-center items-center rounded-[4px] text-[#000] active:opacity-[.7]`}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>

                    <div className="mt-[16px] px-[10px] flex flex-col lg:flex-row gap-[20px]">
                        <div className="flex flex-col flex-1">
                            <label>Nội dung gốc </label>
                            <textarea
                                readOnly
                                className="rounded-[4px] text-[#9fa8bc] mt-[2px] flex-1 outline-none border-[1px] border-solid border-[#bdc3d1] text-[12px] py-[4px] px-[8px]"
                                rows={7}
                                cols={36}
                                value={selectorSms.sm.content}
                            ></textarea>
                        </div>

                        <div className="flex flex-col flex-1">
                            <label>
                                Nội dung đã sửa <span className="text-[#e92d2d] ml-[2px]">*</span>
                            </label>

                            {errorLocation?.length >= 2 && (
                                <div
                                    onClick={() => {
                                        setErrorLocation([]);
                                        if (textareaRef.current) {
                                            textareaRef.current.focus();
                                        }
                                    }}
                                    className="rounded-[4px] max-h-[136px] min-h-[136px] h-[136px] overflow-y-auto flex-1 outline-none border-[1px] border-solid border-[#bdc3d1] text-[12px] py-[4px] px-[8px] whitespace-pre-wrap"
                                >
                                    {contentEdit.slice(0, errorLocation[0])}
                                    <span className="bg-[#F1AF00]">
                                        {contentEdit.slice(errorLocation[0], errorLocation[1])}
                                    </span>
                                    {contentEdit.slice(errorLocation[1])}
                                </div>
                            )}
                            <textarea
                                ref={textareaRef}
                                value={errorLocation?.length >= 2 ? '' : contentEdit}
                                onChange={(e) => setContentEdit(e.target.value)}
                                className={`${
                                    errorLocation?.length >= 2
                                        ? 'none h-0 w-0 flex-none resize-none overflow-hidden py-[0px] px-[0px]'
                                        : 'block py-[4px] px-[8px]'
                                } rounded-[4px] flex-1 outline-none border-[1px] border-solid border-[#bdc3d1] text-[12px]`}
                                rows={errorLocation?.length >= 2 ? 0 : 7}
                                cols={errorLocation?.length >= 2 ? 0 : 36}
                                placeholder="Nội dung"
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-[16px] px-[10px] lg:gap-[0px] gap-[6px] flex lg:flex-row flex-col lg:justify-between lg:items-end text-[12px]">
                        <div className="flex flex-col gap-[2px]">
                            <div className="flex gap-[24px]">
                                <div>
                                    2c:{' '}
                                    <span className="text-[#000] font-[650]">
                                        {selectorSms.sm.diem2con?.toLocaleString()}
                                    </span>
                                </div>
                                <div>
                                    3,4c:{' '}
                                    <span className="text-[#000] font-[650]">
                                        {selectorSms.sm.diem34con?.toLocaleString()}
                                    </span>
                                </div>
                                <div>
                                    Tổng:{' '}
                                    <span className="text-[#000] font-[650]">
                                        {selectorSms.sm.tongdiem?.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-[24px]">
                                <div>
                                    Tổng xác:
                                    <span className="text-[#000] font-[650] ml-[4px]">
                                        {selectorSms.sm.tongxac?.toLocaleString()}
                                    </span>
                                </div>
                                <div>
                                    Tổng trúng:
                                    <span className="text-[#000] font-[650] ml-[4px]">
                                        {selectorSms?.sm?.tongtrung ? selectorSms?.sm?.tongtrung?.toLocaleString() : 0}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="font-[550] text-[14px]">
                                <span className="text-[#d9534f]">Thu</span>/<span className="text-[#2574ab]">trả</span>:
                                <span
                                    className={`ml-[4px] ${
                                        selectorSms?.sm?.revenue >= 0 || !selectorSms?.sm?.revenue
                                            ? 'text-[#d9534f]'
                                            : 'text-[#2574ab]'
                                    }`}
                                >
                                    {selectorSms?.sm?.revenue
                                        ? parseFloat(selectorSms?.sm?.revenue?.toFixed(1)).toLocaleString()
                                        : 0.0}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-[10px] mx-[10px] overflow-x-auto overflow-hidden">
                        <div className="lg:w-full w-[900px] lg:mt-[6px] h-[300px] overflow-y-auto">
                            <table className="w-full rounded-[6px] overflow-hidden">
                                <thead>
                                    <tr className="text-[11px] w-[100%] bg-[#d8dce3]">
                                        <th className="w-[5%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                            STT
                                        </th>
                                        <th className="w-[18%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                            đài
                                        </th>
                                        <th className="w-[12%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                            kiểu
                                        </th>
                                        <th className="w-[24%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                            nội dung đã tách
                                        </th>
                                        <th className="w-[9%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                            số
                                        </th>
                                        <th className="w-[7%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                            đặt
                                        </th>
                                        <th className="w-[15%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                            điểm (tiền xác)
                                        </th>
                                        <th className="w-[10%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                            trúng
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="">
                                    {smsDetails?.map((sms, index) => (
                                        <tr
                                            className={`text-[12px] font-[490] ${
                                                index % 2 === 0 ? 'bg-[#fff]' : 'bg-[#d8dce3]'
                                            }`}
                                            key={index}
                                        >
                                            <td className="px-[10px] py-[8px] w-[5%] border-[1px] border-solid border-[#fff]">
                                                <div className="flex justify-center items-center">{index + 1}</div>
                                            </td>
                                            <td className="px-[10px] py-[8px] w-[18%] border-[1px] border-solid border-[#fff]">
                                                <div className="flex justify-center items-center">
                                                    {sms.province.map((pro, i) => (
                                                        <div key={i} className="ml-[2px]">{`${i !== 0 ? '-' : ''} ${
                                                            pro === 'tp'
                                                                ? 'T.Phố'
                                                                : pro === 'dt'
                                                                ? 'Đ.Tháp'
                                                                : pro === 'cm'
                                                                ? 'C.Mau'
                                                                : pro === 'br'
                                                                ? 'B.Tre'
                                                                : pro === 'vt'
                                                                ? 'V.Tàu'
                                                                : pro === 'bi'
                                                                ? 'B.Liêu'
                                                                : pro === 'dn'
                                                                ? 'Đ.Nai'
                                                                : pro === 'ct'
                                                                ? 'C.Thơ'
                                                                : pro === 'st'
                                                                ? 'S.Trăng'
                                                                : pro === 'tn'
                                                                ? 'T.Ninh'
                                                                : pro === 'ag'
                                                                ? 'A.Giang'
                                                                : pro === 'bt'
                                                                ? 'B.Thuận'
                                                                : pro === 'bu'
                                                                ? 'B.Dương'
                                                                : pro === 'vl'
                                                                ? 'V.Long'
                                                                : pro === 'tv'
                                                                ? 'Tr.Vinh'
                                                                : pro === 'la'
                                                                ? 'L.An'
                                                                : pro === 'bp'
                                                                ? 'B.Phước'
                                                                : pro === 'hg'
                                                                ? 'H.Giang'
                                                                : pro === 'tg'
                                                                ? 'T.Giang'
                                                                : pro === 'kg'
                                                                ? 'K.Giang'
                                                                : pro === 'lt'
                                                                ? 'Đ.Lạt'
                                                                : pro === 'py'
                                                                ? 'Ph.Yên'
                                                                : pro === 'hu'
                                                                ? 'Huế'
                                                                : pro === 'dl'
                                                                ? 'Đ.Lắk'
                                                                : pro === 'qn'
                                                                ? 'Q.Nam'
                                                                : pro === 'dg'
                                                                ? 'Đ.Nẵng'
                                                                : pro === 'kh'
                                                                ? 'K.Hòa'
                                                                : pro === 'qb'
                                                                ? 'Q.Bình'
                                                                : pro === 'bd'
                                                                ? 'B.Định'
                                                                : pro === 'qt'
                                                                ? 'Q.Trị'
                                                                : pro === 'gl'
                                                                ? 'G.Lai'
                                                                : pro === 'nt'
                                                                ? 'N.Thuận'
                                                                : pro === 'qg'
                                                                ? 'Q.Ngãi'
                                                                : pro === 'do'
                                                                ? 'Đ.Nông'
                                                                : pro === 'kt'
                                                                ? 'K.Tum'
                                                                : 'Miền Bắc'
                                                        }`}</div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-[10px] py-[8px] w-[12%] border-[1px] border-solid border-[#fff]">
                                                <div className="flex justify-center items-center">
                                                    {sms.typePlay === 'baolo' || sms.typePlay === 'baolodao'
                                                        ? 'Bao lô'
                                                        : sms.typePlay === 'dauduoi'
                                                        ? 'Đầu Đuôi'
                                                        : sms.typePlay === 'xiuchu' || sms.typePlay === 'xiuchudao'
                                                        ? 'Xỉu chủ'
                                                        : sms.typePlay === 'dau'
                                                        ? 'Đầu'
                                                        : sms.typePlay === 'duoi'
                                                        ? 'Đuôi'
                                                        : sms.typePlay === 'xiuchudau' ||
                                                          sms.typePlay === 'xiuchudaudao'
                                                        ? 'Xỉu Chủ Đầu'
                                                        : sms.typePlay === 'xiuchuduoi' ||
                                                          sms.typePlay === 'xiuchuduoidao'
                                                        ? 'Xỉu Chủ Đuôi'
                                                        : sms.typePlay === 'da(thang)'
                                                        ? 'Đá Thẳng'
                                                        : sms.typePlay === 'baylo'
                                                        ? 'Bảy Lô'
                                                        : sms.typePlay === 'tamlo'
                                                        ? 'Tám Lô'
                                                        : 'Đá Xiên'}
                                                </div>
                                            </td>
                                            <td className="px-[10px] py-[8px] w-[24%] border-[1px] border-solid border-[#fff]">
                                                <div className="flex justify-center items-center">{sms.content}</div>
                                            </td>
                                            <td className="px-[10px] py-[8px] w-[9%] border-[1px] border-solid border-[#fff]">
                                                <div className="flex justify-center items-center">
                                                    {sms.typePlay === 'da(thang)' || sms.typePlay === 'da(xien)'
                                                        ? sms.number[0] + ' - ' + sms.number[1]
                                                        : sms.number[0]}
                                                    {sms.quantityLike > 1 && (
                                                        <span className="ml-[5px] w-[16px] h-[16px] flex justify-center items-center rounded-[50%] bg-[#d9534f] text-[10px] text-[#fff] font-[600]">
                                                            {sms.quantityLike}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-[10px] py-[8px] w-[7%] border-[1px] border-solid border-[#fff]">
                                                <div className="flex justify-center items-center">
                                                    {sms.price.toLocaleString()}
                                                </div>
                                            </td>
                                            <td className="px-[10px] py-[8px] w-[15%] border-[1px] border-solid border-[#fff]">
                                                <div className="flex justify-center items-center">{`${sms.diem.toLocaleString()} (${parseFloat(
                                                    sms.tienxac.toFixed(1),
                                                ).toLocaleString()})`}</div>
                                            </td>
                                            <td className="px-[10px] py-[8px] w-[10%] border-[1px] border-solid border-[#fff]">
                                                <div
                                                    className={`flex items-center justify-center gap-[10px] text-[14px] font-[650] ${
                                                        sms.tientrung > 0 ? 'text-[#00f]' : 'text-[#d9534f]'
                                                    }`}
                                                >
                                                    {sms.tientrung.toLocaleString()}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex justify-end gap-[10px] items-center mt-[20px] pt-[12px] border-t-[1px] border-solid border-[#f0f0f0] px-[26px]"></div>
                </div>
            </div>
        </div>
    );
}

export default ModalUpdate;
