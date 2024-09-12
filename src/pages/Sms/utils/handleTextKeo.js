function handleTextKeo(content) {
    let contentTmp = content;

    /// Kiểm tra chữ keo

    let index = contentTmp.indexOf('keo');

    while (
        index !== -1 &&
        (contentTmp[index - 1] === '.' || isFinite(Number(contentTmp[index - 1]))) &&
        isFinite(
            Number(contentTmp[index - 2]) &&
                (contentTmp[index + 3] === '.' || isFinite(Number(contentTmp[index + 3]))) &&
                isFinite(Number(contentTmp[index + 4])),
        )
    ) {
        let length = contentTmp.length;

        let mangSoKeo = [];
        let soSau = '';
        let soTruoc = '';

        //Lấy số sau k
        for (let i = index + 3; i < length; i++) {
            if (isFinite(Number(contentTmp[i]))) {
                soSau = soSau + contentTmp[i];
            }

            if (soSau.length > 0 && !isFinite(Number(contentTmp[i]))) {
                break;
            }
        }

        //Lấy số trước k
        for (let i = index - 1; i >= 0; i--) {
            if (isFinite(Number(contentTmp[i]))) {
                soTruoc = contentTmp[i] + soTruoc;
            }

            if (soTruoc.length > 0 && !isFinite(Number(contentTmp[i]))) {
                break;
            }
        }

        let vitriTrung = 0;

        for (let i = 0; i < soTruoc.length; i++) {
            if (soTruoc[i] !== soSau[i]) {
                vitriTrung = i;
            }
        }

        let soSauKhac = Number(soSau[vitriTrung]);
        let soTruocKhac = Number(soTruoc[vitriTrung]);

        for (let i = soTruocKhac + 1; i < soSauKhac; i++) {
            mangSoKeo.push(soTruoc.slice(0, vitriTrung) + i + soTruoc.slice(vitriTrung + 1));
        }

        console.log('Mang so keo: ', mangSoKeo);

        let chuoiSoKeo = mangSoKeo.join('.');

        // Cắt chuỗi gốc từ đầu đến vị trí bắt đầu
        let before = contentTmp.slice(0, index);
        if (before.endsWith('.')) {
            // Nếu có, cắt bỏ dấu chấm
            before = before.slice(0, -1);
        }

        // Cắt chuỗi gốc từ vị trí kết thúc của phần cần thay thế
        let after = contentTmp.slice(index + 3);
        if (after.startsWith('.')) {
            // Nếu có, cắt dấu chấm
            after = after.slice(1);
        }
        contentTmp = before + '.' + chuoiSoKeo + '.' + after;

        index = contentTmp.indexOf('keo');
    }

    /// Kiểm tra chữ k

    index = contentTmp.indexOf('k');

    while (
        index !== -1 &&
        (contentTmp[index - 1] === '.' || isFinite(Number(contentTmp[index - 1]))) &&
        isFinite(
            Number(contentTmp[index - 2]) &&
                (contentTmp[index + 1] === '.' || isFinite(Number(contentTmp[index + 1]))) &&
                isFinite(Number(contentTmp[index + 2])),
        )
    ) {
        let length = contentTmp.length;

        let mangSoKeo = [];
        let soSau = '';
        let soTruoc = '';

        //Lấy số sau k
        for (let i = index + 1; i < length; i++) {
            if (isFinite(Number(contentTmp[i]))) {
                soSau = soSau + contentTmp[i];
            }

            if (soSau.length > 0 && !isFinite(Number(contentTmp[i]))) {
                break;
            }
        }

        //Lấy số trước k
        for (let i = index - 1; i >= 0; i--) {
            if (isFinite(Number(contentTmp[i]))) {
                soTruoc = contentTmp[i] + soTruoc;
            }

            if (soTruoc.length > 0 && !isFinite(Number(contentTmp[i]))) {
                break;
            }
        }

        let vitriTrung = 0;

        for (let i = 0; i < soTruoc.length; i++) {
            if (soTruoc[i] !== soSau[i]) {
                vitriTrung = i;
            }
        }

        let soSauKhac = Number(soSau[vitriTrung]);
        let soTruocKhac = Number(soTruoc[vitriTrung]);

        for (let i = soTruocKhac + 1; i < soSauKhac; i++) {
            mangSoKeo.push(soTruoc.slice(0, vitriTrung) + i + soTruoc.slice(vitriTrung + 1));
        }

        console.log('Mang so keo: ', mangSoKeo);

        let chuoiSoKeo = mangSoKeo.join('.');

        // Cắt chuỗi gốc từ đầu đến vị trí bắt đầu
        let before = contentTmp.slice(0, index);
        if (before.endsWith('.')) {
            // Nếu có, cắt bỏ dấu chấm
            before = before.slice(0, -1);
        }

        // Cắt chuỗi gốc từ vị trí kết thúc của phần cần thay thế
        let after = contentTmp.slice(index + 1);
        if (after.startsWith('.')) {
            // Nếu có, cắt dấu chấm
            after = after.slice(1);
        }
        contentTmp = before + '.' + chuoiSoKeo + '.' + after;

        index = contentTmp.indexOf('k');
    }

    return contentTmp;
}

export default handleTextKeo;
