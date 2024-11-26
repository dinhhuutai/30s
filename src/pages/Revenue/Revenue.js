import { current } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { noticeAdminSelector, userSelector } from '~/redux/selectors';

import { BsArrowRightCircleFill, BsCopy, BsArrowRepeat, BsArrowClockwise } from 'react-icons/bs';
import ModalNotice from './component/ModalNotice';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';
import payTotalSmsByDate from './component/payTotalSmsByDate';
import HeaderPage from '../component/HeaderPage';
import ModalWin from './component/ModalWin';
import Select from 'react-select';
import { Helmet } from 'react-helmet';

let setTimeoutTmp;

function Revenue() {
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(new Date());
    const [revenues, setRevenues] = useState([]);
    const [showDiem234con, setShowDiem234con] = useState(false);

    const [members, setMembers] = useState([]);
    const [idMember, setIdMember] = useState(0);
    const [idMemberSelect, setIdMemberSelect] = useState(0);

    const [modalNotice, setModalNotice] = useState(false);
    const [selectorRevenue, setSelectorRevenue] = useState({});
    const [domain, setDomain] = useState();

    const [selectRevenue, setSelectRevenue] = useState();
    const [modalWin, setModalWin] = useState(false);

    const [loadingUp, setLoadingUp] = useState(true);

    const handleDateChange = (e) => {
        setDate(e);
    };

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

    useEffect(() => {
        handleFindAllMembers();
    }, []);

    useEffect(() => {
        handleFindRevenue();
    }, [date, idMember]);

    const handleMember = async (e) => {
        setIdMember(e.target.value);
    };

    const handleFindAllMembers = async () => {
        try {
            const resMembers = await axios.post(
                `${process.env.REACT_APP_API_URL}/v1/member/findAllMemberByIdUser/${user.login.currentUser._id}`,
            );

            const membersTmp = resMembers?.data?.members?.map((mem) => {
                return {
                    value: mem._id,
                    label: mem.name,
                };
            });

            membersTmp.unshift({ value: '0', label: 'Tất cả' });

            if (resMembers?.data?.success) {
                setMembers(membersTmp);
            }
        } catch (error) {}
    };

    const handleFindRevenue = async () => {
        try {
            setLoadingUp(true);
            const formattedDate = moment(date).format('DD/MM/YYYY');
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/revenue/findRevenueByDateAndIdMember`, {
                date: formattedDate,
                idUser: user.login.currentUser._id,
                idMember: idMember,
            });

            console.log(res.data);

            if (res?.data.success) {
                let revenueNew = res.data.data?.reduce((acc, curr) => {
                    let group = acc.find((item) => item.idMember?._id === curr.idMember?._id);

                    if (group) {
                        group.idMember.total += curr.revenue; // Cộng dồn doanh thu trực tiếp
                        group[curr.domain] = curr; // Thêm/cập nhật dữ liệu miền hiện tại
                    } else {
                        acc.push({
                            idMember: {
                                _id: curr.idMember?._id,
                                name: curr.idMember?.name,
                                total: curr.revenue,
                                runNumber: curr.idMember?.runNumber,
                                resultDate: curr.resultDate,
                            },
                            [curr.domain]: curr,
                        });
                    }

                    return acc;
                }, []);

                if (revenueNew) {
                    revenueNew = revenueNew.filter((e) => e?.mn?.tongxac || e?.mt?.tongxac || e?.mb?.tongxac);
                }

                let tongMN = 0;
                let tongMT = 0;
                let tongMB = 0;
                let tongAll = 0;
                revenueNew.map((re) => {
                    tongMN += re?.mn?.revenue || 0;
                    tongMT += re?.mt?.revenue || 0;
                    tongMB += re?.mb?.revenue || 0;
                    tongAll += re?.idMember?.total || 0;
                });

                const objTotal = {
                    tongMN,
                    tongMT,
                    tongMB,
                    tongAll,
                };

                revenueNew.push(objTotal);

                setRevenues(revenueNew);
                setLoadingUp(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const dispatch = useDispatch();

    const payTotalRevenue = async () => {
        try {
            console.log(12345);
            setLoading(true);
            dispatch(noticeAdminSlice.actions.processingNotice('Đang dò kết quả'));

            const formattedDate = moment(date).format('DD/MM/YYYY');

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/kqxs/findKqxsByDate`, {
                date: formattedDate,
            });

            if (res.data.success) {
                const mn = [];
                const mt = [];
                const mb = [];

                res.data.data.map((e) => {
                    if (e.domain === 'mb') {
                        mb.push(e);
                    } else if (e.domain === 'mt') {
                        mt.push(e);
                    } else if (e.domain === 'mn') {
                        mn.push(e);
                    }
                });

                if (mn.length >= 1) {
                    const resRevenue = await axios.post(`${process.env.REACT_APP_API_URL}/v1/revenue/delete`, {
                        resultDate: formattedDate,
                        idUser: user.login.currentUser._id,
                        domain: 'mn',
                    });

                    if (resRevenue.data.success) {
                        await payTotalSmsByDate(formattedDate, date, 'mn', user.login.currentUser._id, mn);
                    }
                }
                if (mt.length >= 1) {
                    const resRevenue = await axios.post(`${process.env.REACT_APP_API_URL}/v1/revenue/delete`, {
                        resultDate: formattedDate,
                        idUser: user.login.currentUser._id,
                        domain: 'mt',
                    });

                    if (resRevenue.data.success) {
                        await payTotalSmsByDate(formattedDate, date, 'mt', user.login.currentUser._id, mt);
                    }
                }
                if (mb.length >= 1) {
                    const resRevenue = await axios.post(`${process.env.REACT_APP_API_URL}/v1/revenue/delete`, {
                        resultDate: formattedDate,
                        idUser: user.login.currentUser._id,
                        domain: 'mb',
                    });

                    if (resRevenue.data.success) {
                        await payTotalSmsByDate(formattedDate, date, 'mb', user.login.currentUser._id, mb);
                    }
                }

                handleFindRevenue();
            }

            setLoading(false);

            dispatch(noticeAdminSlice.actions.successNotice('Đã dò kết quả'));

            setTimeoutTmp = setTimeout(() => {
                dispatch(noticeAdminSlice.actions.hiddenNotice());
            }, [5000]);
        } catch (error) {
            setLoading(false);

            dispatch(noticeAdminSlice.actions.successNotice('Lỗi hệ thống'));

            setTimeoutTmp = setTimeout(() => {
                dispatch(noticeAdminSlice.actions.hiddenNotice());
            }, [5000]);
            console.log(error);
        }
    };

    console.log(revenues);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    return (
        <div>
            <Helmet>
                <title>Doanh Thu - 10s</title> {/* Cập nhật tiêu đề trang */}
                <meta name="description" content="Đây là Website 10s ứng dụng tính tiền số." /> {/* Mô tả cho SEO */}
                <meta property="og:title" content="Đây là Website 10s ứng dụng tính tiền số." />{' '}
                {/* Open Graph title */}
                <meta property="og:description" content="Trang này giúp tính tiền số tự động nhanh gọn lẹ." />
                {/* Open Graph description */}
                <meta property="og:image" content="https://example.com/og-image.jpg" /> {/* Open Graph image */}
                <meta property="og:url" content="https://example.com/my-page" /> {/* URL của trang */}
                <link rel="icon" href="" type="image/x-icon" />
            </Helmet>
            {loadingUp ? (
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
            <HeaderPage pageCurr={'Doanh Thu'} />
            <div className="bg-[var(--color-white)] px-[16px] mt-[12px] py-[14px] pb-[28px] rounded-[6px]">
                <div>
                    <button
                        disabled={loading}
                        onClick={payTotalRevenue}
                        className={`${
                            loading ? 'opacity-[.7] hover:opacity-[.7]' : 'hover:opacity-[.9]'
                        } uppercase font-[620] text-[12px] w-[100px] h-[30px] flex justify-center items-center bg-[#e6ad5c] rounded-[4px] text-[#fff] active:opacity-[.7]`}
                    >
                        {loading ? (
                            <div className="text-[20px] animate-loading">
                                <BsArrowRepeat />
                            </div>
                        ) : (
                            'Dò kết quả'
                        )}
                    </button>
                </div>
                <div className="mt-[10px] flex flex-col lg:flex-row gap-[8px]">
                    <div className="w-[100%] lg:w-auto">
                        <DatePicker
                            wrapperClassName="w-[100%] h-[100%] lg:w-auto"
                            maxDate={new Date()}
                            selected={date}
                            dateFormat="dd-MM-yyyy"
                            onChange={handleDateChange}
                            className="border-[1px] w-[100%] h-[100%] border-solid px-[6px] py-[4px] outline-none rounded-[4px] text-[12px] border-[#ccc]"
                        />
                    </div>

                    <div className="w-[100%] lg:w-[150px] text-[#000] font-[500] outline-none text-[12px]">
                        <Select
                            options={members}
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
                                    width: '150px',
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

                    <div className="flex items-center gap-[4px] lg:ml-[10px]">
                        <input
                            checked={showDiem234con}
                            onChange={(e) => setShowDiem234con(e.target.checked)}
                            type="checkbox"
                        />
                        <label className="text-[12px] text-[#000]">Hiện điểm 2 - 3,4 con</label>
                    </div>
                </div>

                <div className="mt-[30px] overflow-x-auto pb-[30px]">
                    <table>
                        <thead>
                            <tr className="bg-[#d8dce3] text-[12px]">
                                <th className="">
                                    <div className="">
                                        <div className="h-[23px] bg-[#fff]"></div>
                                        <div className="flex">
                                            <div className="w-[50px] py-[2px] border-[1px] border-solid border-[#fff]">
                                                STT
                                            </div>
                                            <div className="w-[100px] py-[2px] border-[1px] border-solid border-[#fff]">
                                                TÊN
                                            </div>
                                        </div>
                                    </div>
                                </th>
                                <th className="border-l-[30px] border-solid border-[#fff]">
                                    <div className="">
                                        <div className="border-[1px] border-solid border-[#fff] py-[2px]">MIỀN NAM</div>
                                        <div className="flex">
                                            {showDiem234con && (
                                                <>
                                                    <div className="w-[80px] py-[2px] border-[1px] border-solid border-[#fff]">
                                                        2C
                                                    </div>
                                                    <div className="w-[80px] py-[2px] border-[1px] border-solid border-[#fff]">
                                                        3,4C
                                                    </div>
                                                </>
                                            )}
                                            <div className="w-[80px] py-[2px] border-[1px] border-solid border-[#fff]">
                                                XÁC
                                            </div>
                                            <div className="w-[80px] py-[2px] border-[1px] border-solid border-[#fff]">
                                                TRÚNG
                                            </div>
                                            <div className="w-[100px] py-[2px] border-[1px] border-solid border-[#fff]">
                                                TỔNG
                                            </div>
                                        </div>
                                    </div>
                                </th>

                                <th className="border-l-[30px] border-solid border-[#fff]">
                                    <div className="">
                                        <div className="border-[1px] border-solid border-[#fff] py-[2px]">
                                            MIỀN TRUNG
                                        </div>
                                        <div className="flex">
                                            {showDiem234con && (
                                                <>
                                                    <div className="w-[80px] py-[2px] border-[1px] border-solid border-[#fff]">
                                                        2C
                                                    </div>
                                                    <div className="w-[80px] py-[2px] border-[1px] border-solid border-[#fff]">
                                                        3,4C
                                                    </div>
                                                </>
                                            )}
                                            <div className="w-[80px] py-[2px] border-[1px] border-solid border-[#fff]">
                                                XÁC
                                            </div>
                                            <div className="w-[80px] py-[2px] border-[1px] border-solid border-[#fff]">
                                                TRÚNG
                                            </div>
                                            <div className="w-[100px] py-[2px] border-[1px] border-solid border-[#fff]">
                                                TỔNG
                                            </div>
                                        </div>
                                    </div>
                                </th>

                                <th className="border-l-[30px] border-solid border-[#fff]">
                                    <div className="">
                                        <div className="border-[1px] border-solid border-[#fff] py-[2px]">MIỀN BẮC</div>
                                        <div className="flex">
                                            {showDiem234con && (
                                                <>
                                                    <div className="w-[80px] py-[2px] border-[1px] border-solid border-[#fff]">
                                                        2C
                                                    </div>
                                                    <div className="w-[80px] py-[2px] border-[1px] border-solid border-[#fff]">
                                                        3,4C
                                                    </div>
                                                </>
                                            )}
                                            <div className="w-[80px] py-[2px] border-[1px] border-solid border-[#fff]">
                                                XÁC
                                            </div>
                                            <div className="w-[80px] py-[2px] border-[1px] border-solid border-[#fff]">
                                                TRÚNG
                                            </div>
                                            <div className="w-[100px] py-[2px] border-[1px] border-solid border-[#fff]">
                                                TỔNG
                                            </div>
                                        </div>
                                    </div>
                                </th>

                                <th className="border-l-[30px] border-solid border-[#fff]">
                                    <div className="">
                                        <div className="h-[23px] bg-[#fff]"></div>
                                        <div className="flex">
                                            <div className="w-[100px] py-[2px] border-[1px] border-solid border-[#fff]">
                                                TỔNG
                                            </div>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {revenues?.map((revenue, index) => (
                                <tr
                                    key={index}
                                    className={`text-[12px] text-[#000] ${
                                        index % 2 === 0 ? 'bg-[#fff]' : 'bg-[#d8dce3]'
                                    }`}
                                >
                                    <td>
                                        {revenues.length - 1 === index ? (
                                            <div className="flex">
                                                <div className="w-[150px] bg-[#f0f1f4] font-[650] px-[16px] h-[40px] flex justify-end items-center py-[2px] border-[1px] border-solid border-[#fff]">
                                                    TỔNG
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex">
                                                <div className="w-[50px] px-[4px] h-[40px] flex justify-center items-center py-[2px] border-[1px] border-solid border-[#fff]">
                                                    {index + 1}
                                                </div>
                                                <div className="w-[100px] px-[4px] h-[40px] flex justify-center items-center py-[2px] border-[1px] border-solid border-[#fff]">
                                                    {revenue?.idMember?.name}
                                                    {revenue.idMember?.runNumber && (
                                                        <div className="ml-[2px] text-[#000] text-[10px]">
                                                            <BsArrowRightCircleFill />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </td>

                                    <td className="border-l-[30px] border-solid border-[#fff]">
                                        {revenues.length - 1 === index ? (
                                            <div
                                                className={`flex font-[650] items-center border-[1px] border-solid border-[#fff] h-[40px] bg-[#f0f1f4] justify-end px-[16px] ${
                                                    revenue?.tongMN >= 0 || !revenue?.tongMN
                                                        ? 'text-[red]'
                                                        : 'text-[#00f]'
                                                }`}
                                            >
                                                {revenue?.tongMN
                                                    ? parseFloat(revenue?.tongMN.toFixed(1)).toLocaleString()
                                                    : 0}
                                            </div>
                                        ) : (
                                            <div className="flex">
                                                {showDiem234con && (
                                                    <>
                                                        <div className="w-[80px] px-[4px] h-[40px] flex justify-center items-center py-[2px] border-[1px] border-solid border-[#fff]">
                                                            {revenue?.mn?.diem2con
                                                                ? parseFloat(
                                                                      revenue?.mn?.diem2con.toFixed(1),
                                                                  ).toLocaleString()
                                                                : 0}
                                                        </div>
                                                        <div className="w-[80px] px-[4px] h-[40px] flex justify-center items-center py-[2px] border-[1px] border-solid border-[#fff]">
                                                            {revenue?.mn?.diem34con
                                                                ? parseFloat(
                                                                      revenue?.mn?.diem34con.toFixed(1),
                                                                  ).toLocaleString()
                                                                : 0}
                                                        </div>
                                                    </>
                                                )}
                                                <div className="w-[80px] px-[4px] h-[40px] flex justify-center items-center py-[2px] border-[1px] border-solid border-[#fff]">
                                                    {revenue?.mn?.tongxac
                                                        ? parseFloat(revenue?.mn?.tongxac.toFixed(1)).toLocaleString()
                                                        : 0}
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        setSelectRevenue({
                                                            idMember: revenue.idMember._id,
                                                            resultDate: date,
                                                            domain: 'mn',
                                                            name: revenue.idMember.name,
                                                        });
                                                        setModalWin(true);
                                                        console.log('date revenue: ', date);
                                                    }}
                                                    className="w-[80px] px-[4px] cursor-pointer font-[480] h-[40px] text-[#2587a0] flex justify-center items-center py-[2px] border-[1px] border-solid border-[#fff]"
                                                >
                                                    {revenue?.mn?.tongtrung
                                                        ? parseFloat(revenue?.mn?.tongtrung.toFixed(1)).toLocaleString()
                                                        : 0}
                                                </div>
                                                <div
                                                    className={`w-[100px] px-[4px] ${
                                                        revenue?.mn?.revenue >= 0 || !revenue?.mn?.revenue
                                                            ? 'text-[red]'
                                                            : 'text-[#00f]'
                                                    } font-[550] h-[40px] flex justify-center items-center py-[2px] px-[6px] border-[1px] border-solid border-[#fff]`}
                                                >
                                                    {revenue?.mn?.revenue
                                                        ? parseFloat(revenue?.mn?.revenue.toFixed(1)).toLocaleString()
                                                        : 0}
                                                    <div
                                                        onClick={() => {
                                                            setModalNotice(true);
                                                            setSelectorRevenue(revenue);
                                                            setDomain('mn');
                                                        }}
                                                        className="ml-[6px] text-[red] cursor-pointer"
                                                    >
                                                        <BsCopy />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </td>

                                    <td className="border-l-[30px] border-solid border-[#fff]">
                                        {revenues.length - 1 === index ? (
                                            <div
                                                className={`flex font-[650] items-center border-[1px] border-solid border-[#fff] h-[40px] bg-[#f0f1f4] justify-end px-[16px] ${
                                                    revenue?.tongMT >= 0 || !revenue?.tongMT
                                                        ? 'text-[red]'
                                                        : 'text-[#00f]'
                                                }`}
                                            >
                                                {revenue?.tongMT
                                                    ? parseFloat(revenue?.tongMT.toFixed(1)).toLocaleString()
                                                    : 0}
                                            </div>
                                        ) : (
                                            <div className="flex">
                                                {showDiem234con && (
                                                    <>
                                                        <div className="w-[80px] px-[4px] h-[40px] flex justify-center items-center py-[2px] border-[1px] border-solid border-[#fff]">
                                                            {revenue?.mt?.diem2con
                                                                ? parseFloat(
                                                                      revenue?.mt?.diem2con.toFixed(1),
                                                                  ).toLocaleString()
                                                                : 0}
                                                        </div>
                                                        <div className="w-[80px] px-[4px] h-[40px] flex justify-center items-center py-[2px] border-[1px] border-solid border-[#fff]">
                                                            {revenue?.mt?.diem34con
                                                                ? parseFloat(
                                                                      revenue?.mt?.diem34con.toFixed(1),
                                                                  ).toLocaleString()
                                                                : 0}
                                                        </div>
                                                    </>
                                                )}
                                                <div className="w-[80px] px-[4px] h-[40px] flex justify-center items-center py-[2px] border-[1px] border-solid border-[#fff]">
                                                    {revenue?.mt?.tongxac
                                                        ? parseFloat(revenue?.mt?.tongxac.toFixed(1)).toLocaleString()
                                                        : 0}
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        setSelectRevenue({
                                                            idMember: revenue.idMember._id,
                                                            resultDate: date,
                                                            domain: 'mt',
                                                            name: revenue.idMember.name,
                                                        });
                                                        setModalWin(true);
                                                    }}
                                                    className="w-[80px] px-[4px] cursor-pointer font-[480] h-[40px] text-[#2587a0] flex justify-center items-center py-[2px] border-[1px] border-solid border-[#fff]"
                                                >
                                                    {revenue?.mt?.tongtrung
                                                        ? parseFloat(revenue?.mt?.tongtrung.toFixed(1)).toLocaleString()
                                                        : 0}
                                                </div>
                                                <div
                                                    className={`w-[100px] px-[4px] ${
                                                        revenue?.mt?.revenue >= 0 || !revenue?.mt?.revenue
                                                            ? 'text-[red]'
                                                            : 'text-[#00f]'
                                                    } font-[550] h-[40px] flex justify-center items-center py-[2px] px-[6px] border-[1px] border-solid border-[#fff]`}
                                                >
                                                    {revenue?.mt?.revenue
                                                        ? parseFloat(revenue?.mt?.revenue.toFixed(1)).toLocaleString()
                                                        : 0}
                                                    <div
                                                        onClick={() => {
                                                            setModalNotice(true);
                                                            setSelectorRevenue(revenue);
                                                            setDomain('mt');
                                                        }}
                                                        className="ml-[6px] text-[red] cursor-pointer"
                                                    >
                                                        <BsCopy />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </td>

                                    <td className="border-l-[30px] border-solid border-[#fff]">
                                        {revenues.length - 1 === index ? (
                                            <div
                                                className={`flex font-[650] items-center border-[1px] border-solid border-[#fff] h-[40px] bg-[#f0f1f4] justify-end px-[16px] ${
                                                    revenue?.tongMB >= 0 || !revenue?.tongMB
                                                        ? 'text-[red]'
                                                        : 'text-[#00f]'
                                                }`}
                                            >
                                                {revenue?.tongMB
                                                    ? parseFloat(revenue?.tongMB.toFixed(1)).toLocaleString()
                                                    : 0}
                                            </div>
                                        ) : (
                                            <div className="flex">
                                                {showDiem234con && (
                                                    <>
                                                        <div className="w-[80px] px-[4px] h-[40px] flex justify-center items-center py-[2px] border-[1px] border-solid border-[#fff]">
                                                            {revenue?.mb?.diem2con
                                                                ? parseFloat(
                                                                      revenue?.mb?.diem2con.toFixed(1),
                                                                  ).toLocaleString()
                                                                : 0}
                                                        </div>
                                                        <div className="w-[80px] px-[4px] h-[40px] flex justify-center items-center py-[2px] border-[1px] border-solid border-[#fff]">
                                                            {revenue?.mb?.diem34con
                                                                ? parseFloat(
                                                                      revenue?.mb?.diem34con.toFixed(1),
                                                                  ).toLocaleString()
                                                                : 0}
                                                        </div>
                                                    </>
                                                )}
                                                <div className="w-[80px] px-[4px] h-[40px] flex justify-center items-center py-[2px] border-[1px] border-solid border-[#fff]">
                                                    {revenue?.mb?.tongxac
                                                        ? parseFloat(revenue?.mb?.tongxac.toFixed(1)).toLocaleString()
                                                        : 0}
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        setSelectRevenue({
                                                            idMember: revenue.idMember._id,
                                                            resultDate: date,
                                                            domain: 'mb',
                                                            name: revenue.idMember.name,
                                                        });
                                                        setModalWin(true);
                                                    }}
                                                    className="w-[80px] px-[4px] cursor-pointer font-[480] h-[40px] text-[#2587a0] flex justify-center items-center py-[2px] border-[1px] border-solid border-[#fff]"
                                                >
                                                    {revenue?.mb?.tongtrung
                                                        ? parseFloat(revenue?.mb?.tongtrung.toFixed(1)).toLocaleString()
                                                        : 0}
                                                </div>
                                                <div
                                                    className={`w-[100px] px-[4px] ${
                                                        revenue?.mb?.revenue >= 0 || !revenue?.mb?.revenue
                                                            ? 'text-[red]'
                                                            : 'text-[#00f]'
                                                    } font-[550] h-[40px] flex justify-center items-center py-[2px] px-[6px] border-[1px] border-solid border-[#fff]`}
                                                >
                                                    {revenue?.mb?.revenue
                                                        ? parseFloat(revenue?.mb?.revenue.toFixed(1)).toLocaleString()
                                                        : 0}
                                                    <div
                                                        onClick={() => {
                                                            setModalNotice(true);
                                                            setSelectorRevenue(revenue);
                                                            setDomain('mb');
                                                        }}
                                                        className="ml-[6px] text-[red] cursor-pointer"
                                                    >
                                                        <BsCopy />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </td>

                                    <td className="border-l-[30px] border-solid border-[#fff]">
                                        {revenues.length - 1 === index ? (
                                            <div
                                                className={`flex font-[650] items-center border-[1px] border-solid border-[#fff] h-[40px] bg-[#f0f1f4] justify-center px-[16px] ${
                                                    revenue?.tongAll >= 0 || !revenue?.tongAll
                                                        ? 'text-[red]'
                                                        : 'text-[#00f]'
                                                }`}
                                            >
                                                {revenue?.tongAll
                                                    ? parseFloat(revenue?.tongAll.toFixed(1)).toLocaleString()
                                                    : 0}
                                            </div>
                                        ) : (
                                            <div
                                                className={`w-[100px] ${
                                                    revenue?.idMember?.total >= 0 || !revenue?.idMember?.total
                                                        ? 'text-[red]'
                                                        : 'text-[#00f]'
                                                } px-[4px] font-[600] h-[40px] flex justify-center items-center py-[2px] border-[1px] border-solid border-[#fff]`}
                                            >
                                                {revenue?.idMember?.total
                                                    ? parseFloat(revenue?.idMember?.total?.toFixed(1)).toLocaleString()
                                                    : 0}
                                                <div
                                                    onClick={() => {
                                                        setModalNotice(true);
                                                        setSelectorRevenue(revenue);
                                                        setDomain('all');
                                                    }}
                                                    className="ml-[6px] text-[red] cursor-pointer"
                                                >
                                                    <BsCopy />
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {modalNotice && (
                    <ModalNotice selectorRevenue={selectorRevenue} domain={domain} setModalNotice={setModalNotice} />
                )}

                {modalWin && <ModalWin setModalWin={setModalWin} selectRevenue={selectRevenue} />}
            </div>
        </div>
    );
}

export default Revenue;
