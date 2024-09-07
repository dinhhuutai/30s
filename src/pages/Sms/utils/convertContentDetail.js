import findListOverturn from './findListOverturn';
import findListTwoNum from './findListTwoNum';
import findPosFirstAndTwo from './findPosFirstAndTwo';
import handleTextKeo from './handleTextKeo';
import shortenText from './shortenText';

function convertContentDetail(content) {
    let arr = [];

    let kt = true;
    let mien = '';

    let contentTmp = shortenText(content);
    console.log('Làm gọn: ', contentTmp);
    
    contentTmp = handleTextKeo(contentTmp);
    console.log('Làm gọn sau kéo: ', contentTmp);


    // Lấy miền ở đây

    //

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
                    kth += 1;
                }

                let kdSS = kdanh.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                let kdanhMain = '';

                if (kdSS === 'dx' || kdSS === 'đx' || kdSS === 'đax' || kdSS === 'da' || kdSS === 'đa') {
                    if (dai.includes('2') || dai.includes('3') || dai.includes('4')) {
                        kdanhMain = 'da(xien)';
                    } else {
                        kdanhMain = 'da(thang)';
                    }

                    let mangSoDa = findListTwoNum(mangSo);

                    // eslint-disable-next-line no-loop-func
                    mangSoDa.map((soDa) => {
                        const obj = {
                            mien: '',
                            dai: dai,
                            so: soDa,
                            kieuDanh: kdanhMain,
                            tien: gtien,
                        };

                        arr = [...arr, obj];

                        console.log(`${dai}.${soDa[0]},${soDa[1]}.${kdanhMain}.${gtien}ngan`);
                    });
                } else {
                    // eslint-disable-next-line no-loop-func
                    mangSo.map((so) => {
                        if (
                            kdSS === 'b' ||
                            kdSS === 'bl' ||
                            kdSS === 'blo' ||
                            kdSS === 'blô' ||
                            kdSS === 'baolo' ||
                            kdSS === 'baolô'
                        ) {
                            kdanhMain = 'baolo';

                            const obj = {
                                mien: '',
                                dai: dai,
                                so: so,
                                kieuDanh: kdanhMain,
                                tien: gtien,
                            };

                            arr = [...arr, obj];

                            console.log(`${dai}.${so}.${kdanhMain}.${gtien}ngan`);
                        }

                        if (
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
                            kdSS === 'bđao' ||
                            kdSS === 'bld'
                        ) {
                            kdanhMain = 'baolodao';

                            let mangSoDao = findListOverturn(so);

                            mangSoDao.map((soDao) => {
                                const obj = {
                                    mien: '',
                                    dai: dai,
                                    so: soDao,
                                    kieuDanh: kdanhMain,
                                    tien: gtien,
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
                                mien: '',
                                dai: dai,
                                so: so,
                                kieuDanh: kdanhMain,
                                tien: gtien,
                            };

                            arr = [...arr, obj];

                            console.log(`${dai}.${so}.${kdanhMain}.${gtien}ngan`);
                        }

                        if (kdanh === 'x' || kdanh === 'xc' || kdanh === 'xiuchu' || kdanh === 'xỉuchủ') {
                            kdanhMain = 'xiuchu';

                            const obj = {
                                mien: '',
                                dai: dai,
                                so: so,
                                kieuDanh: kdanhMain,
                                tien: gtien,
                            };

                            arr = [...arr, obj];

                            console.log(`${dai}.${so}.${kdanhMain}.${gtien}ngan`);
                        }

                        if (
                            kdSS === 'xd' ||
                            kdSS === 'xdao' ||
                            kdSS === 'xcd' ||
                            kdSS === 'xcdao' ||
                            kdSS === 'xiuchudao' ||
                            kdSS === 'xỉuchủdao'
                        ) {
                            kdanhMain = 'xiuchudao';

                            let mangSoDao = findListOverturn(so);

                            mangSoDao.map((soDao) => {
                                const obj = {
                                    mien: '',
                                    dai: dai,
                                    so: soDao,
                                    kieuDanh: kdanhMain,
                                    tien: gtien,
                                };

                                arr = [...arr, obj];

                                console.log(`${dai}.${soDao}.${kdanhMain}.${gtien}ngan`);
                            });
                        }

                        if (kdSS === 'dau' || kdSS === 'đầu' || kdSS === 'đâu') {
                            kdanhMain = 'dau';

                            const obj = {
                                mien: '',
                                dai: dai,
                                so: so,
                                kieuDanh: kdanhMain,
                                tien: gtien,
                            };

                            arr = [...arr, obj];

                            console.log(`${dai}.${so}.${kdanhMain}.${gtien}ngan`);
                        }

                        if (kdSS === 'duoi' || kdSS === 'đuôi' || kdSS === 'duôi' || kdSS === 'đuoi') {
                            kdanhMain = 'duoi';

                            const obj = {
                                mien: '',
                                dai: dai,
                                so: so,
                                kieuDanh: kdanhMain,
                                tien: gtien,
                            };

                            arr = [...arr, obj];

                            console.log(`${dai}.${so}.${kdanhMain}.${gtien}ngan`);
                        }

                        if ((kdSS === 'd' || kdSS === 'đ') && ddCh) {
                            kdanhMain = 'dau';

                            const obj = {
                                mien: '',
                                dai: dai,
                                so: so,
                                kieuDanh: kdanhMain,
                                tien: gtien,
                            };

                            arr = [...arr, obj];

                            console.log(`${dai}.${so}.${kdanhMain}.${gtien}ngan`);
                        } else if ((kdSS === 'd' || kdSS === 'đ') && !ddCh) {
                            kdanhMain = 'duoi';

                            const obj = {
                                mien: '',
                                dai: dai,
                                so: so,
                                kieuDanh: kdanhMain,
                                tien: gtien,
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
