import { useState } from 'react';
import convertContentDetail from './utils/convertContentDetail';
import payBySms from './utils/payBySms';
import info from '~/database/infoPlayer';
import ketquaxosomiennam from '~/database/ketquaxosomiennam';

function Sms() {
    const [content, setContent] = useState('');
    const [contentDetail, setContentDetail] = useState([]);

    const handleContent = () => {
        let infoPlayer = info;
        let kqxs = ketquaxosomiennam;

        let arr = convertContentDetail(content);

        arr = payBySms(arr, infoPlayer, kqxs);

        console.log(arr);

        setContentDetail(arr);
    };

    const handleDeleteContent = () => {
        setContentDetail([]);
    };

    return (
        <div className="bg-[var(--color-white)] px-[10px] py-[8px] rounded-[6px]">
            <div className="gap-[20px] flex">
                <button
                    onClick={handleContent}
                    className="w-[80px] uppercase text-[12px] font-[700] py-[6px] bg-[#6035c4] rounded-[4px] cursor-pointer text-[#fff] hover:opacity-[.9] active:opacity-[.7]"
                >
                    Thêm mới
                </button>

                <button
                    onClick={handleDeleteContent}
                    className="w-[80px] uppercase text-[12px] font-[700] py-[6px] bg-[#c60e0e] rounded-[4px] cursor-pointer text-[#fff] hover:opacity-[.9] active:opacity-[.7]"
                >
                    Xóa
                </button>
            </div>
            <div className="mt-[20px]">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="rounded-[4px] outline-none border-[1px] border-solid border-[#bdc3d1] text-[12px] py-[4px] px-[8px]"
                    rows={4}
                    cols={60}
                    placeholder="Nội dung"
                ></textarea>
            </div>

            <div className="mt-[16px]">
                <label className="text-[12px] font-[600]">Chi tiết:</label>
                {contentDetail.map((e, index) => (
                    <p key={index}>{`${index + 1}  -  ${e.dai}.${e.so}.${e.kieuDanh}.${e.tien}ngan`}</p>
                ))}
            </div>
        </div>
    );
}

export default Sms;
