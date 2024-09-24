import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsPencil, BsTrash, BsCaretUpFill, BsCaretDownFill, BsCaretDown, BsCaretUp } from 'react-icons/bs';
import useDebounce from '~/utils/useDebounce';
import ModalCreate from './component/ModalCreate';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { noticeAdminSelector, userSelector } from '~/redux/selectors';
import moment from 'moment';
import ModalUpdate from './component/ModalUpdate';
import Alert from '~/components/Alert';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';
import Tippy from '@tippyjs/react';
import HeaderPage from '../component/HeaderPage';

let setTimeoutTmp;

function Member() {
    const [nameSearch, setNameSearch] = useState('');
    const [members, setMembers] = useState([]);
    const [modalCreate, setModalCreate] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [selecterMember, setSelecterMember] = useState({});

    const [arrangeName, setArrangeName] = useState(true);
    const [arrangeCreateDate, setArrangeCreateDate] = useState(true);
    const [typeArrange, setTypeArrange] = useState('name');

    const [width, setWidth] = useState(0);

    useEffect(() => {
        const width = window.innerWidth;

        setWidth(width);
    }, []);

    const tmp = useSelector(userSelector);
    const [user, setUser] = useState(tmp);
    useEffect(() => {
        setUser(tmp);
    }, [tmp]);

    const nameSearchDebounced = useDebounce(nameSearch, 500);

    useEffect(() => {
        handleSearchMember();
    }, [nameSearchDebounced, arrangeName, arrangeCreateDate]);

    const handleSearchMember = async () => {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/v1/member/findMemberByNameAndPhone/${
                user.login.currentUser._id
            }?name=${nameSearchDebounced}&${
                typeArrange === 'createDate'
                    ? `sortCreateDate=${arrangeCreateDate ? '1' : '-1'}`
                    : `sortName=${arrangeName ? '1' : '-1'}`
            }`,
        );

        if (res.data.success) {
            setMembers(res.data.members);
        }
    };

    const handleUpdate = async (member) => {
        setSelecterMember(member);
        setModalUpdate(true);
    };

    // const notice = useSelector(noticeAdminSelector);

    // useEffect(() => {
    //     if (!notice.state) {
    //         clearTimeout(setTimeoutTmp);
    //     }
    // }, [notice.state]);

    const dispatch = useDispatch();

    const handleDelete = async (member) => {
        try {
            dispatch(noticeAdminSlice.actions.processingNotice('Đang xóa người chơi'));
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/member/delete/${member._id}`);

            if (res.data.success) {
                handleSearchMember();

                dispatch(noticeAdminSlice.actions.successNotice('Xóa người chơi thành công'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [5000]);
            } else {
                dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống!!!'));
                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [5000]);
            }
        } catch (error) {
            dispatch(noticeAdminSlice.actions.errorNotice('Lỗi hệ thống!!!'));
            setTimeoutTmp = setTimeout(() => {
                dispatch(noticeAdminSlice.actions.hiddenNotice());
            }, [5000]);
        }
    };

    return (
        <div>
            <HeaderPage pageCurr={'Danh Bạ'} />
            <div className="bg-[var(--color-white)] px-[16px] mt-[12px] py-[14px] pb-[28px] rounded-[6px]">
                <div>
                    <button
                        onClick={() => setModalCreate(true)}
                        className={`hover:opacity-[.9] uppercase font-[620] text-[12px] w-[120px] h-[30px] flex justify-center items-center bg-[#2574ab] rounded-[4px] text-[#fff] active:opacity-[.7]`}
                    >
                        Thêm mới
                    </button>
                </div>

                <div className="mt-[16px] flex flex-col lg:flex-row gap-[10px]">
                    <input
                        value={nameSearch}
                        onChange={(e) => setNameSearch(e.target.value)}
                        placeholder="Tên, SĐT"
                        className="py-[4px] w-[100%] lg:w-auto px-[8px] outline-none text-[12px] border-[1px] border-solid border-[#ccc] rounded-[4px]"
                    />
                    <button className="py-[4px] w-[60px] px-[8px] border-[1px] border-solid flex items-center gap-[4px] border-[#ccc] rounded-[4px]">
                        <AiOutlineSearch />
                        <span className="uppercase text-[12px] font-[640] text-[#000]">xem</span>
                    </button>
                </div>

                <div className="w-full mt-[26px] overflow-x-auto">
                    <table className="lg:w-full w-[900px] rounded-[6px] overflow-hidden">
                        <thead>
                            <tr className="text-[12px] w-[100%] bg-[#d8dce3]">
                                <th className="w-[5%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                    STT
                                </th>
                                <th
                                    onClick={() => {
                                        setTypeArrange('name');
                                        setArrangeName((prev) => !prev);
                                    }}
                                    className="w-[12%] py-[8px] border-[1px] border-solid border-[#fff] uppercase"
                                >
                                    <button className="flex items-center justify-around w-full uppercase cursor-pointer">
                                        người chơi
                                        <div className="flex items-center">
                                            {typeArrange === 'name' ? (
                                                arrangeName ? (
                                                    <>
                                                        <BsCaretUpFill />
                                                        <BsCaretDown />
                                                    </>
                                                ) : (
                                                    <>
                                                        <BsCaretUp />
                                                        <BsCaretDownFill />
                                                    </>
                                                )
                                            ) : (
                                                <>
                                                    <BsCaretUp />
                                                    <BsCaretDown />
                                                </>
                                            )}
                                        </div>
                                    </button>
                                </th>
                                <th className="w-[18%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                    số điện thoại
                                </th>
                                <th className="w-[15%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                    phòng telegram
                                </th>
                                <th className="w-[7%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                    chạy số
                                </th>
                                <th
                                    onClick={() => {
                                        setTypeArrange('createDate');
                                        setArrangeCreateDate((prev) => !prev);
                                    }}
                                    className="w-[15%] py-[8px] border-[1px] border-solid border-[#fff] uppercase"
                                >
                                    <button className="flex items-center justify-around w-full uppercase cursor-pointer">
                                        ngày tạo
                                        <div className="flex items-center">
                                            {typeArrange === 'createDate' ? (
                                                arrangeCreateDate ? (
                                                    <>
                                                        <BsCaretUp />
                                                        <BsCaretDownFill />
                                                    </>
                                                ) : (
                                                    <>
                                                        <BsCaretUpFill />
                                                        <BsCaretDown />
                                                    </>
                                                )
                                            ) : (
                                                <>
                                                    <BsCaretUp />
                                                    <BsCaretDown />
                                                </>
                                            )}
                                        </div>
                                    </button>
                                </th>
                                <th className="w-[15%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                    ngày cập nhật
                                </th>
                                <th className="w-[12%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                    thao tác
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {members?.map((member, index) => (
                                <tr
                                    className={`text-[12px] font-[490] ${
                                        index % 2 === 0 ? 'bg-[#fff]' : 'bg-[#d8dce3]'
                                    }`}
                                    key={index}
                                >
                                    <td className="px-[10px] py-[6px] w-[5%] border-[1px] border-solid border-[#fff]">
                                        <div className="flex justify-center items-center">{index + 1}</div>
                                    </td>
                                    <td className="px-[10px] py-[6px] w-[12%] border-[1px] border-solid border-[#fff]">
                                        <div>{member.name}</div>
                                    </td>
                                    <td className="px-[10px] py-[6px] w-[18%] border-[1px] border-solid border-[#fff]">
                                        <div className="flex gap-[2px]">
                                            {member.phone.map((ph, i) => (
                                                <div className="w-fit text-[10px] px-[6px] rounded-[12px] bg-[#2574ab] text-[#fff]">
                                                    +{ph}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-[10px] py-[6px] w-[15%] border-[1px] border-solid border-[#fff]">
                                        <div>{member.idTelegram}</div>
                                    </td>
                                    <td className="px-[10px] py-[6px] w-[7%] border-[1px] border-solid border-[#fff]">
                                        <div className="flex justify-center items-center">
                                            <div
                                                className={`uppercase w-fit text-[10px] px-[8px] py-[2px] rounded-[14px] text-[#fff] ${
                                                    member.runNumber ? 'bg-[#2574ab]' : 'bg-[#828282]'
                                                }`}
                                            >
                                                {member.runNumber ? 'bật' : 'tắt'}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-[10px] py-[6px] w-[15%] border-[1px] border-solid border-[#fff]">
                                        <div>{moment(member.createDate).format('DD-MM-YY hh:mm A')}</div>
                                    </td>
                                    <td className="px-[10px] py-[6px] w-[15%] border-[1px] border-solid border-[#fff]">
                                        <div>{moment(member.updateDate).format('DD-MM-YY hh:mm A')}</div>
                                    </td>
                                    <td className="px-[10px] py-[6px] w-[12%] border-[1px] border-solid border-[#fff]">
                                        <div className="flex items-center justify-center gap-[10px] text-[#4b4a4a]">
                                            {width < 768 ? (
                                                <>
                                                    <div
                                                        onClick={() => handleUpdate(member)}
                                                        className="px-[4px] cursor-pointer hover:text-[#7588b1]"
                                                    >
                                                        <BsPencil />
                                                    </div>
                                                    <Alert
                                                        funcHandle={() => handleDelete(member)}
                                                        title="Xóa Người Chơi"
                                                        content={`Bạn có chắc chắn muốn xóa người chơi "${member.name}" không?`}
                                                    >
                                                        <div className="px-[4px] cursor-pointer hover:text-[#7588b1]">
                                                            <BsTrash />
                                                        </div>
                                                    </Alert>
                                                </>
                                            ) : (
                                                <>
                                                    <Tippy
                                                        placement="bottom-start"
                                                        arrow={false}
                                                        content={
                                                            <span className="text-[10px] px-[6px] hidden lg:block rounded-[4px] bg-[#000] text-[#fff] py-[2px]">
                                                                Chỉnh sửa người chơi
                                                            </span>
                                                        }
                                                    >
                                                        <div
                                                            onClick={() => handleUpdate(member)}
                                                            className="px-[4px] cursor-pointer hover:text-[#7588b1]"
                                                        >
                                                            <BsPencil />
                                                        </div>
                                                    </Tippy>
                                                    <Alert
                                                        funcHandle={() => handleDelete(member)}
                                                        title="Xóa Người Chơi"
                                                        content={`Bạn có chắc chắn muốn xóa người chơi "${member.name}" không?`}
                                                    >
                                                        <Tippy
                                                            placement="bottom-start"
                                                            arrow={false}
                                                            content={
                                                                <span className="text-[10px] px-[6px] hidden lg:block rounded-[4px] bg-[#000] text-[#fff] py-[2px]">
                                                                    Xóa người chơi
                                                                </span>
                                                            }
                                                        >
                                                            <div className="px-[4px] cursor-pointer hover:text-[#7588b1]">
                                                                <BsTrash />
                                                            </div>
                                                        </Tippy>
                                                    </Alert>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {modalCreate && <ModalCreate setModalCreate={setModalCreate} setMembers={setMembers} />}
                {modalUpdate && (
                    <ModalUpdate
                        setModalUpdate={setModalUpdate}
                        setMembers={setMembers}
                        selecterMember={selecterMember}
                    />
                )}
            </div>
        </div>
    );
}

export default Member;
