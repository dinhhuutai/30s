function payXiuChuDau(content, info, kqxs) {
    let diem = 0;
    let tienxac = 0;
    let tientrung = 0;
    let quantitySoTrung = 0;

    console.log(content);

    let lengthSo = content.so.length;

    diem =
        content.tien *
        (content.mien === 'mn' || content.mien === 'mt' ? 1 : content.mien === 'mb' ? 3 : 1) *
        content.dai.length;

    tienxac = diem * info.coxiuchu;

    kqxs.map((eKq) => {
        if (content.dai.includes(eKq.dai)) {
            eKq.kq.map((s, i) => {
                if (s.length >= content.so.length && s.endsWith(content.so) && i === 1) {
                    quantitySoTrung += 1;
                }
            });
        }
    });

    tientrung = content.tien * quantitySoTrung * info.trungxiuchu;

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

export default payXiuChuDau;
