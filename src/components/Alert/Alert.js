import { BsX, BsArrowRepeat } from 'react-icons/bs';
import { useState } from 'react';

function Alert({ funcHandle, title, content, children }) {
    const [hidden, setHidden] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <div onClick={() => setHidden(true)}>
            {hidden && (
                <div
                    onClick={(e) => {
                        setHidden(false);
                        e.stopPropagation();
                    }}
                    className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-[99999999] bg-[#371d1d4a]"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-[350px] py-[10px] mb-[100px] px-[14px] bg-[#fff] rounded-[4px] box-shadow-alert"
                    >
                        <div className="flex justify-between border-b-[1px] border-b-solid border-b-[#dbd6d6] pb-[4px]">
                            <h1 className="font-[600]">{title}</h1>
                            <button
                                onClick={() => setHidden(false)}
                                className="text-[20px] rounded-[4px] p-[4px] cursor-pointer hover:bg-[#fc5959] hover:text-[#fff] active:opacity-[.9]"
                            >
                                <BsX />
                            </button>
                        </div>
                        <div className="py-[10px] text-center min-h-[100px] flex justify-center items-center">
                            {content}
                        </div>
                        <div className="flex justify-around pb-[8px]">
                            <button
                                onClick={() => setHidden(false)}
                                className="w-[80px] py-[6px] bg-[#fe3f3f] rounded-[4px] cursor-pointer text-[#fff] hover:opacity-[.9] active:opacity-[.7]"
                            >
                                Hủy
                            </button>
                            <button
                                disabled={loading}
                                onClick={() => {
                                    setLoading(true);
                                    funcHandle();
                                    setLoading(false);
                                    setHidden(false);
                                }}
                                className={`w-[80px] flex justify-center items-center py-[6px] bg-[#2574ab] rounded-[4px] cursor-pointer text-[#fff] ${
                                    loading ? 'opacity-[.7] hover:opacity-[.7]' : 'hover:opacity-[.9]'
                                } active:opacity-[.7]`}
                            >
                                {loading ? (
                                    <div className="text-[20px] animate-loading">
                                        <BsArrowRepeat />
                                    </div>
                                ) : (
                                    'Đồng ý'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {children}
        </div>
    );
}

export default Alert;
