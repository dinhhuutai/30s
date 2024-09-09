function payXiuChu(content, info, kqxs) {
    let diem = 0;
    let tienxac = 0;
    let tientrung = 0;
    let quantitySoTrung = 0;

    console.log(content);

    let lengthSo = content.so.length;

    diem =
        content.tien *
        (content.mien === 'mn' || content.mien === 'mt' ? 2 : content.mien === 'mb' ? 4 : 1) *
        content.dai.length;

    tienxac =
        diem * (content.mien === 'mn' ? info.coxiuchuMN : content.mien === 'mt' ? info.coxiuchuMT : info.coxiuchuMB);

    kqxs.map((eKq) => {
        if (content.dai.includes(eKq.dai)) {
            eKq.kq.map((s, i) => {
                if (
                    s.length >= content.so.length &&
                    s.endsWith(content.so) &&
                    (((i === 1 || i === 17) && (content.mien === 'mn' || content.mien === 'mt')) ||
                        (content.mien === 'mb' && (i === 19 || i === 20 || i === 21 || i === 26)))
                ) {
                    quantitySoTrung += 1;
                }
            });
        }
    });

    tientrung =
        content.tien *
        quantitySoTrung *
        (content.mien === 'mn' ? info.trungxiuchuMN : content.mien === 'mt' ? info.trungxiuchuMT : info.trungxiuchuMB);

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

export default payXiuChu;
