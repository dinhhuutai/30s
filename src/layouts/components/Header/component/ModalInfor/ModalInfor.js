import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsArrowRepeat } from 'react-icons/bs';
import { useSelector } from 'react-redux';

function ModalInfor({ setModalInfor, user, setUser }) {
    const [name, setName] = useState(user.name);
    const [idTelegram, setIdTelegram] = useState(user.idTelegram);
    const [username, setUsername] = useState(user.username);

    const [loading, setLoading] = useState(false);

    const [noticeError, setNoticeError] = useState({
        status: false,
        text: '',
    });

    const handleSave = async () => {
        if (!name) {
            setNoticeError({
                status: true,
                text: 'Tên không để trống',
            });
        } else {
            const formData = {
                name,
                idTelegram,
            };

            try {
                setLoading(true);
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/user/update/${user._id}`, formData);

                if (res.data.success) {
                    const data = {
                        login: {
                            currentUser: {
                                ...user,
                                ...formData,
                            },
                        },
                    };

                    setUser(data);

                    setLoading(false);
                    setModalInfor(false);
                }
            } catch (error) {
                setLoading(false);
                setModalInfor(false);
            }
        }
    };

    return (
        <div
            onClick={() => {
                setModalInfor(false);
            }}
            className="fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 z-[9999]"
        >
            <div className="top-0 absolute left-0 right-0 bottom-0 bg-[#000] opacity-[.4] z-[99]"></div>
            <div className="fixed flex justify-center overflow-y-auto overflow-x-hidden top-0 left-0 right-0 bottom-0 pb-[60px] opacity-[1] z-[999]">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#fff] animate-modalDownSlide text-[12px] w-[500px] h-fit pb-[20px] shadow-xl rounded-[6px] mt-[30px] py-[14px]"
                >
                    <div className="flex justify-between items-center pb-[12px] border-b-[1px] border-solid border-[#f0f0f0] px-[26px]">
                        <h1 className="text-[14px] capitalize text-[#000] font-[620]">Chỉnh sửa thông tin cá nhân</h1>
                        <div onClick={() => setModalInfor(false)} className="cursor-pointer">
                            <AiOutlineClose />
                        </div>
                    </div>
                    <div className="mt-[16px] px-[26px]">
                        <div className="flex items-center">
                            <label className="text-[12px] mr-[20px] flex justify-end text-[#000] w-[30%]">
                                Tài khoản <span className="text-[#e92d2d] ml-[2px]">*</span>
                            </label>
                            <input
                                readOnly
                                placeholder="Tài khoản"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setNoticeError({ status: false, text: '' });
                                }}
                                className="px-[10px] py-[4px] flex-1 text-[#9fa8bc] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex items-center mt-[20px]">
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
                            onClick={() => setModalInfor(false)}
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

export default ModalInfor;
