import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Notice from './components/Notice';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BsArrowClockwise } from 'react-icons/bs';

function DefaultLayout({ children }) {
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 800);
    }, [location.pathname]);

    return (
        <div>
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
            <div className="h-[var(--admin-height-header)] fixed top-0 left-0 right-0 z-[100] bg-[#fff]">
                <Header />
            </div>
            <div className="mt-[var(--admin-height-header)]">
                <div className="w-[var(--admin-width-sidebar)] fixed top-[var(--admin-height-header)] left-0 bottom-0 bg-[#fff]">
                    <Sidebar />
                </div>
                <div className="ml-[var(--admin-width-sidebar)] bg-[#F1F4F6] min-h-screen">{children}</div>
            </div>
            <Notice />
        </div>
    );
}

export default DefaultLayout;
