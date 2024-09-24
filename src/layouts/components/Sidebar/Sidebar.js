import { Link, NavLink } from 'react-router-dom';
import config from '~/config';
import { AiFillHome, AiFillMessage, AiFillCalculator } from 'react-icons/ai';
import { BsPeopleFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';

function Sidebar({ setSidebarWidth }) {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const width = window.innerWidth;

        setWidth(width);
    }, []);

    return (
        <div className="flex h-full flex-col">
            <div className="bg-[var(--bg-color-logo)] flex justify-center items-center h-[var(--height-header)]">
                <h2>
                    <Link className="text-[26px] hover:text-[var(--color-logo-hover)] text-[var(--color-logo)] uppercase font-[620]">
                        10s.biz
                    </Link>
                </h2>
            </div>
            <div className="flex-1 relative">
                <div className="inset-0 overflow-auto absolute bg-[var(--color-white)]">
                    <div className="py-[10px]">
                        <h5 className="text-[10px] px-[16px] tracking-[1px] text-[var(--color-gray)] uppercase font-[500]">
                            thư mục chính
                        </h5>
                        <ul className="mt-[10px]">
                            <li>
                                <NavLink
                                    onClick={() => {
                                        if (width < 768) {
                                            setSidebarWidth('0px');
                                            document.documentElement.style.setProperty('--width-sidebar', '0px');
                                        }
                                    }}
                                    className={(nav) =>
                                        `text-[12px] items-center text-[var(--color-text-sidebar)] font-[650] uppercase px-[16px] py-[8px] flex border-t-[1px] border-[#eaecf0] border-solid ${
                                            nav.isActive
                                                ? 'bg-active-path text-[var(--color-white)]'
                                                : 'hover:text-[var(--color-black)]'
                                        }`
                                    }
                                    to={config.routes.dashboard}
                                >
                                    <AiFillHome className="mr-[8px] text-[14px]" />
                                    <span>kết quả xổ số</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    onClick={() => {
                                        if (width < 768) {
                                            setSidebarWidth('0px');
                                            document.documentElement.style.setProperty('--width-sidebar', '0px');
                                        }
                                    }}
                                    className={(nav) =>
                                        `text-[12px] items-center text-[var(--color-text-sidebar)] font-[650] uppercase px-[16px] py-[8px] flex border-t-[1px] border-[#eaecf0] border-solid ${
                                            nav.isActive
                                                ? 'bg-active-path text-[var(--color-white)]'
                                                : 'hover:text-[var(--color-black)]'
                                        }`
                                    }
                                    to={config.routes.sms}
                                >
                                    <AiFillMessage className="mr-[8px] text-[14px]" />
                                    <span>tin nhắn</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    onClick={() => {
                                        if (width < 768) {
                                            setSidebarWidth('0px');
                                            document.documentElement.style.setProperty('--width-sidebar', '0px');
                                        }
                                    }}
                                    className={(nav) =>
                                        `text-[12px] items-center text-[var(--color-text-sidebar)] font-[650] uppercase px-[16px] py-[8px] flex border-t-[1px] border-[#eaecf0] border-solid ${
                                            nav.isActive
                                                ? 'bg-active-path text-[var(--color-white)]'
                                                : 'hover:text-[var(--color-black)]'
                                        }`
                                    }
                                    to={config.routes.revenue}
                                >
                                    <AiFillCalculator className="mr-[8px] text-[14px]" />
                                    <span>doanh thu</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    onClick={() => {
                                        if (width < 768) {
                                            setSidebarWidth('0px');
                                            document.documentElement.style.setProperty('--width-sidebar', '0px');
                                        }
                                    }}
                                    className={(nav) =>
                                        `text-[12px] items-center text-[var(--color-text-sidebar)] font-[650] uppercase px-[16px] py-[8px] flex border-t-[1px] border-b-[1px] border-[#eaecf0] border-solid ${
                                            nav.isActive
                                                ? 'bg-active-path text-[var(--color-white)]'
                                                : 'hover:text-[var(--color-black)]'
                                        }`
                                    }
                                    to={config.routes.member}
                                >
                                    <BsPeopleFill className="mr-[8px] text-[14px]" />
                                    <span>danh bạ</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
