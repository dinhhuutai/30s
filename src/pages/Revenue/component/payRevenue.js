import axios from 'axios';

async function payRevenue(date, formattedDate, domain, idUser) {
    try {
        const members = await axios.post(`${process.env.REACT_APP_API_URL}/v1/member/findAllMemberByIdUser/${idUser}`);

        if (members?.data?.success) {
            await Promise.all(
                members?.data?.members?.map(async (member, index) => {
                    const smsManyOfMember = await axios.post(
                        `${process.env.REACT_APP_API_URL}/v1/sms/findSmsByIdMember?date=${date}`,
                        {
                            idMember: member._id,
                            domain,
                        },
                    );

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

                    const resRevenue = await axios.post(`${process.env.REACT_APP_API_URL}/v1/revenue/create`, form);

                    if (resRevenue.data.success) {
                        return true;
                    } else {
                        return false;
                    }
                }),
            );
        }
    } catch (error) {
        console.log(error);
    }
}

export default payRevenue;
