import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { BsX, BsCheck2, BsArrowRepeat } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { noticeAdminSelector } from '~/redux/selectors';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';
import { BiLoaderCircle } from 'react-icons/bi';

let setTimeoutTmp;

function TableKqxsMB({ kqxsMB, date, setKqxsMB }) {
    console.log(kqxsMB)
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

    return (
        <div class="mt-[10px] overflow-x-auto w-[100%] flex">
            <table className="w-[100%]">
                <tbody>
                    {kqxsMB?.map((e, i) => (
                        <tr key={i} className="bg-[#f0f1f4] flex grid-flow-col text-[12px]">
                            <td className="px-[2px] py-[6px] w-[50px] flex justify-center items-center border-[1px] border-[#fff]">{`${
                                i !== 0 ? `Giải ${i}` : 'ĐB'
                            }`}</td>
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
                                    <div key={el} className="grid col-span-1 justify-center">
                                        {el ? (
                                            el
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
