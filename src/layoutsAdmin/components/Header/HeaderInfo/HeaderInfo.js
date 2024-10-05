import { BsChevronDown } from 'react-icons/bs';

import avatar from '~/assets/imgs/favorite-5.jpg';
import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { userSelector } from '~/redux/selectors';
import { AiOutlineLogout } from 'react-icons/ai';
import authSlice from '~/redux/slices/authSlice';
import axios from 'axios';

function HeaderInfo() {
    const tmp = useSelector(userSelector);
    const [user, setUser] = useState(tmp);
    const [downUser, setDownUser] = useState(false);

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

    return (
        <div className="flex items-center">
            <HeadlessTippy
                interactive
                placement="bottom"
                visible={downUser}
                onClickOutside={() => setDownUser(false)}
                render={(attrs) => (
                    <div
                        tabIndex="-1"
                        {...attrs}
                        className="z-[100] text-[12px] absolute] max-h-[400px] overflow-y-auto p-[6px] rounded-[8px] bg-[#fff] shadow-2xl"
                    >
                        <ul>
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
                <button onClick={() => setDownUser((prev) => !prev)} className="cursor-pointer flex items-center">
                    <div className="h-[40px] w-[40px] overflow-hidden rounded-[50%]">
                        <img alt="avatar" src={avatar} />
                    </div>
                    <div className="text-[14px] text-[#979A9E] ml-[4px]">
                        <BsChevronDown />
                    </div>
                </button>
            </HeadlessTippy>
            <div className="ml-[10px] flex flex-col">
                <span className="text-[14px] font-[600] text-[#6C7278] capitalize">{user.login.currentUser?.name}</span>
                <span className="text-[12px] text-[#b8bec4]">VP People Manager</span>
            </div>
        </div>
    );
}

export default HeaderInfo;
