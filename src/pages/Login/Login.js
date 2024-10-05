import bgLogin from '~/assets/imgs/bg_login.jpg';
import { BsFillPersonFill, BsLockFill, BsEyeSlash, BsEye, BsArrowClockwise } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import { useDispatch } from 'react-redux';
import authSlice from '~/redux/slices/authSlice';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [unvisiblePassword, setUnvisiblePassword] = useState(true);
    const [loading, setLoading] = useState(true);

    const [noticeError, setNoticeError] = useState({
        status: false,
        text: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
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
            try {
                const user = {
                    username,
                    password,
                };

                dispatch(authSlice.actions.loginStart());
                setLoading(true);

                const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/user/login`, user);

                if (res?.data?.success) {
                    dispatch(
                        authSlice.actions.loginSuccess({
                            user: res.data?.user,
                            accessToken: res.data?.accessToken,
                        }),
                    );

                    setLoading(false);
                    if (res.data?.user?.isAdmin) {
                        navigate(config.routes.adminAnalytics);
                    } else {
                        navigate(config.routes.dashboard);
                    }
                } else {
                    dispatch(authSlice.actions.loginFailed());
                }
            } catch (error) {
                setNoticeError({
                    status: true,
                    text: 'username hoặc password không chính xác',
                });
            }
        }
    };


    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 800);
    }, []);

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center bg-repeat justify-center lg:items-center flex fixed top-0 left-0 ring-0 bottom-0"
            style={{ backgroundImage: `url(${bgLogin})` }}
        >
            {loading ? (
                <div className="absolute w-full z-[999999] top-0">
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
            <div className="min-h-screen opacity-[1] lg:opacity-[.75] w-full lg:bg-[#0e1013] bg-[#262b36] fixed top-0 left-0 ring-0 bottom-0"></div>

            <div className="w-[400px] lg:bg-[#262b36e6] text-[#fff] rounded-[6px] px-[40px] pt-[24px] pb-[14px] opacity-[.75]">
                <div className="flex flex-col items-center">
                    <h1 className="text-[26px] hover:text-[var(--color-logo-hover)] text-[var(--color-logo)] uppercase font-[620]">
                        10S.BIZ
                    </h1>
                    <h4 className="mt-[8px] text-[14px]">Chào mừng!!! Vui lòng đăng nhập.</h4>
                </div>

                <div className="mt-[30px]">
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
                            <div className="text-[12px] text-[#e25444dc] my-[8px] font-[600]">{noticeError.text}</div>
                        )}
                    </div>

                    <div className="mt-[50px]">
                        <button className="bg-[#259dba] text-white rounded w-full py-2" onClick={handleLogin}>
                            Đăng nhập
                        </button>
                    </div>

                    <div className="mt-[18px] flex justify-between">
                        <div></div>
                        <Link to={config.routes.register} className="cursor-pointer text-[#259dba]">
                            Đăng ký
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
