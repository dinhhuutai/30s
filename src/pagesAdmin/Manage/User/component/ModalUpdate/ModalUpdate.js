import { Switch } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsArrowRepeat } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '~/components/Alert';
import { noticeAdminSelector, userSelector } from '~/redux/selectors';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';

let setTimeoutTmp;

function ModalUpdate({ setModalUpdate, setData, selecterUser, data }) {
    const [name, setName] = useState(selecterUser.name);
    const [phone, setPhone] = useState(selecterUser.phone);

    const [username, setUsername] = useState(selecterUser.username);
    const [password, setPassword] = useState();
    const [isAdmin, setIsAdmin] = useState(selecterUser.isAdmin);
    const [isActive, setIsActive] = useState(selecterUser.isActive);

    const [loading, setLoading] = useState(false);

    const [noticeError, setNoticeError] = useState({
        status: false,
        text: '',
    });

    const notice = useSelector(noticeAdminSelector);
    useEffect(() => {
        if (!notice.state) {
            clearTimeout(setTimeoutTmp);
        }
    }, [notice.state]);

    const tmp = useSelector(userSelector);
    const [user, setUser] = useState(tmp);
    useEffect(() => {
        setUser(tmp);
    }, [tmp]);

    const dispatch = useDispatch();

    const handleSave = async () => {
        if (!name) {
            setNoticeError({
                status: true,
                text: 'Chưa nhập tên',
            });
        } else {
            let passwordObj = {};

            if (password) {
                passwordObj = {
                    password,
                };
            }
            const formData = {
                name,
                username,
                phone,
                isAdmin,
                isActive,
                ...passwordObj,
            };

            try {
                dispatch(noticeAdminSlice.actions.processingNotice('Đang cập nhật user'));

                setLoading(true);
                const res = await axios.post(
                    `${process.env.REACT_APP_API_URL}/v1/user/update/${selecterUser._id}`,
                    formData,
                );

                if (res.data.success) {
                    const res = await axios.post(
                        `${process.env.REACT_APP_API_URL}/v1/user/find?limit=5&skip=0&sortName=1`,
                    );

                    if (res.data.success) {
                        setData({
                            ...data,
                            user: res.data.user,
                            totalUser: res.data.totalUser,
                            totalAddToday: res.data.totalAddToday,
                        });
                    }

                    dispatch(noticeAdminSlice.actions.successNotice('Cập nhật user thành công'));

                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [5000]);

                    setLoading(false);
                    setModalUpdate(false);
                }
            } catch (error) {
                setLoading(false);
                setModalUpdate(false);

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [5000]);
            }
        }
    };

    return (
        <div
            onClick={() => {
                setModalUpdate(false);
            }}
            className="fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 z-[9999]"
        >
            <div className="top-0 absolute left-0 right-0 bottom-0 bg-[#000] opacity-[.4] z-[99]"></div>
            <div className="fixed flex justify-center overflow-y-auto overflow-x-hidden top-0 left-0 right-0 bottom-0 pb-[60px] opacity-[1] z-[999]">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#fff] animate-modalDownSlide text-[12px] lg:w-[500px] w-[370px] h-fit pb-[20px] shadow-xl rounded-[6px] mt-[30px] py-[14px]"
                >
                    <div className="flex justify-between items-center pb-[12px] border-b-[1px] border-solid border-[#f0f0f0] px-[26px]">
                        <h1 className="text-[14px] text-[#000] font-[620]">
                            {`Chỉnh Sửa Thông Tin User "${selecterUser.name}"`}
                        </h1>
                        <div onClick={() => setModalUpdate(false)} className="cursor-pointer">
                            <AiOutlineClose />
                        </div>
                    </div>
                    <div className="mt-[16px] px-[26px]">
                        <div className="flex gap-[20px]">
                            <div className="flex flex-col gap-[4px] w-[50%]">
                                <div className="flex flex-col gap-[4px]">
                                    <label>
                                        Name User: <span className="text-[red] text-[14px] font-[700]">*</span>
                                    </label>
                                    <input
                                        value={name}
                                        name="name"
                                        onChange={(e) => setName(e.target.value)}
                                        className="border-[1px] px-[8px] py-[2px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                        type="text"
                                        placeholder="Name User"
                                    />
                                </div>

                                <div className="flex flex-col gap-[4px] mt-[14px]">
                                    <label>
                                        Phone User: <span className="text-[red] text-[14px] font-[700]">*</span>
                                    </label>
                                    <input
                                        value={phone}
                                        name="phone"
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="border-[1px] px-[8px] py-[2px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                        type="text"
                                        placeholder="Phone User"
                                    />
                                </div>

                                <div className="flex gap-[4px] mt-[20px] items-center">
                                    <label className="flex justify-around items-center">Is Admin:</label>
                                    <div className="flex justify-around items-center ml-[6px]">
                                        <Switch
                                            value={isAdmin}
                                            onChange={(e) => setIsAdmin(e)}
                                            checkedChildren="Bật"
                                            unCheckedChildren="Tắt"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[4px] w-[50%]">
                                <div className="flex flex-col gap-[4px]">
                                    <label>
                                        Username: <span className="text-[red] text-[14px] font-[700]">*</span>
                                    </label>
                                    <input
                                        readOnly
                                        value={username}
                                        name="name"
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="border-[1px] px-[8px] py-[2px] text-[#9fa8bc] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                        type="text"
                                        placeholder="Username"
                                    />
                                </div>

                                <div className="flex flex-col gap-[4px] mt-[14px]">
                                    <label>
                                        Password: <span className="text-[red] text-[14px] font-[700]">*</span>
                                    </label>
                                    <input
                                        value={password}
                                        name="name"
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="border-[1px] px-[8px] py-[2px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                        type="text"
                                        placeholder="Password"
                                    />
                                </div>

                                <div className="flex gap-[4px] mt-[20px] items-center">
                                    <label className="flex justify-around items-center">Khóa tài khoản:</label>
                                    <div className="flex justify-around items-center ml-[6px]">
                                        <Switch
                                            value={!isActive}
                                            onChange={(e) => setIsActive(!e)}
                                            checkedChildren="Bật"
                                            unCheckedChildren="Tắt"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {noticeError.status && (
                            <div className="text-[12px] text-[#e25444dc] flex justify-end mt-[14px] font-[600]">
                                {noticeError.text}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-[10px] items-center mt-[20px] pt-[12px] border-t-[1px] border-solid border-[#f0f0f0] px-[26px]">
                        <Alert
                            funcHandle={handleSave}
                            title="Sửa thông tin user"
                            content={`Bạn có chắc chắn muốn thay đổi thông tin khách hàng "${selecterUser.name}"`}
                        >
                            <button
                                disabled={loading}
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
                        </Alert>
                        <button
                            onClick={() => setModalUpdate(false)}
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

export default ModalUpdate;
