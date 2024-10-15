import { useEffect, useState } from 'react';
import { BsPerson, BsStarFill, BsPlusSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import config from '~/config';

import TopTableAdmin from '~/components/TopTableAdmin';
import Table from './Table';
import BottomTableAdmin from '~/components/BottomTableAdmin';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';
import { noticeAdminSelector } from '~/redux/selectors';

let setTimeoutTmp;

function User() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);
    const [star, setStar] = useState(false);

    // data table
    const [data, setData] = useState({
        user: [],
        totalUser: 0,
        totalAddToday: 0,
    });

    const [arrangeName, setArrangeName] = useState(true);
    const [arrangeStartDate, setArrangeStartDate] = useState(false);

    const [selectArrange, setSelectArrange] = useState('name'); // name  |  startDate  |  lastUpdateDate

    // share top start
    const [show, setShow] = useState(5);
    const [search, setSearch] = useState('');

    const notice = useSelector(noticeAdminSelector);

    useEffect(() => {
        if (!notice.state) {
            clearTimeout(setTimeoutTmp);
        }
    }, [notice.state]);

    const handleSearch = () => {
        handleGetData();
        setCurrentPage(0);
    };
    // share top end

    // share bottom start
    const [currentPage, setCurrentPage] = useState(0);
    // share bottom end

    useEffect(() => {
        // lấy data
        handleGetData();
    }, [arrangeName, arrangeStartDate, currentPage, show, notice.state]);

    const handleGetData = async () => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/v1/user/find?limit=${show}&skip=${
                    show * currentPage
                }&search=${search}&${
                    selectArrange === 'name'
                        ? `sortName=${arrangeName ? 1 : -1}`
                        : selectArrange === 'startDate'
                        ? `sortCreateDate=${arrangeStartDate ? 1 : -1}`
                        : ''
                }`,
            );

            if (res.data.success) {
                setData({
                    ...data,
                    user: res.data.user,
                    totalUser: res.data.totalUser,
                    totalAddToday: res.data.totalAddToday,
                });
            }
        } catch (error) {}
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    return (
        <div className="pb-[10px]">
            <div className="py-[14px] px-[30px] bg-[#F7F9FA] flex items-center justify-between">
                <div className="flex items-center gap-[20px]">
                    <Link
                        to={config.routes.adminUser}
                        className="text-[16px] h-[30px] text-[#858080] w-[30px] box-shadow-admin-path rounded-[4px] bg-[#fff] flex items-center justify-center"
                    >
                        <BsPerson />
                    </Link>
                    <h1 className="text-[12px] uppercase font-[650] text-[#5a5757]">User List</h1>
                </div>
                <div className="flex gap-[16px]">
                    <button>
                        <Link
                            className="text-[12px] hover:opacity-[0.8] flex items-center font-[600] bg-[#0098EF] text-[#fff] px-[10px] py-[6px] rounded-[4px] cursor-pointer shadow-lg shadow-indigo-500/10"
                            to={config.routes.adminUserCreate}
                        >
                            <BsPlusSquare className="mr-[6px] text-[14px]" />
                            Create User
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

            <div className="m-[20px] p-[16px] bg-[#fff] rounded-[4px] box-shadow-admin-path">
                <TopTableAdmin
                    handleSearch={handleSearch}
                    setShow={setShow}
                    show={show}
                    search={search}
                    setSearch={setSearch}
                    totalAddToday={data.totalAddToday}
                    setCurrentPage={setCurrentPage}
                />
                <Table
                    data={data}
                    users={data.user}
                    setData={setData}
                    show={show}
                    currentPage={currentPage}
                    setArrangeName={setArrangeName}
                    setArrangeStartDate={setArrangeStartDate}
                    setSelectArrange={setSelectArrange}
                    arrangeName={arrangeName}
                    arrangeStartDate={arrangeStartDate}
                    selectArrange={selectArrange}
                    setCurrentPage={setCurrentPage}
                />
                <BottomTableAdmin
                    setCurrentPage={setCurrentPage}
                    show={show}
                    currentPage={currentPage}
                    totalItems={data.totalUser}
                />
            </div>
        </div>
    );
}

export default User;
