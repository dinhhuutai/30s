import { useEffect, useState } from 'react';
import Header from './components/Header';
import Notice from './components/Notice';
import { BsArrowClockwise } from 'react-icons/bs';
import Sidebar from './components/Sidebar';
import { useLocation } from 'react-router-dom';

function DefaultLayout({ children }) {
    const [sidebarWidth, setSidebarWidth] = useState('220px');
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 800);
    }, [location.pathname]);

    return (
        <div className="">
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
            <div
                className={`w-[var(--width-sidebar)] fixed top-[0px] left-[0px] bottom-[0px] bg-[var(--color-white)] text-[var(--color-text-sidebar)]`}
            >
                <Sidebar setSidebarWidth={setSidebarWidth} />
            </div>
            <div className="ml-[var(--width-sidebar)]">
                <div className="h-[var(--height-header)] fixed top-[0px] left-[var(--width-sidebar)] right-[0px] z-[9999] bg-[var(--bg-color-header)] text-[var(--color-text-header)]">
                    <Header sidebarWidth={sidebarWidth} setSidebarWidth={setSidebarWidth} />
                </div>
                <div className="mt-[var(--height-header)]  min-h-[var(--min-h-page)] bg-[var(--bg-color-page)] p-[20px]">
                    {children}
                </div>
            </div>
            <Notice />
        </div>
    );
}

export default DefaultLayout;
