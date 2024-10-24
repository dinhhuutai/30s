import { useEffect, useState } from 'react';
import HeaderPage from '../component/HeaderPage';
import { BsArrowClockwise, BsDot } from 'react-icons/bs';

import img1Guide from '~/assets/imgs/guide1.png';
import img2Guide from '~/assets/imgs/guide2.png';
import img3Guide from '~/assets/imgs/guide3.png';
import img4Guide from '~/assets/imgs/guide4.png';
import img5Guide from '~/assets/imgs/guide5.png';

function Guide() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    // useEffect(() => {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth',
    //     });
    // }, []);

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
            <HeaderPage pageCurr={'Hướng Dẫn'} />
            <div className="bg-[var(--color-white)] px-[16px] mt-[12px] py-[14px] pb-[68px] rounded-[6px]">
                <div className="flex justify-center">
                    <h1 className="text-[16px] font-[600] uppercase text-center">
                        Hướng dẫn sử dụng phần mềm tính tiền số
                    </h1>
                </div>
                <div className="mt-[20px]">
                    <label className="text-[13px] font-[600]">1. Hướng dẫn sử dụng</label>

                    <div className="text-[12px]">
                        <div className="mt-[4px]">
                            <span className="ml-[8px] font-[550] block">Bước 1: Đăng nhập vào hệ thống.</span>
                            <div className="flex justify-center mt-[4px]">
                                <img className="w-[90%] shadow-lg" src={img1Guide} alt="1" />
                            </div>
                        </div>
                        <div className="mt-[4px]">
                            <span className="ml-[8px] font-[550] block mt-[10px]">Bước 2: Tạo danh bạ người chơi.</span>
                            <span className="ml-[10px]">{`Nhấn vào danh bạ -> Thêm -> Nhập thông tin -> Lưu`}</span>
                            <div className="flex justify-center mt-[4px]">
                                <img className="w-[90%] shadow-lg" src={img2Guide} alt="1" />
                            </div>
                        </div>
                        <div className="mt-[4px]">
                            <span className="ml-[8px] font-[550] block mt-[10px]">Bước 3: Nhập nội dung chơi.</span>
                            <span className="ml-[10px]">{`Nhấn vào tin nhắn -> Thêm -> Nhập thông tin -> Lưu`}</span>
                            <div className="flex justify-center mt-[4px]">
                                <img className="w-[90%] shadow-lg" src={img3Guide} alt="1" />
                            </div>

                            <div className="ml-[8px] font-[550] flex items-center mt-[10px]">
                                <BsDot />
                                Chỉnh sửa và xem chi tiết tin nhắn:
                            </div>
                            <span className="ml-[10px]">{`Nhấn vào tin nhắn -> ở cột thao tác -> Nhấn vào icon cây bút`}</span>
                            <div className="flex justify-center mt-[4px]">
                                <img className="w-[90%] shadow-lg" src={img4Guide} alt="1" />
                            </div>
                            <div className="flex justify-center mt-[8px]">
                                <img className="w-[90%] shadow-lg" src={img5Guide} alt="1" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-[20px]">
                    <label className="text-[13px] font-[600]">2. Cú pháp tin nhắn đầy đủ</label>
                    <div className="text-[12px] mt-[4px] ml-[10px]">
                        <span className="block">{`<tên miền> <tên đài> [<số đánh thứ 1>, <số đánh thứ 2>, ... ,<số đánh thứ n>] <kiểu đánh> <giá tiền> <đơn vị tiền>`}</span>
                        <span className="mt-[4px] block">
                            <span className="font-[550]">Ví dụ:</span>
                            <span className="ml-[10px]">cm 31 07 bl10</span>
                            <span className="mx-[20px]">-</span>
                            <span className="">Đài cà mau 31, 07 bao lô 10 ngàn</span>
                        </span>
                        <table className="w-full mt-[10px]">
                            <thead>
                                <tr className="border-[1px] border-solid border-[#333]">
                                    <th className="border-r-[1px] px-[6px] py-[4px] w-[20%] border-solid border-[#333]">
                                        Cú pháp
                                    </th>
                                    <th className="w-[100%] px-[6px] py-[4px]">Giải thích</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-[1px] border-solid border-[#333]">
                                    <td className="border-r-[1px] text-center px-[6px] py-[4px] w-[20%] border-solid border-[#333]">{`<tên miền>`}</td>
                                    <td className="w-[100%] px-[6px] py-[4px] flex flex-col">
                                        <span>- miền nam, miền bắc, miền trung</span>
                                        <span>- Nếu không ghi gì, máy sẽ hiểu là miền nam.</span>
                                        <ul className="ml-[20px]">
                                            <li className="flex items-center">
                                                <span className="text-[16px]">
                                                    <BsDot />
                                                </span>
                                                <span className="ml-[4px]">bentre 123 xc10</span>
                                                <span className="mx-[20px]">-</span>
                                                <span>Đài bến tre 123 xỉu chủ 10 ngàn</span>
                                            </li>
                                        </ul>
                                        <span>- Nếu muốn ghi miền trung thì phải có chữ miền trung phía trước.</span>
                                        <ul className="ml-[20px]">
                                            <li className="flex items-center">
                                                <span className="text-[16px]">
                                                    <BsDot />
                                                </span>
                                                <span className="ml-[4px]">mt danang 123 xc10</span>
                                                <span className="mx-[20px]">-</span>
                                                <span>Đài đà nẵng 123 xỉu chủ 10 ngàn</span>
                                            </li>
                                            <li className="flex items-center">
                                                <span className="text-[16px]">
                                                    <BsDot />
                                                </span>
                                                <span className="ml-[4px]">mientrung khoa 321 xc10</span>
                                                <span className="mx-[20px]">-</span>
                                                <span>Đài khánh hòa 321 xỉu chủ 10 ngàn</span>
                                            </li>
                                        </ul>
                                        <span>{`- Nếu muốn ghi miền bắc thì phải có chữ miền bắc phía trước hoặc không cần ghi <tên miền> và <tên đài>`}</span>
                                        <ul className="ml-[20px]">
                                            <li className="flex items-center">
                                                <span className="text-[16px]">
                                                    <BsDot />
                                                </span>
                                                <span className="ml-[4px]">mb 23 dd10</span>
                                                <span className="mx-[20px]">-</span>
                                                <span>Miền bắc 23 đầu đuôi 10 ngàn</span>
                                            </li>
                                            <li className="flex items-center">
                                                <span className="text-[16px]">
                                                    <BsDot />
                                                </span>
                                                <span className="ml-[4px]">32 d50d80</span>
                                                <span className="mx-[20px]">-</span>
                                                <span>Miền bắc 32 đầu 50 ngàn đuôi 80 ngàn</span>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>

                                <tr className="border-[1px] border-solid border-[#333]">
                                    <td className="border-r-[1px] text-center px-[6px] py-[4px] w-[20%] border-solid border-[#333]">{`<tên đài>`}</td>
                                    <td>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <th className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Đài
                                            </th>
                                            <th className="w-[100%] px-[6px] py-[4px]">
                                                Cách ghi (có dấu hoặc không dấu)
                                            </th>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Đài chánh
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                dc, chanh, ch, daichanh, dchanh ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Đài phụ
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                dp, phu, ph, dphu, daiphu ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Hà nội, miền bắc
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">mb, hn, hanoi,ha noi ...</td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                An giang
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">ag, angiang, an giang ...</td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Bạc liêu
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                bl, blieu, baclieu, bac lieu ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Bến tre
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                bt, btre, bentre, ben tre ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Bình dương
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                bd, bduong, binhduong, binh duong ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Bình phước
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                bp, bphuoc, binhphuoc, binh phuoc ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Bình thuận
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                bt, bthuan, binhthuan, binh thuan ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Cà mau
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">cm, camau, ca mau ...</td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Cần thơ
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                ct, ctho, cantho, can tho ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Đà lạt
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">dl, dlat, dalat, da lat ...</td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Đồng nai
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                dn, dnai, dongnai, dn, dong nai ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Đồng tháp
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                dt, dthap, dongthap, dong thap ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Hậu giang
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">hg, hgiang, haugiang ...</td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Kiên giang
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                kg, kgiang, kiengiang, kien giang ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Long an
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">la, lan, longan, long an ...</td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Sóc trăng
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                st, strang, soctrang, soc trang ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Tây ninh
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                tn, tninh, tayninh, tay ninh ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Tiền giang
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                tg, tgiang, tien giang,tiengiang ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                TP.HCM
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">tp ,hcm ...</td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Trà vinh
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                tv, tvinh, travinh, tra vinh ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Vĩnh long
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                vl, vlong, vinhlong, vinh long ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Vũng tàu
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                vt, vtau, vungtau, vung tau, vung tau ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Bình Định
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                bdinh, binhdinh, binh dinh, bd ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Đắk Lắk
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                dlak, daklak, dak lak, dlac, daclac, dac lac, dl ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Đà Nẵng
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                dnang, danang, da nang, dn ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Đắc Nông
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                dno, dknong, daknong, dak nong, do ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Gia Lai
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                glai, gialai, gia lai, gl ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Khánh Hòa
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                khoa, khanhhoa, khanh hoa, kh ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Kon Tum
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                ktum, kontum, kon tum, kt ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Ninh Thuận
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                nthuan, ninhthuan, ninh thuan, nt ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Phú Yên
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                pyen, phyen, phuyen, phu yen, py ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Quảng Bình
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                qbinh, quangbinh, quang binh, qb ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Quảng Ngãi
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                qngai, quangngai, quang ngai, qn ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Quảng Nam
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                qnam, quangnam, quang nam, qn ...
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Quảng Trị
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">
                                                qtri, quangtri, quang tri, qt ...
                                            </td>
                                        </tr>
                                        <tr className="flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Thừa Thiên Huế
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px]">hue</td>
                                        </tr>
                                    </td>
                                </tr>

                                <tr className="border-[1px] border-solid border-[#333]">
                                    <td className="border-r-[1px] text-center px-[6px] py-[4px] w-[20%] border-solid border-[#333]">{`<kiểu đánh>`}</td>
                                    <td>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <th className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Kiểu đánh
                                            </th>
                                            <th className="w-[100%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                                Cách ghi (có dấu hoặc không dấu, có khoảng trắng hoặc không khoảng
                                                trắng)
                                            </th>
                                            <th className="w-[60%] px-[6px] py-[4px]">Ví dụ</th>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Đầu
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                                dau
                                            </td>
                                            <td className="w-[60%] px-[6px] py-[4px]">
                                                <div className="font-[550]">tp 56 dau10</div>
                                                <div>Đài thành phố đánh số 56 đầu 10 ngàn</div>
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Đuôi
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                                duoi, dui
                                            </td>
                                            <td className="w-[60%] px-[6px] py-[4px]">
                                                <div className="font-[550]">tp 65 duoi10n</div>
                                                <div>Đài thành phố đánh số 65 đuôi 10 ngàn</div>
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Đầu đuôi
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                                dauduoi, daudui, daud, ddui, dduoi, dd
                                            </td>
                                            <td className="w-[60%] px-[6px] py-[4px]">
                                                <div className="font-[550]">dn 65 dd10</div>
                                                <div>Đài đồng nai đánh số 65 đầu đuôi 10 ngàn</div>
                                                <div className="font-[550] mt-[10px]">dn 65 d10d20</div>
                                                <div>Đài đồng nai đánh số 65 đầu 10 ngàn đuôi 20 ngàn</div>
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Bao lô
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                                l, lo, b, bl, bao, blo, baol, baolo
                                            </td>
                                            <td className="w-[60%] px-[6px] py-[4px]">
                                                <div className="font-[550]">dn 65 blo10</div>
                                                <div>Đài đồng nai đánh số 65 bao lô 10 ngàn</div>
                                                <div className="font-[550] mt-[10px]">dn 654 b10b50</div>
                                                <div>Đài đồng nai đánh số 654 bao 10 ngàn, số 54 bao 50 ngàn</div>
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                Bao lô đảo
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                                ld, lod, bd, bld, baod, blod, baold, baolod, ldao, lodao, bdao, bldao,
                                                baodao, blodao, baoldao, baolodao, dl, dlo, db, dbl, dbao, dblo, dbaol,
                                                dbaolo
                                            </td>
                                            <td className="w-[60%] px-[6px] py-[4px]">
                                                <div className="font-[550]">dn 655 bld10</div>
                                                <div>Đài đồng nai đánh số 655, 565, 556 bao lô 10 ngàn</div>
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                xỉu chủ
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                                x, xc, xiuchu, siuchu, xchu, schu, sc, xchu ...
                                            </td>
                                            <td className="w-[60%] px-[6px] py-[4px]">
                                                <div className="font-[550]">dn 655 xc10</div>
                                                <div>Đài đồng nai đánh số 655 xỉu chủ 10 ngàn</div>
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                xỉu chủ đảo
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                                xd, xcd, xiuchud, siuchud, xchud, schud, scd, xchud ...
                                            </td>
                                            <td className="w-[60%] px-[6px] py-[4px]">
                                                <div className="font-[550]">dn 655 xcd10</div>
                                                <div>Đài đồng nai đánh số 655, 565, 556 xỉu chủ 10 ngàn</div>
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                xỉu chủ đầu
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                                xdau, xcdau, xiuchudau, siuchudau, xchudau, schudau, scdau, xchudau ...
                                            </td>
                                            <td className="w-[60%] px-[6px] py-[4px]">
                                                <div className="font-[550]">dn 655 xcdau10</div>
                                                <div>Đài đồng nai đánh số 655 xỉu chủ đầu 10 ngàn</div>
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                xỉu chủ đầu đảo
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                                xdaud, xcdaud, xiuchudaud, siuchudaud, xchudaud, schudaud, scdaud,
                                                xchudaud ...
                                            </td>
                                            <td className="w-[60%] px-[6px] py-[4px]">
                                                <div className="font-[550]">dn 655 xcdaud10</div>
                                                <div>Đài đồng nai đánh số 655, 565, 556 xỉu chủ đầu 10 ngàn</div>
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                xỉu chủ đuôi
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                                xduoi, xcduoi, xiuchuduoi, siuchuduoi, xchuduoi, schuduoi, scduoi,
                                                xchuduoi ...
                                            </td>
                                            <td className="w-[60%] px-[6px] py-[4px]">
                                                <div className="font-[550]">dn 655 xcduoi10</div>
                                                <div>Đài đồng nai đánh số 655 xỉu chủ đuôi 10 ngàn</div>
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                xỉu chủ đuôi đảo
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                                xduoid, xcduoid, xiuchuduoid, siuchuduoid, xchuduoid, schuduoid,
                                                scduoid, xchuduoid ...
                                            </td>
                                            <td className="w-[60%] px-[6px] py-[4px]">
                                                <div className="font-[550]">dn 655 xcduoid10</div>
                                                <div>Đài đồng nai đánh số 655, 565, 556 xỉu chủ đuôi 10 ngàn</div>
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                đá
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                                da
                                            </td>
                                            <td className="w-[60%] px-[6px] py-[4px]">
                                                <div className="font-[550]">dn 65 56 da10</div>
                                                <div>Đài đồng nai đánh số 65 56 đá 10 ngàn</div>
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                đá xiên
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                                dax, daxien
                                            </td>
                                            <td className="w-[60%] px-[6px] py-[4px]">
                                                <div className="font-[550]">dn ct 65 56 dax10</div>
                                                <div>Đánh số 65 56 đá xiên 2 đài đồng nai, cần thơ 10 ngàn</div>
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                bảy lô
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                                baylo, baobay, baobaylo
                                            </td>
                                            <td className="w-[60%] px-[6px] py-[4px]">
                                                <div className="font-[550]">dn 31 baylo10</div>
                                                <div>Đánh bảy lô số 31 đài đồng nai 10 ngàn</div>
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                bảy lô đảo
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                                baylod, baobayd, baobaylod, ...
                                            </td>
                                            <td className="w-[60%] px-[6px] py-[4px]">
                                                <div className="font-[550]">dn 311 baylo10</div>
                                                <div>Đánh bảy lô số 311, 131, 113 đài đồng nai 10 ngàn</div>
                                            </td>
                                        </tr>
                                        <tr className="border-b-[1px] flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                tám lô
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                                tamlo, baotam, baotamlo
                                            </td>
                                            <td className="w-[60%] px-[6px] py-[4px]">
                                                <div className="font-[550]">dn 31 tamlo10</div>
                                                <div>Đánh tám lô số 31 đài đồng nai 10 ngàn</div>
                                            </td>
                                        </tr>
                                        <tr className="flex w-[100%] border-solid border-[#333]">
                                            <td className="border-r-[1px] px-[6px] py-[4px] w-[40%] border-solid border-[#333]">
                                                tám lô đảo
                                            </td>
                                            <td className="w-[100%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                                tamlod, baotamd, baotamlod ...
                                            </td>
                                            <td className="w-[60%] px-[6px] py-[4px]">
                                                <div className="font-[550]">dn 311 tamlo10</div>
                                                <div>Đánh tám lô số 311, 131, 113 đài đồng nai 10 ngàn</div>
                                            </td>
                                        </tr>
                                    </td>
                                </tr>

                                <tr className="border-[1px] border-solid border-[#333]">
                                    <td className="border-r-[1px] text-center px-[6px] py-[4px] w-[20%] border-solid border-[#333]">{`<giá tiền>`}</td>
                                    <td className="w-[100%] px-[6px] py-[4px] flex flex-col">
                                        <span>- n, ng, ngan, nghin. (có dấu hoặc không dấu)</span>
                                        <span className="font-[550]">- Ghi cũng được, không ghi cũng được.</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-[20px]">
                    <label className="text-[13px] font-[600]">3. Một số kiểu đánh khác</label>

                    <table className="w-full mt-[10px] text-[12px]">
                        <thead>
                            <tr className="border-[1px] border-solid border-[#333]">
                                <th className="border-r-[1px] px-[6px] py-[4px] w-[20%] border-solid border-[#333]">
                                    Tên
                                </th>
                                <th className="w-[40%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                    Cú pháp
                                </th>
                                <th className="w-[100%] px-[6px] py-[4px]">Mô tả</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-[1px] border-solid border-[#333]">
                                <td className="border-r-[1px] px-[6px] py-[4px] w-[20%] border-solid border-[#333]">
                                    2 đài
                                </td>
                                <td className="w-[40%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                    2d 31 blo10
                                </td>
                                <td className="w-[100%] px-[6px] py-[4px]">2 đài bao gồm đài chính và đài phụ</td>
                            </tr>
                            <tr className="border-[1px] border-solid border-[#333]">
                                <td className="border-r-[1px] px-[6px] py-[4px] w-[20%] border-solid border-[#333]">
                                    3 đài
                                </td>
                                <td className="w-[40%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                    3d 31 blo10
                                </td>
                                <td className="w-[100%] px-[6px] py-[4px]">3 đài bao gồm đài chính và 2 đài phụ</td>
                            </tr>
                            <tr className="border-[1px] border-solid border-[#333]">
                                <td className="border-r-[1px] px-[6px] py-[4px] w-[20%] border-solid border-[#333]">
                                    4 đài
                                </td>
                                <td className="w-[40%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                    4d 31 blo10
                                </td>
                                <td className="w-[100%] px-[6px] py-[4px]">4 đài bao gồm đài chính và 3 đài phụ</td>
                            </tr>
                            <tr className="border-[1px] border-solid border-[#333]">
                                <td className="border-r-[1px] px-[6px] py-[4px] w-[20%] border-solid border-[#333]">
                                    Kéo
                                </td>
                                <td className="w-[40%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                    dc 90keo91 blo10
                                </td>
                                <td className="w-[100%] px-[6px] py-[4px]">
                                    <div>kéo, tới, đến, k</div>
                                    <div>bao lô từ số 90 đến số 91</div>
                                </td>
                            </tr>
                            <tr className="border-[1px] border-solid border-[#333]">
                                <td className="border-r-[1px] px-[6px] py-[4px] w-[20%] border-solid border-[#333]">
                                    Chẵn
                                </td>
                                <td className="w-[40%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                    dc chan blo10
                                </td>
                                <td className="w-[100%] px-[6px] py-[4px]">
                                    Các số chẵn từ 00,02,04…10,12,14…20,22,24…94,96,98 (50 số)
                                </td>
                            </tr>
                            <tr className="border-[1px] border-solid border-[#333]">
                                <td className="border-r-[1px] px-[6px] py-[4px] w-[20%] border-solid border-[#333]">
                                    Chẵn chẵn
                                </td>
                                <td className="w-[40%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                    dc chanchan blo10
                                </td>
                                <td className="w-[100%] px-[6px] py-[4px]">
                                    Đánh các số từ 00, 02, 04… 20,22,24…40,42,44…84,86,88 (25 số)
                                </td>
                            </tr>
                            <tr className="border-[1px] border-solid border-[#333]">
                                <td className="border-r-[1px] px-[6px] py-[4px] w-[20%] border-solid border-[#333]">
                                    Lẻ
                                </td>
                                <td className="w-[40%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                    dc le blo10
                                </td>
                                <td className="w-[100%] px-[6px] py-[4px]">
                                    Các số lẻ từ 01,03,04…21,23,25…95,97,99 (50 số)
                                </td>
                            </tr>
                            <tr className="border-[1px] border-solid border-[#333]">
                                <td className="border-r-[1px] px-[6px] py-[4px] w-[20%] border-solid border-[#333]">
                                    Lẻ lẻ
                                </td>
                                <td className="w-[40%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                    dc lele blo10
                                </td>
                                <td className="w-[100%] px-[6px] py-[4px]">
                                    Đánh các số từ 11,13,15…31,33,35…95,97,99 (25 số)
                                </td>
                            </tr>
                            <tr className="border-[1px] border-solid border-[#333]">
                                <td className="border-r-[1px] px-[6px] py-[4px] w-[20%] border-solid border-[#333]">
                                    Chẵn lẻ
                                </td>
                                <td className="w-[40%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                    dc chanle blo10
                                </td>
                                <td className="w-[100%] px-[6px] py-[4px]">
                                    Đánh các số từ 01,03,05…21,23,25…85,87,89 (25 số)
                                </td>
                            </tr>
                            <tr className="border-[1px] border-solid border-[#333]">
                                <td className="border-r-[1px] px-[6px] py-[4px] w-[20%] border-solid border-[#333]">
                                    Lẻ chẵn
                                </td>
                                <td className="w-[40%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                    dc lechan blo10
                                </td>
                                <td className="w-[100%] px-[6px] py-[4px]">
                                    Đánh các số từ 10,12,14…30,32,34…94,96,98 (25 số)
                                </td>
                            </tr>
                            <tr className="border-[1px] border-solid border-[#333]">
                                <td className="border-r-[1px] px-[6px] py-[4px] w-[20%] border-solid border-[#333]">
                                    Tài
                                </td>
                                <td className="w-[40%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                    dc tai blo10
                                </td>
                                <td className="w-[100%] px-[6px] py-[4px]">Các số tài từ 50,51,51…95,97,99 (50 số)</td>
                            </tr>
                            <tr className="border-[1px] border-solid border-[#333]">
                                <td className="border-r-[1px] px-[6px] py-[4px] w-[20%] border-solid border-[#333]">
                                    Tài tài
                                </td>
                                <td className="w-[40%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                    dc taitai blo10
                                </td>
                                <td className="w-[100%] px-[6px] py-[4px]">
                                    Đánh các số từ 55,56…65,66…95,97,99 (25 số)
                                </td>
                            </tr>
                            <tr className="border-[1px] border-solid border-[#333]">
                                <td className="border-r-[1px] px-[6px] py-[4px] w-[20%] border-solid border-[#333]">
                                    Xỉu
                                </td>
                                <td className="w-[40%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                    dc xiu blo10
                                </td>
                                <td className="w-[100%] px-[6px] py-[4px]">Các số xỉu từ 01,02,03…47,48,49 (50 số)</td>
                            </tr>
                            <tr className="border-[1px] border-solid border-[#333]">
                                <td className="border-r-[1px] px-[6px] py-[4px] w-[20%] border-solid border-[#333]">
                                    Xỉu xỉu
                                </td>
                                <td className="w-[40%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                    dc xiuxiu blo10
                                </td>
                                <td className="w-[100%] px-[6px] py-[4px]">
                                    Đánh các số từ 01,02…11,12…92,93,94 (25 số)
                                </td>
                            </tr>
                            <tr className="border-[1px] border-solid border-[#333]">
                                <td className="border-r-[1px] px-[6px] py-[4px] w-[20%] border-solid border-[#333]">
                                    Tài xỉu
                                </td>
                                <td className="w-[40%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                    dc taixiu blo10
                                </td>
                                <td className="w-[100%] px-[6px] py-[4px]">
                                    Đánh các số từ 51,52…61,62…92,93,94 (25 số)
                                </td>
                            </tr>
                            <tr className="border-[1px] border-solid border-[#333]">
                                <td className="border-r-[1px] px-[6px] py-[4px] w-[20%] border-solid border-[#333]">
                                    Xỉu tài
                                </td>
                                <td className="w-[40%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                    dc xiutai blo10
                                </td>
                                <td className="w-[100%] px-[6px] py-[4px]">
                                    Đánh các số từ 05,06…15,26…45,47,49 (25 số)
                                </td>
                            </tr>
                            <tr className="border-[1px] border-solid border-[#333]">
                                <td className="border-r-[1px] px-[6px] py-[4px] w-[20%] border-solid border-[#333]">
                                    Giáp
                                </td>
                                <td className="w-[40%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                    dc giap blo10
                                </td>
                                <td className="w-[100%] px-[6px] py-[4px]">
                                    Gồm 37 số: 06, 07, 09, 10, 11, 12, 14, 15, 18, 23, 26, 28, 32, 35, 46, 47, 49, 50,
                                    51, 52, 54, 55, 58, 63, 66, 68, 72, 75, 86, 87, 89, 90, 91, 92, 94, 95, 98
                                </td>
                            </tr>
                            <tr className="border-[1px] border-solid border-[#333]">
                                <td className="border-r-[1px] px-[6px] py-[4px] w-[20%] border-solid border-[#333]">
                                    Kết hợp nhiều kiểu đánh
                                </td>
                                <td className="w-[40%] px-[6px] py-[4px] border-r-[1px] border-solid border-[#333]">
                                    Dc 374 xc50 95 59 dd50 2d 73 59 19 blo50dx10
                                </td>
                                <td className="w-[100%] px-[6px] py-[4px]">
                                    <div>Đài chính đánh số 374 xỉu chủ 50 ngàn</div>
                                    <div>Đài chính đánh số 95 59 đầu đuôi 50 ngàn</div>
                                    <div>2 đài đánh số 73 59 19 bao lô 50 ngàn</div>
                                    <div>2 đài đánh số 73 59 19 đá xiên 50 ngàn</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Guide;
