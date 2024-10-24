import { useEffect, useState } from 'react';
import HeaderPage from '../component/HeaderPage';
import { BsArrowClockwise } from 'react-icons/bs';
import { AiFillRobot } from 'react-icons/ai';

import img1BotWhatsApp from '~/assets/imgs/botWhatsApp1.png';
import img2BotWhatsApp from '~/assets/imgs/botWhatsApp2.png';
import img3BotWhatsApp from '~/assets/imgs/botWhatsApp3.png';
import img4BotWhatsApp from '~/assets/imgs/botWhatsApp4.png';
import img5BotWhatsApp from '~/assets/imgs/botWhatsApp5.png';
import img6BotWhatsApp from '~/assets/imgs/botWhatsApp6.png';
import img7BotWhatsApp from '~/assets/imgs/botWhatsApp7.png';
import img8BotWhatsApp from '~/assets/imgs/botWhatsApp8.png';
import img9BotWhatsApp from '~/assets/imgs/botWhatsApp9.png';

function BotWhatsapp() {
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
            <HeaderPage pageCurr={'Bot WhatsApp'} />
            <div className="bg-[var(--color-white)] px-[16px] mt-[12px] py-[14px] pb-[68px] rounded-[6px]">
                <div className="flex justify-center">
                    <h1 className="text-[16px] font-[600] uppercase text-center">
                        Hướng dẫn tự động thêm tin nhắn vào hệ thống bằng bot{' '}
                        <span className="bg-[#fdfa29]">whatsapp</span>
                    </h1>
                </div>
                <div className="mt-[20px]">
                    <div className="flex w-fit rounded-[6px] overflow-hidden text-[var(--color-logo)] bg-[var(--bg-color-logo)]">
                        <div className="px-[14px] flex items-center">
                            <AiFillRobot className="text-[16px]" />
                        </div>
                        <div className="px-[14px] py-[6px] flex text-[12px] text-[#fff] bg-[var(--bg-color-header)]">
                            84923044965
                        </div>
                    </div>
                </div>
                <div className="mt-[10px]">
                    <h2 className="text-[14px] font-[600]">I. Hướng dẫn video:</h2>
                    <div className="flex justify-center mt-[10px]">
                        <iframe
                            src="https://drive.google.com/file/d/1uHUAB7kNyD-18wK9WlMgu6Hpsk1FgQv3/preview"
                            width="90%"
                            height="480"
                            allow="autoplay"
                            allowFullScreen
                            title="Video"
                        />
                    </div>
                </div>
                <div className="mt-[20px]">
                    <h2 className="text-[14px] font-[600]">II. Hướng dẫn chi tiết:</h2>
                    <div className="">
                        <div className="mt-[4px]">
                            <span className="ml-[8px] font-[550] block">Bước 1:</span>
                            <span className="ml-[10px]">
                                - Đầu tiên vào thông tin cá nhân. Nhập số điện thoại đã đăng kí ở whatsApp vào ô số điện
                                thoại và lưu lại.
                            </span>
                            <div className="flex justify-center mt-[4px]">
                                <img className="w-[90%] shadow-lg" src={img1BotWhatsApp} alt="1" />
                            </div>
                        </div>
                        <div className="mt-[4px]">
                            <span className="ml-[8px] font-[550] block mt-[10px]">Bước 2:</span>
                            <span className="ml-[10px]">
                                - Vào whatsApp tìm bot theo số điện thoại{' '}
                                <span className="font-[600]">84923044965</span>. Thêm vào liên lạc.
                            </span>
                            <div className="flex justify-center mt-[4px]">
                                <img className="w-[90%] shadow-lg" src={img2BotWhatsApp} alt="1" />
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            <span className="ml-[10px]">- Tạo nhóm với người chơi và chatbot.</span>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[4px] mt-[4px]">
                                <div className="flex justify-center">
                                    <img className="w-[90%] shadow-lg" src={img3BotWhatsApp} alt="2" />
                                </div>
                                <div className="flex justify-center">
                                    <img className="w-[90%] shadow-lg" src={img4BotWhatsApp} alt="3" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            <span className="ml-[10px]">
                                - Nhập <span className="font-[600]">/id</span> và gửi. Chatbot sẽ gửi lại id. Sao chép
                                id.
                            </span>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[4px] mt-[4px]">
                                <div className="flex justify-center">
                                    <img className="w-[90%] shadow-lg" src={img5BotWhatsApp} alt="2" />
                                </div>
                                <div className="flex justify-center mt-[20px]">
                                    <img className="w-[90%] shadow-lg" src={img6BotWhatsApp} alt="3" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            <span className="ml-[8px] font-[550] block mt-[10px]">Bước 3:</span>
                            <span className="ml-[10px]">
                                - Quay lại trang, Vào phần danh bạ. Ở cột thao tác vào phần chỉnh sửa thông tin người
                                chơi và dán id vào ô Phòng ID WhatsApp - rồi lưu lại.
                            </span>
                            <div className="flex justify-center mt-[4px]">
                                <img className="w-[90%] shadow-lg" src={img7BotWhatsApp} alt="3" />
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            <span className="ml-[10px]">
                                - Khi người chơi gửi tin nhắn, tin nhắn sẽ được cập nhật vào hệ thống.
                            </span>
                            <div className="flex justify-center">
                                <img className="w-[90%] shadow-lg" src={img8BotWhatsApp} alt="2" />
                            </div>
                            <div className="flex justify-center mt-[20px]">
                                <img className="w-[90%] shadow-lg" src={img9BotWhatsApp} alt="3" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BotWhatsapp;
