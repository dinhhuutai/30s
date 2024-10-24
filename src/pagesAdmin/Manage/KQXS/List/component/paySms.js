import axios from 'axios';
import moment from 'moment';
import payBaoLo from '~/pages/Sms/utils/pay/payBaoLo';
import payBayLo from '~/pages/Sms/utils/pay/payBayLo';
import payTamLo from '~/pages/Sms/utils/pay/payTamLo';
import payDaThang from '~/pages/Sms/utils/pay/payDaThang';
import payDau from '~/pages/Sms/utils/pay/payDau';
import payDauDuoi from '~/pages/Sms/utils/pay/payDauDuoi';
import payDaXien from '~/pages/Sms/utils/pay/payDaXien';
import payDuoi from '~/pages/Sms/utils/pay/payDuoi';
import payXiuChu from '~/pages/Sms/utils/pay/payXiuChu';
import payXiuChuDau from '~/pages/Sms/utils/pay/payXiuChuDau';
import payXiuChuDuoi from '~/pages/Sms/utils/pay/payXiuChuDuoi';

const paySms = async (domain) => {
    try {
        const now = new Date();

        const formattedDate = moment(now).format('DD/MM/YYYY');

        const resKQXS = await axios.post(`${process.env.REACT_APP_API_URL}/v1/kqxs/findKqxsByDate`, {
            date: formattedDate,
        });

        const kqxs = [];
        if (resKQXS?.data.success) {
            resKQXS?.data.data.map((e) => {
                if (e.domain === domain) {
                    kqxs.push(e);
                }
            });
        }

        console.log(kqxs);

        if (kqxs.length >= 1) {
            const date = moment(now).format('YYYY-MM-DD');

            const smsMany = await axios.post(`${process.env.REACT_APP_API_URL}/v1/sms/findSmsByStatus2?date=${date}`, {
                domain,
            });

            if (smsMany?.data.success && smsMany?.data.sms.length > 0) {
                await Promise.all(
                    smsMany?.data?.sms?.map(async (sms, index) => {
                        let smsDetails = await axios.post(
                            `${process.env.REACT_APP_API_URL}/v1/smsDetail/findSmsDetailByIdSms/${sms._id}`,
                        );

                        smsDetails = await Promise.all(
                            smsDetails?.data?.smsDetails?.map(async (e, index) => {
                                let pay = {};

                                if (e.typePlay === 'baolo' || e.typePlay === 'baolodao') {
                                    pay = payBaoLo(e, sms.idMember, kqxs);
                                } else if (e.typePlay === 'dauduoi') {
                                    pay = payDauDuoi(e, sms.idMember, kqxs);
                                } else if (e.typePlay === 'xiuchu' || e.typePlay === 'xiuchudao') {
                                    pay = payXiuChu(e, sms.idMember, kqxs);
                                } else if (e.typePlay === 'dau') {
                                    pay = payDau(e, sms.idMember, kqxs);
                                } else if (e.typePlay === 'duoi') {
                                    pay = payDuoi(e, sms.idMember, kqxs);
                                } else if (e.typePlay === 'xiuchudau' || e.typePlay === 'xiuchudaudao') {
                                    pay = payXiuChuDau(e, sms.idMember, kqxs);
                                } else if (e.typePlay === 'xiuchuduoi' || e.typePlay === 'xiuchuduoidao') {
                                    pay = payXiuChuDuoi(e, sms.idMember, kqxs);
                                } else if (e.typePlay === 'da(thang)') {
                                    pay = payDaThang(e, sms.idMember, kqxs);
                                } else if (e.typePlay === 'da(xien)') {
                                    pay = payDaXien(e, sms.idMember, kqxs);
                                } else if (e.typePlay === 'baylo') {
                                    pay = payBayLo(e, sms.idMember, kqxs);
                                } else if (e.typePlay === 'tamlo') {
                                    pay = payTamLo(e, sms.idMember, kqxs);
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

                        await axios.post(`${process.env.REACT_APP_API_URL}/v1/sms/update/${sms._id}`, form);
                    }),
                );

                await payRevenue(date, formattedDate, domain);
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const payRevenue = async (date, formattedDate, domain) => {
    const members = await axios.post(`${process.env.REACT_APP_API_URL}/v1/member/findAllMember`);

    if (members?.data?.success) {
        await Promise.all(
            members?.data?.memberAll?.map(async (member, index) => {
                const smsManyOfMember = await axios.post(
                    `${process.env.REACT_APP_API_URL}/v1/sms/findSmsByIdMember?date=${date}`,
                    {
                        idMember: member._id,
                        domain,
                    },
                );
                //console.log(smsManyOfMember);

                const resRevenue = await axios.post(`${process.env.REACT_APP_API_URL}/v1/revenue/findRevenueBy`, {
                    idMember: member._id,
                    domain: domain,
                    resultDate: formattedDate,
                });
                console.log('resRevenue111111111111111111111111111: ', resRevenue?.data?.revenue);

                if (resRevenue?.data?.revenue.length < 1) {
                    let diem2con = 0;
                    let diem34con = 0;
                    let tongxac = 0;
                    let tongtrung = 0;
                    let revenue = 0;

                    smsManyOfMember?.data?.sms?.map((e) => {
                        diem2con += e.diem2con;
                        diem34con += e.diem34con;
                        tongxac += e.tongxac;
                        tongtrung += e.tongtrung;
                        revenue += e.revenue;
                    });

                    const form = {
                        idMember: member._id,
                        idUser: member.idUser,
                        domain: domain,
                        diem2con,
                        diem34con,
                        tongxac,
                        tongtrung,
                        revenue,
                        resultDate: formattedDate,
                    };

                    await axios.post(`${process.env.REACT_APP_API_URL}/v1/revenue/create`, form);
                }
            }),
        );
    }
};

export default paySms;
