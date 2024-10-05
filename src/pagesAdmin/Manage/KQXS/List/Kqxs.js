import { useEffect, useState } from 'react';
import { Bs1Circle, BsStarFill, BsPlusSquare, BsArrowRepeat } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import config from '~/config';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TableKqxsMN from './component/TableKqxsMN';
import TableKqxsMT from './component/TableKqxsMT';
import TableKqxsMB from './component/TableKqxsMB';
import parseDate from '~/utils/parseDate';
import { useDispatch, useSelector } from 'react-redux';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';
import { noticeAdminSelector } from '~/redux/selectors';

let setTimeoutTmp;

function Kqxs() {
    const [kqxsMB, setKqxsMB] = useState([]);
    const [kqxsMN, setKqxsMN] = useState([]);
    const [kqxsMT, setKqxsMT] = useState([]);
    const [star, setStar] = useState(false);
    const [loading, setLoading] = useState(false);

    const [date, setDate] = useState(new Date());
    const [day, setDay] = useState(date.getDay() + 1);

    const [urltp, setUrltp] = useState('');
    const [urldt, setUrldt] = useState('');
    const [urlcm, setUrlcm] = useState('');
    const [urlbr, setUrlbr] = useState('');
    const [urlvt, setUrlvt] = useState('');
    const [urlbi, setUrlbi] = useState('');
    const [urldn, setUrldn] = useState('');
    const [urlct, setUrlct] = useState('');
    const [urlst, setUrlst] = useState('');
    const [urltn, setUrltn] = useState('');
    const [urlag, setUrlag] = useState('');
    const [urlbt, setUrlbt] = useState('');
    const [urlbu, setUrlbu] = useState('');
    const [urlvl, setUrlvl] = useState('');
    const [urltv, setUrltv] = useState('');
    const [urlla, setUrlla] = useState('');
    const [urlbp, setUrlbp] = useState('');
    const [urlhg, setUrlhg] = useState('');
    const [urltg, setUrltg] = useState('');
    const [urlkg, setUrlkg] = useState('');
    const [urllt, setUrllt] = useState('');
    const [urlpy, setUrlpy] = useState('');
    const [urlhu, setUrlhu] = useState('');
    const [urldl, setUrldl] = useState('');
    const [urlqn, setUrlqn] = useState('');
    const [urldg, setUrldg] = useState('');
    const [urlkh, setUrlkh] = useState('');
    const [urlqb, setUrlqb] = useState('');
    const [urlbd, setUrlbd] = useState('');
    const [urlqt, setUrlqt] = useState('');
    const [urlgl, setUrlgl] = useState('');
    const [urlnt, setUrlnt] = useState('');
    const [urlqg, setUrlqg] = useState('');
    const [urldo, setUrldo] = useState('');
    const [urlkt, setUrlkt] = useState('');
    const [urlmb, setUrlmb] = useState('');

    useEffect(() => {
        handleFindOnlyAdminEdit();
    }, []);

    const handleFindOnlyAdminEdit = async () => {
        const resOnlyAdminEdit = await axios.post(`${process.env.REACT_APP_API_URL}/v1/onlyAdminEdit/find`);
        const rs = resOnlyAdminEdit.data.onlyAdminEdit[0];

        if (resOnlyAdminEdit.data.onlyAdminEdit.length > 0 && resOnlyAdminEdit.data.success) {
            setUrltp(rs?.urltp);
            setUrldt(rs?.urldt);
            setUrlcm(rs?.urlcm);
            setUrlbr(rs?.urlbr);
            setUrlvt(rs?.urlvt);
            setUrlbi(rs?.urlbi);
            setUrldn(rs?.urldn);
            setUrlct(rs?.urlct);
            setUrlst(rs?.urlst);
            setUrltn(rs?.urltn);
            setUrlag(rs?.urlag);
            setUrlbt(rs?.urlbt);
            setUrlbu(rs?.urlbu);
            setUrlvl(rs?.urlvl);
            setUrltv(rs?.urltv);
            setUrlla(rs?.urlla);
            setUrlbp(rs?.urlbp);
            setUrlhg(rs?.urlhg);
            setUrltg(rs?.urltg);
            setUrlkg(rs?.urlkg);
            setUrllt(rs?.urllt);
            setUrlpy(rs?.urlpy);
            setUrlhu(rs?.urlhu);
            setUrldl(rs?.urldl);
            setUrlqn(rs?.urlqn);
            setUrldg(rs?.urldg);
            setUrlkh(rs?.urlkh);
            setUrlqb(rs?.urlqb);
            setUrlbd(rs?.urlbd);
            setUrlqt(rs?.urlqt);
            setUrlgl(rs?.urlgl);
            setUrlnt(rs?.urlnt);
            setUrlqg(rs?.urlqg);
            setUrldo(rs?.urldo);
            setUrlkt(rs?.urlkt);
            setUrlmb(rs?.urlmb);
        }
    };

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

    const notice = useSelector(noticeAdminSelector);
    useEffect(() => {
        if (!notice.state) {
            clearTimeout(setTimeoutTmp);
        }
    }, [notice.state]);

    const dispatch = useDispatch();

    const handleFindKQXS = async () => {
        const fetchLotteryResults = async () => {
            setLoading(true);
            dispatch(noticeAdminSlice.actions.processingNotice('Đang lấy KQXS'));

            try {
                const day = date.getDate();
                const month = date.getMonth();
                const year = date.getFullYear();
                const dayOfWeek = date.getDay() + 1;

                if (dayOfWeek === 2) {
                    await findKqxs(urltp, day, month, year, 'mn', 'tp');
                    await findKqxs(urldt, day, month, year, 'mn', 'dt');
                    await findKqxs(urlcm, day, month, year, 'mn', 'cm');

                    await findKqxs(urlpy, day, month, year, 'mt', 'py');
                    await findKqxs(urlhu, day, month, year, 'mt', 'hu');
                } else if (dayOfWeek === 3) {
                    await findKqxs(urlbr, day, month, year, 'mn', 'br');
                    await findKqxs(urlvt, day, month, year, 'mn', 'vt');
                    await findKqxs(urlbi, day, month, year, 'mn', 'bi');

                    await findKqxs(urldl, day, month, year, 'mt', 'dl');
                    await findKqxs(urlqn, day, month, year, 'mt', 'qn');
                } else if (dayOfWeek === 4) {
                    await findKqxs(urldn, day, month, year, 'mn', 'dn');
                    await findKqxs(urlct, day, month, year, 'mn', 'ct');
                    await findKqxs(urlst, day, month, year, 'mn', 'st');

                    await findKqxs(urldg, day, month, year, 'mt', 'dg');
                    await findKqxs(urlkh, day, month, year, 'mt', 'kh');
                } else if (dayOfWeek === 5) {
                    await findKqxs(urltn, day, month, year, 'mn', 'tn');
                    await findKqxs(urlag, day, month, year, 'mn', 'ag');
                    await findKqxs(urlbt, day, month, year, 'mn', 'bt');

                    await findKqxs(urlqb, day, month, year, 'mt', 'qb');
                    await findKqxs(urlbd, day, month, year, 'mt', 'bd');
                    await findKqxs(urlqt, day, month, year, 'mt', 'qt');
                } else if (dayOfWeek === 6) {
                    await findKqxs(urlbu, day, month, year, 'mn', 'bu');
                    await findKqxs(urlvl, day, month, year, 'mn', 'vl');
                    await findKqxs(urltv, day, month, year, 'mn', 'tv');

                    await findKqxs(urlgl, day, month, year, 'mt', 'gl');
                    await findKqxs(urlnt, day, month, year, 'mt', 'nt');
                } else if (dayOfWeek === 7) {
                    await findKqxs(urltp, day, month, year, 'mn', 'tp');
                    await findKqxs(urlla, day, month, year, 'mn', 'la');
                    await findKqxs(urlbp, day, month, year, 'mn', 'bp');
                    await findKqxs(urlhg, day, month, year, 'mn', 'hg');

                    await findKqxs(urldg, day, month, year, 'mt', 'dg');
                    await findKqxs(urlqg, day, month, year, 'mt', 'qg');
                    await findKqxs(urldo, day, month, year, 'mt', 'do');
                } else if (dayOfWeek === 1) {
                    await findKqxs(urltg, day, month, year, 'mn', 'tg');
                    await findKqxs(urlkg, day, month, year, 'mn', 'kg');
                    await findKqxs(urllt, day, month, year, 'mn', 'lt');

                    await findKqxs(urlkh, day, month, year, 'mt', 'kh');
                    await findKqxs(urlkt, day, month, year, 'mt', 'kt');
                    await findKqxs(urlhu, day, month, year, 'mt', 'hu');
                }

                await findKqxs(urlmb, day, month, year, 'mb', 'mb');
            } catch (error) {
                console.error('Lỗi khi lấy kết quả xổ số:', error);
            }
        };

        const findKqxs = async (url, day, month, year, domain, province) => {
            const response = await axios.get(`${url}`);
            const results = response.data;

            let stt = 0;
            results.t.issueList.map((item, index) => {
                const nowKQXS = parseDate(item.turnNum);
                const dayKQXS = nowKQXS.getDate();
                const monthKQXS = nowKQXS.getMonth();
                const yearKQXS = nowKQXS.getFullYear();

                if (results && day === dayKQXS && month === monthKQXS && year === yearKQXS) {
                    stt = index;
                }
            });

            const nowKQXS = parseDate(results.t.issueList[stt].turnNum);
            const dayKQXS = nowKQXS.getDate();
            const monthKQXS = nowKQXS.getMonth();
            const yearKQXS = nowKQXS.getFullYear();

            if (results && day === dayKQXS && month === monthKQXS && year === yearKQXS) {
                await addKqxs(results, domain, province, stt);
            } else {
                setLoading(false);

                dispatch(noticeAdminSlice.actions.errorNotice('Chưa có KQXS'));
                handleFindKqxs();

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [5000]);
            }
        };

        const addKqxs = async (results, domain, province, stt) => {
            try {
                const kqxs = await axios.post(`${process.env.REACT_APP_API_URL}/v1/kqxs/find`, {
                    resultDate: results.t.issueList[stt].turnNum,
                    province: province,
                });

                if (kqxs.data.kqxs.length === 0) {
                    let data = JSON.parse(results.t.issueList[stt].detail);

                    if (domain !== 'mb') {
                        data = data.reverse();
                    }

                    data = data.map((item) => item.split(','));

                    let rs = data.reduce((acc, curr) => acc.concat(curr), []);

                    if (domain === 'mb') {
                        const firstElement = rs.shift();
                        rs.push(firstElement);
                    }

                    const kqxsObj = {
                        domain: domain,
                        province: province,
                        resultDate: results.t.issueList[stt].turnNum,
                        result: rs,
                    };

                    const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/kqxs/create`, kqxsObj);

                    if (res.data.success) {
                        setLoading(false);

                        dispatch(noticeAdminSlice.actions.successNotice('Lấy KQXS thành công'));
                        handleFindKqxs();

                        setTimeoutTmp = setTimeout(() => {
                            dispatch(noticeAdminSlice.actions.hiddenNotice());
                        }, [5000]);
                    }

                    console.log('lấy kết quả xổ số mn success');
                } else {
                    setLoading(false);

                    dispatch(noticeAdminSlice.actions.successNotice('Đã có KQXS'));
                    handleFindKqxs();

                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [5000]);
                }
            } catch (error) {
                console.error('Lỗi khi lấy kết quả xổ số:', error);
            }
        };

        await fetchLotteryResults();
    };

    return (
        <div className="pb-[30px]">
            <div className="py-[14px] px-[30px] bg-[#F7F9FA] flex items-center justify-between">
                <div className="flex items-center gap-[20px]">
                    <Link
                        to={config.routes.adminKQXS}
                        className="text-[16px] h-[30px] text-[#858080] w-[30px] box-shadow-admin-path rounded-[4px] bg-[#fff] flex items-center justify-center"
                    >
                        <Bs1Circle />
                    </Link>
                    <h1 className="text-[12px] uppercase font-[650] text-[#5a5757]">Kết quả xổ số</h1>
                </div>
                <div className="flex gap-[16px]">
                    <button>
                        <Link
                            className="text-[12px] hover:opacity-[0.8] flex items-center font-[600] bg-[#0098EF] text-[#fff] px-[10px] py-[6px] rounded-[4px] cursor-pointer shadow-lg shadow-indigo-500/10"
                            to={config.routes.adminKQXSCreate}
                        >
                            <BsPlusSquare className="mr-[6px] text-[14px]" />
                            Url api kqxs
                        </Link>
                    </button>
                    <button
                        onClick={() => setStar((prev) => !prev)}
                        className={`${
                            star ? 'text-[#f4fe3e]' : 'text-[#fff]'
                        } text-[12px] bg-[#23272B] px-[10px] py-[6px] rounded-[4px] cursor-pointer shadow-lg shadow-indigo-500/10`}
                    >
                        <BsStarFill />
                    </button>
                </div>
            </div>

            <div className="bg-[var(--color-white)] mx-[20px] px-[16px] mt-[12px] py-[14px] pb-[28px] rounded-[6px]">
                <div className="w-[100%] flex gap-[30px] items-center">
                    <DatePicker
                        wrapperClassName="w-[100%] lg:w-auto"
                        maxDate={new Date()}
                        selected={date}
                        dateFormat="dd-MM-yyyy"
                        onChange={handleDateChange}
                        className="border-[1px] w-[100%] border-solid px-[6px] py-[4px] outline-none rounded-[4px] text-[12px] border-[#ccc]"
                    />

                    <button
                        disabled={loading}
                        onClick={() => handleFindKQXS()}
                        className={`${
                            loading ? 'opacity-[.7] hover:opacity-[.7]' : 'hover:opacity-[.9]'
                        } uppercase font-[620] text-[12px] w-[150px] h-[28px] flex justify-center items-center bg-[#2574ab] rounded-[4px] text-[#fff] active:opacity-[.7]`}
                    >
                        {loading ? (
                            <div className="text-[20px] animate-loading">
                                <BsArrowRepeat />
                            </div>
                        ) : (
                            'Lấy kết quả xổ số'
                        )}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px] lg:gap-[10px] mt-[30px]">
                    <div className="text-center">
                        <h2 className="text-[16px] uppercase font-[650]">miền nam</h2>
                        {kqxsMN && <TableKqxsMN kqxsMN={kqxsMN} setKqxsMN={setKqxsMN} day={day} date={date} />}
                    </div>
                    <div className="text-center">
                        <h2 className="text-[16px] uppercase font-[650]">miền trung</h2>
                        {kqxsMT && <TableKqxsMT kqxsMT={kqxsMT} setKqxsMT={setKqxsMT} day={day} date={date} />}
                    </div>
                    <div className="text-center">
                        <h2 className="text-[16px] uppercase font-[650]">miền bắc</h2>
                        {kqxsMB && <TableKqxsMB kqxsMB={kqxsMB} setKqxsMB={setKqxsMB} date={date} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Kqxs;
