import { useEffect, useState } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import useDebounce from '~/utils/useDebounce';

function Member() {
    const [nameSearch, setNameSearch] = useState('');
    const [modalCreate, setModalCreate] = useState(false);

    const debounced = useDebounce(nameSearch, 500);

    useEffect(() => {
        console.log(debounced);
    }, [debounced]);

    return (
        <div className="bg-[var(--color-white)] px-[16px] py-[14px] pb-[28px] rounded-[6px]">
            <div>
                <button
                    onClick={() => setModalCreate(true)}
                    className={`hover:opacity-[.9] uppercase font-[620] text-[12px] w-[120px] h-[30px] flex justify-center items-center bg-[#2574ab] rounded-[4px] text-[#fff] active:opacity-[.7]`}
                >
                    Thêm mới
                </button>
            </div>

            <div className="mt-[16px] flex gap-[10px]">
                <input
                    value={nameSearch}
                    onChange={(e) => setNameSearch(e.target.value)}
                    placeholder="Tên, SĐT"
                    className="py-[4px] px-[8px] outline-none text-[12px] border-[1px] border-solid border-[#ccc] rounded-[4px]"
                />
                <button className="py-[4px] px-[8px] border-[1px] border-solid flex items-center gap-[4px] border-[#ccc] rounded-[4px]">
                    <AiOutlineSearch />
                    <span className="uppercase text-[12px] font-[640] text-[#000]">xem</span>
                </button>
            </div>

            {modalCreate && (
                <div className="fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 z-[9999]">
                    <div className="top-0 absolute left-0 right-0 bottom-0 bg-[#000] opacity-[.4] z-[99]"></div>
                    <div className="fixed flex justify-center overflow-y-auto overflow-x-hidden top-0 left-0 right-0 bottom-0 pb-[60px] opacity-[1] z-[999]">
                        <div className="bg-[#fff] text-[12px] w-[500px] min-h-[1000px] shadow-xl rounded-[6px] mt-[30px] py-[14px]">
                            <div className="flex justify-between items-center pb-[12px] border-b-[1px] border-solid border-[#f0f0f0] px-[26px]">
                                <h1 className="text-[14px] capitalize text-[#000] font-[620]">Thêm mới</h1>
                                <div onClick={() => setModalCreate(false)} className="cursor-pointer">
                                    <AiOutlineClose />
                                </div>
                            </div>
                            <div className="mt-[12px px-[26px]"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Member;
