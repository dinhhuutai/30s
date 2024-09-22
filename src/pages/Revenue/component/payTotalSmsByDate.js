import axios from 'axios';
import payBaoLoWin from './pay/payBaoLoWin';
import payDauDuoiWin from './pay/payDauDuoiWin';
import payXiuChuWin from './pay/payXiuChuWin';
import payDauWin from './pay/payDauWin';
import payDuoiWin from './pay/payDuoiWin';
import payXiuChuDauWin from './pay/payXiuChuDauWin';
import payXiuChuDuoiWin from './pay/payXiuChuDuoiWin';
import payDaThangWin from './pay/payDaThangWin';
import payDaXienWin from './pay/payDaXienWin';
import moment from 'moment';
import payRevenue from './payRevenue';

async function payTotalSmsByDate(date, dateSelect, domain, idUser, kqxs) {
    try {
        const smsMany = await axios.post(`${process.env.REACT_APP_API_URL}/v1/sms/findSmsByStatus`, {
            domain,
            date: dateSelect,
            idUser,
        });

        if (smsMany.data.success && smsMany.data.sms.length > 0) {
            await Promise.all(
                smsMany?.data?.sms?.map(async (sms, index) => {
                    let smsDetails = await axios.post(
                        `${process.env.REACT_APP_API_URL}/v1/smsDetail/findSmsDetailByIdSms/${sms._id}`,
                    );

                    smsDetails = await Promise.all(
                        smsDetails?.data?.smsDetails?.map(async (e, index) => {
                            let pay = {};

                            if (e.typePlay === 'baolo' || e.typePlay === 'baolodao') {
                                pay = payBaoLoWin(e, sms.idMember, kqxs);
                            } else if (e.typePlay === 'dauduoi') {
                                pay = payDauDuoiWin(e, sms.idMember, kqxs);
                            } else if (e.typePlay === 'xiuchu' || e.typePlay === 'xiuchudao') {
                                pay = payXiuChuWin(e, sms.idMember, kqxs);
                            } else if (e.typePlay === 'dau') {
                                pay = payDauWin(e, sms.idMember, kqxs);
                            } else if (e.typePlay === 'duoi') {
                                pay = payDuoiWin(e, sms.idMember, kqxs);
                            } else if (e.typePlay === 'xiuchudau') {
                                pay = payXiuChuDauWin(e, sms.idMember, kqxs);
                            } else if (e.typePlay === 'xiuchuduoi') {
                                pay = payXiuChuDuoiWin(e, sms.idMember, kqxs);
                            } else if (e.typePlay === 'da(thang)') {
                                pay = payDaThangWin(e, sms.idMember, kqxs);
                            } else if (e.typePlay === 'da(xien)') {
                                pay = payDaXienWin(e, sms.idMember, kqxs);
                            }

                            await axios.post(`${process.env.REACT_APP_API_URL}/v1/smsDetail/update/${e._id}`, pay);

                            return { ...e, ...pay };
                        }),
                    );

                    let tongtrung = 0;

                    smsDetails?.map((e) => {
                        tongtrung += e.tientrung;
                    });

                    const form = {
                        statusSms: 'Đã xổ',
                        tongtrung,
                        revenue: sms.idMember.runNumber ? tongtrung - sms.tongxac : sms.tongxac - tongtrung,
                    };

                    console.log('form: ', form);

                    await axios.post(`${process.env.REACT_APP_API_URL}/v1/sms/update/${sms._id}`, form);
                }),
            );

            const dateSle = moment(dateSelect).format('YYYY-MM-DD');

            const res = await payRevenue(dateSle, date, domain, idUser);

            return res;
        }
    } catch (error) {
        console.log(error);
    }
}

export default payTotalSmsByDate;
