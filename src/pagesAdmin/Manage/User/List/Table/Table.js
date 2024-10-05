import moment from 'moment';
import { useState } from 'react';
import { BsCaretUpFill, BsCaretDownFill, BsCaretDown, BsCaretUp } from 'react-icons/bs';
import ModalUpdate from '../../component/ModalUpdate';

function Table({
    users,
    setData,
    setArrangeStartDate,
    setSelectArrange,
    arrangeStartDate,
    selectArrange,
    setCurrentPage,
    setArrangeName,
    arrangeName,
    data,
}) {
    const [modalUpdate, setModalUpdate] = useState(false);
    const [selecterUser, setSelecterUser] = useState({});

    const handleUpdate = async (user) => {
        setSelecterUser(user);
        setModalUpdate(true);
    };

    const handleArrange = (type) => {
        setSelectArrange(type);
        if (type === 'name') {
            setArrangeName((prev) => !prev);
        } else if (type === 'startDate') {
            setArrangeStartDate((prev) => !prev);
        }
        setCurrentPage(0);
    };

    return (
        <div className="w-full mt-[26px] overflow-x-auto">
            <table className="lg:w-full w-[990px] rounded-[6px] overflow-hidden">
                <thead>
                    <tr className="text-[12px] w-[100%] bg-[#d8dce3]">
                        <th className="w-[5%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">STT</th>
                        <th
                            onClick={() => {
                                handleArrange('name');
                            }}
                            className="w-[12%] py-[8px] border-[1px] border-solid border-[#fff] uppercase"
                        >
                            <button className="flex items-center justify-around w-full uppercase cursor-pointer">
                                họ tên
                                <div className="flex items-center">
                                    {selectArrange === 'name' ? (
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
                        <th className="w-[15%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">
                            số điện thoại
                        </th>
                        <th className="w-[15%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">username</th>
                        <th className="w-[7%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">isAdmin</th>
                        <th
                            onClick={() => {
                                handleArrange('startDate');
                            }}
                            className="w-[15%] py-[8px] border-[1px] border-solid border-[#fff] uppercase"
                        >
                            <button className="flex items-center justify-around w-full uppercase cursor-pointer">
                                ngày tạo
                                <div className="flex items-center">
                                    {selectArrange === 'startDate' ? (
                                        arrangeStartDate ? (
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
                        <th className="w-[12%] py-[8px] border-[1px] border-solid border-[#fff] uppercase">active</th>
                    </tr>
                </thead>

                <tbody>
                    {users?.map((user, index) => (
                        <tr
                            onClick={() => handleUpdate(user)}
                            className={`text-[12px] cursor-pointer font-[490] ${
                                index % 2 === 0 ? 'bg-[#fff]' : 'bg-[#d8dce3]'
                            }`}
                            key={index}
                        >
                            <td className="px-[10px] py-[6px] w-[5%] border-[1px] border-solid border-[#fff]">
                                <div className="flex justify-center items-center">{index + 1}</div>
                            </td>
                            <td className="px-[10px] py-[6px] w-[12%] border-[1px] border-solid border-[#fff]">
                                <div>{user.name}</div>
                            </td>
                            <td className="px-[10px] py-[6px] w-[15%] border-[1px] border-solid border-[#fff]">
                                <div className="flex gap-[2px]">{user.phone}</div>
                            </td>
                            <td className="px-[10px] py-[6px] w-[15%] border-[1px] border-solid border-[#fff]">
                                <div>{user.username}</div>
                            </td>
                            <td className="px-[10px] py-[6px] w-[7%] border-[1px] border-solid border-[#fff]">
                                <div className="flex justify-center items-center font-[600]">
                                    {user.isAdmin ? 'true' : 'false'}
                                </div>
                            </td>
                            <td className="px-[10px] py-[6px] w-[15%] border-[1px] border-solid border-[#fff]">
                                <div className="flex items-center justify-center gap-[10px] text-[#4b4a4a]">
                                    {moment(user.createDate).format('DD-MM-YY')}
                                </div>
                            </td>
                            <td className="px-[10px] py-[6px] w-[15%] border-[1px] border-solid border-[#fff]">
                                <div className="flex items-center justify-center gap-[10px] text-[#4b4a4a]">
                                    {moment(user.updateDate).format('DD-MM-YY')}
                                </div>
                            </td>
                            <td className="px-[10px] py-[6px] w-[12%] border-[1px] border-solid border-[#fff]">
                                <div className="flex items-center justify-center font-[600] text-[#4b4a4a]">
                                    {user.isActive ? 'true' : 'false'}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalUpdate && (
                <ModalUpdate data={data} setData={setData} selecterUser={selecterUser} setModalUpdate={setModalUpdate} />
            )}
        </div>
    );
}

export default Table;
