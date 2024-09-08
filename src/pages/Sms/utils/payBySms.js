import payBaoLo from './pay/payBaoLo';
import payDaThang from './pay/payDaThang';
import payDaXien from './pay/payDaXien';
import payDau from './pay/payDau';
import payDauDuoi from './pay/payDauDuoi';
import payDuoi from './pay/payDuoi';
import payXiuChu from './pay/payXiuChu';
import payXiuChuDau from './pay/payXiuChuDau';
import payXiuChuDuoi from './pay/payXiuChuDuoi';

function payBySms(sms, infoPlayer, kqxs) {
    console.log(sms, infoPlayer, kqxs);

    sms = sms.map((e, index) => {
        let pay = {};

        if (e.kieuDanh === 'baolo' || e.kieuDanh === 'baolodao') {
            pay = payBaoLo(e, infoPlayer, kqxs);
        } else if (e.kieuDanh === 'dauduoi') {
            pay = payDauDuoi(e, infoPlayer, kqxs);
        } else if (e.kieuDanh === 'xiuchu' || e.kieuDanh === 'xiuchudao') {
            pay = payXiuChu(e, infoPlayer, kqxs);
        } else if (e.kieuDanh === 'dau') {
            pay = payDau(e, infoPlayer, kqxs);
        } else if (e.kieuDanh === 'duoi') {
            pay = payDuoi(e, infoPlayer, kqxs);
        } else if (e.kieuDanh === 'xiuchudau') {
            pay = payXiuChuDau(e, infoPlayer, kqxs);
        } else if (e.kieuDanh === 'xiuchuduoi') {
            pay = payXiuChuDuoi(e, infoPlayer, kqxs);
        } else if (e.kieuDanh === 'da(thang)') {
            pay = payDaThang(e, infoPlayer, kqxs);
        } else if (e.kieuDanh === 'da(xien)') {
            pay = payDaXien(e, infoPlayer, kqxs);
        }

        return { ...e, ...pay };
    });

    return sms;
}

export default payBySms;
