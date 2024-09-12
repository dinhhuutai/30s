function handleDeleteStringFrontRedundant(content) {
    let contentTmp = content;
    let length = contentTmp.length;

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
        'bd',
        'qt',
        'gl',
        'nt',
        'qg',
        'do',
        'kt',
        'mb',
    ];

    let stringRedun = '';

    for (let i = 0; i < length; i++) {
        if (contentTmp[i] !== '.') {
            stringRedun += contentTmp[i];
        } else {
            if (searchChars.includes(stringRedun)) {
                break;
            } else {
                contentTmp = contentTmp.slice(i + 1);
                stringRedun = '';
                length = contentTmp.length;
                i = -1;
            }
        }
    }

    return contentTmp;
}

export default handleDeleteStringFrontRedundant;
