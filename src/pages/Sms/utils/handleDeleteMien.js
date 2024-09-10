function handleDeleteMien(content, mien) {
    let contentTmp = content;


    if (mien === 'mn') {
        contentTmp = contentTmp
            .replace(/mn/g, '')
            .replace(/m.n/g, '')
            .replace(/m.nam/g, '')
            .replace(/mnam/g, '')
            .replace(/mien.nam/g, '')
            .replace(/miennam/g, '')
            .replace(/mienam/g, '')
            .replace(/m.n/g, '');
    } else if (mien === 'mt') {
        contentTmp = contentTmp
            .replace(/mtr/g, '')
            .replace(/mtrung/g, '')
            .replace(/mientr/g, '')
            .replace(/mt/g, '')
            .replace(/mientrung/g, '')
            .replace(/m.tr/g, '')
            .replace(/m.trung/g, '')
            .replace(/mien.tr/g, '')
            .replace(/m.t/g, '')
            .replace(/mien.trung/g, '');
    } else if (mien === 'mb') {
        contentTmp = contentTmp
            .replace(/mienb/g, '')
            .replace(/mienbac/g, '')
            .replace(/hn/g, '')
            .replace(/hanoi/g, '')
            .replace(/hnoi/g, '')
            .replace(/han/g, '')
            .replace(/m.b/g, '')
            .replace(/mien.b/g, '')
            .replace(/mien.bac/g, '')
            .replace(/h.n/g, '')
            .replace(/ha.noi/g, '')
            .replace(/h.noi/g, '')
            .replace(/ha.n/g, '');
    }


    if (contentTmp[0] === 'm' && contentTmp[1] === 'b') {
        let strD = contentTmp.substring(0, 2);
        let strS = contentTmp.substring(2);

        strS = strS.replace(/mb/g, '');

        contentTmp = strD + strS;
    }

    contentTmp = contentTmp.replace(/\.{2,}/g, '.');

    return contentTmp;
}

export default handleDeleteMien;
