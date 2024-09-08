function payDaThang(content, info, kqxs) {
    let diem = 0;
    let tienxac = 0;
    let tientrung = 0;
    let quantitySoTrung = 0;

    console.log(content);

    diem = content.tien * 2 * (content.mien === 'mn' || content.mien === 'mt' ? 18 : content.mien === 'mb' ? 27 : 1);

    tienxac = diem * info.codathang;

    let hasSo1 = false;
    let hasSo2 = false;

    kqxs.map((eKq) => {
        if (content.dai.includes(eKq.dai)) {
            eKq.kq.map((s, i) => {
                if (s.length >= content.so[0].length && s.endsWith(content.so[0])) {
                    quantitySoTrung += 1;
                    hasSo1 = true;
                }

                if (s.length >= content.so[1].length && s.endsWith(content.so[1])) {
                    quantitySoTrung += 1;
                    hasSo2 = true;
                }
            });
        }
    });

    if (hasSo1 && hasSo2) {
        quantitySoTrung /= 2;
    } else {
        quantitySoTrung = 0;
    }

    tientrung = content.tien * quantitySoTrung * info.trungdathang;

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

export default payDaThang;
