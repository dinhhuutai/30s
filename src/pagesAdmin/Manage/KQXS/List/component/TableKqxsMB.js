import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { BsX, BsCheck2, BsArrowRepeat } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { noticeAdminSelector } from '~/redux/selectors';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';
import { BiLoaderCircle } from 'react-icons/bi';
import paySms from './paySms';

let setTimeoutTmp;

function TableKqxsMB({ handleFindKqxs, kqxsMB, date, setKqxsMB }) {
    const [localSelect, setLocalSelect] = useState({
        rank: 0,
        indexInRank: 0,
        province: '',
    });
    const [value, setValue] = useState();
    const [loading, setLoading] = useState(false);

    const [vtRotate, setVtRotate] = useState({
        i: undefined,
        ii: undefined,
    });

    const [numbers, setNumbers] = useState([0, 7, 5, 8, 2]);

    useEffect(() => {
        const intervals = numbers.map(
            (_, index) =>
                setInterval(() => {
                    setNumbers((prevNumbers) => {
                        const newNumbers = [...prevNumbers];
                        newNumbers[index] = (newNumbers[index] + 1) % 10; // Tăng từng số
                        return newNumbers;
                    });
                }, 100), // Thay đổi thời gian giữa các số
        );

        return () => intervals.forEach(clearInterval); // Dọn dẹp tất cả interval khi component unmount
    }, []);

    useEffect(() => {
        handleVt();
    }, [kqxsMB]);

    const handleVt = async () => {
        let kt = true;
        let iTmp = undefined;
        let iiTmp = undefined;

        kqxsMB.map((e, i) => {
            e.map((el, ii) => {
                if (el === '' && kt) {
                    iTmp = i;
                    iiTmp = ii;

                    if (i !== 0 || ii !== 0) {
                        kt = false;
                    }
                }

                if (i === 7 && (ii === 3) & (el !== '') && el !== undefined) {
                    iTmp = 0;
                    iiTmp = 0;
                }
            });
        });

        setVtRotate({
            i: iTmp,
            ii: iiTmp,
        });
    };

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
                if (localSelect.rank > 7) {
                    plusIndex = 19;
                } else if (localSelect.rank > 6) {
                    plusIndex = 16;
                } else if (localSelect.rank > 5) {
                    plusIndex = 14;
                } else if (localSelect.rank > 4) {
                    plusIndex = 9;
                } else if (localSelect.rank > 3) {
                    plusIndex = 6;
                } else if (localSelect.rank > 2) {
                    plusIndex = 1;
                }

                const formData = {
                    province: localSelect.province,
                    newNum: value,
                    resultDate: formattedDate,
                    index:
                        localSelect.rank + localSelect.indexInRank + plusIndex - 1 >= 0
                            ? localSelect.rank + localSelect.indexInRank + plusIndex - 1
                            : 26,
                };

                const res = await axios.post(
                    `${process.env.REACT_APP_API_URL}/v1/kqxs/findKqxsByDateAndProvince`,
                    formData,
                );

                if (res.data.success) {
                    kqxsMB[localSelect.rank][localSelect.indexInRank] = value;
                    setKqxsMB(kqxsMB);

                    setLocalSelect({
                        rank: 0,
                        indexInRank: 0,
                        province: '',
                    });
                    setValue('');
                    setLoading(false);

                    await paySms('mb');

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
            console.log(error);
            setLoading(false);

            dispatch(noticeAdminSlice.actions.errorNotice('Chưa có KQXS'));

            setTimeoutTmp = setTimeout(() => {
                dispatch(noticeAdminSlice.actions.hiddenNotice());
            }, [5000]);
        }
    };

    const handleCreateKQXS = async () => {
        let province = 'mb';
        const resultDate = moment(date).format('DD/MM/YYYY');

        const kqxs = await axios.post(`${process.env.REACT_APP_API_URL}/v1/kqxs/find`, {
            resultDate,
            province,
        });

        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();

        if (kqxs.data.kqxs.length === 0 && (hours > 18 || (hours === 18 && minutes > 40))) {
            const rs = [
                '00000',
                '00000',
                '00000',
                '00000',
                '00000',
                '00000',
                '00000',
                '00000',
                '00000',
                '0000',
                '0000',
                '0000',
                '0000',
                '0000',
                '0000',
                '0000',
                '0000',
                '0000',
                '0000',
                '000',
                '000',
                '000',
                '00',
                '00',
                '00',
                '00',
                '00000',
            ];

            const kqxsObj = {
                domain: 'mb',
                province,
                resultDate,
                result: rs,
            };

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/kqxs/create`, kqxsObj);

            if (res.data.success) {
                await handleFindKqxs();
            }
        }
    };

    return (
        <div class="mt-[10px] overflow-x-auto w-[100%] flex">
            <table className="w-[100%]">
                <tbody>
                    {kqxsMB?.map((e, i) => (
                        <tr key={i} className="bg-[#f0f1f4] flex grid-flow-col text-[12px]">
                            <td
                                onDoubleClick={() => handleCreateKQXS()}
                                className="px-[2px] py-[6px] w-[50px] flex justify-center items-center border-[1px] border-[#fff]"
                            >{`${i !== 0 ? `Giải ${i}` : 'ĐB'}`}</td>
                            <td
                                className={`grid ${
                                    i === 0 || i === 1
                                        ? 'grid-cols-1'
                                        : i === 2
                                        ? 'grid-cols-2'
                                        : i === 3 || i === 5 || i === 6
                                        ? 'grid-cols-3'
                                        : i === 4 || i === 7
                                        ? 'grid-cols-4'
                                        : ''
                                } items-center justify-center flex-1 gap-[6px] px-[2px] py-[6px] border-[1px] border-[#fff] ${
                                    i === 0 || i === 7
                                        ? 'text-[14px] text-[#f02b2b] font-[650]'
                                        : 'text-[#000] font-[600]'
                                }`}
                            >
                                {e?.map((el, ii) => (
                                    <div key={ii} className="grid col-span-1 justify-center">
                                        {el ? (
                                            <button
                                                onDoubleClick={() => {
                                                    setLocalSelect({
                                                        rank: i,
                                                        indexInRank: ii,
                                                        province: 'mb',
                                                    });
                                                    setValue(el);
                                                }}
                                                className="w-[100%] flex justify-center"
                                                key={el}
                                            >
                                                {localSelect.rank === i &&
                                                localSelect.indexInRank === ii &&
                                                localSelect.province === 'mb' ? (
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
                                        ) : i === vtRotate.i && ii === vtRotate.ii ? (
                                            <div className="flex gap-[1px]">
                                                {i <= 3 ? (
                                                    <>
                                                        <div className="">{numbers[0]}</div>
                                                        <div className="">{numbers[1]}</div>
                                                        <div className="">{numbers[2]}</div>
                                                        <div className="">{numbers[3]}</div>
                                                        <div className="">{numbers[4]}</div>
                                                    </>
                                                ) : i <= 5 ? (
                                                    <>
                                                        <div className="">{numbers[0]}</div>
                                                        <div className="">{numbers[1]}</div>
                                                        <div className="">{numbers[2]}</div>
                                                        <div className="">{numbers[3]}</div>
                                                    </>
                                                ) : i <= 6 ? (
                                                    <>
                                                        <div className="">{numbers[0]}</div>
                                                        <div className="">{numbers[1]}</div>
                                                        <div className="">{numbers[2]}</div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="">{numbers[0]}</div>
                                                        <div className="">{numbers[1]}</div>
                                                    </>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex gap-[1px] text-[12px] text-[#5d5c5c]">
                                                {i <= 3 ? (
                                                    <>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                    </>
                                                ) : i <= 5 ? (
                                                    <>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                    </>
                                                ) : i <= 6 ? (
                                                    <>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableKqxsMB;
