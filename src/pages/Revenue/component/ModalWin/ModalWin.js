import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsArrowClockwise, BsEyeFill } from 'react-icons/bs';
import ModalSms from '../ModalSms';

function ModalWin({ setModalWin, selectRevenue }) {
    const [smsDetails, setSmsDetails] = useState([]);
    const [loadingUp, setLoadingUp] = useState(true);

    const [modalSms, setModalSms] = useState(false);
    const [idSms, setIdSms] = useState();

    useEffect(() => {
        handleGetData();
    }, [selectRevenue]);

    const handleGetData = async () => {
        try {
            setLoadingUp(true);
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/v1/smsDetail/findSmsDetailByRevenueWin?resultDate=${selectRevenue.resultDate}`,
                selectRevenue,
            );

            if (res.data.success) {
                setSmsDetails(res.data.smsDetails);
                setLoadingUp(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            onClick={() => {
                setModalWin(false);
            }}
            className="fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 z-[9999]"
        >
            {loadingUp ? (
                <div className="left-0 right-0 fixed z-[999999] top-0">
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
            <div className="top-0 absolute left-0 right-0 bottom-0 bg-[#000] opacity-[.4] z-[99]"></div>
            <div className="fixed flex justify-center overflow-y-auto overflow-x-hidden top-0 left-0 right-0 bottom-0 pb-[60px] opacity-[1] z-[999]">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#fff] animate-modalDownSlide text-[12px] lg:w-[900px] w-[370px] h-fit pb-[20px] shadow-xl rounded-[6px] mt-[30px] py-[14px]"
                >
                    <div className="flex justify-between items-center pb-[12px] border-b-[1px] border-solid border-[#f0f0f0] px-[26px]">
                        <h1 className="text-[14px] capitalize text-[#000] font-[650]">{`Danh sách trúng của ${
                            selectRevenue.name
                        } - ${
                            selectRevenue.domain === 'mn'
                                ? 'Miền Nam'
                                : selectRevenue.domain === 'mt'
                                ? 'Miền Trung'
                                : 'Miền Bắc'
                        }`}</h1>
                        <div onClick={() => setModalWin(false)} className="cursor-pointer">
                            <AiOutlineClose />
                        </div>
                    </div>

                    <div className="mx-[10px] overflow-x-auto overflow-hidden">
                        <div className="lg:w-full w-[900px] lg:mt-[16px] h-[600px] overflow-y-auto">
                            <table className="w-full rounded-[6px] overflow-hidden">
                                <thead>
                                    <tr className="text-[11px] w-[100%] bg-[#d8dce3]">
                                        <th className="w-[5%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                            STT
                                        </th>
                                        <th className="w-[18%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                            đài
                                        </th>
                                        <th className="w-[12%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                            kiểu
                                        </th>
                                        <th className="w-[24%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                            nội dung đã tách
                                        </th>
                                        <th className="w-[9%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                            số
                                        </th>
                                        <th className="w-[7%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                            đặt
                                        </th>
                                        <th className="w-[17%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                            trúng
                                        </th>
                                        <th className="w-[18%] py-[8px] border-[1px] border-solid border-[#fff] uppercase"></th>
                                    </tr>
                                </thead>

                                <tbody className="">
                                    {smsDetails?.map((sms, index) => (
                                        <tr
                                            className={`text-[12px] font-[490] ${
                                                index % 2 === 0 ? 'bg-[#fff]' : 'bg-[#d8dce3]'
                                            }`}
                                            key={index}
                                        >
                                            <td className="px-[10px] py-[8px] w-[5%] border-[1px] border-solid border-[#fff]">
                                                <div className="flex justify-center items-center">{index + 1}</div>
                                            </td>
                                            <td className="px-[10px] py-[8px] w-[18%] border-[1px] border-solid border-[#fff]">
                                                <div className="flex justify-center items-center">
                                                    {sms.province.map((pro, i) => (
                                                        <div key={i} className="ml-[2px]">{`${i !== 0 ? '-' : ''} ${
                                                            pro === 'tp'
                                                                ? 'T.Phố'
                                                                : pro === 'dt'
                                                                ? 'Đ.Tháp'
                                                                : pro === 'cm'
                                                                ? 'C.Mau'
                                                                : pro === 'br'
                                                                ? 'B.Tre'
                                                                : pro === 'vt'
                                                                ? 'V.Tàu'
                                                                : pro === 'bi'
                                                                ? 'B.Liêu'
                                                                : pro === 'dn'
                                                                ? 'Đ.Nai'
                                                                : pro === 'ct'
                                                                ? 'C.Thơ'
                                                                : pro === 'st'
                                                                ? 'S.Trăng'
                                                                : pro === 'tn'
                                                                ? 'T.Ninh'
                                                                : pro === 'ag'
                                                                ? 'A.Giang'
                                                                : pro === 'bt'
                                                                ? 'B.Thuận'
                                                                : pro === 'bu'
                                                                ? 'B.Dương'
                                                                : pro === 'vl'
                                                                ? 'V.Long'
                                                                : pro === 'tv'
                                                                ? 'Tr.Vinh'
                                                                : pro === 'la'
                                                                ? 'L.An'
                                                                : pro === 'bp'
                                                                ? 'B.Phước'
                                                                : pro === 'hg'
                                                                ? 'H.Giang'
                                                                : pro === 'tg'
                                                                ? 'T.Giang'
                                                                : pro === 'kg'
                                                                ? 'K.Giang'
                                                                : pro === 'lt'
                                                                ? 'Đ.Lạt'
                                                                : pro === 'py'
                                                                ? 'Ph.Yên'
                                                                : pro === 'hu'
                                                                ? 'Huế'
                                                                : pro === 'dl'
                                                                ? 'Đ.Lắk'
                                                                : pro === 'qn'
                                                                ? 'Q.Nam'
                                                                : pro === 'dg'
                                                                ? 'Đ.Nẵng'
                                                                : pro === 'kh'
                                                                ? 'K.Hòa'
                                                                : pro === 'qb'
                                                                ? 'Q.Bình'
                                                                : pro === 'bd'
                                                                ? 'B.Định'
                                                                : pro === 'qt'
                                                                ? 'Q.Trị'
                                                                : pro === 'gl'
                                                                ? 'G.Lai'
                                                                : pro === 'nt'
                                                                ? 'N.Thuận'
                                                                : pro === 'qg'
                                                                ? 'Q.Ngãi'
                                                                : pro === 'do'
                                                                ? 'Đ.Nông'
                                                                : pro === 'kt'
                                                                ? 'K.Tum'
                                                                : ''
                                                        }`}</div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-[10px] py-[8px] w-[12%] border-[1px] border-solid border-[#fff]">
                                                <div className="flex justify-center items-center">
                                                    {sms.typePlay === 'baolo' || sms.typePlay === 'baolodao'
                                                        ? 'Bao lô'
                                                        : sms.typePlay === 'dauduoi'
                                                        ? 'Đầu Đuôi'
                                                        : sms.typePlay === 'xiuchu' || sms.typePlay === 'xiuchudao'
                                                        ? 'Xỉu chủ'
                                                        : sms.typePlay === 'dau'
                                                        ? 'Đầu'
                                                        : sms.typePlay === 'duoi'
                                                        ? 'Đuôi'
                                                        : sms.typePlay === 'xiuchudau'
                                                        ? 'Xỉu Chủ Đầu'
                                                        : sms.typePlay === 'xiuchuduoi'
                                                        ? 'Xỉu Chủ Đuôi'
                                                        : sms.typePlay === 'da(thang)'
                                                        ? 'Đá Thẳng'
                                                        : 'Đá Xiên'}
                                                </div>
                                            </td>
                                            <td className="px-[10px] py-[8px] w-[24%] border-[1px] border-solid border-[#fff]">
                                                <div className="flex justify-center items-center">{sms.content}</div>
                                            </td>
                                            <td className="px-[10px] py-[8px] w-[9%] border-[1px] border-solid border-[#fff]">
                                                <div className="flex justify-center items-center">
                                                    {sms.typePlay === 'da(thang)' || sms.typePlay === 'da(xien)'
                                                        ? sms.number[0] + ' - ' + sms.number[1]
                                                        : sms.number[0]}
                                                    {sms.quantityLike > 1 && (
                                                        <span className="ml-[5px] w-[16px] h-[16px] flex justify-center items-center rounded-[50%] bg-[#d9534f] text-[10px] text-[#fff] font-[600]">
                                                            {sms.quantityLike}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-[10px] py-[8px] w-[7%] border-[1px] border-solid border-[#fff]">
                                                <div className="flex justify-center items-center">
                                                    {sms.price.toLocaleString()}
                                                </div>
                                            </td>
                                            <td className="px-[10px] py-[8px] w-[17%] border-[1px] border-solid border-[#fff]">
                                                <div
                                                    className={`flex items-center justify-center gap-[10px] text-[14px] font-[650] ${
                                                        sms.tientrung > 0 ? 'text-[#00f]' : 'text-[#d9534f]'
                                                    }`}
                                                >
                                                    {sms.tientrung.toLocaleString()}
                                                </div>
                                            </td>
                                            <td className="px-[10px] py-[8px] w-[8%] border-[1px] border-solid border-[#fff]">
                                                <div
                                                    onClick={() => {
                                                        setIdSms(sms.idSms);
                                                        setModalSms(true);
                                                    }}
                                                    className="flex justify-center items-center text-[#259dba] text-[14px] cursor-pointer hover:opacity-[.8]"
                                                >
                                                    <BsEyeFill />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex justify-end gap-[10px] items-center mt-[20px] pt-[12px] border-t-[1px] border-solid border-[#f0f0f0] px-[26px]"></div>
                    {modalSms && <ModalSms setModalSms={setModalSms} idSms={idSms} setModalWin={setModalWin} />}
                </div>
            </div>
        </div>
    );
}

export default ModalWin;
