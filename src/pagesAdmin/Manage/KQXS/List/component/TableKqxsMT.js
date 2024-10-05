import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { BsX, BsCheck2, BsArrowRepeat } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { noticeAdminSelector } from '~/redux/selectors';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';

let setTimeoutTmp;

function TableKqxsMT({ kqxsMT, day, date, setKqxsMT }) {
    let pro1 =
        day === 2
            ? 'py'
            : day === 3
            ? 'dl'
            : day === 4
            ? 'dg'
            : day === 5
            ? 'qb'
            : day === 6
            ? 'gl'
            : day === 7
            ? 'dg'
            : 'kh';

    let pro2 =
        day === 2
            ? 'hu'
            : day === 3
            ? 'qn'
            : day === 4
            ? 'kh'
            : day === 5
            ? 'bd'
            : day === 6
            ? 'nt'
            : day === 7
            ? 'qg'
            : 'kt';

    let pro3 = day === 5 ? 'qt' : day === 7 ? 'do' : day === 1 ? 'hu' : '';

    const [localSelect, setLocalSelect] = useState({
        rank: 0,
        indexInRank: 0,
        province: '',
    });
    const [value, setValue] = useState();
    const [loading, setLoading] = useState(false);

    const notice = useSelector(noticeAdminSelector);
    useEffect(() => {
        if (!notice.state) {
            clearTimeout(setTimeoutTmp);
        }
    }, [notice.state]);

    const dispatch = useDispatch();

    const handleUpdate = async () => {
        try {
            setLoading(true);
            dispatch(noticeAdminSlice.actions.processingNotice('Đang lưu'));

            if (value !== '') {
                const formattedDate = moment(date).format('DD/MM/YYYY');

                let plusIndex = 0;
                if (localSelect.rank > 5) {
                    plusIndex = 9;
                } else if (localSelect.rank > 4) {
                    plusIndex = 8;
                } else if (localSelect.rank > 2) {
                    plusIndex = 2;
                }

                const formData = {
                    province: localSelect.province,
                    newNum: value,
                    resultDate: formattedDate,
                    index: localSelect.rank + localSelect.indexInRank + plusIndex,
                };

                const res = await axios.post(
                    `${process.env.REACT_APP_API_URL}/v1/kqxs/findKqxsByDateAndProvince`,
                    formData,
                );

                if (res.data.success) {
                    kqxsMT[localSelect.rank][localSelect.province][localSelect.indexInRank] = value;
                    setKqxsMT(kqxsMT);

                    setLocalSelect({
                        rank: 0,
                        indexInRank: 0,
                        province: '',
                    });
                    setValue('');
                    setLoading(false);

                    dispatch(noticeAdminSlice.actions.successNotice('Thay đổi thành công'));

                    setTimeoutTmp = setTimeout(() => {
                        dispatch(noticeAdminSlice.actions.hiddenNotice());
                    }, [5000]);
                }
            } else {
                setLoading(false);

                dispatch(noticeAdminSlice.actions.errorNotice('Không được để trống'));
            }
        } catch (error) {
            setLoading(false);

            dispatch(noticeAdminSlice.actions.errorNotice('Chưa có KQXS'));

            setTimeoutTmp = setTimeout(() => {
                dispatch(noticeAdminSlice.actions.hiddenNotice());
            }, [5000]);
        }
    };

    return (
        <div class="mt-[10px] overflow-x-auto w-[100%] flex">
            <table className="w-[100%]">
                <thead>
                    <tr className="bg-[#f0f1f4] flex grid-flow-col">
                        <th className="justify-center flex items-center w-[50px] px-[2px] py-[6px] border-[1px] border-[#fff]"></th>
                        <th
                            className={`justify-center flex flex-1 items-center ${
                                day === 1 || day === 5 || day === 7 ? 'w-[90px]' : 'w-[135px]'
                            } px-[2px] py-[6px] capitalize text-[12px] border-[1px] border-[#fff]`}
                        >
                            {day === 2
                                ? 'phú yên'
                                : day === 3
                                ? 'đắk lắk'
                                : day === 4
                                ? 'đà nẵng'
                                : day === 5
                                ? 'quảng bình'
                                : day === 6
                                ? 'gia lai'
                                : day === 7
                                ? 'đà nẵng'
                                : 'khánh hòa'}
                        </th>
                        <th
                            className={`justify-center flex flex-1 items-center ${
                                day === 1 || day === 5 || day === 7 ? 'w-[90px]' : 'w-[135px]'
                            } px-[2px] py-[6px] capitalize text-[12px] border-[1px] border-[#fff]`}
                        >
                            {day === 2
                                ? 'Huế'
                                : day === 3
                                ? 'quảng nam'
                                : day === 4
                                ? 'khánh hòa'
                                : day === 5
                                ? 'bình định'
                                : day === 6
                                ? 'ninh thuận'
                                : day === 7
                                ? 'quảng ngãi'
                                : 'kom tum'}
                        </th>
                        {(day === 1 || day === 5 || day === 7) && (
                            <th className="justify-center flex flex-1 items-center w-[90px] px-[2px] py-[6px] capitalize text-[12px] border-[1px] border-[#fff]">
                                {day === 1 ? 'huế' : day === 5 ? 'quảng trị' : day === 7 ? 'đắc nông' : ''}
                            </th>
                        )}
                    </tr>
                </thead>

                <tbody>
                    {kqxsMT?.map((e, i) => (
                        <tr key={i} className="bg-[#f0f1f4] flex grid-flow-col text-[12px]">
                            <td className="px-[2px] py-[6px] w-[50px] flex justify-center items-center border-[1px] border-[#fff]">{`${
                                i !== 8 ? `Giải ${8 - i}` : 'ĐB'
                            }`}</td>
                            <td
                                className={`flex flex-1 flex-col items-center justify-center ${
                                    day === 1 || day === 5 || day === 7 ? 'w-[90px]' : 'w-[135px]'
                                } px-[2px] py-[6px] col-span-2 border-[1px] border-[#fff] ${
                                    i === 0 || i === 8
                                        ? 'text-[14px] text-[#f02b2b] font-[650]'
                                        : 'text-[#000] font-[600]'
                                }`}
                            >
                                {e?.[pro1]?.map((el, ii) => (
                                    <button
                                        onDoubleClick={() => {
                                            setLocalSelect({
                                                rank: i,
                                                indexInRank: ii,
                                                province: pro1,
                                            });
                                            setValue(el);
                                        }}
                                        className="w-[100%] flex justify-center"
                                        key={el}
                                    >
                                        {localSelect.rank === i &&
                                        localSelect.indexInRank === ii &&
                                        localSelect.province === pro1 ? (
                                            <div className="w-[80%]">
                                                <input
                                                    className="w-[100%] px-[4px] outline-none border-[1px] border-solid border-[#bdbcbc] rounded-[2px]"
                                                    value={value}
                                                    onChange={(eValue) => setValue(eValue.target.value)}
                                                />

                                                <div className="mt-[6px] flex gap-[4px] justify-center">
                                                    <button
                                                        disabled={loading}
                                                        onClick={handleUpdate}
                                                        className={`${
                                                            loading
                                                                ? 'opacity-[.7] hover:opacity-[.7]'
                                                                : 'hover:opacity-[.9]'
                                                        } px-[4px] py-[2px] bg-[#4ecb40] text-[#fff] text-[14px] rounded-[2px]`}
                                                    >
                                                        {loading ? (
                                                            <div className="text-[20px] animate-loading">
                                                                <BsArrowRepeat />
                                                            </div>
                                                        ) : (
                                                            <BsCheck2 />
                                                        )}
                                                    </button>
                                                    <button
                                                        disabled={loading}
                                                        onClick={() => {
                                                            setLocalSelect({
                                                                rank: 0,
                                                                indexInRank: 0,
                                                                province: '',
                                                            });
                                                            setValue('');
                                                        }}
                                                        className={`${
                                                            loading
                                                                ? 'opacity-[.7] hover:opacity-[.7]'
                                                                : 'hover:opacity-[.9]'
                                                        } px-[4px] py-[2px] bg-[#f1513f] text-[#fff] text-[14px] rounded-[2px]`}
                                                    >
                                                        {loading ? (
                                                            <div className="text-[20px] animate-loading">
                                                                <BsArrowRepeat />
                                                            </div>
                                                        ) : (
                                                            <BsX />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            el
                                        )}
                                    </button>
                                ))}
                            </td>
                            <td
                                className={`flex flex-1 flex-col items-center justify-center ${
                                    day === 1 || day === 5 || day === 7 ? 'w-[90px]' : 'w-[135px]'
                                } px-[2px] py-[6px] col-span-2 border-[1px] border-[#fff] ${
                                    i === 0 || i === 8
                                        ? 'text-[14px] text-[#f02b2b] font-[650]'
                                        : 'text-[#000] font-[600]'
                                }`}
                            >
                                {e?.[pro2]?.map((el, ii) => (
                                    <button
                                        onDoubleClick={() => {
                                            setLocalSelect({
                                                rank: i,
                                                indexInRank: ii,
                                                province: pro2,
                                            });
                                            setValue(el);
                                        }}
                                        className="w-[100%] flex justify-center"
                                        key={el}
                                    >
                                        {localSelect.rank === i &&
                                        localSelect.indexInRank === ii &&
                                        localSelect.province === pro2 ? (
                                            <div className="w-[80%]">
                                                <input
                                                    className="w-[100%] px-[4px] outline-none border-[1px] border-solid border-[#bdbcbc] rounded-[2px]"
                                                    value={value}
                                                    onChange={(eValue) => setValue(eValue.target.value)}
                                                />

                                                <div className="mt-[6px] flex gap-[4px] justify-center">
                                                    <button
                                                        disabled={loading}
                                                        onClick={handleUpdate}
                                                        className={`${
                                                            loading
                                                                ? 'opacity-[.7] hover:opacity-[.7]'
                                                                : 'hover:opacity-[.9]'
                                                        } px-[4px] py-[2px] bg-[#4ecb40] text-[#fff] text-[14px] rounded-[2px]`}
                                                    >
                                                        {loading ? (
                                                            <div className="text-[20px] animate-loading">
                                                                <BsArrowRepeat />
                                                            </div>
                                                        ) : (
                                                            <BsCheck2 />
                                                        )}
                                                    </button>
                                                    <button
                                                        disabled={loading}
                                                        onClick={() => {
                                                            setLocalSelect({
                                                                rank: 0,
                                                                indexInRank: 0,
                                                                province: '',
                                                            });
                                                            setValue('');
                                                        }}
                                                        className={`${
                                                            loading
                                                                ? 'opacity-[.7] hover:opacity-[.7]'
                                                                : 'hover:opacity-[.9]'
                                                        } px-[4px] py-[2px] bg-[#f1513f] text-[#fff] text-[14px] rounded-[2px]`}
                                                    >
                                                        {loading ? (
                                                            <div className="text-[20px] animate-loading">
                                                                <BsArrowRepeat />
                                                            </div>
                                                        ) : (
                                                            <BsX />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            el
                                        )}
                                    </button>
                                ))}
                            </td>
                            {(day === 1 || day === 5 || day === 7) && (
                                <td
                                    className={`flex flex-1 flex-col items-center justify-center w-[90px] px-[2px] py-[6px] col-span-2 border-[1px] border-[#fff] ${
                                        i === 0 || i === 8
                                            ? 'text-[14px] text-[#f02b2b] font-[650]'
                                            : 'text-[#000] font-[600]'
                                    }`}
                                >
                                    {e?.[pro3]?.map((el, ii) => (
                                        <button
                                            onDoubleClick={() => {
                                                setLocalSelect({
                                                    rank: i,
                                                    indexInRank: ii,
                                                    province: pro3,
                                                });
                                                setValue(el);
                                            }}
                                            className="w-[100%] flex justify-center"
                                            key={el}
                                        >
                                            {localSelect.rank === i &&
                                            localSelect.indexInRank === ii &&
                                            localSelect.province === pro3 ? (
                                                <div className="w-[80%]">
                                                    <input
                                                        className="w-[100%] px-[4px] outline-none border-[1px] border-solid border-[#bdbcbc] rounded-[2px]"
                                                        value={value}
                                                        onChange={(eValue) => setValue(eValue.target.value)}
                                                    />

                                                    <div className="mt-[6px] flex gap-[4px] justify-center">
                                                        <button
                                                            disabled={loading}
                                                            onClick={handleUpdate}
                                                            className={`${
                                                                loading
                                                                    ? 'opacity-[.7] hover:opacity-[.7]'
                                                                    : 'hover:opacity-[.9]'
                                                            } px-[4px] py-[2px] bg-[#4ecb40] text-[#fff] text-[14px] rounded-[2px]`}
                                                        >
                                                            {loading ? (
                                                                <div className="text-[20px] animate-loading">
                                                                    <BsArrowRepeat />
                                                                </div>
                                                            ) : (
                                                                <BsCheck2 />
                                                            )}
                                                        </button>
                                                        <button
                                                            disabled={loading}
                                                            onClick={() => {
                                                                setLocalSelect({
                                                                    rank: 0,
                                                                    indexInRank: 0,
                                                                    province: '',
                                                                });
                                                                setValue('');
                                                            }}
                                                            className={`${
                                                                loading
                                                                    ? 'opacity-[.7] hover:opacity-[.7]'
                                                                    : 'hover:opacity-[.9]'
                                                            } px-[4px] py-[2px] bg-[#f1513f] text-[#fff] text-[14px] rounded-[2px]`}
                                                        >
                                                            {loading ? (
                                                                <div className="text-[20px] animate-loading">
                                                                    <BsArrowRepeat />
                                                                </div>
                                                            ) : (
                                                                <BsX />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                el
                                            )}
                                        </button>
                                    ))}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableKqxsMT;
