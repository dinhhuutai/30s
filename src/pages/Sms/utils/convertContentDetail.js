import findListOverturn from './findListOverturn';
import findListTwoNum from './findListTwoNum';
import findPosFirstAndTwo from './findPosFirstAndTwo';
import handleConvertSymbol from './handleConvertSymbol';
import handleDai from './handleDai';
import handleMien from './handleMien';
import handleTextKeo from './handleTextKeo';
import shortenText from './shortenText';

function convertContentDetail(content) {
    const now = new Date('9-7-2024');

    // Lấy ngày, tháng, năm
    const day = now.getDate(); // Ngày trong tháng (1-31)
    const month = now.getMonth() + 1; // Tháng (0-11), cộng thêm 1 để có giá trị tháng (1-12)
    const year = now.getFullYear(); // Năm đầy đủ

    const dayOfWeek = now.getDay() + 1;

    console.log(`${day}/${month}/${year}`);
    console.log('Thứ: ', dayOfWeek);

    let arr = [];

    let kt = true;
    let mien = '';

    let contentTmp = shortenText(content);
    console.log('Làm gọn: ', contentTmp);

    contentTmp = handleTextKeo(contentTmp);
    console.log('Làm gọn sau kéo: ', contentTmp);

    // Lấy miền ở đây

    let objHandleMien = handleMien(contentTmp);

    contentTmp = objHandleMien.content;
    mien = objHandleMien.mien;

    console.log('Làm gọn sau lấy miền: ', contentTmp);
    console.log('Miền: ', mien);

    //

    contentTmp = handleConvertSymbol(contentTmp);
    console.log('Làm gọn sau viết tắc: ', contentTmp);

    let bd = 0;
    let kth = 0;

    while (kt) {
        const pos = findPosFirstAndTwo(contentTmp);

        bd = pos[0];
        kth = pos[1];

        if (kth === -1) {
            kth = contentTmp.length;
        }

        if (bd === -1) {
            kt = false;
            break;
        }

        let ktThemCham = false;

        let cloChild = contentTmp.slice(bd, kth);
        if (!cloChild.endsWith('.')) {
            cloChild += '.';
            kth += 1;
            ktThemCham = true;
        }

        console.log('Cụm con: ', cloChild);

        let mangSo = [];
        let so = '';
        let kdanh = '';
        let gtien = 0;

        let fSo = true;
        let fKdanh = true;
        let ddCh = true;

        let dai = '';

        for (let i = bd; i < kth; i++) {
            dai += cloChild[i];

            if (isFinite(Number(cloChild[i + 1]))) {
                dai = dai.replace(/[.,:]/g, '');

                dai = handleDai(dai, mien, dayOfWeek);
                break;
            }
        }

        for (let i = bd + 2; i < kth; i++) {
            if (isFinite(Number(cloChild[i])) && fSo) {
                so = so + cloChild[i];
            }

            if (isFinite(Number(cloChild[i - 1])) && fSo && (cloChild[i] === '.' || !isFinite(Number(cloChild[i])))) {
                mangSo.push(so.toString());
                so = '';
            }

            if (mangSo.length > 0 && fKdanh && cloChild[i] !== '.' && !isFinite(Number(cloChild[i]))) {
                kdanh += cloChild[i];
                fSo = false;
            }

            if (isFinite(Number(cloChild[i])) && !fSo) {
                gtien = gtien * 10 + Number(cloChild[i]);
                fKdanh = false;
            }

            if (!fSo && !fKdanh && (cloChild[i] === '.' || !isFinite(Number(cloChild[i])))) {
                if (cloChild[i] !== '.') {
                    cloChild = cloChild.slice(0, i) + '.' + cloChild.slice(i);
                    contentTmp = contentTmp.slice(0, i) + '.' + contentTmp.slice(i);
                    kth += 1;
                }

                let kdSS = kdanh.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                let kdanhMain = '';

                if (
                    kdSS === 'dx' ||
                    kdSS === 'đx' ||
                    kdSS === 'đax' ||
                    kdSS === 'da' ||
                    kdSS === 'đa' ||
                    kdSS === 'dat' ||
                    kdSS === 'đat' ||
                    kdSS === 'dax'
                ) {
                    if (dai.length >= 2) {
                        kdanhMain = 'da(xien)';
                    } else {
                        kdanhMain = 'da(thang)';
                    }

                    let mangSoDa = findListTwoNum(mangSo);

                    // eslint-disable-next-line no-loop-func
                    mangSoDa.map((soDa) => {
                        const obj = {
                            mien: mien,
                            dai: dai,
                            so: soDa,
                            kieuDanh: kdanhMain,
                            tien: gtien,
                            day: now,
                            dayOfWeek: dayOfWeek,
                        };

                        arr = [...arr, obj];

                        console.log(`${dai}.${soDa[0]},${soDa[1]}.${kdanhMain}.${gtien}ngan`);
                    });
                } else {
                    // eslint-disable-next-line no-loop-func
                    mangSo.map((so) => {
                        if (
                            kdSS === 'l' ||
                            kdSS === 'lo' ||
                            kdSS === 'b' ||
                            kdSS === 'bl' ||
                            kdSS === 'blo' ||
                            kdSS === 'blô' ||
                            kdSS === 'baolo' ||
                            kdSS === 'bao' ||
                            kdSS === 'baolô'
                        ) {
                            kdanhMain = 'baolo';

                            const obj = {
                                mien: mien,
                                dai: dai,
                                so: so,
                                kieuDanh: kdanhMain,
                                tien: gtien,
                                day: now,
                                dayOfWeek: dayOfWeek,
                            };

                            arr = [...arr, obj];

                            console.log(`${dai}.${so}.${kdanhMain}.${gtien}ngan`);
                        }

                        if (
                            kdSS === 'dl' ||
                            kdSS === 'dlo' ||
                            kdSS === 'ld' ||
                            kdSS === 'lod' ||
                            kdSS === 'db' ||
                            kdSS === 'đb' ||
                            kdSS === 'dbl' ||
                            kdSS === 'đbl' ||
                            kdSS === 'dblo' ||
                            kdSS === 'đblô' ||
                            kdSS === 'daobaolo' ||
                            kdSS === 'daobaolô' ||
                            kdSS === 'blodao' ||
                            kdSS === 'baolodao' ||
                            kdSS === 'bldao' ||
                            kdSS === 'bdao' ||
                            kdSS === 'baodao' ||
                            kdSS === 'baođao' ||
                            kdSS === 'bđao' ||
                            kdSS === 'bld'
                        ) {
                            kdanhMain = 'baolodao';

                            let mangSoDao = findListOverturn(so);

                            mangSoDao.map((soDao) => {
                                const obj = {
                                    mien: mien,
                                    dai: dai,
                                    so: soDao,
                                    kieuDanh: kdanhMain,
                                    tien: gtien,
                                    day: now,
                                    dayOfWeek: dayOfWeek,
                                };

                                arr = [...arr, obj];

                                console.log(`${dai}.${soDao}.${kdanhMain}.${gtien}ngan`);
                            });
                        }

                        if (
                            kdSS === 'dd' ||
                            kdSS === 'đđ' ||
                            kdSS === 'dauduoi' ||
                            kdSS === 'đd' ||
                            kdSS === 'dđ' ||
                            kdSS === 'đâuđuôi' ||
                            kdSS === 'đầuđuôi' ||
                            kdSS === 'đauđuôi'
                        ) {
                            kdanhMain = 'dauduoi';

                            const obj = {
                                mien: mien,
                                dai: dai,
                                so: so,
                                kieuDanh: kdanhMain,
                                tien: gtien,
                                day: now,
                                dayOfWeek: dayOfWeek,
                            };

                            arr = [...arr, obj];

                            console.log(`${dai}.${so}.${kdanhMain}.${gtien}ngan`);
                        }

                        if (kdanh === 'x' || kdanh === 'xc' || kdanh === 'xiuchu' || kdanh === 'xỉuchủ') {
                            kdanhMain = 'xiuchu';

                            const obj = {
                                mien: mien,
                                dai: dai,
                                so: so,
                                kieuDanh: kdanhMain,
                                tien: gtien,
                                day: now,
                                dayOfWeek: dayOfWeek,
                            };

                            arr = [...arr, obj];

                            console.log(`${dai}.${so}.${kdanhMain}.${gtien}ngan`);
                        }

                        if (
                            kdanh === 'xdau' ||
                            kdanh === 'xcdau' ||
                            kdanh === 'xiuchudau' ||
                            kdanh === 'xđau' ||
                            kdanh === 'xcđau' ||
                            kdanh === 'xiuchuđau'
                        ) {
                            kdanhMain = 'xiuchudau';

                            const obj = {
                                mien: mien,
                                dai: dai,
                                so: so,
                                kieuDanh: kdanhMain,
                                tien: gtien,
                                day: now,
                                dayOfWeek: dayOfWeek,
                            };

                            arr = [...arr, obj];

                            console.log(`${dai}.${so}.${kdanhMain}.${gtien}ngan`);
                        }

                        if (
                            kdanh === 'xduoi' ||
                            kdanh === 'xcduoi' ||
                            kdanh === 'xiuchuduoi' ||
                            kdanh === 'xđuoi' ||
                            kdanh === 'xcđuoi' ||
                            kdanh === 'xiuchuđuoi'
                        ) {
                            kdanhMain = 'xiuchuduoi';

                            const obj = {
                                mien: mien,
                                dai: dai,
                                so: so,
                                kieuDanh: kdanhMain,
                                tien: gtien,
                                day: now,
                                dayOfWeek: dayOfWeek,
                            };

                            arr = [...arr, obj];

                            console.log(`${dai}.${so}.${kdanhMain}.${gtien}ngan`);
                        }

                        if (
                            kdSS === 'daoxc' ||
                            kdSS === 'daox' ||
                            kdSS === 'dxchu' ||
                            kdSS === 'dx' ||
                            kdSS === 'dxc' ||
                            kdSS === 'xd' ||
                            kdSS === 'xdao' ||
                            kdSS === 'xcd' ||
                            kdSS === 'xcdao' ||
                            kdSS === 'xiuchudao' ||
                            kdSS === 'xỉuchủdao' ||
                            kdSS === 'đaoxc' ||
                            kdSS === 'đaox' ||
                            kdSS === 'đxchu' ||
                            kdSS === 'đx' ||
                            kdSS === 'đxc' ||
                            kdSS === 'xđ' ||
                            kdSS === 'xđao' ||
                            kdSS === 'xcđ' ||
                            kdSS === 'xcđao' ||
                            kdSS === 'xiuchuđao' ||
                            kdSS === 'xỉuchủđao'
                        ) {
                            kdanhMain = 'xiuchudao';

                            let mangSoDao = findListOverturn(so);

                            mangSoDao.map((soDao) => {
                                const obj = {
                                    mien: mien,
                                    dai: dai,
                                    so: soDao,
                                    kieuDanh: kdanhMain,
                                    tien: gtien,
                                    day: now,
                                    dayOfWeek: dayOfWeek,
                                };

                                arr = [...arr, obj];

                                console.log(`${dai}.${soDao}.${kdanhMain}.${gtien}ngan`);
                            });
                        }

                        if (kdSS === 'dau' || kdSS === 'đau' || kdSS === 'đầu' || kdSS === 'đâu') {
                            kdanhMain = 'dau';

                            const obj = {
                                mien: mien,
                                dai: dai,
                                so: so,
                                kieuDanh: kdanhMain,
                                tien: gtien,
                                day: now,
                                dayOfWeek: dayOfWeek,
                            };

                            arr = [...arr, obj];

                            console.log(`${dai}.${so}.${kdanhMain}.${gtien}ngan`);
                        }

                        if (
                            kdSS === 'duoi' ||
                            kdSS === 'đuôi' ||
                            kdSS === 'duôi' ||
                            kdSS === 'đuoi' ||
                            kdSS === 'dui' ||
                            kdSS === 'đui'
                        ) {
                            kdanhMain = 'duoi';

                            const obj = {
                                mien: mien,
                                dai: dai,
                                so: so,
                                kieuDanh: kdanhMain,
                                tien: gtien,
                                day: now,
                                dayOfWeek: dayOfWeek,
                            };

                            arr = [...arr, obj];

                            console.log(`${dai}.${so}.${kdanhMain}.${gtien}ngan`);
                        }

                        if ((kdSS === 'd' || kdSS === 'đ') && ddCh) {
                            kdanhMain = 'dau';

                            const obj = {
                                mien: mien,
                                dai: dai,
                                so: so,
                                kieuDanh: kdanhMain,
                                tien: gtien,
                                day: now,
                                dayOfWeek: dayOfWeek,
                            };

                            arr = [...arr, obj];

                            console.log(`${dai}.${so}.${kdanhMain}.${gtien}ngan`);
                        } else if ((kdSS === 'd' || kdSS === 'đ') && !ddCh) {
                            kdanhMain = 'duoi';

                            const obj = {
                                mien: mien,
                                dai: dai,
                                so: so,
                                kieuDanh: kdanhMain,
                                tien: gtien,
                                day: now,
                                dayOfWeek: dayOfWeek,
                            };

                            arr = [...arr, obj];

                            console.log(`${dai}.${so}.${kdanhMain}.${gtien}ngan`);
                        }
                    });

                    if ((kdSS === 'd' || kdSS === 'đ') && ddCh) {
                        ddCh = false;
                    } else if ((kdSS === 'd' || kdSS === 'đ') && !ddCh) {
                        ddCh = true;
                    }
                }

                fSo = true;
                fKdanh = true;
                kdanh = '';
                gtien = 0;
                so = '';

                if (cloChild[i] === '.' && isFinite(Number(cloChild[i + 1]))) {
                    mangSo = [];
                }
            }
        }

        contentTmp = contentTmp.slice(ktThemCham ? kth - 1 : kth);
    }

    return arr;
}

export default convertContentDetail;
