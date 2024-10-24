import { useEffect, useState } from 'react';
import HeaderPage from '../component/HeaderPage';
import { BsArrowClockwise } from 'react-icons/bs';

function Download() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    return (
        <div>
            {loading ? (
                <div className="left-0 right-0 z-[999999] fixed top-0">
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
            <HeaderPage pageCurr={'Tải Ứng Dụng'} />
            <div className="bg-[var(--color-white)] px-[16px] mt-[12px] py-[14px] pb-[68px] rounded-[6px]">
                <div className="flex justify-center">
                    <h1 className="text-[16px] font-[600] uppercase text-center">
                        Hướng dẫn tải ứng dụng trên điện thoại
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default Download;
