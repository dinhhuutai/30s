import payBaoLo from './pay/payBaoLo';
import payDauDuoi from './pay/payDauDuoi';

function payBySms(sms, infoPlayer, kqxs) {
    console.log(sms, infoPlayer, kqxs);

    sms = sms.map((e, index) => {
        let pay = {};

        if (e.kieuDanh === 'baolo' || e.kieuDanh === 'baolodao') {
            pay = payBaoLo(e, infoPlayer, kqxs);
        } else if (e.kieuDanh === 'dauduoi') {
            pay = payDauDuoi(e, infoPlayer, kqxs);
        } 

        return { ...e, ...pay };
    });

    return sms;
}

export default payBySms;
