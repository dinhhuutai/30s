function payDaXien(content, info, kqxs) {
    let diem = 0;
    let tienxac = 0;
    let tientrung = 0;
    let quantitySoTrung = 0;
    let quantitySoTrung1 = 0;
    let quantitySoTrung2 = 0;

    console.log(content);

    diem =
        content.tien *
        2 *
        (content.mien === 'mn' || content.mien === 'mt' ? 18 : content.mien === 'mb' ? 27 : 1) *
        content.dai.length;

    tienxac = diem * info.codaxien;

    let hasSo1 = false;
    let hasSo2 = false;

    kqxs.map((eKq) => {
        if (content.dai.includes(eKq.dai)) {
            eKq.kq.map((s, i) => {
                if (s.length >= content.so[0].length && s.endsWith(content.so[0])) {
                    quantitySoTrung1 += 1;
                    hasSo1 = true;
                }

                if (s.length >= content.so[1].length && s.endsWith(content.so[1])) {
                    quantitySoTrung2 += 1;
                    hasSo2 = true;
                }
            });
        }
    });

    if (hasSo1 && hasSo2) {
        quantitySoTrung = hasSo1 < hasSo2 ? quantitySoTrung1 : hasSo1 > hasSo2 ? quantitySoTrung2 : quantitySoTrung1;
    } else {
        quantitySoTrung = 0;
    }

    tientrung = content.tien * quantitySoTrung * info.trungdaxien;

    console.log('soluongGiong1: ', quantitySoTrung1);
    console.log('soluongGiong2: ', quantitySoTrung2);
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

export default payDaXien;
