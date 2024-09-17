import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsPencil, BsTrash } from 'react-icons/bs';
import useDebounce from '~/utils/useDebounce';
import ModalCreate from './component/ModalCreate';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { userSelector } from '~/redux/selectors';
import moment from 'moment';
import ModalUpdate from './component/ModalUpdate';

function Member() {
    const [nameSearch, setNameSearch] = useState('');
    const [members, setMembers] = useState([]);
    const [modalCreate, setModalCreate] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [selecterMember, setSelecterMember] = useState({});

    const tmp = useSelector(userSelector);
    const [user, setUser] = useState(tmp);
    useEffect(() => {
        setUser(tmp);
    }, [tmp]);

    const nameSearchDebounced = useDebounce(nameSearch, 500);

    useEffect(() => {
        console.log(nameSearchDebounced);
    }, [nameSearchDebounced]);

    const handleFindMembers = async () => {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/v1/member/findAllMemberByIdUser/${user.login.currentUser._id}`,
        );

        if (res.data.success) {
            setMembers(res.data.members);
        }
    };

    useState(() => {
        handleFindMembers();
    }, []);

    const handleUpdate = async (member) => {
        setMembers(member);
        setModalUpdate(true);
    };

    return (
        <div className="bg-[var(--color-white)] px-[16px] py-[14px] pb-[28px] rounded-[6px]">
            <div>
                <button
                    onClick={() => setModalCreate(true)}
                    className={`hover:opacity-[.9] uppercase font-[620] text-[12px] w-[120px] h-[30px] flex justify-center items-center bg-[#2574ab] rounded-[4px] text-[#fff] active:opacity-[.7]`}
                >
                    Thêm mới
                </button>
            </div>

            <div className="mt-[16px] flex gap-[10px]">
                <input
                    value={nameSearch}
                    onChange={(e) => setNameSearch(e.target.value)}
                    placeholder="Tên, SĐT"
                    className="py-[4px] px-[8px] outline-none text-[12px] border-[1px] border-solid border-[#ccc] rounded-[4px]"
                />
                <button className="py-[4px] px-[8px] border-[1px] border-solid flex items-center gap-[4px] border-[#ccc] rounded-[4px]">
                    <AiOutlineSearch />
                    <span className="uppercase text-[12px] font-[640] text-[#000]">xem</span>
                </button>
            </div>

            <div className="w-full mt-[26px]">
                <table className="w-full rounded-[6px] overflow-hidden">
                    <thead>
                        <tr className="text-[12px] w-[100%] bg-[#d8dce3]">
                            <th className="w-[5%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">STT</th>
                            <th className="w-[12%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                người chơi
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
                            <th className="w-[15%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                                ngày tạo
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
                        {members.map((member, index) => (
                            <tr
                                className={`text-[12px] font-[490] ${index % 2 === 0 ? 'bg-[#fff]' : 'bg-[#d8dce3]'}`}
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
                                        <div onClick={() => handleUpdate(member)} className="px-[4px] cursor-pointer">
                                            <BsPencil />
                                        </div>
                                        <div className="px-[4px] cursor-pointer">
                                            <BsTrash />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {modalCreate && <ModalCreate setModalCreate={setModalCreate} setMembers={setMembers} />}
            {modalUpdate && (
                <ModalUpdate setModalUpdate={setModalCreate} setMembers={setMembers} selecterMember={selecterMember} />
            )}
        </div>
    );
}

export default Member;
