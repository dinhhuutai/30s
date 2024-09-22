import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TableKqxsMN from './component/TableKqxsMN';
import TableKqxsMT from './component/TableKqxsMT';
import TableKqxsMB from './component/TableKqxsMB';
import HeaderPage from '../component/HeaderPage';

function Dashboard() {
    const [kqxsMB, setKqxsMB] = useState([]);
    const [kqxsMN, setKqxsMN] = useState([]);
    const [kqxsMT, setKqxsMT] = useState([]);

    const [date, setDate] = useState(new Date());
    const [day, setDay] = useState(date.getDay() + 1);

    const handleDateChange = (e) => {
        setDate(e);
        setDay(e.getDay() + 1);
    };

    useEffect(() => {
        handleFindKqxs();
    }, [date]);

    const handleFindKqxs = async () => {
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

    return (
        <div>
            <HeaderPage pageCurr={'Kết Quả Xổ Số'} />
            <div className="bg-[var(--color-white)] px-[16px] mt-[12px] py-[14px] pb-[28px] rounded-[6px]">
                <div>
                    <DatePicker
                        maxDate={new Date()}
                        selected={date}
                        dateFormat="dd-MM-yyyy"
                        onChange={handleDateChange}
                        className="border-[1px] border-solid px-[6px] py-[4px] outline-none rounded-[4px] text-[12px] border-[#ccc]"
                    />
                </div>
    
                <div className="grid grid-cols-3 gap-[10px] mt-[30px]">
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
