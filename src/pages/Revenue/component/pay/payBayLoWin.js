function payBayLoWin(content, info, kqxs) {
    let tientrung = 0;
    let quantitySoTrung = 0;

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
        tientrung: tientrung,
        quantityLike: quantitySoTrung,
    };
}

export default payBayLoWin;
