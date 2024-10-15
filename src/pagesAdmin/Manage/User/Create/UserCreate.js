import { useEffect, useRef, useState } from 'react';
import { BsPerson, BsStarFill, BsArrowRepeat } from 'react-icons/bs';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';
import { noticeAdminSelector } from '~/redux/selectors';
import { Link } from 'react-router-dom';
import config from '~/config';

let setTimeoutTmp;

function UserCreate() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);
    const [star, setStar] = useState(false);
    const [loadingCreate, setLoadingCreate] = useState(false);


    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const refName = useRef();

    const notice = useSelector(noticeAdminSelector);

    useEffect(() => {
        if (!notice.state) {
            clearTimeout(setTimeoutTmp);
        }
    }, [notice.state]);

    const dispatch = useDispatch();

    const handleCreateArtist = async () => {
        try {
            if (!name) {
                dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng nhập tên user'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                return;
            } else if (!phone) {
                dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng nhập phone user'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                return;
            } else if (!username) {
                dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng nhập username user'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                return;
            } else if (!password) {
                dispatch(noticeAdminSlice.actions.errorNotice('Vui lòng nhập password user'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                return;
            }

            dispatch(noticeAdminSlice.actions.processingNotice('Đang thêm user'));
            setLoadingCreate(true);


            const formData = {
                name,
                phone,
                username,
                password,
                isAdmin,
            };

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/user/create`, formData);

            if (res.data.success) {
                dispatch(noticeAdminSlice.actions.successNotice('Thêm user thành công'));

                setName('');
                setPhone('');
                setUsername('');
                setPassword('');
                setIsAdmin(false);

                refName.current.focus();

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);

                setTimeout(() => {
                    setLoadingCreate(false);
                }, 1000);
            }
        } catch (error) {
            setTimeout(() => {
                setLoadingCreate(false);
            }, 1000);
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
            <div className="py-[14px] px-[30px] bg-[#F7F9FA] flex items-center justify-between">
                <div className="flex items-center gap-[20px]">
                    <Link
                        to={config.routes.adminUser}
                        className="text-[16px] h-[30px] text-[#858080] w-[30px] box-shadow-admin-path rounded-[4px] bg-[#fff] flex items-center justify-center"
                    >
                        <BsPerson />
                    </Link>
                    <h1 className="text-[12px] uppercase font-[650] text-[#5a5757]">User Create</h1>
                </div>
                <button
                    onClick={() => setStar((prev) => !prev)}
                    className={`${
                        star ? 'text-[#f4fe3e]' : 'text-[#fff]'
                    } text-[12px] bg-[#23272B] px-[10px] py-[6px] rounded-[4px] cursor-pointer shadow-lg shadow-indigo-500/10`}
                >
                    <BsStarFill />
                </button>
            </div>

            <div className="m-[20px] p-[16px] bg-[#fff] rounded-[4px] box-shadow-admin-path">
                <div className="flex gap-[20px]">
                    <div className="flex flex-col gap-[4px] w-[50%]">
                        <div className="flex flex-col gap-[4px]">
                            <label>
                                Name User: <span className="text-[red] text-[12px] font-[700]">*</span>
                            </label>
                            <input
                                ref={refName}
                                value={name}
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Name User"
                            />
                        </div>

                        <div className="flex flex-col gap-[4px] mt-[14px]">
                            <label>
                                Phone User: <span className="text-[red] text-[12px] font-[700]">*</span>
                            </label>
                            <input
                                value={phone}
                                name="phone"
                                onChange={(e) => setPhone(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Phone User"
                            />
                        </div>

                        <div className="flex flex-col gap-[4px] mt-[14px]">
                            <label>
                                Is Admin: <span className="text-[red] text-[12px] font-[700]">*</span>
                            </label>
                            <div className="flex justify-around items-center mt-[6px]">
                                <div className="flex items-center gap-[6px]">
                                    <input onClick={() => setIsAdmin((prev) => !prev)} type="radio" checked={isAdmin} />
                                    <label>Yes</label>
                                </div>
                                <div className="flex items-center gap-[6px]">
                                    <input
                                        onClick={() => setIsAdmin((prev) => !prev)}
                                        type="radio"
                                        checked={!isAdmin}
                                    />
                                    <label>No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[4px] w-[50%]">
                        <div className="flex flex-col gap-[4px]">
                            <label>
                                Username: <span className="text-[red] text-[12px] font-[700]">*</span>
                            </label>
                            <input
                                value={username}
                                name="name"
                                onChange={(e) => setUsername(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Username"
                            />
                        </div>

                        <div className="flex flex-col gap-[4px] mt-[14px]">
                            <label>
                                Password: <span className="text-[red] text-[12px] font-[700]">*</span>
                            </label>
                            <input
                                value={password}
                                name="name"
                                onChange={(e) => setPassword(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-[30px]">
                    <button
                        disabled={loadingCreate || notice.state}
                        onClick={handleCreateArtist}
                        className={`${
                            loadingCreate || notice.state ? 'opacity-[.7] hover:opacity-[.7]' : 'hover:opacity-[.9]'
                        } w-[120px] h-[30px] flex justify-center items-center bg-[#259d23] rounded-[4px] text-[#fff] active:opacity-[.7]`}
                    >
                        {loadingCreate || notice.state ? (
                            <div className="text-[20px] animate-loading">
                                <BsArrowRepeat />
                            </div>
                        ) : (
                            'Create User'
                        )}
                    </button>
                </div>
                <div className="mt-[20px]">
                    <p className="text-[10px] text-[#ac4646] font-[600]">(*): Trường bắt buộc</p>
                </div>
            </div>
        </div>
    );
}

export default UserCreate;
