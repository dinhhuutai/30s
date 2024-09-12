import { useState } from 'react';
import convertContentDetail from './utils/convertContentDetail';
import payBySms from './utils/payBySms';
import info from '~/database/infoPlayer';
import ketquaxosomiennam from '~/database/ketquaxosomiennam';
import ketquaxosomientrung from '~/database/ketquaxosomientrung';
import ketquaxosomienbac from '~/database/ketquaxosomienbac';

function Sms() {
    const [content, setContent] = useState('');
    const [contentDetail, setContentDetail] = useState([]);

    const [tongxacS, setTongXac] = useState(0);
    const [tongtrungS, setTongTrung] = useState(0);
    const [tongdiemS, setTongDiem] = useState(0);
    const [thuS, setThu] = useState(0);

    const handleContent = () => {
        let infoPlayer = info;

        let arr = convertContentDetail(content);

        let mien = arr[0] && arr[0].mien;

        let kqxs = mien === 'mn' ? ketquaxosomiennam : mien === 'mt' ? ketquaxosomientrung : ketquaxosomienbac;

        arr = payBySms(arr, infoPlayer, kqxs);

        console.log(arr);

        let tongxac = 0;
        let tongtrung = 0;
        let tongdiem = 0;

        arr.map((e) => {
            tongxac += e.tienxac;
            tongtrung += e.tientrung;
            tongdiem += e.diem;
        });

        setTongDiem(tongdiem);
        setTongXac(tongxac);
        setTongTrung(tongtrung);
        setThu(tongxac - tongtrung);

        console.log(
            'Tong diem: ',
            tongdiem.toFixed(2),
            ' | Tong xac: ',
            tongxac.toFixed(2),
            ' | Tong trung: ',
            tongtrung.toFixed(2),
            ' | Thu/trả: ',
            tongxac - tongtrung,
        );

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
                <div>{`Tong diem: ${tongdiemS.toFixed(2)}`}</div>
                <div>{`Tong xac: ${tongxacS.toFixed(2)}`}</div>
                <div>{`Tong trung: ${tongtrungS.toFixed(2)}`}</div>
                <div>{`Thu/trả: ${thuS}`}</div>

                <label className="text-[12px] font-[600]">Chi tiết:</label>
                {contentDetail.map((e, index) => (
                    <p key={index}>{`${index + 1}  -  ${e.dai}.${e.so}.${e.kieuDanh}.${
                        e.tien
                    }ngan  ---   ${e.tienxac.toFixed(1)} || ${e.tientrung.toFixed(1)}`}</p>
                ))}
            </div>
        </div>
    );
}

export default Sms;
