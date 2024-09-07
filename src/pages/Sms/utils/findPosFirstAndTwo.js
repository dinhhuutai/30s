function findPosFirstAndTwo(content) {
    const searchChars = ['2d', '2đ', '3d', '3đ', '4d', '4đ', 'bp', 'hg', 'dc', 'tp', 'la'];

    function findPositions(char) {
        let positions = [];
        let index = content.indexOf(char);

        while (index !== -1) {
            positions.push(index);
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
