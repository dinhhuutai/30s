function shortenText(content) {
    let contentTmp = content.toLowerCase();

    contentTmp = contentTmp
        .replace(/[\r\n]+/g, '.')
        .replace(/[.,:; ]/g, '.')
        .replace(/-/g, '.')
        .replace(/nghìn/g, '.')
        .replace(/nghin/g, '.')
        .replace(/ngàn/g, '.')
        .replace(/ngan/g, '.')
        .replace(/ng/g, '.')
        .replace(/n/g, '.')
        .replace(/\.{2,}/g, '.')
        .replace(/^\.+/, '');

    return contentTmp;
}

export default shortenText;
