import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import { userSelector } from '~/redux/selectors';
import { AiOutlineMenu, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { BsFillCaretUpFill, BsFillCaretDownFill, BsFillGearFill } from 'react-icons/bs';
import authSlice from '~/redux/slices/authSlice';
import axios from 'axios';
import ModalInfor from './component/ModalInfor';

function Header() {
    const tmp = useSelector(userSelector);
    const [user, setUser] = useState(tmp);
    const [downUser, setDownUser] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState('220px');
    const [modalInfor, setModalInfor] = useState(false);

    useEffect(() => {
        setUser(tmp);
    }, [tmp]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        dispatch(authSlice.actions.logoutStart());

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/user/logout`);

            if (res?.data?.success) {
                dispatch(authSlice.actions.logoutSuccess());

                //window.location.reload();
                navigate(config.routes.explore);
            } else {
                dispatch(authSlice.actions.loginFailed());
            }
        } catch (error) {
            dispatch(authSlice.actions.logoutSuccess());

            //window.location.reload();
            navigate(config.routes.login);
        }
    };

    const handleSidebar = () => {
        const newWidth = sidebarWidth === '0px' ? '220px' : '0px';
        setSidebarWidth(newWidth);
        document.documentElement.style.setProperty('--width-sidebar', newWidth);
    };

    return (
        <div className="flex justify-between items-center px-[30px] h-full">
            <div onClick={handleSidebar} className="text-[24px] cursor-pointer">
                <AiOutlineMenu />
            </div>
            <HeadlessTippy
                interactive
                placement="bottom"
                visible={downUser}
                onClickOutside={() => setDownUser(false)}
                render={(attrs) => (
                    <div
                        tabIndex="-1"
                        {...attrs}
                        className="z-[100] text-[12px] absolute] max-h-[400px] overflow-y-auto p-[6px] rounded-[8px] top-[10px] bg-[#fff] shadow-xl"
                    >
                        <ul>
                            <li>
                                <button
                                    onClick={() => setModalInfor(true)}
                                    className="flex gap-[8px] text-[#505b72] py-[6px] items-center px-[14px] rounded-[4px] cursor-pointer hover:bg-[#262b36] hover:text-[#9fa8bc]"
                                >
                                    <BsFillGearFill />
                                    <span>Thông tin cá nhân</span>
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="flex gap-[8px] w-full text-[#505b72] py-[6px] items-center px-[14px] rounded-[4px] cursor-pointer hover:bg-[#262b36] hover:text-[#9fa8bc]"
                                >
                                    <AiOutlineLogout />
                                    <span>Đăng xuất</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            >
                <button
                    className="flex gap-[10px] items-center hover:opacity-[0.8] justify-center cursor-pointer"
                    onClick={() => setDownUser((prev) => !prev)}
                >
                    <div className="cursor-pointer overflow-hidden h-[20px] w-[20px] bg-[#f3e3e6] rounded-[50%] text-[#544f4f] flex items-center justify-center">
                        <AiOutlineUser />
                    </div>
                    <div className="text-[14px]">{user.login.currentUser.name}</div>

                    <div className="">{!downUser ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />}</div>
                </button>
            </HeadlessTippy>

            {modalInfor && <ModalInfor setUser={setUser} setModalInfor={setModalInfor} user={user.login.currentUser} />}
        </div>
    );
}

export default Header;
