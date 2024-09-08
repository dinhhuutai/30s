function handleConvertSymbol(content) {
    let contentTmp = content;

    contentTmp = contentTmp
        .replace(/đ/g, 'd')
        .replace(/ă/g, 'a')
        .replace(/â/g, 'a')
        .replace(/ư/g, 'u')
        .replace(/ơ/g, 'o')
        .replace(/ô/g, 'o')
        .replace(/ê/g, 'e')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/dai/g, 'd');

    let length = contentTmp.length;

    let dai = '';
    let listDai = [
        'thanhpho',
        'dongthap',
        'camau',
        'bentre',
        'vungtau',
        'baclieu',
        'dongnai',
        'cantho',
        'soctrang',
        'tayninh',
        'angiang',
        'binhthuan',
        'binhduong',
        'vinhlong',
        'travinh',
        'longan',
        'binhphuoc',
        'haugiang',
        'tiengiang',
        'kiengiang',
        'dalat',
        'phuyen',
        'hue',
        'daklak',
        'daclac',
        'daclak',
        'daklac',
        'quangnam',
        'danang',
        'khanhhoa',
        'quangbinh',
        'binhdinh',
        'quangtri',
        'gialai',
        'ninhthuan',
        'quangngai',
        'dacnong',
        'daknong',
        'kontum',
        'kontom',
    ];

    let bDai = false;
    var daiMain = '';

    var vtbd = 0;
    var fVtbd = true;

    var vtkt = 0;

    for (var i = 0; i < length; i++) {
        if (!isFinite(Number(contentTmp[i])) && contentTmp[i] !== '.') {
            dai += contentTmp[i];

            if (fVtbd) {
                vtbd = i;
                fVtbd = false;
            }
        }

        if ((contentTmp[i] === '.' || isFinite(Number(contentTmp[i]))) && dai.length >= 2) {
            if (dai === 'dng') {
                vtkt = i;

                daiMain = 'dg';

                contentTmp = contentTmp.slice(0, vtbd) + daiMain + contentTmp.slice(vtkt);

                i = vtbd;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === 'btr') {
                vtkt = i;

                daiMain = 'br';

                contentTmp = contentTmp.slice(0, vtbd) + daiMain + contentTmp.slice(vtkt);

                i = vtbd;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === 'dlk') {
                vtkt = i;

                daiMain = 'dl';

                contentTmp = contentTmp.slice(0, vtbd) + daiMain + contentTmp.slice(vtkt);

                i = vtbd;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === 'bihdinh') {
                vtkt = i;

                daiMain = 'bd';

                contentTmp = contentTmp.slice(0, vtbd) + daiMain + contentTmp.slice(vtkt);

                i = vtbd;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === 'bihdih') {
                vtkt = i;

                daiMain = 'bd';

                contentTmp = contentTmp.slice(0, vtbd) + daiMain + contentTmp.slice(vtkt);

                i = vtbd;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === 'binhdih') {
                vtkt = i;

                daiMain = 'bd';

                contentTmp = contentTmp.slice(0, vtbd) + daiMain + contentTmp.slice(vtkt);

                i = vtbd;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === 'travih') {
                vtkt = i;

                daiMain = 'tv';

                contentTmp = contentTmp.slice(0, vtbd) + daiMain + contentTmp.slice(vtkt);

                i = vtbd;
                length = contentTmp.length;

                bDai = true;
            } else if (dai === 'vlong') {
                vtkt = i;

                daiMain = 'vl';

                contentTmp = contentTmp.slice(0, vtbd) + daiMain + contentTmp.slice(vtkt);

                i = vtbd;
                length = contentTmp.length;

                bDai = true;
            } else if (listDai.includes(dai)) {
                vtkt = i;

                if (dai === 'thanhpho') {
                    daiMain = 'tp';
                } else if (dai === 'dongthap') {
                    daiMain = 'dt';
                } else if (dai === 'camau') {
                    daiMain = 'cm';
                } else if (dai === 'bentre') {
                    daiMain = 'br';
                } else if (dai === 'vungtau') {
                    daiMain = 'vt';
                } else if (dai === 'baclieu') {
                    daiMain = 'bl';
                } else if (dai === 'dongnai') {
                    daiMain = 'dn';
                } else if (dai === 'cantho') {
                    daiMain = 'ct';
                } else if (dai === 'soctrang') {
                    daiMain = 'st';
                } else if (dai === 'tayninh') {
                    daiMain = 'tn';
                } else if (dai === 'angiang') {
                    daiMain = 'ag';
                } else if (dai === 'binhthuan') {
                    daiMain = 'bt';
                } else if (dai === 'binhduong') {
                    daiMain = 'bu';
                } else if (dai === 'vinhlong') {
                    daiMain = 'vl';
                } else if (dai === 'travinh') {
                    daiMain = 'tv';
                } else if (dai === 'longan') {
                    daiMain = 'la';
                } else if (dai === 'binhphuoc') {
                    daiMain = 'bp';
                } else if (dai === 'haugiang') {
                    daiMain = 'hg';
                } else if (dai === 'tiengiang') {
                    daiMain = 'tg';
                } else if (dai === 'kiengiang') {
                    daiMain = 'kg';
                } else if (dai === 'dalat') {
                    daiMain = 'da';
                } else if (dai === 'phuyen') {
                    daiMain = 'py';
                } else if (dai === 'hue') {
                    daiMain = 'hu';
                } else if (dai === 'daklak' || dai === 'daclac' || dai === 'daclak' || dai === 'daklac') {
                    daiMain = 'dl';
                } else if (dai === 'quangnam') {
                    daiMain = 'qn';
                } else if (dai === 'danang') {
                    daiMain = 'dg';
                } else if (dai === 'khanhhoa') {
                    daiMain = 'kh';
                } else if (dai === 'quangbinh') {
                    daiMain = 'qb';
                } else if (dai === 'binhdinh') {
                    daiMain = 'bd';
                } else if (dai === 'quangtri') {
                    daiMain = 'qt';
                } else if (dai === 'gialai') {
                    daiMain = 'gl';
                } else if (dai === 'ninhthuan') {
                    daiMain = 'nt';
                } else if (dai === 'quangngai') {
                    daiMain = 'qg';
                } else if (dai === 'dacnong' || dai === 'daknong') {
                    daiMain = 'do';
                } else if (dai === 'kontum' || dai === 'kontom' || dai === 'ktum') {
                    daiMain = 'kt';
                }

                contentTmp = contentTmp.slice(0, vtbd) + daiMain + contentTmp.slice(vtkt);

                i = vtbd + 1;
                length = contentTmp.length;

                bDai = true;
            } else {
                bDai = false;
            }
        }

        if (isFinite(Number(contentTmp[i])) || (contentTmp[i] === '.' && isFinite(Number(contentTmp[i + 1])))) {
            dai = '';
            vtbd = 0;
            fVtbd = true;
        }

        if (bDai) {
            dai = '';
            vtbd = 0;
            fVtbd = true;

            vtkt = 0;

            bDai = false;
        }
    }

    return contentTmp;
}

export default handleConvertSymbol;
