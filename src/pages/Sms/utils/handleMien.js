function handleMien(content) {
    let contentTmp = content;

    let mien = '';

    var mienMain = '';

    var vtbd = 0;
    var fVtbd = true;

    var vtkt = 0;

    for (var i = 0; i < 50; i++) {
        if (!isFinite(Number(contentTmp[i])) && contentTmp[i] !== '.') {
            mien += contentTmp[i];

            if (fVtbd) {
                vtbd = i;
                fVtbd = false;
            }
        }

        if (contentTmp[i] === '.' || isFinite(Number(contentTmp[i]))) {
            if (mien === 'mn' || mien === 'mnam' || mien === 'miennam' || mien === 'mienam') {
                vtkt = i;

                mienMain = 'mn';

                contentTmp = contentTmp.slice(vtkt);

                if (contentTmp[0] === '.') {
                    contentTmp = contentTmp.slice(1);
                }

                break;
            } else if (
                mien === 'mtr' ||
                mien === 'mtrung' ||
                mien === 'mientr' ||
                mien === 'mt' ||
                mien === 'mientrung'
            ) {
                vtkt = i;

                mienMain = 'mt';

                contentTmp = contentTmp.slice(vtkt);

                if (contentTmp[0] === '.') {
                    contentTmp = contentTmp.slice(1);
                }

                break;
            } else if (
                mien === 'mb' ||
                mien === 'mienb' ||
                mien === 'mienbac' ||
                mien === 'hn' ||
                mien === 'hanoi' ||
                mien === 'hnoi' ||
                mien === 'han'
            ) {
                vtkt = i;

                mienMain = 'mb';

                contentTmp = mienMain + contentTmp.slice(vtkt);

                if (contentTmp[0] === '.') {
                    contentTmp = contentTmp.slice(1);
                }

                break;
            }

            if (mien !== 'm' && mien !== 'mien' && mien !== 'h' && mien !== 'ha') {
                mien = '';
                fVtbd = true;
            }
        }
    }

    if (mienMain === '') {
        const now = new Date();

        // Lấy giờ và phút hiện tại
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        if (currentHour < 16 || (currentHour === 16 && currentMinute < 15)) {
            mienMain = 'mn';
        } else if (currentHour < 17 || (currentHour === 17 && currentMinute < 15)) {
            mienMain = 'mt';
        } else if (currentHour < 18 || (currentHour === 18 && currentMinute < 15)) {
            mienMain = 'mb';

            contentTmp = mienMain + '.' + contentTmp;
        } else {
            mienMain = 'mn';
        }
    }

    return {
        content: contentTmp,
        mien: mienMain,
    };
}

export default handleMien;
