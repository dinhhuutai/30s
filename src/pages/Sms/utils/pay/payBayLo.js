function payBayLo(content, info, kqxs) {
    let diem = 0;
    let tienxac = 0;
    let tientrung = 0;
    let quantitySoTrung = 0;

    let lengthSo = content.number[0].length;

    diem =
        content.price *
        (content.domain === 'mn' || content.domain === 'mt' ? 7 : content.domain === 'mb' ? 7 : 1) *
        content.province.length;

    tienxac =
        diem * (content.domain === 'mn' ? info.co2conMN : content.domain === 'mt' ? info.co2conMT : info.co2conMB);

    kqxs.map((eKq) => {
        if (content.province.includes(eKq.province)) {
            eKq.result.map((s, i) => {
                if (
                    s.length >= content.number[0].length &&
                    s.endsWith(content.number[0]) &&
                    ((i <= 6 && (content.domain === 'mn' || content.domain === 'mt')) ||
                        (content.domain === 'mb' && i <= 6))
                ) {
                    quantitySoTrung += 1;
                }
            });
        }
    });

    tientrung =
        content.price *
        quantitySoTrung *
        (content.domain === 'mn' ? info.trung2conMN : content.domain === 'mt' ? info.trung2conMT : info.trung2conMB);

    return {
        diem: diem,
        tienxac: tienxac,
        tientrung: tientrung,
        quantityLike: quantitySoTrung,
    };
}

export default payBayLo;
