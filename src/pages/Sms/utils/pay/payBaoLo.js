function payBaoLo(content, info, kqxs) {
    let diem = 0;
    let tienxac = 0;
    let tientrung = 0;
    let quantitySoTrung = 0;

    console.log(content);

    let lengthSo = content.so.length;

    diem =
        content.tien *
        ((content.mien === 'mn' || content.mien === 'mt') && lengthSo === 2
            ? 18
            : (content.mien === 'mn' || content.mien === 'mt') && lengthSo === 3
            ? 17
            : (content.mien === 'mn' || content.mien === 'mt') && lengthSo === 4
            ? 16
            : content.mien === 'mb' && lengthSo === 2
            ? 27
            : content.mien === 'mb' && lengthSo === 3
            ? 23
            : content.mien === 'mb' && lengthSo === 4
            ? 20
            : 1) *
        content.dai.length;

    tienxac = diem * (lengthSo === 2 ? info.co2con : lengthSo === 3 ? info.co3con : lengthSo === 4 ? info.co4con : 1);

    kqxs.map((eKq) => {
        if (content.dai.includes(eKq.dai)) {
            eKq.kq.map((s) => {
                if (s.length >= content.so.length && s.endsWith(content.so)) {
                    quantitySoTrung += 1;
                }
            });
        }
    });

    tientrung =
        content.tien *
        quantitySoTrung *
        (lengthSo === 2 ? info.trung2con : lengthSo === 3 ? info.trung3con : lengthSo === 4 ? info.trung4con : 1);

    
    
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

export default payBaoLo;
