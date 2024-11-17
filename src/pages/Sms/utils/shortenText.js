function shortenText(content) {
    let contentTmp = content.toLowerCase();

    contentTmp = contentTmp
        .replace(/đ/g, 'd')
        .replace(/ă/g, 'a')
        .replace(/â/g, 'a')
        .replace(/ư/g, 'u')
        .replace(/ơ/g, 'o')
        .replace(/ô/g, 'o')
        .replace(/ê/g, 'e')
        .replace(/-/g, '.')
        .replace(/\//g, '.')
        .replace(/\\/g, '.')
        .replace(/₫/g, 'đ')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/dai/g, 'd')
        .replace(
            /[^a-zA-Z0-9ÀÁẢÃẠÂẤẦẬẪẨẮĂẰẴẶẲÊẾỀỆỂỄÉÈẺẼẸÓÒỎÕỌƠỚỜỞỠỢƯỨỪỮỬỰĐÌÍỊĨỈàáảãạâấầậẫẩắằẵặẳêếềệểễéèẻẽẹóòỏõọơớờởỡợưứừữửựđìíịĩỉ.,;:+=s+\r\t\s]/g,
            '',
        )
        .replace(/[\r\n]+/g, '.')
        .replace(/[\t\n]+/g, '.')
        .replace(/\s+/g, '.')
        .replace(/[.,:;+= ]/g, '.')
        .replace(/-/g, '.')
        .replace(/…/g, '')
        .replace(/!/g, '')
        .replace(/(\d)\s*nghìn/g, '$1.')
        .replace(/(\d)\s*nghin/g, '$1.')
        .replace(/(\d)\s*ngàn/g, '$1.')
        .replace(/(\d)\s*ngan/g, '$1.')
        .replace(/(\d)\s*ng/g, '$1.')
        .replace(/(\d)\s*n/g, '$1.')
        .replace(/\.{2,}/g, '.')
        .replace(/^\.+/, '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    let index = contentTmp.indexOf('ng');

    while (index !== -1) {
        if (isFinite(Number(contentTmp[index - 2])) && contentTmp[index - 1] === '.') {
            contentTmp = contentTmp.slice(0, index) + contentTmp.slice(index + 2);
        }

        index = contentTmp.indexOf('ng', index + 2);
    }

    index = contentTmp.indexOf('n');

    while (index !== -1) {
        if (
            isFinite(Number(contentTmp[index - 2])) &&
            contentTmp[index - 1] === '.' &&
            (contentTmp[index + 1] !== 'i' || (contentTmp[index + 1] !== '.' && contentTmp[index + 2] !== 'i')) &&
            (contentTmp[index + 1] !== 't' || (contentTmp[index + 1] !== '.' && contentTmp[index + 2] !== 't'))
        ) {
            contentTmp = contentTmp.slice(0, index) + contentTmp.slice(index + 1);
        }

        index = contentTmp.indexOf('n', index + 1);
    }

    contentTmp = contentTmp
        .replace(/nghin/g, '.')
        .replace(/ngan/g, '.')
        .replace(/\.{2,}/g, '.');

    return contentTmp;
}

export default shortenText;
