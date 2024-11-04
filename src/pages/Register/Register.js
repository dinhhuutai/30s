import { useEffect, useState } from 'react';
import bgLogin from '~/assets/imgs/bg_login.jpg';
import { BsFillPersonFill, BsLockFill, BsEyeSlash, BsEye, BsArrowBarLeft, BsArrowClockwise } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import { useDispatch } from 'react-redux';
import authSlice from '~/redux/slices/authSlice';
import axios from 'axios';
import setAuthToken from '~/middlewares/setAuthToken';

function Register() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [codeRegister, setCodeRegister] = useState('');
    const [dataCodeRegister, setDataCodeRegister] = useState('');
    const [unvisiblePassword, setUnvisiblePassword] = useState(true);
    const [unvisibleConfirmPassword, setUnvisibleConfirmPassword] = useState(true);

    const [loading, setLoading] = useState(true);

    const [noticeError, setNoticeError] = useState({
        status: false,
        text: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        handleFindCodeRegister();
    }, []);

    const handleFindCodeRegister = async () => {
        try {
            const resOnlyAdminEdit = await axios.post(`${process.env.REACT_APP_API_URL}/v1/onlyAdminEdit/find`);
            const rs = resOnlyAdminEdit.data.onlyAdminEdit[0];

            if (resOnlyAdminEdit.data.success) {
                setDataCodeRegister(rs.codeRegister);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleRegister = async () => {
        if (!username) {
            setNoticeError({
                status: true,
                text: 'Bạn chưa nhập tài khoản',
            });
        } else if (!name) {
            setNoticeError({
                status: true,
                text: 'Bạn chưa nhập tên',
            });
        } else if (!password) {
            setNoticeError({
                status: true,
                text: 'Bạn chưa nhập mật khẩu',
            });
        } else if (!confirmPassword) {
            setNoticeError({
                status: true,
                text: 'Bạn chưa nhập lại mật khẩu',
            });
        } else if (!codeRegister) {
            setNoticeError({
                status: true,
                text: 'Bạn chưa nhập mã đăng ký',
            });
        } else if (password.trim() !== confirmPassword.trim()) {
            setNoticeError({
                status: true,
                text: 'Nhập lại mật khẩu không giống nhau',
            });
        } else if (codeRegister !== dataCodeRegister) {
            setNoticeError({
                status: true,
                text: 'Mã đăng ký không chính xác',
            });
        } else {
            try {
                const formData = {
                    username,
                    name,
                    password,
                };

                dispatch(authSlice.actions.loginStart());

                setLoading(true);
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/user/register`, formData);

                if (res?.data?.success) {
                    dispatch(
                        authSlice.actions.loginSuccess({
                            user: res.data?.user,
                            accessToken: res.data?.accessToken,
                        }),
                    );

                    setAuthToken(res.data?.accessToken);

                    setLoading(false);
                    navigate(config.routes.dashboard);
                } else {
                    dispatch(authSlice.actions.loginFailed());
                }
            } catch (error) {
                setNoticeError({
                    status: true,
                    text: error.response.data.message,
                });
            }
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 800);
    }, []);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center bg-repeat justify-center lg:items-center flex fixed top-0 left-0 ring-0 bottom-0"
            style={{ backgroundImage: `url(${bgLogin})` }}
        >
            {loading ? (
                <div className="fixed w-full z-[999999] top-0">
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
            <div className="min-h-screen opacity-[1] lg:opacity-[.75] bg-[#262b36] w-full lg:bg-[#0e1013] fixed top-0 left-0 ring-0 bottom-0"></div>

            <div className="w-[400px] bg-[#262b36e6] text-[#fff] shadow-xl rounded-[6px] px-[40px] pt-[24px] pb-[14px] opacity-[.75]">
                <div className="flex flex-col items-center">
                    <h1 className="text-[26px] hover:text-[var(--color-logo-hover)] text-[var(--color-logo)] uppercase font-[620]">
                        10S.BIZ
                    </h1>
                    <h4 className="mt-[8px] text-[14px]">Đăng ký tài khoản.</h4>
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

                        <div className="mb-4 relative mt-[4px]">
                            <label
                                for="confirmPassword"
                                className="absolute text-[#000]  top-[50%] translate-y-[-50%] w-[20px] flex justify-center items-center"
                            >
                                <BsLockFill />
                            </label>
                            <input
                                id="confirmPassword"
                                type={unvisiblePassword ? 'password' : 'text'}
                                placeholder="Nhập lại mật khẩu"
                                className="w-full p-2 pl-[24px] text-[12px] text-[#000] border rounded outline-none pr-[30px]"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setconfirmPassword(e.target.value);
                                }}
                            />
                            <button
                                onClick={() => setUnvisibleConfirmPassword((prev) => !prev)}
                                className="text-[18px] text-[#000] pr-[10px] h-full absolute flex justify-center items-center top-[50%] translate-y-[-50%] right-0"
                            >
                                {unvisibleConfirmPassword ? (
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

                        <div className="mb-4 relative">
                            <input
                                type="text"
                                placeholder="Nhập tên"
                                className="w-full text-[12px] p-2 text-[#000] border rounded outline-none"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>

                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Nhập mã đăng ký"
                                className="w-full text-[12px] p-2 text-[#000] border rounded outline-none"
                                value={codeRegister}
                                onChange={(e) => {
                                    setCodeRegister(e.target.value);
                                }}
                            />
                        </div>

                        {noticeError.status && (
                            <div className="text-[12px] text-[#e25444dc] my-[8px] font-[600]">{noticeError.text}</div>
                        )}
                    </div>

                    <div className="mt-[50px]">
                        <button className="bg-[#257081] text-white rounded w-full py-2" onClick={handleRegister}>
                            Đăng ký
                        </button>
                    </div>

                    <div className="mt-[18px] flex">
                        <Link
                            to={config.routes.login}
                            className="cursor-pointer flex items-center gap-[4px] text-[#259dba]"
                        >
                            <BsArrowBarLeft />
                            Đăng nhập
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
