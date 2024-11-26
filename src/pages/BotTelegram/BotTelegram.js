import { useEffect, useState } from 'react';
import HeaderPage from '../component/HeaderPage';
import { BsArrowClockwise } from 'react-icons/bs';
import { BiSolidBot } from 'react-icons/bi';

import img1BotTelegram from '~/assets/imgs/botTelegram1.png';
import img2BotTelegram from '~/assets/imgs/botTelegram2.png';
import img3BotTelegram from '~/assets/imgs/botTelegram3.png';
import img4BotTelegram from '~/assets/imgs/botTelegram4.png';
import img5BotTelegram from '~/assets/imgs/botTelegram5.png';
import img6BotTelegram from '~/assets/imgs/botTelegram6.png';
import img7BotTelegram from '~/assets/imgs/botTelegram7.png';
import img8BotTelegram from '~/assets/imgs/botTelegram8.png';
import img9BotTelegram from '~/assets/imgs/botTelegram9.png';
import img10BotTelegram from '~/assets/imgs/botTelegram10.png';
import img11BotTelegram from '~/assets/imgs/botTelegram11.png';
import img12BotTelegram from '~/assets/imgs/botTelegram12.png';
import img13BotTelegram from '~/assets/imgs/botTelegram13.png';
import img15BotTelegram from '~/assets/imgs/botTelegram15.png';
import img16BotTelegram from '~/assets/imgs/botTelegram16.png';
import img18BotTelegram from '~/assets/imgs/botTelegram18.png';
import img19BotTelegram from '~/assets/imgs/botTelegram19.png';
import img20BotTelegram from '~/assets/imgs/botTelegram20.png';
import img21BotTelegram from '~/assets/imgs/botTelegram21.png';
import img22BotTelegram from '~/assets/imgs/botTelegram22.png';
import img23BotTelegram from '~/assets/imgs/botTelegram23.png';
import img24BotTelegram from '~/assets/imgs/botTelegram24.png';
import img25BotTelegram from '~/assets/imgs/botTelegram25.png';
import img26BotTelegram from '~/assets/imgs/botTelegram26.png';
import { Helmet } from 'react-helmet';

