function findPosFirstAndTwo(content) {
    const searchChars = [
        '2d',
        '2đ',
        '3d',
        '3đ',
        '4d',
        '4đ',
        'dc',
        'dp',
        'dt',
        'tp',
        'cm',
        'br',
        'vt',
        'bi',
        'dn',
        'ct',
        'st',
        'tn',
        'ag',
        'bt',
        'bu',
        'vl',
        'tv',
        'la',
        'bp',
        'hg',
        'tg',
        'kg',
        'lt',
        'py',
        'hu',
        'dl',
        'qn',
        'dg',
        'kh',
        'qb',
        'qt',
        'gl',
        'bd',
        'nt',
        'qg',
        'do',
        'kt',
        'mb',
        'bl',
    ];

    let changeDaiBacLieu = false;
    let changeBaoDao = [];

    function findPositions(char) {
        let positions = [];
        let index = content.indexOf(char);

        // && !isFinite(Number(content[index - 1]))

        while (index !== -1) {
            if (
                (content[index - 1] === '.' &&
                    isFinite(Number(content[index - 2])) &&
                    (content[index + 2] === '.' || isFinite(Number(content[index + 2])))) ||
                index === 0 ||
                (content[index] === 'b' &&
                    content[index + 1] === 'l' &&
                    (content[index + 2] === '.' || isFinite(Number(content[index + 2])))) ||
                (content[index] === 'b' &&
                    (content[index + 1] === 'u' || content[index + 1] === 'd') &&
                    (content[index + 2] === '.' || isFinite(Number(content[index + 2]))))
            ) {
                positions.push(index);
            }
            index = content.indexOf(char, index + 1);
        }

        return positions;
    }

    const allPositions = searchChars.flatMap((char) => findPositions(char));

    let firstTwoPositions = allPositions.sort((a, b) => a - b);


    if (
        content[firstTwoPositions[1]] === 'b' &&
        content[firstTwoPositions[1] + 1] === 'l' &&
        (content[firstTwoPositions[1] + 2] === '.' || isFinite(Number(content[firstTwoPositions[1] + 2])))
    ) {
        let stringChildTest = content.slice(firstTwoPositions[0], firstTwoPositions[1]);

        stringChildTest = stringChildTest.replace(/[.]/g, '');

        if (
            stringChildTest.includes('dx') ||
            stringChildTest.includes('đx') ||
            stringChildTest.includes('đax') ||
            stringChildTest.includes('da') ||
            stringChildTest.includes('đa') ||
            stringChildTest.includes('dat') ||
            stringChildTest.includes('dathang') ||
            stringChildTest.includes('dath') ||
            stringChildTest.includes('dth') ||
            stringChildTest.includes('dthang') ||
            stringChildTest.includes('daxien') ||
            stringChildTest.includes('dxien') ||
            stringChildTest.includes('đat') ||
            stringChildTest.includes('dax') ||
            (stringChildTest.includes('l') &&
                (stringChildTest[stringChildTest.indexOf('l') - 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('l') - 1]))) &&
                (stringChildTest[stringChildTest.indexOf('l') + 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('l') + 1])))) ||
            stringChildTest.includes('lo') ||
            (stringChildTest.includes('b') &&
                (stringChildTest[stringChildTest.indexOf('b') - 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('b') - 1]))) &&
                (stringChildTest[stringChildTest.indexOf('b') + 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('b') + 1])))) ||
            stringChildTest.includes('bl') ||
            stringChildTest.includes('blo') ||
            stringChildTest.includes('blô') ||
            stringChildTest.includes('baolo') ||
            stringChildTest.includes('bao') ||
            stringChildTest.includes('baol') ||
            stringChildTest.includes('baolô') ||
            stringChildTest.includes('dl') ||
            stringChildTest.includes('dlo') ||
            stringChildTest.includes('ld') ||
            stringChildTest.includes('lod') ||
            stringChildTest.includes('db') ||
            stringChildTest.includes('đb') ||
            stringChildTest.includes('dbl') ||
            stringChildTest.includes('đbl') ||
            stringChildTest.includes('dblo') ||
            stringChildTest.includes('đblô') ||
            stringChildTest.includes('daobaolo') ||
            stringChildTest.includes('daobaolô') ||
            stringChildTest.includes('blodao') ||
            stringChildTest.includes('daoblo') ||
            stringChildTest.includes('baolodao') ||
            stringChildTest.includes('daobaolo') ||
            stringChildTest.includes('bldao') ||
            stringChildTest.includes('daobl') ||
            stringChildTest.includes('bdao') ||
            stringChildTest.includes('daob') ||
            stringChildTest.includes('baoldao') ||
            stringChildTest.includes('daobaol') ||
            stringChildTest.includes('baodao') ||
            stringChildTest.includes('daobao') ||
            stringChildTest.includes('daolo') ||
            stringChildTest.includes('lodao') ||
            stringChildTest.includes('bđao') ||
            stringChildTest.includes('bld') ||
            stringChildTest.includes('dd') ||
            stringChildTest.includes('đđ') ||
            stringChildTest.includes('dauduoi') ||
            stringChildTest.includes('daudui') ||
            stringChildTest.includes('daud') ||
            stringChildTest.includes('ddui') ||
            stringChildTest.includes('dduoi') ||
            stringChildTest.includes('đd') ||
            stringChildTest.includes('dđ') ||
            stringChildTest.includes('đâuđuôi') ||
            stringChildTest.includes('đầuđuôi') ||
            stringChildTest.includes('đauđuôi') ||
            (stringChildTest.includes('x') &&
                (stringChildTest[stringChildTest.indexOf('x') - 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('x') - 1]))) &&
                (stringChildTest[stringChildTest.indexOf('x') + 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('x') + 1])))) ||
            stringChildTest.includes('xc') ||
            stringChildTest.includes('xiuchu') ||
            stringChildTest.includes('xiuch') ||
            stringChildTest.includes('xiuc') ||
            stringChildTest.includes('xch') ||
            stringChildTest.includes('xchu') ||
            (stringChildTest.includes('s') &&
                (stringChildTest[stringChildTest.indexOf('s') - 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('s') - 1]))) &&
                (stringChildTest[stringChildTest.indexOf('s') + 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('s') + 1])))) ||
            stringChildTest.includes('sc') ||
            stringChildTest.includes('siuchu') ||
            stringChildTest.includes('siuch') ||
            stringChildTest.includes('siuc') ||
            stringChildTest.includes('sch') ||
            stringChildTest.includes('schu') ||
            stringChildTest.includes('xdau') ||
            stringChildTest.includes('xcdau') ||
            stringChildTest.includes('xchdau') ||
            stringChildTest.includes('xchudau') ||
            stringChildTest.includes('xiuchudau') ||
            stringChildTest.includes('xiuchdau') ||
            stringChildTest.includes('xiucdau') ||
            stringChildTest.includes('xđau') ||
            stringChildTest.includes('xcđau') ||
            stringChildTest.includes('xiuchuđau') ||
            stringChildTest.includes('sdau') ||
            stringChildTest.includes('scdau') ||
            stringChildTest.includes('schdau') ||
            stringChildTest.includes('schudau') ||
            stringChildTest.includes('siuchudau') ||
            stringChildTest.includes('siuchdau') ||
            stringChildTest.includes('siucdau') ||
            stringChildTest.includes('sđau') ||
            stringChildTest.includes('scđau') ||
            stringChildTest.includes('siuchuđau') ||
            stringChildTest.includes('xduoi') ||
            stringChildTest.includes('xcduoi') ||
            stringChildTest.includes('xchduoi') ||
            stringChildTest.includes('xchuduoi') ||
            stringChildTest.includes('xiuchuduoi') ||
            stringChildTest.includes('xiuchduoi') ||
            stringChildTest.includes('xiucduoi') ||
            stringChildTest.includes('xduoi') ||
            stringChildTest.includes('xcduoi') ||
            stringChildTest.includes('xiuchuduoi') ||
            stringChildTest.includes('xdui') ||
            stringChildTest.includes('xcdui') ||
            stringChildTest.includes('xchdui') ||
            stringChildTest.includes('xchudui') ||
            stringChildTest.includes('xiuchudui') ||
            stringChildTest.includes('xiuchdui') ||
            stringChildTest.includes('xiucdui') ||
            stringChildTest.includes('xdui') ||
            stringChildTest.includes('xcdui') ||
            stringChildTest.includes('xiuchudui') ||
            stringChildTest.includes('sduoi') ||
            stringChildTest.includes('scduoi') ||
            stringChildTest.includes('schduoi') ||
            stringChildTest.includes('schuduoi') ||
            stringChildTest.includes('siuchuduoi') ||
            stringChildTest.includes('siuchduoi') ||
            stringChildTest.includes('siucduoi') ||
            stringChildTest.includes('sduoi') ||
            stringChildTest.includes('scduoi') ||
            stringChildTest.includes('siuchuduoi') ||
            stringChildTest.includes('sdui') ||
            stringChildTest.includes('scdui') ||
            stringChildTest.includes('schdui') ||
            stringChildTest.includes('schudui') ||
            stringChildTest.includes('siuchudui') ||
            stringChildTest.includes('siuchdui') ||
            stringChildTest.includes('siucdui') ||
            stringChildTest.includes('sdui') ||
            stringChildTest.includes('scdui') ||
            stringChildTest.includes('siuchudui') ||
            stringChildTest.includes('daoxc') ||
            stringChildTest.includes('daox') ||
            stringChildTest.includes('dxchu') ||
            stringChildTest.includes('dx') ||
            stringChildTest.includes('dxc') ||
            stringChildTest.includes('xd') ||
            stringChildTest.includes('xdao') ||
            stringChildTest.includes('xcdao') ||
            stringChildTest.includes('xiuchudao') ||
            stringChildTest.includes('xchudao') ||
            stringChildTest.includes('xchdao') ||
            stringChildTest.includes('xiucdao') ||
            stringChildTest.includes('xiuchdao') ||
            stringChildTest.includes('xcd') ||
            stringChildTest.includes('xiuchud') ||
            stringChildTest.includes('xchud') ||
            stringChildTest.includes('xchd') ||
            stringChildTest.includes('xiucd') ||
            stringChildTest.includes('xiuchd') ||
            stringChildTest.includes('đaoxc') ||
            stringChildTest.includes('đaox') ||
            stringChildTest.includes('đxchu') ||
            stringChildTest.includes('đx') ||
            stringChildTest.includes('đxc') ||
            stringChildTest.includes('xđ') ||
            stringChildTest.includes('xđao') ||
            stringChildTest.includes('xcđ') ||
            stringChildTest.includes('xcđao') ||
            stringChildTest.includes('xiuchuđao') ||
            stringChildTest.includes('daox') ||
            stringChildTest.includes('daoxc') ||
            stringChildTest.includes('daoxiuchu') ||
            stringChildTest.includes('daoxchu') ||
            stringChildTest.includes('daoxch') ||
            stringChildTest.includes('daoxiuc') ||
            stringChildTest.includes('daoxiuch') ||
            stringChildTest.includes('dxc') ||
            stringChildTest.includes('dxiuchu') ||
            stringChildTest.includes('dxchu') ||
            stringChildTest.includes('dxch') ||
            stringChildTest.includes('dxiuc') ||
            stringChildTest.includes('dxiuch') ||
            stringChildTest.includes('daosc') ||
            stringChildTest.includes('daos') ||
            stringChildTest.includes('dschu') ||
            stringChildTest.includes('ds') ||
            stringChildTest.includes('dsc') ||
            stringChildTest.includes('sd') ||
            stringChildTest.includes('sdao') ||
            stringChildTest.includes('scdao') ||
            stringChildTest.includes('siuchudao') ||
            stringChildTest.includes('schudao') ||
            stringChildTest.includes('schdao') ||
            stringChildTest.includes('siucdao') ||
            stringChildTest.includes('siuchdao') ||
            stringChildTest.includes('scd') ||
            stringChildTest.includes('siuchud') ||
            stringChildTest.includes('schud') ||
            stringChildTest.includes('schd') ||
            stringChildTest.includes('siucd') ||
            stringChildTest.includes('siuchd') ||
            stringChildTest.includes('đaosc') ||
            stringChildTest.includes('đaos') ||
            stringChildTest.includes('đschu') ||
            stringChildTest.includes('đs') ||
            stringChildTest.includes('đsc') ||
            stringChildTest.includes('sđ') ||
            stringChildTest.includes('sđao') ||
            stringChildTest.includes('scđ') ||
            stringChildTest.includes('scđao') ||
            stringChildTest.includes('siuchuđao') ||
            stringChildTest.includes('daos') ||
            stringChildTest.includes('daosc') ||
            stringChildTest.includes('daosiuchu') ||
            stringChildTest.includes('daoschu') ||
            stringChildTest.includes('daosch') ||
            stringChildTest.includes('daosiuc') ||
            stringChildTest.includes('daosiuch') ||
            stringChildTest.includes('dsc') ||
            stringChildTest.includes('dsiuchu') ||
            stringChildTest.includes('dschu') ||
            stringChildTest.includes('dsch') ||
            stringChildTest.includes('dsiuc') ||
            stringChildTest.includes('dsiuch') ||
            stringChildTest.includes('duoi') ||
            stringChildTest.includes('đuôi') ||
            stringChildTest.includes('duôi') ||
            stringChildTest.includes('đuoi') ||
            stringChildTest.includes('dui') ||
            stringChildTest.includes('đui') ||
            (stringChildTest.includes('d') &&
                (stringChildTest[stringChildTest.indexOf('d') - 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('d') - 1]))) &&
                (stringChildTest[stringChildTest.indexOf('d') + 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('d') + 1]))))
        ) {
            if (content[firstTwoPositions[1] + 2] === '.') {
                // la dai Bac Lieu
                changeDaiBacLieu = true;
            } else {
                while (
                    content[firstTwoPositions[1]] === 'b' &&
                    content[firstTwoPositions[1] + 1] === 'l' &&
                    content[firstTwoPositions[1] + 2] !== '.' &&
                    firstTwoPositions.length > 1
                ) {
                    firstTwoPositions.splice(1, 1);

                    if (
                        content[firstTwoPositions[1]] === 'b' &&
                        content[firstTwoPositions[1] + 1] === 'l' &&
                        content[firstTwoPositions[1] + 2] === '.'
                    ) {
                        // la dai Bac Lieu
                        changeDaiBacLieu = true;
                    }
                }
            }
        } else {
            firstTwoPositions.splice(1, 1);
            if (
                content[firstTwoPositions[1]] === 'b' &&
                content[firstTwoPositions[1] + 1] === 'l' &&
                content[firstTwoPositions[1] + 2] === '.'
            ) {
                // la dai Bac Lieu
                changeDaiBacLieu = true;
            }
            while (
                content[firstTwoPositions[1]] === 'b' &&
                content[firstTwoPositions[1] + 1] === 'l' &&
                content[firstTwoPositions[1] + 2] !== '.' &&
                firstTwoPositions.length > 1
            ) {
                firstTwoPositions.splice(1, 1);

                if (
                    content[firstTwoPositions[1]] === 'b' &&
                    content[firstTwoPositions[1] + 1] === 'l' &&
                    content[firstTwoPositions[1] + 2] === '.'
                ) {
                    // la dai Bac Lieu
                    changeDaiBacLieu = true;
                }
            }
        }
    } else if (
        content[firstTwoPositions[1]] === 'b' &&
        (content[firstTwoPositions[1] + 1] === 'u' || content[firstTwoPositions[1] + 1] === 'd') &&
        (content[firstTwoPositions[1] + 2] === '.' || isFinite(Number(content[firstTwoPositions[1] + 2])))
    ) {
        let stringChildTest = content.slice(firstTwoPositions[0], firstTwoPositions[1]);

        stringChildTest = stringChildTest.replace(/[.]/g, '');

        if (
            stringChildTest.includes('dx') ||
            stringChildTest.includes('đx') ||
            stringChildTest.includes('đax') ||
            stringChildTest.includes('da') ||
            stringChildTest.includes('đa') ||
            stringChildTest.includes('dat') ||
            stringChildTest.includes('dathang') ||
            stringChildTest.includes('dath') ||
            stringChildTest.includes('dth') ||
            stringChildTest.includes('dthang') ||
            stringChildTest.includes('daxien') ||
            stringChildTest.includes('dxien') ||
            stringChildTest.includes('đat') ||
            stringChildTest.includes('dax') ||
            (stringChildTest.includes('l') &&
                (stringChildTest[stringChildTest.indexOf('l') - 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('l') - 1]))) &&
                (stringChildTest[stringChildTest.indexOf('l') + 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('l') + 1])))) ||
            stringChildTest.includes('lo') ||
            (stringChildTest.includes('b') &&
                (stringChildTest[stringChildTest.indexOf('b') - 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('b') - 1]))) &&
                (stringChildTest[stringChildTest.indexOf('b') + 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('b') + 1])))) ||
            stringChildTest.includes('bl') ||
            stringChildTest.includes('blo') ||
            stringChildTest.includes('blô') ||
            stringChildTest.includes('baolo') ||
            stringChildTest.includes('bao') ||
            stringChildTest.includes('baol') ||
            stringChildTest.includes('baolô') ||
            stringChildTest.includes('dl') ||
            stringChildTest.includes('dlo') ||
            stringChildTest.includes('ld') ||
            stringChildTest.includes('lod') ||
            stringChildTest.includes('db') ||
            stringChildTest.includes('đb') ||
            stringChildTest.includes('dbl') ||
            stringChildTest.includes('đbl') ||
            stringChildTest.includes('dblo') ||
            stringChildTest.includes('đblô') ||
            stringChildTest.includes('daobaolo') ||
            stringChildTest.includes('daobaolô') ||
            stringChildTest.includes('blodao') ||
            stringChildTest.includes('daoblo') ||
            stringChildTest.includes('baolodao') ||
            stringChildTest.includes('daobaolo') ||
            stringChildTest.includes('bldao') ||
            stringChildTest.includes('daobl') ||
            stringChildTest.includes('bdao') ||
            stringChildTest.includes('daob') ||
            stringChildTest.includes('baoldao') ||
            stringChildTest.includes('daobaol') ||
            stringChildTest.includes('baodao') ||
            stringChildTest.includes('daobao') ||
            stringChildTest.includes('daolo') ||
            stringChildTest.includes('lodao') ||
            stringChildTest.includes('bđao') ||
            stringChildTest.includes('bld') ||
            stringChildTest.includes('dd') ||
            stringChildTest.includes('đđ') ||
            stringChildTest.includes('dauduoi') ||
            stringChildTest.includes('daudui') ||
            stringChildTest.includes('daud') ||
            stringChildTest.includes('ddui') ||
            stringChildTest.includes('dduoi') ||
            stringChildTest.includes('đd') ||
            stringChildTest.includes('dđ') ||
            stringChildTest.includes('đâuđuôi') ||
            stringChildTest.includes('đầuđuôi') ||
            stringChildTest.includes('đauđuôi') ||
            (stringChildTest.includes('x') &&
                (stringChildTest[stringChildTest.indexOf('x') - 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('x') - 1]))) &&
                (stringChildTest[stringChildTest.indexOf('x') + 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('x') + 1])))) ||
            stringChildTest.includes('xc') ||
            stringChildTest.includes('xiuchu') ||
            stringChildTest.includes('xiuch') ||
            stringChildTest.includes('xiuc') ||
            stringChildTest.includes('xch') ||
            stringChildTest.includes('xchu') ||
            (stringChildTest.includes('s') &&
                (stringChildTest[stringChildTest.indexOf('s') - 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('s') - 1]))) &&
                (stringChildTest[stringChildTest.indexOf('s') + 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('s') + 1])))) ||
            stringChildTest.includes('sc') ||
            stringChildTest.includes('siuchu') ||
            stringChildTest.includes('siuch') ||
            stringChildTest.includes('siuc') ||
            stringChildTest.includes('sch') ||
            stringChildTest.includes('schu') ||
            stringChildTest.includes('xdau') ||
            stringChildTest.includes('xcdau') ||
            stringChildTest.includes('xchdau') ||
            stringChildTest.includes('xchudau') ||
            stringChildTest.includes('xiuchudau') ||
            stringChildTest.includes('xiuchdau') ||
            stringChildTest.includes('xiucdau') ||
            stringChildTest.includes('xđau') ||
            stringChildTest.includes('xcđau') ||
            stringChildTest.includes('xiuchuđau') ||
            stringChildTest.includes('sdau') ||
            stringChildTest.includes('scdau') ||
            stringChildTest.includes('schdau') ||
            stringChildTest.includes('schudau') ||
            stringChildTest.includes('siuchudau') ||
            stringChildTest.includes('siuchdau') ||
            stringChildTest.includes('siucdau') ||
            stringChildTest.includes('sđau') ||
            stringChildTest.includes('scđau') ||
            stringChildTest.includes('siuchuđau') ||
            stringChildTest.includes('xduoi') ||
            stringChildTest.includes('xcduoi') ||
            stringChildTest.includes('xchduoi') ||
            stringChildTest.includes('xchuduoi') ||
            stringChildTest.includes('xiuchuduoi') ||
            stringChildTest.includes('xiuchduoi') ||
            stringChildTest.includes('xiucduoi') ||
            stringChildTest.includes('xduoi') ||
            stringChildTest.includes('xcduoi') ||
            stringChildTest.includes('xiuchuduoi') ||
            stringChildTest.includes('xdui') ||
            stringChildTest.includes('xcdui') ||
            stringChildTest.includes('xchdui') ||
            stringChildTest.includes('xchudui') ||
            stringChildTest.includes('xiuchudui') ||
            stringChildTest.includes('xiuchdui') ||
            stringChildTest.includes('xiucdui') ||
            stringChildTest.includes('xdui') ||
            stringChildTest.includes('xcdui') ||
            stringChildTest.includes('xiuchudui') ||
            stringChildTest.includes('sduoi') ||
            stringChildTest.includes('scduoi') ||
            stringChildTest.includes('schduoi') ||
            stringChildTest.includes('schuduoi') ||
            stringChildTest.includes('siuchuduoi') ||
            stringChildTest.includes('siuchduoi') ||
            stringChildTest.includes('siucduoi') ||
            stringChildTest.includes('sduoi') ||
            stringChildTest.includes('scduoi') ||
            stringChildTest.includes('siuchuduoi') ||
            stringChildTest.includes('sdui') ||
            stringChildTest.includes('scdui') ||
            stringChildTest.includes('schdui') ||
            stringChildTest.includes('schudui') ||
            stringChildTest.includes('siuchudui') ||
            stringChildTest.includes('siuchdui') ||
            stringChildTest.includes('siucdui') ||
            stringChildTest.includes('sdui') ||
            stringChildTest.includes('scdui') ||
            stringChildTest.includes('siuchudui') ||
            stringChildTest.includes('daoxc') ||
            stringChildTest.includes('daox') ||
            stringChildTest.includes('dxchu') ||
            stringChildTest.includes('dx') ||
            stringChildTest.includes('dxc') ||
            stringChildTest.includes('xd') ||
            stringChildTest.includes('xdao') ||
            stringChildTest.includes('xcdao') ||
            stringChildTest.includes('xiuchudao') ||
            stringChildTest.includes('xchudao') ||
            stringChildTest.includes('xchdao') ||
            stringChildTest.includes('xiucdao') ||
            stringChildTest.includes('xiuchdao') ||
            stringChildTest.includes('xcd') ||
            stringChildTest.includes('xiuchud') ||
            stringChildTest.includes('xchud') ||
            stringChildTest.includes('xchd') ||
            stringChildTest.includes('xiucd') ||
            stringChildTest.includes('xiuchd') ||
            stringChildTest.includes('đaoxc') ||
            stringChildTest.includes('đaox') ||
            stringChildTest.includes('đxchu') ||
            stringChildTest.includes('đx') ||
            stringChildTest.includes('đxc') ||
            stringChildTest.includes('xđ') ||
            stringChildTest.includes('xđao') ||
            stringChildTest.includes('xcđ') ||
            stringChildTest.includes('xcđao') ||
            stringChildTest.includes('xiuchuđao') ||
            stringChildTest.includes('daox') ||
            stringChildTest.includes('daoxc') ||
            stringChildTest.includes('daoxiuchu') ||
            stringChildTest.includes('daoxchu') ||
            stringChildTest.includes('daoxch') ||
            stringChildTest.includes('daoxiuc') ||
            stringChildTest.includes('daoxiuch') ||
            stringChildTest.includes('dxc') ||
            stringChildTest.includes('dxiuchu') ||
            stringChildTest.includes('dxchu') ||
            stringChildTest.includes('dxch') ||
            stringChildTest.includes('dxiuc') ||
            stringChildTest.includes('dxiuch') ||
            stringChildTest.includes('daosc') ||
            stringChildTest.includes('daos') ||
            stringChildTest.includes('dschu') ||
            stringChildTest.includes('ds') ||
            stringChildTest.includes('dsc') ||
            stringChildTest.includes('sd') ||
            stringChildTest.includes('sdao') ||
            stringChildTest.includes('scdao') ||
            stringChildTest.includes('siuchudao') ||
            stringChildTest.includes('schudao') ||
            stringChildTest.includes('schdao') ||
            stringChildTest.includes('siucdao') ||
            stringChildTest.includes('siuchdao') ||
            stringChildTest.includes('scd') ||
            stringChildTest.includes('siuchud') ||
            stringChildTest.includes('schud') ||
            stringChildTest.includes('schd') ||
            stringChildTest.includes('siucd') ||
            stringChildTest.includes('siuchd') ||
            stringChildTest.includes('đaosc') ||
            stringChildTest.includes('đaos') ||
            stringChildTest.includes('đschu') ||
            stringChildTest.includes('đs') ||
            stringChildTest.includes('đsc') ||
            stringChildTest.includes('sđ') ||
            stringChildTest.includes('sđao') ||
            stringChildTest.includes('scđ') ||
            stringChildTest.includes('scđao') ||
            stringChildTest.includes('siuchuđao') ||
            stringChildTest.includes('daos') ||
            stringChildTest.includes('daosc') ||
            stringChildTest.includes('daosiuchu') ||
            stringChildTest.includes('daoschu') ||
            stringChildTest.includes('daosch') ||
            stringChildTest.includes('daosiuc') ||
            stringChildTest.includes('daosiuch') ||
            stringChildTest.includes('dsc') ||
            stringChildTest.includes('dsiuchu') ||
            stringChildTest.includes('dschu') ||
            stringChildTest.includes('dsch') ||
            stringChildTest.includes('dsiuc') ||
            stringChildTest.includes('dsiuch') ||
            stringChildTest.includes('duoi') ||
            stringChildTest.includes('đuôi') ||
            stringChildTest.includes('duôi') ||
            stringChildTest.includes('đuoi') ||
            stringChildTest.includes('dui') ||
            stringChildTest.includes('đui') ||
            (stringChildTest.includes('d') &&
                (stringChildTest[stringChildTest.indexOf('d') - 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('d') - 1]))) &&
                (stringChildTest[stringChildTest.indexOf('d') + 1] === '.' ||
                    isFinite(Number(stringChildTest[stringChildTest.indexOf('d') + 1]))))
        ) {
            if (content[firstTwoPositions[1] + 2] === '.') {
            } else {
                while (
                    content[firstTwoPositions[1]] === 'b' &&
                    (content[firstTwoPositions[1] + 1] === 'u' || content[firstTwoPositions[1] + 1] === 'd') &&
                    content[firstTwoPositions[1] + 2] !== '.' &&
                    firstTwoPositions.length > 1
                ) {
                    // la bao dao
                    changeBaoDao.push(firstTwoPositions[1]);

                    firstTwoPositions.splice(1, 1);

                    if (
                        content[firstTwoPositions[1]] === 'b' &&
                        (content[firstTwoPositions[1] + 1] === 'u' || content[firstTwoPositions[1] + 1] === 'd') &&
                        content[firstTwoPositions[1] + 2] === '.'
                    ) {
                    }
                }
            }
        } else {
            // la bao dao
            changeBaoDao.push(firstTwoPositions[1]);

            firstTwoPositions.splice(1, 1);
            if (
                content[firstTwoPositions[1]] === 'b' &&
                (content[firstTwoPositions[1] + 1] === 'u' || content[firstTwoPositions[1] + 1] === 'd') &&
                content[firstTwoPositions[1] + 2] === '.'
            ) {
            }

            while (
                content[firstTwoPositions[1]] === 'b' &&
                (content[firstTwoPositions[1] + 1] === 'u' || content[firstTwoPositions[1] + 1] === 'd') &&
                content[firstTwoPositions[1] + 2] !== '.' &&
                firstTwoPositions.length > 1
            ) {
                // la bao dao
                changeBaoDao.push(firstTwoPositions[1]);

                firstTwoPositions.splice(1, 1);

                if (
                    content[firstTwoPositions[1]] === 'b' &&
                    (content[firstTwoPositions[1] + 1] === 'u' || content[firstTwoPositions[1] + 1] === 'd') &&
                    content[firstTwoPositions[1] + 2] === '.'
                ) {
                }
            }
        }
    }

    firstTwoPositions = allPositions.slice(0, 2);

    // Nếu không có đủ hai vị trí, thêm -1 vào kết quả
    while (firstTwoPositions.length < 2) {
        firstTwoPositions.push(-1);
    }


    return { firstTwoPositions, changeDaiBacLieu, changeBaoDao };
}

export default findPosFirstAndTwo;
