import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsArrowRepeat } from 'react-icons/bs';
import { BsFillPersonFill, BsLockFill, BsEyeSlash, BsEye } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '~/redux/selectors';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';

let setTimeoutTmp;

function ModalChangeMember({ setModalChangeMember, handleSearchMember, setBtnChangeMember }) {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [unvisiblePassword, setUnvisiblePassword] = useState(true);

    const [noticeError, setNoticeError] = useState({
        status: false,
        text: '',
    });

    const tmp = useSelector(userSelector);
    const [user, setUser] = useState(tmp);
    useEffect(() => {
        setUser(tmp);
    }, [tmp]);

    const dispatch = useDispatch();
    const handleChange = async () => {
        setLoading(true);
        dispatch(noticeAdminSlice.actions.processingNotice('Đang lấy danh bạ'));
        try {
            if (!username) {
                setNoticeError({
                    status: true,
                    text: 'Bạn chưa nhập tài khoản',
                });
            } else if (!password) {
                setNoticeError({
                    status: true,
                    text: 'Bạn chưa nhập mật khẩu',
                });
            } else {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/member/changeMember`, {
                    idUser: user.login.currentUser._id,
                    username,
                    password,
                });

                if (res.data.success) {
                    setLoading(false);
                    setModalChangeMember(false);

                    handleSearchMember();

                    await axios.post(`${process.env.REACT_APP_API_URL}/v1/user/autoFindData`, {
                        id: user?.login?.currentUser?._id,
                    });
                    setBtnChangeMember(false);

                    dispatch(noticeAdminSlice.actions.successNotice('Chuyển thông tin thành công'));

                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [5000]);
                } else {
                    setLoading(false);

                    dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống!!!'));
                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [5000]);
                }
            }
        } catch (error) {
            console.log(error);

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
                setModalChangeMember(false);
            }}
            className="fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 z-[9999]"
        >
            <div className="top-0 absolute left-0 right-0 bottom-0 bg-[#000] opacity-[.4] z-[99]"></div>
            <div className="fixed flex justify-center overflow-y-auto overflow-x-hidden top-0 left-0 right-0 bottom-0 pb-[60px] opacity-[1] z-[999]">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#fff] animate-modalDownSlide text-[12px] lg:w-[500px] w-[96%] h-fit pb-[20px] shadow-xl rounded-[6px] mt-[30px] py-[14px]"
                >
                    <div className="flex justify-between items-center pb-[12px] border-b-[1px] border-solid border-[#f0f0f0] px-[26px]">
                        <h1 className="text-[14px] capitalize text-[#000] font-[620]">Chuyển thông tin danh bạ</h1>
                        <div onClick={() => setModalChangeMember(false)} className="cursor-pointer">
                            <AiOutlineClose />
                        </div>
                    </div>

                    <div className="mt-[16px] flex flex-col gap-[12px] px-[26px]">
                        <div>
                            <div className="mb-4 relative">
                                <label
                                    for="username"
                                    className="absolute text-[#000] top-[50%] translate-y-[-50%] w-[20px] flex justify-center items-center"
                                >
                                    <BsFillPersonFill />
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Nhập tài khoản"
                                    className="w-full text-[12px] p-2 pl-[24px] text-[#000] border rounded outline-none"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="mb-4 relative mt-[4px]">
                                <label
                                    for="password"
                                    className="absolute text-[#000]  top-[50%] translate-y-[-50%] w-[20px] flex justify-center items-center"
                                >
                                    <BsLockFill />
                                </label>
                                <input
                                    id="password"
                                    type={unvisiblePassword ? 'password' : 'text'}
                                    placeholder="Nhập mật khẩu"
                                    className="w-full p-2 pl-[24px] text-[12px] text-[#000] border rounded outline-none pr-[30px]"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                                <button
                                    onClick={() => setUnvisiblePassword((prev) => !prev)}
                                    className="text-[18px] text-[#000] pr-[10px] h-full absolute flex justify-center items-center top-[50%] translate-y-[-50%] right-0"
                                >
                                    {unvisiblePassword ? (
                                        <button className="flex justify-center items-center">
                                            <BsEyeSlash />
                                        </button>
                                    ) : (
                                        <button className="flex justify-center items-center">
                                            <BsEye />
                                        </button>
                                    )}
                                </button>
                            </div>

                            {noticeError.status && (
                                <div className="text-[12px] text-[#e25444dc] my-[8px] font-[600]">
                                    {noticeError.text}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-[10px] items-center mt-[20px] pt-[12px] border-t-[1px] border-solid border-[#f0f0f0] px-[26px]">
                        <button
                            disabled={loading}
                            onClick={handleChange}
                            className={`${
                                loading ? 'opacity-[.7] hover:opacity-[.7]' : 'hover:opacity-[.9]'
                            } uppercase font-[620] text-[10px] w-[60px] h-[30px] flex justify-center items-center bg-[#2574ab] rounded-[4px] text-[#fff] active:opacity-[.7]`}
                        >
                            {loading ? (
                                <div className="text-[20px] animate-loading">
                                    <BsArrowRepeat />
                                </div>
                            ) : (
                                'Bắt đầu'
                            )}
                        </button>
                        <button
                            onClick={() => setModalChangeMember(false)}
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

export default ModalChangeMember;