function BotTelegram() {
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
            <Helmet>
                <title>Hướng Dẫn ChatBot Telegram - 10s</title> {/* Cập nhật tiêu đề trang */}
                <meta name="description" content="Đây là Website 10s ứng dụng tính tiền số." /> {/* Mô tả cho SEO */}
                <meta property="og:title" content="Đây là Website 10s ứng dụng tính tiền số." />{' '}
                {/* Open Graph title */}
                <meta property="og:description" content="Trang này giúp tính tiền số tự động nhanh gọn lẹ." />
                {/* Open Graph description */}
                <meta property="og:image" content="https://example.com/og-image.jpg" /> {/* Open Graph image */}
                <meta property="og:url" content="https://example.com/my-page" /> {/* URL của trang */}
                <link rel="icon" href="" type="image/x-icon" />
            </Helmet>
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
            <HeaderPage pageCurr={'Bot Telegram'} />
            <div className="bg-[var(--color-white)] px-[16px] mt-[12px] py-[14px] pb-[68px] rounded-[6px]">
                <div className="flex justify-center">
                    <h1 className="text-[16px] font-[600] uppercase text-center">
                        Hướng dẫn tự động thêm tin nhắn vào hệ thống bằng bot{' '}
                        <span className="bg-[#fdfa29]">telegram</span>
                    </h1>
                </div>
                <div className="mt-[20px]">
                    <div className="flex w-fit rounded-[6px] overflow-hidden text-[var(--color-logo)] bg-[var(--bg-color-logo)]">
                        <div className="px-[14px] flex items-center">
                            <BiSolidBot className="text-[16px]" />
                        </div>
                        <div className="px-[14px] py-[6px] flex text-[12px] text-[#fff] bg-[var(--bg-color-header)]">
                            @s10bot_bot
                        </div>
                    </div>
                </div>
                <div className="mt-[10px]">
                    <h2 className="text-[14px] font-[600]">I. Hướng dẫn video:</h2>
                    <div className="flex justify-center mt-[10px]">
                        <iframe
                            src="https://drive.google.com/file/d/1GRXjG0J823C-cPG3w5_ZokCDGt_pK5lC/preview"
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
                                - Đầu tiên vào telegram tìm chat bot <span className="font-[600]">@s10bot_bot</span>.
                            </span>
                            <div className="flex justify-center mt-[4px]">
                                <img className="w-[50%] shadow-lg" src={img1BotTelegram} alt="1" />
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            <span className="ml-[10px]">
                                - Bấm <span className="font-[600]">/start</span> rồi nhập{' '}
                                <span className="font-[600]">/id</span> và gửi. Chatbot sẽ gửi lại id. Sao chép id.
                            </span>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[4px] mt-[4px]">
                                <div className="flex justify-center">
                                    <img className="w-[90%] shadow-lg" src={img2BotTelegram} alt="2" />
                                </div>
                                <div className="flex justify-center">
                                    <img className="w-[90%] shadow-lg" src={img3BotTelegram} alt="3" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            <span className="ml-[10px]">
                                - Vào phần thông tin cá nhân. Dán id vào trường ID Telegram rồi bấm lưu.
                            </span>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[4px] mt-[4px]">
                                <div className="flex justify-center">
                                    <img className="w-[90%] shadow-lg" src={img4BotTelegram} alt="2" />
                                </div>
                                <div className="flex justify-center">
                                    <img className="w-[90%] shadow-lg" src={img5BotTelegram} alt="3" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            <span className="ml-[8px] font-[550] block mt-[10px]">Bước 2:</span>
                            <span className="ml-[10px]">- Thêm người chơi mới.</span>
                            <div className="flex justify-center mt-[4px]">
                                <img className="w-[90%] shadow-lg" src={img6BotTelegram} alt="3" />
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            <span className="ml-[10px]">- Nhập thông tin người chơi và lưu.</span>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[4px] mt-[4px]">
                                <div className="flex justify-center">
                                    <img className="w-[90%] shadow-lg" src={img7BotTelegram} alt="2" />
                                </div>
                                <div className="flex justify-center">
                                    <img className="w-[90%] shadow-lg" src={img8BotTelegram} alt="3" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            <span className="ml-[8px] font-[550] block mt-[10px]">Bước 3:</span>
                            <span className="ml-[10px]">
                                - Tìm người chơi trên ứng dụng telegram và thêm vào danh sách liên lạc.
                            </span>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[4px] mt-[4px]">
                                <div className="flex justify-center">
                                    <img className="w-[90%] shadow-lg" src={img9BotTelegram} alt="2" />
                                </div>
                                <div className="flex justify-center">
                                    <img className="w-[90%] shadow-lg" src={img10BotTelegram} alt="3" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            <span className="ml-[10px]">- Tạo nhóm trên telegram.</span>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[4px] mt-[4px]">
                                <div className="flex justify-center">
                                    <img className="w-[90%] shadow-lg" src={img11BotTelegram} alt="2" />
                                </div>
                                <div className="flex justify-center">
                                    <img className="w-[90%] shadow-lg" src={img12BotTelegram} alt="3" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            <span className="ml-[10px]">- Thêm người chơi vào nhóm telegram</span>
                            <div className="flex justify-center mt-[4px]">
                                <img className="w-[90%] shadow-lg" src={img13BotTelegram} alt="3" />
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            <span className="ml-[10px]">- Tiếp theo, thêm chat bot vào telegram.</span>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[4px] mt-[4px]">
                                <div className="flex justify-center">
                                    <img className="w-[90%] shadow-lg" src={img15BotTelegram} alt="2" />
                                </div>
                                <div className="flex justify-center">
                                    <img className="w-[90%] shadow-lg" src={img16BotTelegram} alt="3" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            <span className="ml-[10px]">- Cấp quyền admin cho chatbot.</span>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[4px] mt-[4px]">
                                <div className="flex justify-center">
                                    <img className="w-[90%] shadow-lg" src={img18BotTelegram} alt="2" />
                                </div>
                                <div className="flex justify-center">
                                    <img className="w-[90%] shadow-lg" src={img19BotTelegram} alt="3" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            <span className="ml-[10px]">
                                - Gửi <span className="font-[600]">/id</span> để chatbot gửi lại id phòng telegram. Sao
                                chép id đó.
                            </span>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[4px] mt-[4px]">
                                <div className="flex justify-center">
                                    <img className="w-[90%] shadow-lg" src={img20BotTelegram} alt="2" />
                                </div>
                                <div className="flex justify-center">
                                    <img className="w-[90%] shadow-lg" src={img21BotTelegram} alt="3" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            <span className="ml-[8px] font-[550] block mt-[10px]">Bước 4:</span>
                            <span className="ml-[10px]">
                                - Quay lại trang tính tiền, ở cột thao tác nhấn vào chỉnh sửa thông tin người chơi.
                            </span>
                            <div className="flex justify-center mt-[4px]">
                                <img className="w-[90%] shadow-lg" src={img22BotTelegram} alt="3" />
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            <span className="ml-[10px]">
                                - Dán id vừa sao chép vào trường Phòng ID Telegram và lưu.
                            </span>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[4px] mt-[4px]">
                                <div className="flex justify-center">
                                    <img className="w-[90%] shadow-lg" src={img23BotTelegram} alt="2" />
                                </div>
                                <div className="flex justify-center">
                                    <img className="w-[90%] shadow-lg" src={img24BotTelegram} alt="3" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            <span className="ml-[10px]">
                                - Khi người chơi gửi tin nhắn. Chatbot tự động gửi tiền cò của tin.
                            </span>
                            <div className="flex justify-center mt-[4px]">
                                <img className="w-[90%] shadow-lg" src={img25BotTelegram} alt="3" />
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            <span className="ml-[10px]">
                                - Tin nhắn tự động được cập nhật lên hệ thống. Loại tin Telegram.
                            </span>
                            <div className="flex justify-center mt-[4px]">
                                <img className="w-[90%] shadow-lg" src={img26BotTelegram} alt="3" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BotTelegram;
