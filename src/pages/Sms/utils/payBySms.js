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

    sms = sms.map((e, index) => {
        let pay = {};

        if (e.typePlay === 'baolo' || e.typePlay === 'baolodao') {
            pay = payBaoLo(e, infoPlayer, kqxs);
        } else if (e.typePlay === 'dauduoi') {
            pay = payDauDuoi(e, infoPlayer, kqxs);
        } else if (e.typePlay === 'xiuchu' || e.typePlay === 'xiuchudao') {
            pay = payXiuChu(e, infoPlayer, kqxs);
        } else if (e.typePlay === 'dau') {
            pay = payDau(e, infoPlayer, kqxs);
        } else if (e.typePlay === 'duoi') {
            pay = payDuoi(e, infoPlayer, kqxs);
        } else if (e.typePlay === 'xiuchudau') {
            pay = payXiuChuDau(e, infoPlayer, kqxs);
        } else if (e.typePlay === 'xiuchuduoi') {
            pay = payXiuChuDuoi(e, infoPlayer, kqxs);
        } else if (e.typePlay === 'da(thang)') {
            pay = payDaThang(e, infoPlayer, kqxs);
        } else if (e.typePlay === 'da(xien)') {
            pay = payDaXien(e, infoPlayer, kqxs);
        }

        return { ...e, ...pay };
    });

    return sms;
}

export default payBySms;
