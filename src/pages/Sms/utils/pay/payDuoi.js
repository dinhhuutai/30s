function payDuoi(content, info, kqxs) {
    let diem = 0;
    let tienxac = 0;
    let tientrung = 0;
    let quantitySoTrung = 0;

    console.log(content);

    let lengthSo = content.so.length;

    diem =
        content.tien *
        (content.mien === 'mn' || content.mien === 'mt' ? 1 : content.mien === 'mb' ? 1 : 1) *
        content.dai.length;

    tienxac =
        diem * (content.mien === 'mn' ? info.codauduoiMN : content.mien === 'mt' ? info.codauduoiMT : info.codauduoiMB);

    kqxs.map((eKq) => {
        if (content.dai.includes(eKq.dai)) {
            eKq.kq.map((s, i) => {
                if (
                    s.length >= content.so.length &&
                    s.endsWith(content.so) &&
                    ((i === 17 && (content.mien === 'mn' || content.mien === 'mt')) ||
                        (content.mien === 'mb' && i === 26))
                ) {
                    quantitySoTrung += 1;
                }
            });
        }
    });

    tientrung =
        content.tien *
        quantitySoTrung *
        (content.mien === 'mn'
            ? info.trungdauduoiMN
            : content.mien === 'mt'
            ? info.trungdauduoiMT
            : info.trungdauduoiMB);

    console.log('soluongGiong: ', quantitySoTrung);
    console.log('diem: ', diem);
    console.log('tienxac: ', tienxac);
    console.log('tientrung: ', tientrung);

    return {
        diem: diem,
        tienxac: tienxac,
        tientrung: tientrung,
        soluongGiong: quantitySoTrung,
    };
}

export default payDuoi;
