import { Switch } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsArrowRepeat } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { userSelector } from '~/redux/selectors';

function ModalCreate({ setModalCreate, setMembers }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState([]);
    const [phoneTmp, setPhoneTmp] = useState();
    const [idTelegram, setIdTelegram] = useState('');
    const [runNumber, setRunNumber] = useState(false);

    const [co2conMN, setCo2conMN] = useState(0.75);
    const [codauduoiMN, setCodauduoiMN] = useState(0.75);
    const [codathangMN, setCodathangMN] = useState(0.75);
    const [codaxienMN, setCodaxienMN] = useState(0.75);
    const [co3conMN, setCo3conMN] = useState(0.75);
    const [co4conMN, setCo4conMN] = useState(0.75);
    const [coxiuchuMN, setCoxiuchuMN] = useState(0.75);

    const [trung2conMN, setTrung2conMN] = useState(75);
    const [trungdauduoiMN, setTrungdauduoiMN] = useState(75);
    const [trungdathangMN, setTrungdathangMN] = useState(750);
    const [trungdaxienMN, setTrungdaxienMN] = useState(550);
    const [trung3conMN, setTrung3conMN] = useState(600);
    const [trung4conMN, setTrung4conMN] = useState(5000);
    const [trungxiuchuMN, setTrungxiuchuMN] = useState(600);

    const [co2conMT, setCo2conMT] = useState(0.75);
    const [codauduoiMT, setCodauduoiMT] = useState(0.75);
    const [codathangMT, setCodathangMT] = useState(0.75);
    const [codaxienMT, setCodaxienMT] = useState(0.75);
    const [co3conMT, setCo3conMT] = useState(0.75);
    const [co4conMT, setCo4conMT] = useState(0.75);
    const [coxiuchuMT, setCoxiuchuMT] = useState(0.75);

    const [trung2conMT, setTrung2conMT] = useState(75);
    const [trungdauduoiMT, setTrungdauduoiMT] = useState(75);
    const [trungdathangMT, setTrungdathangMT] = useState(750);
    const [trungdaxienMT, setTrungdaxienMT] = useState(550);
    const [trung3conMT, setTrung3conMT] = useState(600);
    const [trung4conMT, setTrung4conMT] = useState(5000);
    const [trungxiuchuMT, setTrungxiuchuMT] = useState(600);

    const [co2conMB, setCo2conMB] = useState(0.75);
    const [codauduoiMB, setCodauduoiMB] = useState(0.75);
    const [codathangMB, setCodathangMB] = useState(0.75);
    const [co3conMB, setCo3conMB] = useState(0.75);
    const [co4conMB, setCo4conMB] = useState(0.75);
    const [coxiuchuMB, setCoxiuchuMB] = useState(0.75);

    const [trung2conMB, setTrung2conMB] = useState(75);
    const [trungdauduoiMB, setTrungdauduoiMB] = useState(75);
    const [trungdathangMB, setTrungdathangMB] = useState(750);
    const [trung3conMB, setTrung3conMB] = useState(600);
    const [trung4conMB, setTrung4conMB] = useState(5000);
    const [trungxiuchuMB, setTrungxiuchuMB] = useState(600);

    const [loading, setLoading] = useState(false);

    const [noticeError, setNoticeError] = useState({
        status: false,
        text: '',
    });

    const tmp = useSelector(userSelector);
    const [user, setUser] = useState(tmp);
    useEffect(() => {
        setUser(tmp);
    }, [tmp]);

    const handleSave = async () => {
        if (!name) {
            setNoticeError({
                status: true,
                text: 'Chưa nhập tên',
            });
        } else {
            const formData = {
                idUser: user.login.currentUser._id,
                name,
                idTelegram,
                phone,
                runNumber,
                co2conMN,
                codauduoiMN,
                codathangMN,
                codaxienMN,
                co3conMN,
                coxiuchuMN,
                co4conMN,
                trung2conMN,
                trungdauduoiMN,
                trungdathangMN,
                trungdaxienMN,
                trung3conMN,
                trungxiuchuMN,
                trung4conMN,
                co2conMT,
                codauduoiMT,
                codathangMT,
                codaxienMT,
                co3conMT,
                coxiuchuMT,
                co4conMT,
                trung2conMT,
                trungdauduoiMT,
                trungdathangMT,
                trungdaxienMT,
                trung3conMT,
                trungxiuchuMT,
                trung4conMT,
                co2conMB,
                codauduoiMB,
                codathangMB,
                co3conMB,
                coxiuchuMB,
                co4conMB,
                trung2conMB,
                trungdauduoiMB,
                trungdathangMB,
                trung3conMB,
                trungxiuchuMB,
                trung4conMB,
            };

            try {
                setLoading(true);
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/member/create`, formData);

                if (res.data.success) {

                    const res = await axios.post(
                        `${process.env.REACT_APP_API_URL}/v1/member/findAllMemberByIdUser/${user.login.currentUser._id}`,
                    );

                    if (res.data.success) {
                        setMembers(res.data.members);
                    }
                    
                    setLoading(false);
                    setModalCreate(false);
                }
            } catch (error) {
                setLoading(false);
                setModalCreate(false);
            }
        }
    };

    return (
        <div className="fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 z-[9999]">
            <div className="top-0 absolute left-0 right-0 bottom-0 bg-[#000] opacity-[.4] z-[99]"></div>
            <div className="fixed flex justify-center overflow-y-auto overflow-x-hidden top-0 left-0 right-0 bottom-0 pb-[60px] opacity-[1] z-[999]">
                <div className="bg-[#fff] animate-modalDownSlide text-[12px] w-[500px] h-fit pb-[20px] shadow-xl rounded-[6px] mt-[30px] py-[14px]">
                    <div className="flex justify-between items-center pb-[12px] border-b-[1px] border-solid border-[#f0f0f0] px-[26px]">
                        <h1 className="text-[14px] capitalize text-[#000] font-[620]">Thêm mới</h1>
                        <div onClick={() => setModalCreate(false)} className="cursor-pointer">
                            <AiOutlineClose />
                        </div>
                    </div>
                    <div className="mt-[16px] px-[26px]">
                        <div className="flex items-center">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Tên <span className="text-[#e92d2d] ml-[2px]">*</span>
                            </label>
                            <input
                                placeholder="Tên"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setNoticeError({ status: false, text: '' });
                                }}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Phòng ID Telegram
                            </label>
                            <input
                                placeholder="Phòng ID Telegram"
                                value={idTelegram}
                                onChange={(e) => setIdTelegram(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Điện thoại
                            </label>
                            <div className="flex-1 flex gap-[4px] flex-col">
                                <div className="flex gap-[4px] flex-wrap">
                                    {phone.map((e) => (
                                        <div className="px-[8px] flex items-center py-[4px] bg-[#e0dcdc] text-[10px] text-[#000] w-fit rounded-[8px]">
                                            {e}
                                            <div
                                                onClick={() => {
                                                    const phoneArrNew = phone.filter((item) => item !== e);
                                                    setPhone(phoneArrNew);
                                                }}
                                                className="flex ml-[4px] cursor-pointer"
                                            >
                                                <AiOutlineClose />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <input
                                    value={phoneTmp}
                                    onChange={(e) => setPhoneTmp(e.target.value)}
                                    onBlur={() => {
                                        if (/^\d+$/.test(phoneTmp) && phoneTmp.length >= 9 && phoneTmp.length <= 11) {
                                            setPhone([...phone, phoneTmp]);
                                            setPhoneTmp('');
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();

                                            if (
                                                /^\d+$/.test(phoneTmp) &&
                                                phoneTmp.length >= 9 &&
                                                phoneTmp.length <= 11
                                            ) {
                                                setPhone([...phone, phoneTmp]);
                                                setPhoneTmp('');
                                            }
                                        }
                                    }}
                                    placeholder="Điện thoại"
                                    className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                                />
                            </div>
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Chạy số
                            </label>
                            <Switch
                                value={runNumber}
                                onChange={(e) => setRunNumber(e)}
                                checkedChildren="Bật"
                                unCheckedChildren="Tắt"
                            />
                        </div>
                        <div className="border-t-[1px] border-solid border-[#f0f0f0] my-[20px]">
                            <h2 className="mt-[10px] text-[#000] font-[640]">Giá Miền Nam</h2>
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Giá cò 2 con MN
                            </label>
                            <input
                                placeholder="Giá cò 2 con MN"
                                type="number"
                                value={co2conMN}
                                onChange={(e) => setCo2conMN(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Giá cò đầu đuôi MN
                            </label>
                            <input
                                placeholder="Giá cò đầu đuôi MN"
                                type="number"
                                value={codauduoiMN}
                                onChange={(e) => setCodauduoiMN(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Giá cò đá thẳng MN
                            </label>
                            <input
                                placeholder="Giá cò đá thẳng MN"
                                type="number"
                                value={codathangMN}
                                onChange={(e) => setCodathangMN(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Giá cò đá xiên MN
                            </label>
                            <input
                                placeholder="Giá cò đá xiên MN"
                                type="number"
                                value={codaxienMN}
                                onChange={(e) => setCodaxienMN(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Giá cò 3 con MN
                            </label>
                            <input
                                placeholder="Giá cò 3 con MN"
                                type="number"
                                value={co3conMN}
                                onChange={(e) => setCo3conMN(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Giá cò xỉu chủ MN
                            </label>
                            <input
                                placeholder="Giá cò xỉu chủ MN"
                                type="number"
                                value={coxiuchuMN}
                                onChange={(e) => setCoxiuchuMN(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Giá cò 4 con MN
                            </label>
                            <input
                                placeholder="Giá cò 4 con MN"
                                type="number"
                                value={co4conMN}
                                onChange={(e) => setCo4conMN(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>

                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Trúng 2 con MN
                            </label>
                            <input
                                placeholder="Trúng 2 con MN"
                                type="number"
                                value={trung2conMN}
                                onChange={(e) => setTrung2conMN(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Trúng đầu đuôi MN
                            </label>
                            <input
                                placeholder="Trúng đầu đuôi MN"
                                type="number"
                                value={trungdauduoiMN}
                                onChange={(e) => setTrungdauduoiMN(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Trúng đá thẳng MN
                            </label>
                            <input
                                placeholder="Trúng đá thẳng MN"
                                type="number"
                                value={trungdathangMN}
                                onChange={(e) => setTrungdathangMN(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Trúng đá xiên MN
                            </label>
                            <input
                                placeholder="Trúng đá xiên MN"
                                type="number"
                                value={trungdaxienMN}
                                onChange={(e) => setTrungdaxienMN(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Trúng 3 con MN
                            </label>
                            <input
                                placeholder="Trúng 3 con MN"
                                type="number"
                                value={trung3conMN}
                                onChange={(e) => setTrung3conMN(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Trúng xỉu chủ MN
                            </label>
                            <input
                                placeholder="Trúng xỉu chủ MN"
                                type="number"
                                value={trungxiuchuMN}
                                onChange={(e) => setTrungxiuchuMN(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Trúng 4 con MN
                            </label>
                            <input
                                placeholder="Trúng 4 con MN"
                                type="number"
                                value={trung4conMN}
                                onChange={(e) => setTrung4conMN(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>

                        <div className="border-t-[1px] border-solid border-[#f0f0f0] my-[20px]">
                            <h2 className="mt-[10px] text-[#000] font-[640]">Giá Miền Trung</h2>
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Giá cò 2 con MT
                            </label>
                            <input
                                placeholder="Giá cò 2 con MT"
                                type="number"
                                value={co2conMT}
                                onChange={(e) => setCo2conMT(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Giá cò đầu đuôi MT
                            </label>
                            <input
                                placeholder="Giá cò đầu đuôi MT"
                                type="number"
                                value={codauduoiMT}
                                onChange={(e) => setCodauduoiMT(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Giá cò đá thẳng MT
                            </label>
                            <input
                                placeholder="Giá cò đá thẳng MT"
                                type="number"
                                value={codathangMT}
                                onChange={(e) => setCodathangMT(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Giá cò đá xiên MT
                            </label>
                            <input
                                placeholder="Giá cò đá xiên MT"
                                type="number"
                                value={codaxienMT}
                                onChange={(e) => setCodaxienMT(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Giá cò 3 con MT
                            </label>
                            <input
                                placeholder="Giá cò 3 con MT"
                                type="number"
                                value={co3conMT}
                                onChange={(e) => setCo3conMT(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Giá cò xỉu chủ MT
                            </label>
                            <input
                                placeholder="Giá cò xỉu chủ MT"
                                type="number"
                                value={coxiuchuMT}
                                onChange={(e) => setCoxiuchuMT(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Giá cò 4 con MT
                            </label>
                            <input
                                placeholder="Giá cò 4 con MT"
                                type="number"
                                value={co4conMT}
                                onChange={(e) => setCo4conMT(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>

                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Trúng 2 con MT
                            </label>
                            <input
                                placeholder="Trúng 2 con MT"
                                type="number"
                                value={trung2conMT}
                                onChange={(e) => setTrung2conMT(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Trúng đầu đuôi MT
                            </label>
                            <input
                                placeholder="Trúng đầu đuôi MT"
                                type="number"
                                value={trungdauduoiMT}
                                onChange={(e) => setTrungdauduoiMT(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Trúng đá thẳng MT
                            </label>
                            <input
                                placeholder="Trúng đá thẳng MT"
                                type="number"
                                value={trungdathangMT}
                                onChange={(e) => setTrungdathangMT(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Trúng đá xiên MT
                            </label>
                            <input
                                placeholder="Trúng đá xiên MT"
                                type="number"
                                value={trungdaxienMT}
                                onChange={(e) => setTrungdaxienMT(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Trúng 3 con MT
                            </label>
                            <input
                                placeholder="Trúng 3 con MT"
                                type="number"
                                value={trung3conMT}
                                onChange={(e) => setTrung3conMT(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Trúng xỉu chủ MT
                            </label>
                            <input
                                placeholder="Trúng xỉu chủ MT"
                                type="number"
                                value={trungxiuchuMT}
                                onChange={(e) => setTrungxiuchuMT(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Trúng 4 con MT
                            </label>
                            <input
                                placeholder="Trúng 4 con MT"
                                type="number"
                                value={trung4conMT}
                                onChange={(e) => setTrung4conMT(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>

                        <div className="border-t-[1px] border-solid border-[#f0f0f0] my-[20px]">
                            <h2 className="mt-[10px] text-[#000] font-[640]">Giá Miền Bắc</h2>
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Giá cò 2 con MB
                            </label>
                            <input
                                placeholder="Giá cò 2 con MB"
                                type="number"
                                value={co2conMB}
                                onChange={(e) => setCo2conMB(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Giá cò đầu đuôi MB
                            </label>
                            <input
                                placeholder="Giá cò đầu đuôi MB"
                                type="number"
                                value={codauduoiMB}
                                onChange={(e) => setCodauduoiMB(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Giá cò đá thẳng MB
                            </label>
                            <input
                                placeholder="Giá cò đá thẳng MB"
                                type="number"
                                value={codathangMB}
                                onChange={(e) => setCodathangMB(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Giá cò 3 con MB
                            </label>
                            <input
                                placeholder="Giá cò 3 con MB"
                                type="number"
                                value={co3conMB}
                                onChange={(e) => setCo3conMB(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Giá cò xỉu chủ MB
                            </label>
                            <input
                                placeholder="Giá cò xỉu chủ MB"
                                value={coxiuchuMB}
                                onChange={(e) => setCoxiuchuMB(e.target.value)}
                                type="number"
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Giá cò 4 con MB
                            </label>
                            <input
                                placeholder="Giá cò 4 con MB"
                                type="number"
                                value={co4conMB}
                                onChange={(e) => setCo4conMB(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>

                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Trúng 2 con MB
                            </label>
                            <input
                                placeholder="Trúng 2 con MB"
                                type="number"
                                value={trung2conMB}
                                onChange={(e) => setTrung2conMB(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Trúng đầu đuôi MB
                            </label>
                            <input
                                placeholder="Trúng đầu đuôi MB"
                                type="number"
                                value={trungdauduoiMB}
                                onChange={(e) => setTrungdauduoiMB(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Trúng đá thẳng MB
                            </label>
                            <input
                                placeholder="Trúng đá thẳng MB"
                                type="number"
                                value={trungdathangMB}
                                onChange={(e) => setTrungdathangMB(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Trúng 3 con MB
                            </label>
                            <input
                                placeholder="Trúng 3 con MB"
                                type="number"
                                value={trung3conMB}
                                onChange={(e) => setTrung3conMB(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Trúng xỉu chủ MB
                            </label>
                            <input
                                placeholder="Trúng xỉu chủ MB"
                                type="number"
                                value={trungxiuchuMB}
                                onChange={(e) => setTrungxiuchuMB(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Trúng 4 con MB
                            </label>
                            <input
                                placeholder="Trúng 4 con MB"
                                type="number"
                                value={trung4conMB}
                                onChange={(e) => setTrung4conMB(e.target.value)}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>

                        {noticeError.status && (
                            <div className="text-[12px] text-[#e25444dc] flex justify-end mt-[14px] font-[600]">
                                {noticeError.text}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-[10px] items-center mt-[20px] pt-[12px] border-t-[1px] border-solid border-[#f0f0f0] px-[26px]">
                        <button
                            disabled={loading}
                            onClick={handleSave}
                            className={`${
                                loading ? 'opacity-[.7] hover:opacity-[.7]' : 'hover:opacity-[.9]'
                            } uppercase font-[620] text-[10px] w-[60px] h-[30px] flex justify-center items-center bg-[#2574ab] rounded-[4px] text-[#fff] active:opacity-[.7]`}
                        >
                            {loading ? (
                                <div className="text-[20px] animate-loading">
                                    <BsArrowRepeat />
                                </div>
                            ) : (
                                'Lưu'
                            )}
                        </button>
                        <button
                            onClick={() => setModalCreate(false)}
                            className={`hover:opacity-[.9] uppercase font-[650] text-[10px] border-[1px] border-solid border-[#ccc] w-[60px] h-[30px] flex justify-center items-center rounded-[4px] text-[#000] active:opacity-[.7]`}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalCreate;
