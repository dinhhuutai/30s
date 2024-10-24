import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import parseDate from '~/utils/parseDate';
import { BsCopy } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { noticeAdminSelector } from '~/redux/selectors';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';

let setTimeoutTmp;

function ModalNotice({ setModalNotice, selectorRevenue, domain }) {
    const [content, setContent] = useState();


    const notice = useSelector(noticeAdminSelector);
    useEffect(() => {
        if (!notice.state) {
            clearTimeout(setTimeoutTmp);
        }
    }, [notice.state]);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(selectorRevenue);

        const date = parseDate(selectorRevenue.idMember.resultDate);
        const day = date.getDate(); // Ngày trong tháng (1-31)
        const month = date.getMonth() + 1; // Tháng (0-11), cộng thêm 1 để có giá trị tháng (1-12)
        const dayOfWeek = date.getDay() + 1;

        let contentTmp = '';
        if (domain === 'all') {
            contentTmp = `${selectorRevenue.idMember.name}
            
${
    selectorRevenue.mn?.tongxac > 0
        ? `M.Nam ${
              dayOfWeek === 1
                  ? 'chủ nhật'
                  : dayOfWeek === 2
                  ? 'thứ hai'
                  : dayOfWeek === 3
                  ? 'thứ ba'
                  : dayOfWeek === 4
                  ? 'thứ tư'
                  : dayOfWeek === 5
                  ? 'thứ năm'
                  : dayOfWeek === 6
                  ? 'thứ sáu'
                  : 'thứ bảy'
          } ${day}/${month}
2c:  ${parseFloat(selectorRevenue['mn']?.diem2con.toFixed(1)).toLocaleString() || 0}
3,4c:  ${parseFloat(selectorRevenue['mn']?.diem34con.toFixed(1)).toLocaleString() || 0}
${selectorRevenue['mn']?.revenue > 0 || !selectorRevenue['mn']?.revenue ? 'Thu' : 'Bù'}:  ${
              parseFloat(selectorRevenue['mn']?.revenue.toFixed(1)).toLocaleString() || 0
          }`
        : ''
}

${
    selectorRevenue?.mt?.tongxac > 0
        ? `M.Trung ${
              dayOfWeek === 1
                  ? 'chủ nhật'
                  : dayOfWeek === 2
                  ? 'thứ hai'
                  : dayOfWeek === 3
                  ? 'thứ ba'
                  : dayOfWeek === 4
                  ? 'thứ tư'
                  : dayOfWeek === 5
                  ? 'thứ năm'
                  : dayOfWeek === 6
                  ? 'thứ sáu'
                  : 'thứ bảy'
          } ${day}/${month}
2c:  ${parseFloat(selectorRevenue['mt']?.diem2con.toFixed(1)).toLocaleString() || 0}
3,4c:  ${parseFloat(selectorRevenue['mt']?.diem34con.toFixed(1)).toLocaleString() || 0}
${selectorRevenue['mt']?.revenue > 0 || !selectorRevenue['mt']?.revenue ? 'Thu' : 'Bù'}:  ${
              parseFloat(selectorRevenue['mt']?.revenue.toFixed(1)).toLocaleString() || 0
          }`
        : ''
}

${
    selectorRevenue?.mb?.tongxac > 0
        ? `M.Bắc ${
              dayOfWeek === 1
                  ? 'chủ nhật'
                  : dayOfWeek === 2
                  ? 'thứ hai'
                  : dayOfWeek === 3
                  ? 'thứ ba'
                  : dayOfWeek === 4
                  ? 'thứ tư'
                  : dayOfWeek === 5
                  ? 'thứ năm'
                  : dayOfWeek === 6
                  ? 'thứ sáu'
                  : 'thứ bảy'
          } ${day}/${month}
2c:  ${parseFloat(selectorRevenue['mb']?.diem2con.toFixed(1)).toLocaleString() || 0}
3,4c:  ${parseFloat(selectorRevenue['mb']?.diem34con.toFixed(1)).toLocaleString() || 0}
${selectorRevenue['mb']?.revenue > 0 || !selectorRevenue['mb']?.revenue ? 'Thu' : 'Bù'}:  ${
              parseFloat(selectorRevenue['mb']?.revenue.toFixed(1)).toLocaleString() || 0
          }`
        : ''
}
            
Tổng ${
                dayOfWeek === 1
                    ? 'chủ nhật'
                    : dayOfWeek === 2
                    ? 'thứ hai'
                    : dayOfWeek === 3
                    ? 'thứ ba'
                    : dayOfWeek === 4
                    ? 'thứ tư'
                    : dayOfWeek === 5
                    ? 'thứ năm'
                    : dayOfWeek === 6
                    ? 'thứ sáu'
                    : 'thứ bảy'
            } ${day}/${month}
2c:  ${
                parseFloat(
                    (
                        selectorRevenue['mn']?.diem2con ||
                        0 + selectorRevenue['mt']?.diem2con ||
                        0 + selectorRevenue['mb']?.diem2con ||
                        0
                    ).toFixed(1),
                ).toLocaleString() || 0
            }
3,4c:  ${
                parseFloat(
                    (
                        selectorRevenue['mn']?.diem34con ||
                        0 + selectorRevenue['mt']?.diem34con ||
                        0 + selectorRevenue['mb']?.diem34con ||
                        0
                    ).toFixed(1),
                ).toLocaleString() || 0
            }
${selectorRevenue?.idMember?.total > 0 || !selectorRevenue?.idMember?.total ? 'Thu' : 'Bù'}:  ${
                parseFloat(selectorRevenue?.idMember?.total.toFixed(1)).toLocaleString() || 0
            }
                    `;
        } else {
            contentTmp = `${selectorRevenue.idMember.name}

        ${
            selectorRevenue?.[domain]?.tongxac > 0
                ? `${domain === 'mn' ? 'M.Nam' : domain === 'mt' ? 'M.Trung' : 'M.Bắc'} ${
                      dayOfWeek === 1
                          ? 'chủ nhật'
                          : dayOfWeek === 2
                          ? 'thứ hai'
                          : dayOfWeek === 3
                          ? 'thứ ba'
                          : dayOfWeek === 4
                          ? 'thứ tư'
                          : dayOfWeek === 5
                          ? 'thứ năm'
                          : dayOfWeek === 6
                          ? 'thứ sáu'
                          : 'thứ bảy'
                  } ${day}/${month}
        2c:  ${parseFloat(selectorRevenue[domain]?.diem2con.toFixed(1)).toLocaleString() || 0}
        3,4c:  ${parseFloat(selectorRevenue[domain]?.diem34con.toFixed(1)).toLocaleString() || 0}
        Trúng:  ${parseFloat(selectorRevenue[domain]?.tongtrung.toFixed(1)).toLocaleString() || 0}
        ${selectorRevenue[domain]?.revenue > 0 || !selectorRevenue[domain]?.revenue ? 'Thu' : 'Bù'}:  ${
                      parseFloat(selectorRevenue[domain]?.revenue.toFixed(1)).toLocaleString() || 0
                  }`
                : ''
        }
                `;
        }

        
        console.log(contentTmp);
        setContent(contentTmp);
    }, []);

    const handleCopy = async () => {
        navigator?.clipboard
            ?.writeText(content)
            .then(() => {
                dispatch(noticeAdminSlice.actions.successNotice('Đã sao chép nội dung'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [5000]);
            })
            .catch((err) => {
                dispatch(noticeAdminSlice.actions.successNotice('Có lỗi xảy ra khi sao chép'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [5000]);
            });
    };

    return (
        <div
            onClick={() => {
                setModalNotice(false);
            }}
            className="fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 z-[9999]"
        >
            <div className="top-0 absolute left-0 right-0 bottom-0 bg-[#000] opacity-[.4] z-[99]"></div>
            <div className="fixed flex justify-center overflow-y-auto overflow-x-hidden top-0 left-0 right-0 bottom-0 pb-[60px] opacity-[1] z-[999]">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#fff] animate-modalDownSlide text-[12px] lg:w-[700px] w-[96%] h-fit pb-[26px] shadow-xl rounded-[6px] mt-[30px] py-[14px]"
                >
                    <div className="flex justify-between items-center pb-[12px] border-b-[1px] border-solid border-[#f0f0f0] px-[26px]">
                        <h1 className="text-[14px] capitalize text-[#000] font-[620]">{`Nội dung tin báo tổng`}</h1>
                        <div onClick={() => setModalNotice(false)} className="cursor-pointer">
                            <AiOutlineClose />
                        </div>
                    </div>

                    <div className="flex justify-between items-center font-[500] px-[26px] mt-[16px]">
                        <div>Nội dung sao chép</div>
                        <div onClick={handleCopy} className="text-[16px] cursor-pointer text-[green]">
                            <BsCopy />
                        </div>
                    </div>

                    <div className="mt-[8px] px-[26px] flex">
                        <textarea
                            readOnly
                            className="rounded-[4px] flex-1 outline-none border-[1px] border-solid border-[#bdc3d1] text-[12px] py-[4px] px-[8px]"
                            rows={24}
                            cols={60}
                            value={content}
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalNotice;
