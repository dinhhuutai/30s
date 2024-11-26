import axios from 'axios';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TableKqxsMN from './component/TableKqxsMN';
import TableKqxsMT from './component/TableKqxsMT';
import TableKqxsMB from './component/TableKqxsMB';
import HeaderPage from '../component/HeaderPage';
import { BsArrowClockwise } from 'react-icons/bs';
import { Helmet } from 'react-helmet';

function Dashboard() {
    const [kqxsMB, setKqxsMB] = useState([]);
    const [kqxsMN, setKqxsMN] = useState([]);
    const [kqxsMT, setKqxsMT] = useState([]);

    const [date, setDate] = useState(new Date());
    const [day, setDay] = useState(date.getDay() + 1);

    const [loading, setLoading] = useState(true);

    const handleDateChange = (e) => {
        setDate(e);
        setDay(e.getDay() + 1);
    };

    useEffect(() => {
        handleFindKqxs();
        startInterval();
    }, [date]);

    const handleFindKqxs = async () => {
        setLoading(true);
        const formattedDate = moment(date).format('DD/MM/YYYY');
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/kqxs/findKqxsByDate`, {
            date: formattedDate,
        });

        console.log(res.data);

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

            const mnMain = [];
            let mangTmp0 = [];
            let mangTmp1 = [];
            let mangTmp2 = [];
            let mangTmp3 = [];
            for (let i = 0; i < 18; i++) {
                let obj;

                mangTmp0.push(mn[0]?.result[i]);
                mangTmp1.push(mn[1]?.result[i]);
                mangTmp2.push(mn[2]?.result[i]);
                mangTmp3.push(mn[3]?.result[i]);

                if (
                    i === 0 ||
                    i === 1 ||
                    i === 4 ||
                    i === 5 ||
                    i === 12 ||
                    i === 14 ||
                    i === 15 ||
                    i === 16 ||
                    i === 17
                ) {
                    if (mn.length === 3) {
                        obj = {
                            [mn[0]?.province]: mangTmp0,
                            [mn[1]?.province]: mangTmp1,
                            [mn[2]?.province]: mangTmp2,
                        };
                    } else {
                        obj = {
                            [mn[0]?.province]: mangTmp0,
                            [mn[1]?.province]: mangTmp1,
                            [mn[2]?.province]: mangTmp2,
                            [mn[3]?.province]: mangTmp3,
                        };
                    }

                    mangTmp0 = [];
                    mangTmp1 = [];
                    mangTmp2 = [];
                    mangTmp3 = [];

                    mnMain.push(obj);
                }
            }

            const mtMain = [];
            let mangTmp0mt = [];
            let mangTmp1mt = [];
            let mangTmp2mt = [];
            for (let i = 0; i < 18; i++) {
                let obj;

                mangTmp0mt.push(mt[0]?.result[i]);
                mangTmp1mt.push(mt[1]?.result[i]);
                mangTmp2mt.push(mt[2]?.result[i]);

                if (
                    i === 0 ||
                    i === 1 ||
                    i === 4 ||
                    i === 5 ||
                    i === 12 ||
                    i === 14 ||
                    i === 15 ||
                    i === 16 ||
                    i === 17
                ) {
                    if (mt.length === 2) {
                        obj = {
                            [mt[0]?.province]: mangTmp0mt,
                            [mt[1]?.province]: mangTmp1mt,
                        };
                    } else {
                        obj = {
                            [mt[0]?.province]: mangTmp0mt,
                            [mt[1]?.province]: mangTmp1mt,
                            [mt[2]?.province]: mangTmp2mt,
                        };
                    }

                    mangTmp0mt = [];
                    mangTmp1mt = [];
                    mangTmp2mt = [];

                    mtMain.push(obj);
                }
            }

            const mbMain = [];
            let mangTmpmb = [];
            for (let i = 0; i < 27; i++) {
                mangTmpmb.push(mb[0]?.result[i]);

                if (i === 0 || i === 2 || i === 8 || i === 12 || i === 18 || i === 21 || i === 25 || i === 26) {
                    mbMain.push(mangTmpmb);

                    mangTmpmb = [];
                }
            }

            let lastElement = mbMain.pop();
            mbMain.unshift(lastElement);

            setKqxsMB(mbMain);
            setKqxsMT(mtMain);
            setKqxsMN(mnMain);
            setLoading(false);
        }
    };

    let intervalId;

    async function updateKQXS() {
        const now = new Date();
        const dateNow = now.getDate();
        const hour = now.getHours();
        const minutes = now.getMinutes();

        if (hour === 18 && minutes >= 40) {
            console.log('Đã quá 19h, dừng cập nhật.');
            clearInterval(intervalId); // Dừng kiểm tra sau 18h40
            return;
        }

        await handleFindKqxs2();
        console.log('cập nhật.');
    }

    function startInterval() {
        const now = new Date();
        const hour = now.getHours();
        const minutes = now.getMinutes();

        if (hour >= 16 && (hour < 18 || (hour === 18 && minutes <= 40))) {
            // Bắt đầu kiểm tra mỗi phút
            intervalId = setInterval(updateKQXS, 10000);
        } else {
            console.log('Không phải thời gian cập nhật.');
        }
    }

    const handleFindKqxs2 = async () => {
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

            const mnMain = [];
            let mangTmp0 = [];
            let mangTmp1 = [];
            let mangTmp2 = [];
            let mangTmp3 = [];
            for (let i = 0; i < 18; i++) {
                let obj;

                mangTmp0.push(mn[0]?.result[i]);
                mangTmp1.push(mn[1]?.result[i]);
                mangTmp2.push(mn[2]?.result[i]);
                mangTmp3.push(mn[3]?.result[i]);

                if (
                    i === 0 ||
                    i === 1 ||
                    i === 4 ||
                    i === 5 ||
                    i === 12 ||
                    i === 14 ||
                    i === 15 ||
                    i === 16 ||
                    i === 17
                ) {
                    if (mn.length === 3) {
                        obj = {
                            [mn[0]?.province]: mangTmp0,
                            [mn[1]?.province]: mangTmp1,
                            [mn[2]?.province]: mangTmp2,
                        };
                    } else {
                        obj = {
                            [mn[0]?.province]: mangTmp0,
                            [mn[1]?.province]: mangTmp1,
                            [mn[2]?.province]: mangTmp2,
                            [mn[3]?.province]: mangTmp3,
                        };
                    }

                    mangTmp0 = [];
                    mangTmp1 = [];
                    mangTmp2 = [];
                    mangTmp3 = [];

                    mnMain.push(obj);
                }
            }

            const mtMain = [];
            let mangTmp0mt = [];
            let mangTmp1mt = [];
            let mangTmp2mt = [];
            for (let i = 0; i < 18; i++) {
                let obj;

                mangTmp0mt.push(mt[0]?.result[i]);
                mangTmp1mt.push(mt[1]?.result[i]);
                mangTmp2mt.push(mt[2]?.result[i]);

                if (
                    i === 0 ||
                    i === 1 ||
                    i === 4 ||
                    i === 5 ||
                    i === 12 ||
                    i === 14 ||
                    i === 15 ||
                    i === 16 ||
                    i === 17
                ) {
                    if (mt.length === 2) {
                        obj = {
                            [mt[0]?.province]: mangTmp0mt,
                            [mt[1]?.province]: mangTmp1mt,
                        };
                    } else {
                        obj = {
                            [mt[0]?.province]: mangTmp0mt,
                            [mt[1]?.province]: mangTmp1mt,
                            [mt[2]?.province]: mangTmp2mt,
                        };
                    }

                    mangTmp0mt = [];
                    mangTmp1mt = [];
                    mangTmp2mt = [];

                    mtMain.push(obj);
                }
            }

            const mbMain = [];
            let mangTmpmb = [];
            for (let i = 0; i < 27; i++) {
                mangTmpmb.push(mb[0]?.result[i]);

                if (i === 0 || i === 2 || i === 8 || i === 12 || i === 18 || i === 21 || i === 25 || i === 26) {
                    mbMain.push(mangTmpmb);

                    mangTmpmb = [];
                }
            }

            let lastElement = mbMain.pop();
            mbMain.unshift(lastElement);

            setKqxsMB(mbMain);
            setKqxsMT(mtMain);
            setKqxsMN(mnMain);
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    return (
        <div>
            <Helmet>
                <title>Kết Quả Xổ Số - 10s</title> {/* Cập nhật tiêu đề trang */}
                <meta name="description" content="Đây là Website 10s ứng dụng tính tiền số." /> {/* Mô tả cho SEO */}
                <meta property="og:title" content="Đây là Website 10s ứng dụng tính tiền số." />{' '}
                {/* Open Graph title */}
                <meta property="og:description" content="Trang này giúp tính tiền số tự động nhanh gọn lẹ." />
                {/* Open Graph description */}
                <meta property="og:image" content="https://example.com/og-image.jpg" /> {/* Open Graph image */}
                <meta property="og:url" content="https://example.com/my-page" /> {/* URL của trang */}
                <link rel="icon" href="" type="image/x-icon" />
            </Helmet>
            {loading ? (
                <div className="left-0 right-0 z-[999999] fixed top-0">
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
            <HeaderPage pageCurr={'Kết Quả Xổ Số'} />
            <div className="bg-[var(--color-white)] px-[16px] mt-[12px] py-[14px] pb-[28px] rounded-[6px]">
                <div className="w-[100%]">
                    <DatePicker
                        wrapperClassName="w-[100%] lg:w-auto"
                        maxDate={new Date()}
                        selected={date}
                        dateFormat="dd-MM-yyyy"
                        onChange={handleDateChange}
                        className="border-[1px] w-[100%] border-solid px-[6px] py-[4px] outline-none rounded-[4px] text-[12px] border-[#ccc]"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px] lg:gap-[10px] mt-[30px]">
                    <div className="text-center">
                        <h2 className="text-[16px] uppercase font-[650]">miền nam</h2>
                        {kqxsMN && <TableKqxsMN kqxsMN={kqxsMN} day={day} />}
                    </div>
                    <div className="text-center">
                        <h2 className="text-[16px] uppercase font-[650]">miền trung</h2>
                        {kqxsMT && <TableKqxsMT kqxsMT={kqxsMT} day={day} />}
                    </div>
                    <div className="text-center">
                        <h2 className="text-[16px] uppercase font-[650]">miền bắc</h2>
                        {kqxsMB && <TableKqxsMB kqxsMB={kqxsMB} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
