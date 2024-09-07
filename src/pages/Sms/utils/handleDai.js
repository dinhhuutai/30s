function handleDai(dai) {
    let daiTmp = [];

    if (dai === '2d' || dai === '2đ') {
        daiTmp = ['tp', 'la'];
    } else if (dai === '3d' || dai === '3đ') {
        daiTmp = ['tp', 'la', 'bp'];
    } else if (dai === '4d' || dai === '4đ') {
        daiTmp = ['tp', 'la', 'bp', 'hg'];
    } else if (dai === 'dc' || dai === 'dch' || dai === 'đc' || dai === 'đch' || dai === 'dchanh' || dai === 'đchanh') {
        daiTmp = ['tp'];
    } else if (dai === 'dp' || dai === 'dph' || dai === 'đp' || dai === 'đph' || dai === 'dphu' || dai === 'đphu') {
        daiTmp = ['la'];
    } else {
        daiTmp = [dai];
    }

    return daiTmp;
}

export default handleDai;
