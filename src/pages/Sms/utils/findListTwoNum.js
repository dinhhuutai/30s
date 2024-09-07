function findListTwoNum(mangSo) {
    const result = [];

    for (let i = 0; i < mangSo.length; i++) {
        for (let j = i + 1; j < mangSo.length; j++) {
            result.push([mangSo[i], mangSo[j]]);
        }
    }

    return result;
}

export default findListTwoNum;
