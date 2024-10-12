import { useEffect, useRef, useState } from 'react';
import { Bs1Circle, BsStarFill, BsArrowRepeat } from 'react-icons/bs';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';
import { noticeAdminSelector } from '~/redux/selectors';
import { Link } from 'react-router-dom';
import config from '~/config';

let setTimeoutTmp;

function KqxsCreate() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);
    const [star, setStar] = useState(false);
    const [loadingCreate, setLoadingCreate] = useState(false);

    const [urltp, setUrltp] = useState('');
    const [urldt, setUrldt] = useState('');
    const [urlcm, setUrlcm] = useState('');
    const [urlbr, setUrlbr] = useState('');
    const [urlvt, setUrlvt] = useState('');
    const [urlbi, setUrlbi] = useState('');
    const [urldn, setUrldn] = useState('');
    const [urlct, setUrlct] = useState('');
    const [urlst, setUrlst] = useState('');
    const [urltn, setUrltn] = useState('');
    const [urlag, setUrlag] = useState('');
    const [urlbt, setUrlbt] = useState('');
    const [urlbu, setUrlbu] = useState('');
    const [urlvl, setUrlvl] = useState('');
    const [urltv, setUrltv] = useState('');
    const [urlla, setUrlla] = useState('');
    const [urlbp, setUrlbp] = useState('');
    const [urlhg, setUrlhg] = useState('');
    const [urltg, setUrltg] = useState('');
    const [urlkg, setUrlkg] = useState('');
    const [urllt, setUrllt] = useState('');
    const [urlpy, setUrlpy] = useState('');
    const [urlhu, setUrlhu] = useState('');
    const [urldl, setUrldl] = useState('');
    const [urlqn, setUrlqn] = useState('');
    const [urldg, setUrldg] = useState('');
    const [urlkh, setUrlkh] = useState('');
    const [urlqb, setUrlqb] = useState('');
    const [urlbd, setUrlbd] = useState('');
    const [urlqt, setUrlqt] = useState('');
    const [urlgl, setUrlgl] = useState('');
    const [urlnt, setUrlnt] = useState('');
    const [urlqg, setUrlqg] = useState('');
    const [urldo, setUrldo] = useState('');
    const [urlkt, setUrlkt] = useState('');
    const [urlmb, setUrlmb] = useState('');
    const [codeRegister, setCodeRegister] = useState('');
    const [tokenChatBotTelegram, setTokenChatBotTelegram] = useState('');
    const [tokenChatBotWhatsApp, setTokenChatBotWhatsApp] = useState('');

    const notice = useSelector(noticeAdminSelector);

    useEffect(() => {
        if (!notice.state) {
            clearTimeout(setTimeoutTmp);
        }
    }, [notice.state]);

    const dispatch = useDispatch();

    useEffect(() => {
        handleFindOnlyAdminEdit();
    }, []);

    const handleFindOnlyAdminEdit = async () => {
        const resOnlyAdminEdit = await axios.post(`${process.env.REACT_APP_API_URL}/v1/onlyAdminEdit/find`);
        const rs = resOnlyAdminEdit.data.onlyAdminEdit[0];

        if (resOnlyAdminEdit.data.onlyAdminEdit.length > 0 && resOnlyAdminEdit.data.success) {
            setUrltp(rs?.urltp);
            setUrldt(rs?.urldt);
            setUrlcm(rs?.urlcm);
            setUrlbr(rs?.urlbr);
            setUrlvt(rs?.urlvt);
            setUrlbi(rs?.urlbi);
            setUrldn(rs?.urldn);
            setUrlct(rs?.urlct);
            setUrlst(rs?.urlst);
            setUrltn(rs?.urltn);
            setUrlag(rs?.urlag);
            setUrlbt(rs?.urlbt);
            setUrlbu(rs?.urlbu);
            setUrlvl(rs?.urlvl);
            setUrltv(rs?.urltv);
            setUrlla(rs?.urlla);
            setUrlbp(rs?.urlbp);
            setUrlhg(rs?.urlhg);
            setUrltg(rs?.urltg);
            setUrlkg(rs?.urlkg);
            setUrllt(rs?.urllt);
            setUrlpy(rs?.urlpy);
            setUrlhu(rs?.urlhu);
            setUrldl(rs?.urldl);
            setUrlqn(rs?.urlqn);
            setUrldg(rs?.urldg);
            setUrlkh(rs?.urlkh);
            setUrlqb(rs?.urlqb);
            setUrlbd(rs?.urlbd);
            setUrlqt(rs?.urlqt);
            setUrlgl(rs?.urlgl);
            setUrlnt(rs?.urlnt);
            setUrlqg(rs?.urlqg);
            setUrldo(rs?.urldo);
            setUrlkt(rs?.urlkt);
            setUrlmb(rs?.urlmb);
            setCodeRegister(rs?.codeRegister);
            setTokenChatBotTelegram(rs?.tokenChatBotTelegram);
            setTokenChatBotWhatsApp(rs?.tokenChatBotWhatsApp);
        }
    };

    const handleCreateArtist = async () => {
        try {
            dispatch(noticeAdminSlice.actions.processingNotice('Đang cập nhật thông tin'));
            setLoadingCreate(true);

            const resOnlyAdminEdit = await axios.post(`${process.env.REACT_APP_API_URL}/v1/onlyAdminEdit/find`);

            const formData = {
                urltp,
                urldt,
                urlcm,
                urlbr,
                urlvt,
                urlbi,
                urldn,
                urlct,
                urlst,
                urltn,
                urlag,
                urlbt,
                urlbu,
                urlvl,
                urltv,
                urlla,
                urlbp,
                urlhg,
                urltg,
                urlkg,
                urllt,
                urlpy,
                urlhu,
                urldl,
                urlqn,
                urldg,
                urlkh,
                urlqb,
                urlbd,
                urlqt,
                urlgl,
                urlnt,
                urlqg,
                urldo,
                urlkt,
                urlmb,
                codeRegister,
                tokenChatBotTelegram,
                tokenChatBotWhatsApp,
            };

            let res;

            if (resOnlyAdminEdit.data.onlyAdminEdit.length > 0 && resOnlyAdminEdit.data.success) {
                res = await axios.post(
                    `${process.env.REACT_APP_API_URL}/v1/onlyAdminEdit/update/${resOnlyAdminEdit.data.onlyAdminEdit[0]._id}`,
                    formData,
                );
            } else {
                res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/onlyAdminEdit/create`, formData);
            }

            console.log(res);
            if (res.data.success) {
                dispatch(noticeAdminSlice.actions.successNotice('Cập nhật thông tin thành công'));
                setLoadingCreate(false);

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [10000]);
            }
        } catch (error) {
            setLoadingCreate(false);

            setTimeoutTmp = setTimeout(() => {
                dispatch(noticeAdminSlice.actions.hiddenNotice());
            }, [10000]);
        }
    };

    return (
        <div>
            <div className="py-[14px] px-[30px] bg-[#F7F9FA] flex items-center justify-between">
                <div className="flex items-center gap-[20px]">
                    <Link
                        to={config.routes.adminKQXS}
                        className="text-[16px] h-[30px] text-[#858080] w-[30px] box-shadow-admin-path rounded-[4px] bg-[#fff] flex items-center justify-center"
                    >
                        <Bs1Circle />
                    </Link>
                    <h1 className="text-[12px] uppercase font-[650] text-[#5a5757]">Url Api</h1>
                </div>
                <button
                    onClick={() => setStar((prev) => !prev)}
                    className={`${
                        star ? 'text-[#f4fe3e]' : 'text-[#fff]'
                    } text-[12px] bg-[#23272B] px-[10px] py-[6px] rounded-[4px] cursor-pointer shadow-lg shadow-indigo-500/10`}
                >
                    <BsStarFill />
                </button>
            </div>

            <div className="m-[20px] p-[16px] bg-[#fff] rounded-[4px] box-shadow-admin-path">
                <div className="flex gap-[20px]">
                    <div className="flex flex-col gap-[4px] w-[33%]">
                        <div className="mb-[4px] font-[600] text-[12px] uppercase">Miền Nam</div>
                        <div className="mb-[6px] mt-[16px] font-[600] text-[12px] uppercase">Thứ 2</div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Tp.Hồ Chí Minh</label>
                            <input
                                value={urltp}
                                name="urltp"
                                onChange={(e) => setUrltp(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Đồng Tháp</label>
                            <input
                                value={urldt}
                                name="urldt"
                                onChange={(e) => setUrldt(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Cà Mau</label>
                            <input
                                value={urlcm}
                                name="urlcm"
                                onChange={(e) => setUrlcm(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>

                        <div className="mb-[6px] mt-[16px] font-[600] text-[12px] uppercase">Thứ 3</div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Bến Tre</label>
                            <input
                                value={urlbr}
                                name="urlbr"
                                onChange={(e) => setUrlbr(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Vũng Tàu</label>
                            <input
                                value={urlvt}
                                name="urlvt"
                                onChange={(e) => setUrlvt(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Bạc Liêu</label>
                            <input
                                value={urlbi}
                                name="urlbi"
                                onChange={(e) => setUrlbi(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>

                        <div className="mb-[6px] mt-[16px] font-[600] text-[12px] uppercase">Thứ 4</div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Đồng Nai</label>
                            <input
                                value={urldn}
                                name="urldn"
                                onChange={(e) => setUrldn(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Cần Thơ</label>
                            <input
                                value={urlct}
                                name="urlct"
                                onChange={(e) => setUrlct(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Sóc Trăng</label>
                            <input
                                value={urlst}
                                name="urlst"
                                onChange={(e) => setUrlst(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>

                        <div className="mb-[6px] mt-[16px] font-[600] text-[12px] uppercase">Thứ 5</div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Tây Ninh</label>
                            <input
                                value={urltn}
                                name="urltn"
                                onChange={(e) => setUrltn(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">An Giang</label>
                            <input
                                value={urlag}
                                name="urlag"
                                onChange={(e) => setUrlag(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Bình Thuận</label>
                            <input
                                value={urlbt}
                                name="urlbt"
                                onChange={(e) => setUrlbt(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>

                        <div className="mb-[6px] mt-[16px] font-[600] text-[12px] uppercase">Thứ 6</div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Vĩnh Long</label>
                            <input
                                value={urlvl}
                                name="urlvl"
                                onChange={(e) => setUrlvl(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Bình Dương</label>
                            <input
                                value={urlbu}
                                name="urlbu"
                                onChange={(e) => setUrlbu(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Trà Vinh</label>
                            <input
                                value={urltv}
                                name="urltv"
                                onChange={(e) => setUrltv(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>

                        <div className="mb-[6px] mt-[16px] font-[600] text-[12px] uppercase">Thứ 7</div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Long An</label>
                            <input
                                value={urlla}
                                name="urlla"
                                onChange={(e) => setUrlla(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Bình Phước</label>
                            <input
                                value={urlbp}
                                name="urlbp"
                                onChange={(e) => setUrlbp(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Hậu Giang</label>
                            <input
                                value={urlhg}
                                name="urlhg"
                                onChange={(e) => setUrlhg(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>

                        <div className="mb-[6px] mt-[16px] font-[600] text-[12px] uppercase">Chủ Nhật</div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Tiền Giang</label>
                            <input
                                value={urltg}
                                name="urltg"
                                onChange={(e) => setUrltg(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Kiên Giang</label>
                            <input
                                value={urlkg}
                                name="urlkg"
                                onChange={(e) => setUrlkg(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Đà Lạt</label>
                            <input
                                value={urllt}
                                name="urllt"
                                onChange={(e) => setUrllt(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-[4px] w-[33%]">
                        <div className="mb-[4px] font-[600] text-[12px] uppercase">Miền Trung</div>
                        <div className="mb-[6px] mt-[16px] font-[600] text-[12px] uppercase">Thứ 2</div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Phú Yên</label>
                            <input
                                value={urlpy}
                                name="urlpy"
                                onChange={(e) => setUrlpy(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Huế</label>
                            <input
                                value={urlhu}
                                name="urlhu"
                                onChange={(e) => setUrlhu(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>

                        <div className="mb-[6px] mt-[16px] font-[600] text-[12px] uppercase">Thứ 3</div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Đắk Lắk</label>
                            <input
                                value={urldl}
                                name="urldl"
                                onChange={(e) => setUrldl(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Quảng Nam</label>
                            <input
                                value={urlqn}
                                name="urlqn"
                                onChange={(e) => setUrlqn(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>

                        <div className="mb-[6px] mt-[16px] font-[600] text-[12px] uppercase">Thứ 4</div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Đà Nẵng</label>
                            <input
                                value={urldg}
                                name="urldg"
                                onChange={(e) => setUrldg(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Khánh Hòa</label>
                            <input
                                value={urlkh}
                                name="urlkh"
                                onChange={(e) => setUrlkh(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>

                        <div className="mb-[6px] mt-[16px] font-[600] text-[12px] uppercase">Thứ 5</div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Quảng Bình</label>
                            <input
                                value={urlqb}
                                name="urlqb"
                                onChange={(e) => setUrlqb(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Bình Định</label>
                            <input
                                value={urlbd}
                                name="urlbd"
                                onChange={(e) => setUrlbd(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Quảng Trị</label>
                            <input
                                value={urlqt}
                                name="urlqt"
                                onChange={(e) => setUrlqt(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>

                        <div className="mb-[6px] mt-[16px] font-[600] text-[12px] uppercase">Thứ 6</div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Gia Lai</label>
                            <input
                                value={urlgl}
                                name="urlgl"
                                onChange={(e) => setUrlgl(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Ninh Thuận</label>
                            <input
                                value={urlnt}
                                name="urlnt"
                                onChange={(e) => setUrlnt(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>

                        <div className="mb-[6px] mt-[16px] font-[600] text-[12px] uppercase">Thứ 7</div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Quảng Ngãi</label>
                            <input
                                value={urlqg}
                                name="urlqg"
                                onChange={(e) => setUrlqg(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Đắc Nông</label>
                            <input
                                value={urldo}
                                name="urldo"
                                onChange={(e) => setUrldo(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>

                        <div className="mb-[6px] mt-[16px] font-[600] text-[12px] uppercase">Chủ Nhật</div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Kom Tum</label>
                            <input
                                value={urlkt}
                                name="urlkt"
                                onChange={(e) => setUrlkt(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-[4px] w-[33%]">
                        <div className="mb-[20px] font-[600] text-[12px] uppercase">Miền Bắc</div>
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-[12px]">Miền Bắc</label>
                            <input
                                value={urlmb}
                                name="urlmb"
                                onChange={(e) => setUrlmb(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Link url"
                            />
                        </div>

                        <div className="mb-[10px] mt-[50px] font-[600] text-[12px] uppercase">Other</div>
                        <div className="flex flex-col gap-[4px] mt-[4px]">
                            <label className="text-[12px]">Code Register</label>
                            <input
                                value={codeRegister}
                                name="codeRegister"
                                onChange={(e) => setCodeRegister(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Mã đăng ký"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px] mt-[4px]">
                            <label className="text-[12px]">Token ChatBot Telegram</label>
                            <input
                                value={tokenChatBotTelegram}
                                name="tokenChatBotTelegram"
                                onChange={(e) => setTokenChatBotTelegram(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Token ChatBot Telegram"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px] mt-[4px]">
                            <label className="text-[12px]">Token ChatBot WhatsApp</label>
                            <input
                                value={tokenChatBotWhatsApp}
                                name="tokenChatBotWhatsApp"
                                onChange={(e) => setTokenChatBotWhatsApp(e.target.value)}
                                className="border-[1px] px-[8px] py-[2px] text-[12px] outline-none border-solid border-[#a9a5a5] rounded-[4px]"
                                type="text"
                                placeholder="Token ChatBot WhatsApp"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-[30px]">
                    <button
                        disabled={loadingCreate || notice.state}
                        onClick={handleCreateArtist}
                        className={`${
                            loadingCreate || notice.state ? 'opacity-[.7] hover:opacity-[.7]' : 'hover:opacity-[.9]'
                        } w-[120px] h-[30px] flex justify-center items-center bg-[#259d23] rounded-[4px] text-[#fff] active:opacity-[.7]`}
                    >
                        {loadingCreate || notice.state ? (
                            <div className="text-[20px] animate-loading">
                                <BsArrowRepeat />
                            </div>
                        ) : (
                            'Cập nhật'
                        )}
                    </button>
                </div>
                <div className="mt-[20px]">
                    <p className="text-[10px] text-[#ac4646] font-[600]">(*): Trường bắt buộc</p>
                </div>
            </div>
        </div>
    );
}

export default KqxsCreate;
