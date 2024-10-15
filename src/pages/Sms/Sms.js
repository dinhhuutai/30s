import { useEffect, useRef, useState } from 'react';
import {
    BsPencil,
    BsTrash,
    BsCaretUpFill,
    BsCaretDownFill,
    BsCaretDown,
    BsCaretUp,
    BsArrowRightCircleFill,
    BsArrowCounterclockwise,
    BsArrowRepeat,
    BsArrowClockwise,
} from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ModalCreate from './component/ModalCreate';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { noticeAdminSelector, userSelector } from '~/redux/selectors';
import moment from 'moment';
import Alert from '~/components/Alert';
import ModalContent from './component/ModalContent';
import ModalUpdate from './component/ModalUpdate';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';
import Tippy from '@tippyjs/react';
import convertContentDetail from './utils/convertContentDetail';
import payBySms from './utils/payBySms';
import HeaderPage from '../component/HeaderPage';

let setTimeoutTmp;

function Sms() {
    const [members, setMembers] = useState([]);
    const [idMember, setIdMember] = useState(0);
    const [domain, setDomain] = useState('mn');
    const [modalCreate, setModalCreate] = useState(false);
    const [modalContent, setModalContent] = useState(false);
    const [selectorContent, setSelectorContent] = useState({});
    const [modalUpdate, setModalUpdate] = useState(false);
    const [selectorSms, setSelectorSms] = useState();

    const [sms, setSms] = useState([]);
    const [date, setDate] = useState(new Date());

    const [arrangeName, setArrangeName] = useState(true);
    const [arrangeCreateDate, setArrangeCreateDate] = useState(false);
    const [typeArrange, setTypeArrange] = useState('createDate');

    const [deleted, setDeleted] = useState(false);

    const [listCheck, setListCheck] = useState([]);
    const refInputAll = useRef();

    const [listIdSelector, setListIdSelector] = useState([]);

    const [loadingDele, setLoadingDele] = useState(false);
    const [loadingRes, setLoadingRes] = useState(false);

    const [loading, setLoading] = useState(true);

    const [width, setWidth] = useState(0);

    useEffect(() => {
        const width = window.innerWidth;

        setWidth(width);
    }, []);

    const tmp = useSelector(userSelector);
    const [user, setUser] = useState(tmp);
    useEffect(() => {
        setUser(tmp);
    }, [tmp]);

    const notice = useSelector(noticeAdminSelector);
    useEffect(() => {
        if (!notice.state) {
            clearTimeout(setTimeoutTmp);
        }
    }, [notice.state]);

    useEffect(() => {
        handleFindAllMembers();
    }, []);

    useEffect(() => {
        handleFindSms();
    }, [date, , arrangeName, arrangeCreateDate, idMember, domain, deleted]);

    const handleFindAllMembers = async () => {
        try {
            const resMembers = await axios.post(
                `${process.env.REACT_APP_API_URL}/v1/member/findAllMemberByIdUser/${user.login.currentUser._id}`,
            );

            if (resMembers.data.success) {
                setMembers(resMembers.data.members);
            }
        } catch (error) {}
    };

    const handleFindSms = async () => {
        try {
            setLoading(true);

            console.log('date SMS: ', date);

            const resSms = await axios.post(
                `${process.env.REACT_APP_API_URL}/v1/sms/findSmsByNameAndPhone/${
                    user.login.currentUser?._id
                }?idMember=${idMember}&resultDate=${date}&deleted=${deleted}&domain=${domain}&${
                    typeArrange === 'createDate'
                        ? `sortCreateDate=${arrangeCreateDate ? '1' : '-1'}`
                        : `sortName=${arrangeName ? '1' : '-1'}`
                }`,
            );

            //console.log(resSms.data.sms);

            if (resSms.data.success) {
                setLoading(false);
                setSms(resSms.data.sms);
                setListCheck([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleMember = async (e) => {
        setIdMember(e.target.value);
    };

    const handleDateChange = (e) => {
        console.log(e);
        setDate(e);
    };

    const dispatch = useDispatch();

    const handleDelete = async (sm) => {
        try {
            setLoadingDele(true);
            dispatch(noticeAdminSlice.actions.processingNotice('Đang xóa tin nhắn'));
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/sms/delete`, {
                listId: [sm._id],
            });

            if (res.data.success) {
                const formattedDate = moment(date).format('DD/MM/YYYY');
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

                if (
                    (res.data.sms[0].domain === 'mn' && mn.length >= 3) ||
                    (res.data.sms[0].domain === 'mt' && mt.length >= 2) ||
                    (res.data.sms[0].domain === 'mb' && mb.length === 1)
                ) {
                    await Promise.all(
                        res.data.sms?.map(async (sms) => {
                            let resRevenue = await axios.post(
                                `${process.env.REACT_APP_API_URL}/v1/revenue/findRevenueBy`,
                                {
                                    idMember: sms.idMember,
                                    domain: sms.domain,
                                    resultDate: formattedDate,
                                },
                            );

                            if (resRevenue.data.revenue.length > 0 && sms.statusSms === 'Đã xổ') {
                                await axios.post(
                                    `${process.env.REACT_APP_API_URL}/v1/revenue/update/${resRevenue.data.revenue[0]._id}`,
                                    {
                                        diem2con: resRevenue.data.revenue[0]?.diem2con - sms?.diem2con,
                                        diem34con: resRevenue.data.revenue[0]?.diem34con - sms?.diem34con,
                                        tongxac: resRevenue.data.revenue[0]?.tongxac - sms?.tongxac,
                                        tongtrung: resRevenue.data.revenue[0]?.tongtrung - sms?.tongtrung,
                                        revenue: resRevenue.data.revenue[0]?.revenue - sms?.revenue,
                                    },
                                );
                            }
                        }),
                    );
                }

                await handleFindSms();

                setLoadingDele(false);
                dispatch(noticeAdminSlice.actions.successNotice('Xóa tin nhắn thành công'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [5000]);
            } else {
                dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống!!!'));
                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [5000]);
            }
        } catch (error) {
            setLoadingDele(false);
            dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống!!!'));
            setTimeoutTmp = setTimeout(() => {
                dispatch(noticeAdminSlice.actions.hiddenNotice());
            }, [5000]);
        }
    };

    const handleDeleteMany = async () => {
        try {
            setLoadingDele(true);
            dispatch(noticeAdminSlice.actions.processingNotice('Đang xóa tin nhắn'));
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/sms/delete`, {
                listId: listIdSelector,
            });

            console.log(res.data.sms);

            if (res.data.success) {
                const formattedDate = moment(date).format('DD/MM/YYYY');
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

                if (
                    (res.data.sms[0].domain === 'mn' && mn.length >= 3) ||
                    (res.data.sms[0].domain === 'mt' && mt.length >= 2) ||
                    (res.data.sms[0].domain === 'mb' && mb.length === 1)
                ) {
                    await Promise.all(
                        res.data.sms?.map(async (sms) => {
                            let resRevenue = await axios.post(
                                `${process.env.REACT_APP_API_URL}/v1/revenue/findRevenueBy`,
                                {
                                    idMember: sms.idMember,
                                    domain: sms.domain,
                                    resultDate: formattedDate,
                                },
                            );

                            if (resRevenue.data.revenue.length > 0 && sms.statusSms === 'Đã xổ') {
                                await axios.post(
                                    `${process.env.REACT_APP_API_URL}/v1/revenue/update/${resRevenue.data.revenue[0]._id}`,
                                    {
                                        diem2con: resRevenue.data.revenue[0]?.diem2con - sms?.diem2con,
                                        diem34con: resRevenue.data.revenue[0]?.diem34con - sms?.diem34con,
                                        tongxac: resRevenue.data.revenue[0]?.tongxac - sms?.tongxac,
                                        tongtrung: resRevenue.data.revenue[0]?.tongtrung - sms?.tongtrung,
                                        revenue: resRevenue.data.revenue[0]?.revenue - sms?.revenue,
                                    },
                                );
                            }
                        }),
                    );
                }

                await handleFindSms();

                setLoadingDele(false);
                dispatch(noticeAdminSlice.actions.successNotice('Xóa tin nhắn thành công'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [5000]);
            } else {
                dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống!!!'));
                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [5000]);
            }
        } catch (error) {
            setLoadingDele(false);
            dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống!!!'));
            setTimeoutTmp = setTimeout(() => {
                dispatch(noticeAdminSlice.actions.hiddenNotice());
            }, [5000]);
        }
    };

    const handleRestoreMany = async () => {
        try {
            setLoadingRes(true);
            dispatch(noticeAdminSlice.actions.processingNotice('Đang khôi phục tin nhắn'));
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/sms/restoreSmsAll`, {
                listId: listIdSelector,
            });

            if (res.data.success) {
                const formattedDate = moment(date).format('DD/MM/YYYY');
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

                if (
                    (res.data.sms[0].domain === 'mn' && mn.length >= 3) ||
                    (res.data.sms[0].domain === 'mt' && mt.length >= 2) ||
                    (res.data.sms[0].domain === 'mb' && mb.length === 1)
                ) {
                    await Promise.all(
                        res.data.sms?.map(async (sms) => {
                            const dateRestore = new Date(sms.resultDate);

                            let { arr, errorSyntax } = convertContentDetail(sms.contentEdit, dateRestore);

                            let smsDetailList = arr;

                            let mien = smsDetailList[0] && smsDetailList[0].domain;
                            let kqxs = mien === 'mn' ? mn : mien === 'mt' ? mt : mb;

                            const resMember = await axios.post(
                                `${process.env.REACT_APP_API_URL}/v1/member/findMemberById/${sms.idMember}`,
                            );
                            smsDetailList = payBySms(smsDetailList, resMember?.data?.member, kqxs);

                            let tongxacRestore = 0;
                            let tongtrungRestore = 0;
                            let tongdiemRestore = 0;
                            let diem2conRestore = 0;
                            let diem34conRestore = 0;

                            smsDetailList.map(async (e) => {
                                tongxacRestore += e.tienxac;
                                tongtrungRestore += e.tientrung;
                                tongdiemRestore += e.diem;
                                if (e.number[0].length === 2) {
                                    diem2conRestore += e.diem;
                                } else {
                                    diem34conRestore += e.diem;
                                }
                            });

                            let revenueRestore = resMember?.data?.member.runNumber
                                ? 0 - (tongxacRestore - tongtrungRestore)
                                : tongxacRestore - tongtrungRestore;

                            const form = {
                                statusSms: errorSyntax ? 'Chưa xử lý' : 'Đã xổ',
                                diem2conRestore,
                                diem34conRestore,
                                tongdiemRestore,
                                tongxacRestore,
                                tongtrungRestore,
                                revenueRestore,
                            };

                            const resSms = await axios.post(
                                `${process.env.REACT_APP_API_URL}/v1/sms/update/${sms._id}`,
                                form,
                            );

                            if (resSms.data.success && !errorSyntax) {
                                let resRevenue = await axios.post(
                                    `${process.env.REACT_APP_API_URL}/v1/revenue/findRevenueBy`,
                                    {
                                        idMember: sms.idMember,
                                        domain: sms.domain,
                                        resultDate: formattedDate,
                                    },
                                );

                                if (resRevenue.data.revenue.length > 0) {
                                    await axios.post(
                                        `${process.env.REACT_APP_API_URL}/v1/revenue/update/${resRevenue.data.revenue[0]._id}`,
                                        {
                                            diem2con: resRevenue.data.revenue[0]?.diem2con + diem2conRestore,
                                            diem34con: resRevenue.data.revenue[0]?.diem34con + diem34conRestore,
                                            tongxac: resRevenue.data.revenue[0]?.tongxac + tongxacRestore,
                                            tongtrung: resRevenue.data.revenue[0]?.tongtrung + tongtrungRestore,
                                            revenue: resRevenue.data.revenue[0]?.revenue + revenueRestore,
                                        },
                                    );
                                } else {
                                    const formRevenue = {
                                        idMember: sms.idMember,
                                        idUser: sms.idUser,
                                        domain: sms.domain,
                                        diem2con: diem2conRestore,
                                        diem34con: diem34conRestore,
                                        tongxac: tongxacRestore,
                                        tongtrung: tongtrungRestore,
                                        revenue: revenueRestore,
                                        resultDate: formattedDate,
                                    };

                                    await axios.post(`${process.env.REACT_APP_API_URL}/v1/revenue/create`, formRevenue);
                                }
                            }
                        }),
                    );
                }

                await handleFindSms();

                setLoadingRes(false);
                dispatch(noticeAdminSlice.actions.successNotice('Phục hồi tin nhắn thành công'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [5000]);
            } else {
                dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống!!!'));
                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [5000]);
            }
        } catch (error) {
            setLoadingRes(false);
            dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống!!!'));
            setTimeoutTmp = setTimeout(() => {
                dispatch(noticeAdminSlice.actions.hiddenNotice());
            }, [5000]);
        }
    };

    const handleRestore = async (sm) => {
        try {
            setLoadingRes(true);
            dispatch(noticeAdminSlice.actions.processingNotice('Đang khôi phục tin nhắn'));
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/sms/restoreSmsAll`, {
                listId: [sm._id],
            });

            if (res.data.success) {
                const formattedDate = moment(date).format('DD/MM/YYYY');
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

                if (
                    (res.data.sms[0].domain === 'mn' && mn.length >= 3) ||
                    (res.data.sms[0].domain === 'mt' && mt.length >= 2) ||
                    (res.data.sms[0].domain === 'mb' && mb.length === 1)
                ) {
                    await Promise.all(
                        res.data.sms?.map(async (sms) => {
                            const dateRestore = new Date(sms.resultDate);

                            let { arr, errorSyntax } = convertContentDetail(sms.contentEdit, dateRestore);
                            let smsDetailList = arr;

                            let mien = smsDetailList[0] && smsDetailList[0].domain;
                            let kqxs = mien === 'mn' ? mn : mien === 'mt' ? mt : mb;

                            const resMember = await axios.post(
                                `${process.env.REACT_APP_API_URL}/v1/member/findMemberById/${sms.idMember}`,
                            );
                            smsDetailList = payBySms(smsDetailList, resMember?.data?.member, kqxs);

                            let tongxacRestore = 0;
                            let tongtrungRestore = 0;
                            let tongdiemRestore = 0;
                            let diem2conRestore = 0;
                            let diem34conRestore = 0;

                            smsDetailList.map(async (e) => {
                                tongxacRestore += e.tienxac;
                                tongtrungRestore += e.tientrung;
                                tongdiemRestore += e.diem;
                                if (e.number[0].length === 2) {
                                    diem2conRestore += e.diem;
                                } else {
                                    diem34conRestore += e.diem;
                                }
                            });

                            let revenueRestore = resMember?.data?.member.runNumber
                                ? 0 - (tongxacRestore - tongtrungRestore)
                                : tongxacRestore - tongtrungRestore;

                            const form = {
                                statusSms: errorSyntax ? 'Chưa xử lý' : 'Đã xổ',
                                diem2conRestore,
                                diem34conRestore,
                                tongdiemRestore,
                                tongxacRestore,
                                tongtrungRestore,
                                revenueRestore,
                            };

                            const resSms = await axios.post(
                                `${process.env.REACT_APP_API_URL}/v1/sms/update/${sms._id}`,
                                form,
                            );

                            if (resSms.data.success && !errorSyntax) {
                                let resRevenue = await axios.post(
                                    `${process.env.REACT_APP_API_URL}/v1/revenue/findRevenueBy`,
                                    {
                                        idMember: sms.idMember,
                                        domain: sms.domain,
                                        resultDate: formattedDate,
                                    },
                                );

                                if (resRevenue.data.revenue.length > 0) {
                                    await axios.post(
                                        `${process.env.REACT_APP_API_URL}/v1/revenue/update/${resRevenue.data.revenue[0]._id}`,
                                        {
                                            diem2con: resRevenue.data.revenue[0]?.diem2con + diem2conRestore,
                                            diem34con: resRevenue.data.revenue[0]?.diem34con + diem34conRestore,
                                            tongxac: resRevenue.data.revenue[0]?.tongxac + tongxacRestore,
                                            tongtrung: resRevenue.data.revenue[0]?.tongtrung + tongtrungRestore,
                                            revenue: resRevenue.data.revenue[0]?.revenue + revenueRestore,
                                        },
                                    );
                                } else {
                                    const formRevenue = {
                                        idMember: sms.idMember,
                                        idUser: sms.idUser,
                                        domain: sms.domain,
                                        diem2con: diem2conRestore,
                                        diem34con: diem34conRestore,
                                        tongxac: tongxacRestore,
                                        tongtrung: tongtrungRestore,
                                        revenue: revenueRestore,
                                        resultDate: formattedDate,
                                    };

                                    await axios.post(`${process.env.REACT_APP_API_URL}/v1/revenue/create`, formRevenue);
                                }
                            }
                        }),
                    );
                }

                await handleFindSms();

                setLoadingRes(false);
                dispatch(noticeAdminSlice.actions.successNotice('Phục hồi tin nhắn thành công'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [5000]);
            } else {
                setLoadingRes(false);
                dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống!!!'));
                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [5000]);
            }
        } catch (error) {
            dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống!!!'));
            setTimeoutTmp = setTimeout(() => {
                dispatch(noticeAdminSlice.actions.hiddenNotice());
            }, [5000]);
        }
    };

    const handleCheckInput = (e) => {
        if (e.target.checked) {
            const newArray = [];
            for (var i = 0; i < sms.length; i++) {
                newArray.push(i);
            }
            setListCheck(newArray);
        } else {
            setListCheck([]);
        }
    };

    const handleCheckItem = (index, e) => {
        if (e.target.checked) {
            setListCheck([...listCheck, index]);
        } else {
            const newArray = listCheck.filter((el) => el !== index);
            setListCheck(newArray);
        }
    };

    useEffect(() => {
        var checks = document.querySelectorAll('input[name=inputCheckboxArtistList]:checked');

        const newArray = [];
        checks.forEach((check) => {
            newArray.push(check.getAttribute('data-id'));
        });

        if (newArray?.length === sms?.length && sms?.length !== 0) {
            refInputAll.current.checked = true;
        } else {
            refInputAll.current.checked = false;
        }

        const endArray = newArray.filter((item) => item !== null);

        setListIdSelector(endArray);
    }, [listCheck]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    return (
        <div>
            {loading ? (
                <div className="left-0 right-0 fixed z-[999999] top-0">
                    <div className="bg-[#259dba] h-[3px] animate-loadingSlice"></div>
                    <div className="right-[6px] absolute top-[10px]">
                        <div className="flex justify-center items-center">
                            <div className="text-[26px] animate-loading2 text-[#259dba]">
                                <BsArrowClockwise />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
            <HeaderPage pageCurr={'Quản Lý Tin Nhắn'} />
            <div className="bg-[var(--color-white)] overflow-hidden w-[100%] px-[16px] mt-[12px] py-[14px] pb-[28px] rounded-[6px]">
                <div>
                    <button
                        onClick={() => setModalCreate(true)}
                        className={`hover:opacity-[.9] uppercase font-[620] text-[12px] w-[120px] h-[30px] flex justify-center items-center bg-[#2574ab] rounded-[4px] text-[#fff] active:opacity-[.7]`}
                    >
                        Thêm mới
                    </button>
                </div>

                <div className="mt-[10px] flex flex-col lg:flex-row gap-[4px] lg:gap-[8px]">
                    <div className="w-[100%] lg:w-auto">
                        <DatePicker
                            wrapperClassName="w-[100%] h-[100%] lg:w-auto"
                            maxDate={new Date()}
                            selected={date}
                            dateFormat="dd-MM-yyyy"
                            onChange={handleDateChange}
                            className="border-[1px] w-[100%] h-[100%] lg:w-auto border-solid px-[6px] py-[4px] outline-none rounded-[4px] text-[12px] border-[#ccc]"
                        />
                    </div>
                    <select
                        value={idMember}
                        onChange={handleMember}
                        className="px-[4px] w-[100%] py-[4px] lg:w-[150px] text-[#000] font-[500] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                    >
                        <option className="font-[500]" value={0}>
                            Tất cả
                        </option>
                        {members?.map((member, index) => {
                            return <option key={index} value={`${member._id}`}>{`${member.name}`}</option>;
                        })}
                    </select>
                    <div className="flex mt-[10px] lg:mt-[0px]">
                        <div className="flex items-center gap-[4px] lg:ml-[10px] ml-[0px]">
                            <input checked={deleted} onChange={(e) => setDeleted(e.target.checked)} type="checkbox" />
                            <label className="text-[12px] text-[#000]">Đã xóa</label>
                        </div>

                        <div className="ml-[18px] lg:ml-[4px]">
                            {deleted ? (
                                <Alert
                                    funcHandle={() => handleRestoreMany()}
                                    title="Phục hồi Tin Nhắn"
                                    content={`Phục hồi các tin nhắn?`}
                                >
                                    <button
                                        disabled={!(listIdSelector.length > 0) || loadingRes}
                                        className={`gap-[6px] uppercase font-[620] text-[12px] w-[100px] h-[30px] flex justify-center items-center bg-[#3892ad] ${
                                            listIdSelector.length > 0 || loadingRes
                                                ? 'hover:opacity-[.9] active:opacity-[.7]'
                                                : 'opacity-[.6]'
                                        } rounded-[4px] text-[#fff]`}
                                    >
                                        {loadingRes ? (
                                            <div className="text-[20px] animate-loading">
                                                <BsArrowRepeat />
                                            </div>
                                        ) : (
                                            <>
                                                <div className="text-[14px]">
                                                    <BsArrowCounterclockwise />
                                                </div>
                                                Phục hồi
                                            </>
                                        )}
                                    </button>
                                </Alert>
                            ) : (
                                <Alert
                                    funcHandle={() => handleDeleteMany()}
                                    title="Xóa Tin Nhắn"
                                    content={`Các tin nhắn đã chọn sẽ bị xóa?`}
                                >
                                    <button
                                        disabled={!(listIdSelector.length > 0) || loadingDele}
                                        className={`gap-[6px] uppercase font-[620] text-[12px] w-[70px] h-[30px] flex justify-center items-center bg-[#d9534f] ${
                                            listIdSelector.length > 0 || loadingDele
                                                ? 'hover:opacity-[.9] active:opacity-[.7]'
                                                : 'opacity-[.6]'
                                        } rounded-[4px] text-[#fff]`}
                                    >
                                        {loadingDele ? (
                                            <div className="text-[20px] animate-loading">
                                                <BsArrowRepeat />
                                            </div>
                                        ) : (
                                            <>
                                                <BsTrash />
                                                Xóa
                                            </>
                                        )}
                                    </button>
                                </Alert>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-[26px] w-[400px] lg:w-auto gap-[6px] lg:gap-[0px] flex flex-col lg:flex-row justify-between">
                    <div className="">
                        <button
                            onClick={() => setDomain('mn')}
                            className={`text-[12px] font-[600] rounded-tl-[6px] uppercase px-[14px] py-[5px] border-[1px] border-solid border-[#ccc] ${
                                domain === 'mn' ? 'bg-[#fff]' : 'bg-[#9fa8bc]'
                            }`}
                        >
                            M.nam
                        </button>
                        <button
                            onClick={() => setDomain('mt')}
                            className={`text-[12px] font-[600] uppercase px-[14px] py-[5px] border-[1px] border-solid border-[#ccc] ${
                                domain === 'mt' ? 'bg-[#fff]' : 'bg-[#9fa8bc]'
                            }`}
                        >
                            M.trung
                        </button>
                        <button
                            onClick={() => setDomain('mb')}
                            className={`text-[12px] font-[600] uppercase px-[14px] py-[5px] border-[1px] border-solid border-[#ccc] ${
                                domain === 'mb' ? 'bg-[#fff]' : 'bg-[#9fa8bc]'
                            }`}
                        >
                            M.bắc
                        </button>
                        <button
                            onClick={() => setDomain('other')}
                            className={`text-[12px] font-[600] rounded-tr-[6px] uppercase px-[14px] py-[5px] border-[1px] border-solid border-[#ccc] ${
                                domain === 'other' ? 'bg-[#fff]' : 'bg-[#9fa8bc]'
                            }`}
                        >
                            khác
                        </button>
                    </div>

                    <div className="text-[12px] flex items-center gap-[30px] font-[500] mr-[20px]">
                        <div className="flex">
                            <label>Số lượng tin: </label>
                            <div className="ml-[4px]">{sms.length}</div>
                        </div>
                        <div className="flex items-center gap-[4px]">
                            <div className="h-[14px] w-[14px] bg-[#e0ff31] border-[1px] border-solid border-[#dfdfdf]"></div>
                            <span>Tin nhắn có số trúng</span>
                        </div>
                    </div>
                </div>

                <div className="w-full mt-[4px] overflow-x-auto">
                    <table className="lg:w-full w-[900px] rounded-[6px] overflow-hidden">
                        <thead>
                            <tr className="text-[12px] w-[100%] bg-[#d8dce3]">
                                <td className="w-[3%] py-[8px] border-[1px] border-solid border-[#fff]">
                                    <div className="flex items-center justify-center">
                                        <input
                                            className="h-[14px] w-[14px]"
                                            ref={refInputAll}
                                            onChange={(e) => handleCheckInput(e)}
                                            type="checkbox"
                                        />
                                    </div>
                                </td>
                                <th className="w-[5%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                    STT
                                </th>
                                <th
                                    onClick={() => {
                                        setTypeArrange('name');
                                        setArrangeName((prev) => !prev);
                                    }}
                                    className="w-[17%] py-[8px] border-[1px] border-solid border-[#fff] uppercase"
                                >
                                    <button className="flex items-center justify-around w-full uppercase cursor-pointer">
                                        người chơi
                                        <div className="flex items-center">
                                            {typeArrange === 'name' ? (
                                                arrangeName ? (
                                                    <>
                                                        <BsCaretUp />
                                                        <BsCaretDownFill />
                                                    </>
                                                ) : (
                                                    <>
                                                        <BsCaretUpFill />
                                                        <BsCaretDown />
                                                    </>
                                                )
                                            ) : (
                                                <>
                                                    <BsCaretUp />
                                                    <BsCaretDown />
                                                </>
                                            )}
                                        </div>
                                    </button>
                                </th>
                                <th className="w-[15%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                    nội dung
                                </th>
                                <th className="w-[8%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                    loại tin
                                </th>
                                <th className="w-[15%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                    Đặt
                                </th>
                                <th className="w-[10%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                    trạng thái
                                </th>
                                <th
                                    onClick={() => {
                                        setTypeArrange('createDate');
                                        setArrangeCreateDate((prev) => !prev);
                                    }}
                                    className="w-[18%] py-[8px] border-[1px] border-solid border-[#fff] uppercase"
                                >
                                    <button className="flex items-center justify-around w-full uppercase cursor-pointer">
                                        thời gian nhận
                                        <div className="flex items-center">
                                            {typeArrange === 'createDate' ? (
                                                arrangeCreateDate ? (
                                                    <>
                                                        <BsCaretUpFill />
                                                        <BsCaretDown />
                                                    </>
                                                ) : (
                                                    <>
                                                        <BsCaretUp />
                                                        <BsCaretDownFill />
                                                    </>
                                                )
                                            ) : (
                                                <>
                                                    <BsCaretUp />
                                                    <BsCaretDown />
                                                </>
                                            )}
                                        </div>
                                    </button>
                                </th>
                                <th className="w-[8%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                    thao tác
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {sms?.map((sm, index) => (
                                <tr className={`text-[12px] font-[490] bg-[#f0f1f4]`} key={index}>
                                    <td className="px-[10px] py-[8px] w-[3%] border-[1px] border-solid border-[#fff]">
                                        <div className="flex justify-center items-center">
                                            <input
                                                checked={listCheck.includes(index)}
                                                onChange={(e) => handleCheckItem(index, e)}
                                                data-id={listCheck.includes(index) ? sm._id : null}
                                                name="inputCheckboxArtistList"
                                                type="checkbox"
                                                className="h-[14px] w-[14px]"
                                            />
                                        </div>
                                    </td>
                                    <td
                                        className={`px-[10px] py-[8px] w-[5%] border-[1px] border-solid border-[#fff] ${
                                            sm.tongtrung > 0 ? 'bg-[#e0ff31]' : 'bg-[#f0f1f4]'
                                        }`}
                                    >
                                        <div className="flex justify-center items-center">{index + 1}</div>
                                    </td>
                                    <td className="px-[10px] py-[8px] w-[17%] border-[1px] border-solid border-[#fff]">
                                        <div
                                            onClick={() => setIdMember(sm.idMember._id)}
                                            className="text-[#259dba] flex items-center font-[500] hover:text-[#505b72] cursor-pointer"
                                        >
                                            {sm.idMember?.name}
                                            {sm.idMember?.runNumber && (
                                                <div className="ml-[2px] text-[#000] text-[10px]">
                                                    <BsArrowRightCircleFill />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-[10px] py-[8px] w-[15%] border-[1px] border-solid border-[#fff]">
                                        <div
                                            onClick={() => {
                                                setModalContent(true);
                                                setSelectorContent({
                                                    index: index + 1,
                                                    content: sm.contentEdit,
                                                });
                                            }}
                                            className="text-[#259dba] whitespace-nowrap text-ellipsis w-[120px] overflow-hidden hover:text-[#505b72] cursor-pointer"
                                        >
                                            {sm.contentEdit}
                                        </div>
                                    </td>
                                    <td className="px-[10px] py-[8px] w-[8%] border-[1px] border-solid border-[#fff]">
                                        <div className="capitalize text-[12px]">{sm.typeSms}</div>
                                    </td>
                                    <td className="px-[10px] py-[8px] w-[15%] border-[1px] border-solid border-[#fff]">
                                        <div className="text-[12px] flex">
                                            2c:{' '}
                                            <span className="font-[600] ml-[2px]">{sm.diem2con.toLocaleString()}</span>
                                            <div className="mx-[6px]"></div>
                                            3,4c:{' '}
                                            <span className="font-[600] ml-[2px]">{sm.diem34con.toLocaleString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-[10px] py-[8px] w-[10%] border-[1px] border-solid border-[#fff]">
                                        <div className="flex justify-center">
                                            <div
                                                className={`text-[10px] px-[6px] font-[550] rounded-[14px] w-fit text-[#fff] ${
                                                    sm.statusSms === 'Chưa xử lý' ? 'bg-[#d9534f]' : 'bg-[#259dba]'
                                                }`}
                                            >
                                                {sm.statusSms}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-[10px] py-[8px] w-[18%] border-[1px] border-solid border-[#fff]">
                                        <div className="text-[12px] font-[500]">
                                            {moment(sm.createDate).format('HH:mm')}
                                        </div>
                                    </td>
                                    <td className="px-[10px] py-[8px] w-[8%] border-[1px] border-solid border-[#fff]">
                                        <div className="flex items-center justify-center gap-[10px] text-[#4b4a4a]">
                                            {deleted ? (
                                                width < 768 ? (
                                                    <Alert
                                                        funcHandle={() => handleRestore(sm)}
                                                        title="Phục hồi Tin Nhắn"
                                                        content={`Phục hồi tin nhắn STT #${index + 1}?`}
                                                    >
                                                        <div className="px-[4px] text-[14px] cursor-pointer hover:text-[#7588b1]">
                                                            <BsArrowCounterclockwise />
                                                        </div>
                                                    </Alert>
                                                ) : (
                                                    <Alert
                                                        funcHandle={() => handleRestore(sm)}
                                                        title="Phục hồi Tin Nhắn"
                                                        content={`Phục hồi tin nhắn STT #${index + 1}?`}
                                                    >
                                                        <Tippy
                                                            placement="bottom-start"
                                                            arrow={false}
                                                            content={
                                                                <span className="text-[10px] px-[6px] hidden lg:block rounded-[4px] bg-[#000] text-[#fff] py-[2px]">
                                                                    Phục hồi tin nhắn
                                                                </span>
                                                            }
                                                        >
                                                            <div className="px-[4px] text-[14px] cursor-pointer hover:text-[#7588b1]">
                                                                <BsArrowCounterclockwise />
                                                            </div>
                                                        </Tippy>
                                                    </Alert>
                                                )
                                            ) : (
                                                <>
                                                    {width < 768 ? (
                                                        <div
                                                            onClick={() => {
                                                                setModalUpdate(true);
                                                                setSelectorSms({
                                                                    index: index + 1,
                                                                    sm,
                                                                });
                                                            }}
                                                            className="px-[4px] cursor-pointer hover:text-[#7588b1]"
                                                        >
                                                            <BsPencil />
                                                        </div>
                                                    ) : (
                                                        <Tippy
                                                            placement="bottom-start"
                                                            arrow={false}
                                                            content={
                                                                <span className="text-[10px] px-[6px] hidden lg:block rounded-[4px] bg-[#000] text-[#fff] py-[2px]">
                                                                    Chỉnh sửa tin nhắn
                                                                </span>
                                                            }
                                                        >
                                                            <div
                                                                onClick={() => {
                                                                    setModalUpdate(true);
                                                                    setSelectorSms({
                                                                        index: index + 1,
                                                                        sm,
                                                                    });
                                                                }}
                                                                className="px-[4px] cursor-pointer hover:text-[#7588b1]"
                                                            >
                                                                <BsPencil />
                                                            </div>
                                                        </Tippy>
                                                    )}
                                                    {width < 768 ? (
                                                        <Alert
                                                            funcHandle={() => handleDelete(sm)}
                                                            title="Xóa Tin Nhắn"
                                                            content={`Tin nhắn STT #${index + 1} sẽ bị xóa?`}
                                                        >
                                                            <div className="px-[4px] cursor-pointer hover:text-[#7588b1]">
                                                                <BsTrash />
                                                            </div>
                                                        </Alert>
                                                    ) : (
                                                        <Alert
                                                            funcHandle={() => handleDelete(sm)}
                                                            title="Xóa Tin Nhắn"
                                                            content={`Tin nhắn STT #${index + 1} sẽ bị xóa?`}
                                                        >
                                                            <Tippy
                                                                placement="bottom-start"
                                                                arrow={false}
                                                                content={
                                                                    <span className="text-[10px] px-[6px] hidden lg:block rounded-[4px] bg-[#000] text-[#fff] py-[2px]">
                                                                        Xóa tin nhắn
                                                                    </span>
                                                                }
                                                            >
                                                                <div className="px-[4px] cursor-pointer hover:text-[#7588b1]">
                                                                    <BsTrash />
                                                                </div>
                                                            </Tippy>
                                                        </Alert>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {modalCreate && (
                    <ModalCreate
                        setModalCreate={setModalCreate}
                        handleFindSms={handleFindSms}
                        members={members}
                        date={date}
                    />
                )}

                {modalContent && <ModalContent setModalContent={setModalContent} selectorContent={selectorContent} />}
                {modalUpdate && (
                    <ModalUpdate
                        setModalUpdate={setModalUpdate}
                        handleFindSms={handleFindSms}
                        selectorSmsTmp={selectorSms}
                        members={members}
                    />
                )}
            </div>
        </div>
    );
}

export default Sms;
