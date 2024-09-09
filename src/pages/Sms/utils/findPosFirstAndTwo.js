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
        'bd',
        'qt',
        'gl',
        'nt',
        'qg',
        'do',
        'kt',
        'mb',
    ];

    function findPositions(char) {
        let positions = [];
        let index = content.indexOf(char);

        while (index !== -1 && !isFinite(Number(content[index - 1]))) {
            if ((content[index - 1] === '.' && isFinite(Number(content[index - 2]))) || index === 0) {
                positions.push(index);
            }

            index = content.indexOf(char, index + 1);
        }

        return positions;
    }

    const allPositions = searchChars.flatMap((char) => findPositions(char));

    const firstTwoPositions = allPositions.sort((a, b) => a - b).slice(0, 2);

    // Nếu không có đủ hai vị trí, thêm -1 vào kết quả
    while (firstTwoPositions.length < 2) {
        firstTwoPositions.push(-1);
    }

    return firstTwoPositions;
}

export default findPosFirstAndTwo;
