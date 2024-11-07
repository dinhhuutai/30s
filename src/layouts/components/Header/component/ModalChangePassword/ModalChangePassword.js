import axios from 'axios';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsArrowRepeat } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import setAuthToken from '~/middlewares/setAuthToken';
import authSlice from '~/redux/slices/authSlice';

function ModalChangePassword({ setModalChangePassword, user, setUser }) {
    const [passwordOld, setPasswordOld] = useState('');
    const [passwordNew, setPasswordNew] = useState('');
    const [rePasswordNew, setRePasswordNew] = useState('');

    const [loading, setLoading] = useState(false);

    const [noticeError, setNoticeError] = useState({
        status: false,
        text: '',
    });

    const dispatch = useDispatch();

    const handleSave = async () => {
        if (!passwordOld) {
            setNoticeError({
                status: true,
                text: 'Chưa nhập mật khẩu cũ',
            });
        } else if (!passwordNew) {
            setNoticeError({
                status: true,
                text: 'Chưa nhập mật khẩu mới',
            });
        } else if (!rePasswordNew) {
            setNoticeError({
                status: true,
                text: 'Chưa nhập lại mật khẩu mới',
            });
        } else if (passwordNew !== rePasswordNew) {
            setNoticeError({
                status: true,
                text: 'Nhập lại mật khẩu mới không đúng',
            });
        } else {
            const formData = {
                password: passwordOld,
                passwordNew,
            };

            try {
                setLoading(true);
                const res = await axios.post(
                    `${process.env.REACT_APP_API_URL}/v1/user/changePassword/${user._id}`,
                    formData,
                );

                if (res.data.success) {
                    dispatch(
                        authSlice.actions.loginSuccess({
                            user: res.data?.user,
                            accessToken: res.data?.accessToken,
                        }),
                    );

                    setAuthToken(res.data?.accessToken);

                    setLoading(false);
                    setModalChangePassword(false);
                } else {
                    setNoticeError({
                        status: true,
                        text: 'Mật khẩu cũ không chính xác',
                    });
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                setNoticeError({
                    status: true,
                    text: 'Mật khẩu cũ không chính xác',
                });
                setModalChangePassword(false);
            }
        }
    };

    return (
        <div
            onClick={() => {
                setModalChangePassword(false);
            }}
            className="fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 z-[9999]"
        >
            <div className="top-0 absolute left-0 right-0 bottom-0 bg-[#000] opacity-[.4] z-[99]"></div>
            <div className="fixed flex justify-center overflow-y-auto overflow-x-hidden top-0 left-0 right-0 bottom-0 pb-[60px] opacity-[1] z-[999]">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#fff] animate-modalDownSlide text-[12px] lg:w-[500px] w-[96%] h-fit pb-[20px] shadow-xl rounded-[6px] mt-[30px] py-[14px]"
                >
                    <div className="flex justify-between items-center pb-[12px] border-b-[1px] border-solid border-[#f0f0f0] px-[26px]">
                        <h1 className="text-[14px] capitalize text-[#000] font-[620]">Thay đổi mật khẩu</h1>
                        <div onClick={() => setModalChangePassword(false)} className="cursor-pointer">
                            <AiOutlineClose />
                        </div>
                    </div>
                    <div className="mt-[16px] flex flex-col gap-[12px] lg:px-[26px] px-[16px]">
                        <div className="flex flex-col gap-[4px] lg:gap-[0px] lg:flex-row lg:items-center">
                            <label className="text-[12px] lg:mr-[20px] flex lg:justify-end text-[#000] lg:w-[30%]">
                                Mật khẩu cũ <span className="text-[#e92d2d] ml-[2px]">*</span>
                            </label>
                            <input
                                placeholder="Mật khẩu cũ"
                                value={passwordOld}
                                onChange={(e) => {
                                    setPasswordOld(e.target.value);
                                    setNoticeError({ status: false, text: '' });
                                }}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px] lg:gap-[0px] lg:flex-row lg:items-center">
                            <label className="text-[12px] lg:mr-[20px] flex lg:justify-end text-[#000] lg:w-[30%]">
                                Mật khẩu mới <span className="text-[#e92d2d] ml-[2px]">*</span>
                            </label>
                            <input
                                placeholder="Mật khẩu mới"
                                value={passwordNew}
                                onChange={(e) => {
                                    setPasswordNew(e.target.value);
                                    setNoticeError({ status: false, text: '' });
                                }}
                                className="px-[10px] py-[4px] flex-1 text-[#000] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px] lg:gap-[0px] lg:flex-row lg:items-center">
                            <label className="text-[12px] lg:mr-[20px] flex lg:justify-end text-[#000] lg:w-[30%]">
                                Nhập lại mật khẩu mới <span className="text-[#e92d2d] ml-[2px]">*</span>
                            </label>
                            <input
                                placeholder="Nhập lại mật khẩu mới"
                                value={rePasswordNew}
                                onChange={(e) => setRePasswordNew(e.target.value)}
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
                            onClick={() => setModalChangePassword(false)}
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

export default ModalChangePassword;
