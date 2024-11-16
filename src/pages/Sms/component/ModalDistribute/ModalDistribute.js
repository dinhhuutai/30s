import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { noticeAdminSelector, userSelector } from '~/redux/selectors';
import { AiOutlineCopy } from 'react-icons/ai';
import noticeAdminSlice from '~/redux/slices/noticeAdminSlice';
import { BsArrowClockwise } from 'react-icons/bs';

let setTimeoutTmp;

function arraysAreEqualSet(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    if (set1.size !== set2.size) return false; // Khác số lượng phần tử thì không bằng
    return [...set1].every((value) => set2.has(value));
}

function ModalDistribute({ setModalDistribute, members, date }) {
    const tmp = useSelector(userSelector);
    const [user, setUser] = useState(tmp);
    useEffect(() => {
        setUser(tmp);
    }, [tmp]);

    const [domain, setDomain] = useState('mn');
    const [idMember, setIdMember] = useState(members[1]?.value);
    const [idMemberSelect, setIdMemberSelect] = useState(members[1]);

    const [contentBaoLo2con, setContentBaoLo2con] = useState('');
    const [contentBaoLo3con, setContentBaoLo3con] = useState('');
    const [contentBaoLo4con, setContentBaoLo4con] = useState('');
    const [contentXiuChu, setContentXiuChu] = useState('');
    const [contentDauDuoi, setContentDauDuoi] = useState('');
    const [contentBayLo, setContentBayLo] = useState('');
    const [contentTamLo, setContentTamLo] = useState('');
    const [contentDaThang, setContentDaThang] = useState('');
    const [contentDaXien, setContentDaXien] = useState('');

    const [distributes, setDistributes] = useState({
        baolo2con: {
            priceTotal: 0,
            diemTotal: 0,
            tienxacTotal: 0,
            contentTotal: [
                {
                    province: [],
                    price: 0,
                    typePlay: '',
                    nums: [],
                },
            ],
        },
        baolo3con: {
            priceTotal: 0,
            diemTotal: 0,
            tienxacTotal: 0,
            contentTotal: [
                {
                    province: [],
                    price: 0,
                    typePlay: '',
                    nums: [],
                },
            ],
        },
        baolo4con: {
            priceTotal: 0,
            diemTotal: 0,
            tienxacTotal: 0,
            contentTotal: [
                {
                    province: [],
                    price: 0,
                    typePlay: '',
                    nums: [],
                },
            ],
        },
        baylo: {
            priceTotal: 0,
            diemTotal: 0,
            tienxacTotal: 0,
            contentTotal: [
                {
                    province: [],
                    price: 0,
                    typePlay: '',
                    nums: [],
                },
            ],
        },
        tamlo: {
            priceTotal: 0,
            diemTotal: 0,
            tienxacTotal: 0,
            contentTotal: [
                {
                    province: [],
                    price: 0,
                    typePlay: '',
                    nums: [],
                },
            ],
        },
        daxien: {
            priceTotal: 0,
            diemTotal: 0,
            tienxacTotal: 0,
            contentTotal: [
                {
                    province: [],
                    price: 0,
                    typePlay: '',
                    nums: [],
                },
            ],
        },
        dathang: {
            priceTotal: 0,
            diemTotal: 0,
            tienxacTotal: 0,
            contentTotal: [
                {
                    province: [],
                    price: 0,
                    typePlay: '',
                    nums: [],
                },
            ],
        },
        xiuchu: {
            priceTotal: 0,
            diemTotal: 0,
            tienxacTotal: 0,
            contentTotal: [
                {
                    province: [],
                    price: 0,
                    typePlay: '',
                    nums: [],
                },
            ],
        },
        dauduoi: {
            priceTotal: 0,
            diemTotal: 0,
            tienxacTotal: 0,
            contentTotal: [
                {
                    province: [],
                    price: 0,
                    typePlay: '',
                    nums: [],
                },
            ],
        },
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setContentBaoLo2con('');
        setContentBaoLo3con('');
        setContentBaoLo4con('');
        setContentXiuChu('');
        setContentDauDuoi('');
        setContentBayLo('');
        setContentTamLo('');
        setContentDaThang('');
        setContentDaXien('');

        handleDistribute();
    }, [date, idMember, domain]);

    const handleDistribute = async () => {
        try {
            setLoading(true);

            const resSmsDetail = await axios.post(
                `${process.env.REACT_APP_API_URL}/v1/smsDetail/findSmsDetailByIdMemberAndDomainAndDate/${user.login.currentUser?._id}?idMember=${idMember}&resultDate=${date}&domain=${domain}`,
            );

            const data = resSmsDetail?.data?.smsDetails?.reduce(
                (accumulator, currentValue) => {
                    if (currentValue.typePlay === 'baolo' || currentValue.typePlay === 'baolodao') {
                        if (currentValue?.number[0]?.length === 2) {
                            console.log('accumulator: ', accumulator);
                            accumulator.baolo2con = {
                                priceTotal: (accumulator.baolo2con?.priceTotal || 0) + currentValue.price,
                                diemTotal: (accumulator.baolo2con?.diemTotal || 0) + currentValue.diem,
                                tienxacTotal: (accumulator.baolo2con?.tienxacTotal || 0) + currentValue.tienxac,
                                contentTotal: (() => {
                                    const existingContentIndex = accumulator.baolo2con?.contentTotal.findIndex(
                                        (content) =>
                                            arraysAreEqualSet(content.province, currentValue.province) &&
                                            content.price === currentValue.price &&
                                            content.typePlay === currentValue.typePlay,
                                    );

                                    if (existingContentIndex !== -1) {
                                        // Nếu phần tử tồn tại, cập nhật phần tử
                                        const updatedContent = {
                                            ...accumulator.baolo2con.contentTotal[existingContentIndex],
                                            nums: [
                                                ...accumulator.baolo2con.contentTotal[existingContentIndex].nums,
                                                ...currentValue.number,
                                            ],
                                        };

                                        // Tạo một mảng mới với phần tử đã cập nhật
                                        return accumulator.baolo2con.contentTotal.map((content, index) =>
                                            index === existingContentIndex ? updatedContent : content,
                                        );
                                    } else {
                                        // Nếu phần tử không tồn tại, thêm mới
                                        return [
                                            ...(accumulator.baolo2con.contentTotal || []),
                                            {
                                                province: currentValue.province,
                                                price: currentValue.price,
                                                typePlay: currentValue.typePlay,
                                                nums: currentValue.number,
                                            },
                                        ];
                                    }
                                })(),
                            };
                        } else if (currentValue?.number[0]?.length === 3) {
                            console.log('accumulator: ', accumulator);
                            accumulator.baolo3con = {
                                priceTotal: (accumulator.baolo3con?.priceTotal || 0) + currentValue.price,
                                diemTotal: (accumulator.baolo3con?.diemTotal || 0) + currentValue.diem,
                                tienxacTotal: (accumulator.baolo3con?.tienxacTotal || 0) + currentValue.tienxac,
                                contentTotal: (() => {
                                    const existingContentIndex = accumulator.baolo3con?.contentTotal.findIndex(
                                        (content) =>
                                            arraysAreEqualSet(content.province, currentValue.province) &&
                                            content.price === currentValue.price &&
                                            content.typePlay === currentValue.typePlay,
                                    );

                                    if (existingContentIndex !== -1) {
                                        // Nếu phần tử tồn tại, cập nhật phần tử
                                        const updatedContent = {
                                            ...accumulator.baolo3con.contentTotal[existingContentIndex],
                                            nums: [
                                                ...accumulator.baolo3con.contentTotal[existingContentIndex].nums,
                                                ...currentValue.number,
                                            ],
                                        };

                                        // Tạo một mảng mới với phần tử đã cập nhật
                                        return accumulator.baolo3con.contentTotal.map((content, index) =>
                                            index === existingContentIndex ? updatedContent : content,
                                        );
                                    } else {
                                        // Nếu phần tử không tồn tại, thêm mới
                                        return [
                                            ...(accumulator.baolo3con.contentTotal || []),
                                            {
                                                province: currentValue.province,
                                                price: currentValue.price,
                                                typePlay: currentValue.typePlay,
                                                nums: currentValue.number,
                                            },
                                        ];
                                    }
                                })(),
                            };
                        } else if (currentValue?.number[0]?.length === 4) {
                            console.log('accumulator: ', accumulator);
                            accumulator.baolo4con = {
                                priceTotal: (accumulator.baolo4con?.priceTotal || 0) + currentValue.price,
                                diemTotal: (accumulator.baolo4con?.diemTotal || 0) + currentValue.diem,
                                tienxacTotal: (accumulator.baolo4con?.tienxacTotal || 0) + currentValue.tienxac,
                                contentTotal: (() => {
                                    const existingContentIndex = accumulator.baolo4con?.contentTotal.findIndex(
                                        (content) =>
                                            arraysAreEqualSet(content.province, currentValue.province) &&
                                            content.price === currentValue.price &&
                                            content.typePlay === currentValue.typePlay,
                                    );

                                    if (existingContentIndex !== -1) {
                                        // Nếu phần tử tồn tại, cập nhật phần tử
                                        const updatedContent = {
                                            ...accumulator.baolo4con.contentTotal[existingContentIndex],
                                            nums: [
                                                ...accumulator.baolo4con.contentTotal[existingContentIndex].nums,
                                                ...currentValue.number,
                                            ],
                                        };

                                        // Tạo một mảng mới với phần tử đã cập nhật
                                        return accumulator.baolo4con.contentTotal.map((content, index) =>
                                            index === existingContentIndex ? updatedContent : content,
                                        );
                                    } else {
                                        // Nếu phần tử không tồn tại, thêm mới
                                        return [
                                            ...(accumulator.baolo4con.contentTotal || []),
                                            {
                                                province: currentValue.province,
                                                price: currentValue.price,
                                                typePlay: currentValue.typePlay,
                                                nums: currentValue.number,
                                            },
                                        ];
                                    }
                                })(),
                            };
                        }
                    } else if (
                        currentValue.typePlay === 'xiuchu' ||
                        currentValue.typePlay === 'xiuchudao' ||
                        currentValue.typePlay === 'xiuchudau' ||
                        currentValue.typePlay === 'xiuchudaudao' ||
                        currentValue.typePlay === 'xiuchuduoi' ||
                        currentValue.typePlay === 'xiuchuduoidao'
                    ) {
                        console.log('accumulator: ', accumulator);
                        accumulator.xiuchu = {
                            priceTotal: (accumulator.xiuchu?.priceTotal || 0) + currentValue.price,
                            diemTotal: (accumulator.xiuchu?.diemTotal || 0) + currentValue.diem,
                            tienxacTotal: (accumulator.xiuchu?.tienxacTotal || 0) + currentValue.tienxac,
                            contentTotal: (() => {
                                const existingContentIndex = accumulator.xiuchu?.contentTotal.findIndex(
                                    (content) =>
                                        arraysAreEqualSet(content.province, currentValue.province) &&
                                        content.price === currentValue.price &&
                                        content.typePlay === currentValue.typePlay,
                                );

                                if (existingContentIndex !== -1) {
                                    // Nếu phần tử tồn tại, cập nhật phần tử
                                    const updatedContent = {
                                        ...accumulator.xiuchu.contentTotal[existingContentIndex],
                                        nums: [
                                            ...accumulator.xiuchu.contentTotal[existingContentIndex].nums,
                                            ...currentValue.number,
                                        ],
                                    };

                                    // Tạo một mảng mới với phần tử đã cập nhật
                                    return accumulator.xiuchu.contentTotal.map((content, index) =>
                                        index === existingContentIndex ? updatedContent : content,
                                    );
                                } else {
                                    // Nếu phần tử không tồn tại, thêm mới
                                    return [
                                        ...(accumulator.xiuchu.contentTotal || []),
                                        {
                                            province: currentValue.province,
                                            price: currentValue.price,
                                            typePlay: currentValue.typePlay,
                                            nums: currentValue.number,
                                        },
                                    ];
                                }
                            })(),
                        };
                    } else if (
                        currentValue.typePlay === 'dauduoi' ||
                        currentValue.typePlay === 'dau' ||
                        currentValue.typePlay === 'duoi'
                    ) {
                        console.log('accumulator: ', accumulator);
                        accumulator.dauduoi = {
                            priceTotal: (accumulator.dauduoi?.priceTotal || 0) + currentValue.price,
                            diemTotal: (accumulator.dauduoi?.diemTotal || 0) + currentValue.diem,
                            tienxacTotal: (accumulator.dauduoi?.tienxacTotal || 0) + currentValue.tienxac,
                            contentTotal: (() => {
                                const existingContentIndex = accumulator.dauduoi?.contentTotal.findIndex(
                                    (content) =>
                                        arraysAreEqualSet(content.province, currentValue.province) &&
                                        content.price === currentValue.price &&
                                        content.typePlay === currentValue.typePlay,
                                );

                                if (existingContentIndex !== -1) {
                                    // Nếu phần tử tồn tại, cập nhật phần tử
                                    const updatedContent = {
                                        ...accumulator.dauduoi.contentTotal[existingContentIndex],
                                        nums: [
                                            ...accumulator.dauduoi.contentTotal[existingContentIndex].nums,
                                            ...currentValue.number,
                                        ],
                                    };
                                    console.log('updatedContent: ', updatedContent);

                                    // Tạo một mảng mới với phần tử đã cập nhật
                                    return accumulator.dauduoi.contentTotal.map((content, index) =>
                                        index === existingContentIndex ? updatedContent : content,
                                    );
                                } else {
                                    // Nếu phần tử không tồn tại, thêm mới
                                    return [
                                        ...(accumulator.dauduoi.contentTotal || []),
                                        {
                                            province: currentValue.province,
                                            price: currentValue.price,
                                            typePlay: currentValue.typePlay,
                                            nums: currentValue.number,
                                        },
                                    ];
                                }
                            })(),
                        };
                    } else if (currentValue.typePlay === 'baylo') {
                        console.log('accumulator: ', accumulator);
                        accumulator.baylo = {
                            priceTotal: (accumulator.baylo?.priceTotal || 0) + currentValue.price,
                            diemTotal: (accumulator.baylo?.diemTotal || 0) + currentValue.diem,
                            tienxacTotal: (accumulator.baylo?.tienxacTotal || 0) + currentValue.tienxac,
                            contentTotal: (() => {
                                const existingContentIndex = accumulator.baylo?.contentTotal.findIndex(
                                    (content) =>
                                        arraysAreEqualSet(content.province, currentValue.province) &&
                                        content.price === currentValue.price &&
                                        content.typePlay === currentValue.typePlay,
                                );

                                if (existingContentIndex !== -1) {
                                    // Nếu phần tử tồn tại, cập nhật phần tử
                                    const updatedContent = {
                                        ...accumulator.baylo.contentTotal[existingContentIndex],
                                        nums: [
                                            ...accumulator.baylo.contentTotal[existingContentIndex].nums,
                                            ...currentValue.number,
                                        ],
                                    };
                                    console.log('updatedContent: ', updatedContent);

                                    // Tạo một mảng mới với phần tử đã cập nhật
                                    return accumulator.baylo.contentTotal.map((content, index) =>
                                        index === existingContentIndex ? updatedContent : content,
                                    );
                                } else {
                                    // Nếu phần tử không tồn tại, thêm mới
                                    return [
                                        ...(accumulator.baylo.contentTotal || []),
                                        {
                                            province: currentValue.province,
                                            price: currentValue.price,
                                            typePlay: currentValue.typePlay,
                                            nums: currentValue.number,
                                        },
                                    ];
                                }
                            })(),
                        };
                    } else if (currentValue.typePlay === 'tamlo') {
                        console.log('accumulator: ', accumulator);
                        accumulator.tamlo = {
                            priceTotal: (accumulator.tamlo?.priceTotal || 0) + currentValue.price,
                            diemTotal: (accumulator.tamlo?.diemTotal || 0) + currentValue.diem,
                            tienxacTotal: (accumulator.tamlo?.tienxacTotal || 0) + currentValue.tienxac,
                            contentTotal: (() => {
                                const existingContentIndex = accumulator.tamlo?.contentTotal.findIndex(
                                    (content) =>
                                        arraysAreEqualSet(content.province, currentValue.province) &&
                                        content.price === currentValue.price &&
                                        content.typePlay === currentValue.typePlay,
                                );

                                if (existingContentIndex !== -1) {
                                    // Nếu phần tử tồn tại, cập nhật phần tử
                                    const updatedContent = {
                                        ...accumulator.tamlo.contentTotal[existingContentIndex],
                                        nums: [
                                            ...accumulator.tamlo.contentTotal[existingContentIndex].nums,
                                            ...currentValue.number,
                                        ],
                                    };
                                    console.log('updatedContent: ', updatedContent);

                                    // Tạo một mảng mới với phần tử đã cập nhật
                                    return accumulator.tamlo.contentTotal.map((content, index) =>
                                        index === existingContentIndex ? updatedContent : content,
                                    );
                                } else {
                                    // Nếu phần tử không tồn tại, thêm mới
                                    return [
                                        ...(accumulator.tamlo.contentTotal || []),
                                        {
                                            province: currentValue.province,
                                            price: currentValue.price,
                                            typePlay: currentValue.typePlay,
                                            nums: currentValue.number,
                                        },
                                    ];
                                }
                            })(),
                        };
                    } else if (currentValue.typePlay === 'da(thang)') {
                        console.log('accumulator: ', accumulator);
                        accumulator.dathang = {
                            priceTotal: (accumulator.dathang?.priceTotal || 0) + currentValue.price,
                            diemTotal: (accumulator.dathang?.diemTotal || 0) + currentValue.diem,
                            tienxacTotal: (accumulator.dathang?.tienxacTotal || 0) + currentValue.tienxac,
                            contentTotal: [
                                ...(accumulator.dathang.contentTotal || []),
                                {
                                    province: currentValue.province,
                                    price: currentValue.price,
                                    typePlay: currentValue.typePlay,
                                    nums: currentValue.number,
                                },
                            ],
                        };
                    } else if (currentValue.typePlay === 'da(xien)') {
                        console.log('accumulator: ', accumulator);
                        accumulator.daxien = {
                            priceTotal: (accumulator.daxien?.priceTotal || 0) + currentValue.price,
                            diemTotal: (accumulator.daxien?.diemTotal || 0) + currentValue.diem,
                            tienxacTotal: (accumulator.daxien?.tienxacTotal || 0) + currentValue.tienxac,
                            contentTotal: [
                                ...(accumulator.daxien.contentTotal || []),
                                {
                                    province: currentValue.province,
                                    price: currentValue.price,
                                    typePlay: currentValue.typePlay,
                                    nums: currentValue.number,
                                },
                            ],
                        };
                    }

                    return accumulator;
                },
                {
                    baolo2con: {
                        priceTotal: 0,
                        diemTotal: 0,
                        tienxacTotal: 0,
                        contentTotal: [
                            {
                                province: [],
                                price: 0,
                                typePlay: '',
                                nums: [],
                            },
                        ],
                    },
                    baolo3con: {
                        priceTotal: 0,
                        diemTotal: 0,
                        tienxacTotal: 0,
                        contentTotal: [
                            {
                                province: [],
                                price: 0,
                                typePlay: '',
                                nums: [],
                            },
                        ],
                    },
                    baolo4con: {
                        priceTotal: 0,
                        diemTotal: 0,
                        tienxacTotal: 0,
                        contentTotal: [
                            {
                                province: [],
                                price: 0,
                                typePlay: '',
                                nums: [],
                            },
                        ],
                    },
                    baylo: {
                        priceTotal: 0,
                        diemTotal: 0,
                        tienxacTotal: 0,
                        contentTotal: [
                            {
                                province: [],
                                price: 0,
                                typePlay: '',
                                nums: [],
                            },
                        ],
                    },
                    tamlo: {
                        priceTotal: 0,
                        diemTotal: 0,
                        tienxacTotal: 0,
                        contentTotal: [
                            {
                                province: [],
                                price: 0,
                                typePlay: '',
                                nums: [],
                            },
                        ],
                    },
                    daxien: {
                        priceTotal: 0,
                        diemTotal: 0,
                        tienxacTotal: 0,
                        contentTotal: [
                            {
                                province: [],
                                price: 0,
                                typePlay: '',
                                nums: [],
                            },
                        ],
                    },
                    dathang: {
                        priceTotal: 0,
                        diemTotal: 0,
                        tienxacTotal: 0,
                        contentTotal: [
                            {
                                province: [],
                                price: 0,
                                typePlay: '',
                                nums: [],
                            },
                        ],
                    },
                    xiuchu: {
                        priceTotal: 0,
                        diemTotal: 0,
                        tienxacTotal: 0,
                        contentTotal: [
                            {
                                province: [],
                                price: 0,
                                typePlay: '',
                                nums: [],
                            },
                        ],
                    },
                    dauduoi: {
                        priceTotal: 0,
                        diemTotal: 0,
                        tienxacTotal: 0,
                        contentTotal: [
                            {
                                province: [],
                                price: 0,
                                typePlay: '',
                                nums: [],
                            },
                        ],
                    },
                },
            );

            console.log(data);

            if (resSmsDetail?.data?.success) {
                setLoading(false);
                setDistributes(data);

                let content = '';
                data?.baolo2con?.contentTotal?.map((dis, idx) => {
                    const daiTmpContent = [...dis.province];

                    if (daiTmpContent.includes('br')) {
                        daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                    } else if (daiTmpContent.includes('bi')) {
                        daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                    } else if (daiTmpContent.includes('bu')) {
                        daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                    } else if (daiTmpContent.includes('lt')) {
                        daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                    } else if (daiTmpContent.includes('dg')) {
                        daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                    } else if (daiTmpContent.includes('qg')) {
                        daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                    } else if (daiTmpContent.includes('do')) {
                        daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                    }

                    if (dis?.nums?.length > 0) {
                        content += `${daiTmpContent}.${dis.nums}.${dis.typePlay}.${dis.price}n.\t`;
                    }
                });
                setContentBaoLo2con(content);

                content = '';
                data?.baolo3con?.contentTotal?.map((dis, idx) => {
                    const daiTmpContent = [...dis.province];

                    if (daiTmpContent.includes('br')) {
                        daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                    } else if (daiTmpContent.includes('bi')) {
                        daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                    } else if (daiTmpContent.includes('bu')) {
                        daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                    } else if (daiTmpContent.includes('lt')) {
                        daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                    } else if (daiTmpContent.includes('dg')) {
                        daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                    } else if (daiTmpContent.includes('qg')) {
                        daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                    } else if (daiTmpContent.includes('do')) {
                        daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                    }

                    if (dis?.nums?.length > 0) {
                        content += `${daiTmpContent}.${dis.nums}.${dis.typePlay}.${dis.price}n.\t`;
                    }
                });
                setContentBaoLo3con(content);

                content = '';
                data?.baolo4con?.contentTotal?.map((dis, idx) => {
                    const daiTmpContent = [...dis.province];

                    if (daiTmpContent.includes('br')) {
                        daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                    } else if (daiTmpContent.includes('bi')) {
                        daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                    } else if (daiTmpContent.includes('bu')) {
                        daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                    } else if (daiTmpContent.includes('lt')) {
                        daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                    } else if (daiTmpContent.includes('dg')) {
                        daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                    } else if (daiTmpContent.includes('qg')) {
                        daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                    } else if (daiTmpContent.includes('do')) {
                        daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                    }

                    if (dis?.nums?.length > 0) {
                        content += `${daiTmpContent}.${dis.nums}.${dis.typePlay}.${dis.price}n.\t`;
                    }
                });
                setContentBaoLo4con(content);

                content = '';
                data?.baylo?.contentTotal?.map((dis, idx) => {
                    const daiTmpContent = [...dis.province];

                    if (daiTmpContent.includes('br')) {
                        daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                    } else if (daiTmpContent.includes('bi')) {
                        daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                    } else if (daiTmpContent.includes('bu')) {
                        daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                    } else if (daiTmpContent.includes('lt')) {
                        daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                    } else if (daiTmpContent.includes('dg')) {
                        daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                    } else if (daiTmpContent.includes('qg')) {
                        daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                    } else if (daiTmpContent.includes('do')) {
                        daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                    }

                    if (dis?.nums?.length > 0) {
                        content += `${daiTmpContent}.${dis.nums}.${dis.typePlay}.${dis.price}n.\t`;
                    }
                });
                setContentBayLo(content);

                content = '';
                data?.tamlo?.contentTotal?.map((dis, idx) => {
                    const daiTmpContent = [...dis.province];

                    if (daiTmpContent.includes('br')) {
                        daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                    } else if (daiTmpContent.includes('bi')) {
                        daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                    } else if (daiTmpContent.includes('bu')) {
                        daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                    } else if (daiTmpContent.includes('lt')) {
                        daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                    } else if (daiTmpContent.includes('dg')) {
                        daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                    } else if (daiTmpContent.includes('qg')) {
                        daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                    } else if (daiTmpContent.includes('do')) {
                        daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                    }

                    if (dis?.nums?.length > 0) {
                        content += `${daiTmpContent}.${dis.nums}.${dis.typePlay}.${dis.price}n.\t`;
                    }
                });
                setContentTamLo(content);

                content = '';
                data?.daxien?.contentTotal?.map((dis, idx) => {
                    const daiTmpContent = [...dis.province];

                    if (daiTmpContent.includes('br')) {
                        daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                    } else if (daiTmpContent.includes('bi')) {
                        daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                    } else if (daiTmpContent.includes('bu')) {
                        daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                    } else if (daiTmpContent.includes('lt')) {
                        daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                    } else if (daiTmpContent.includes('dg')) {
                        daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                    } else if (daiTmpContent.includes('qg')) {
                        daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                    } else if (daiTmpContent.includes('do')) {
                        daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                    }

                    if (dis?.nums?.length > 0) {
                        content += `${daiTmpContent}.${dis.nums}.${dis.typePlay}.${dis.price}n.\t`;
                    }
                });
                setContentDaXien(content);

                content = '';
                data?.dathang?.contentTotal?.map((dis, idx) => {
                    const daiTmpContent = [...dis.province];

                    if (daiTmpContent.includes('br')) {
                        daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                    } else if (daiTmpContent.includes('bi')) {
                        daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                    } else if (daiTmpContent.includes('bu')) {
                        daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                    } else if (daiTmpContent.includes('lt')) {
                        daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                    } else if (daiTmpContent.includes('dg')) {
                        daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                    } else if (daiTmpContent.includes('qg')) {
                        daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                    } else if (daiTmpContent.includes('do')) {
                        daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                    }

                    if (dis?.nums?.length > 0) {
                        content += `${daiTmpContent}.${dis.nums}.${dis.typePlay}.${dis.price}n.\t`;
                    }
                });
                setContentDaThang(content);

                content = '';
                data?.xiuchu?.contentTotal?.map((dis, idx) => {
                    const daiTmpContent = [...dis.province];

                    if (daiTmpContent.includes('br')) {
                        daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                    } else if (daiTmpContent.includes('bi')) {
                        daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                    } else if (daiTmpContent.includes('bu')) {
                        daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                    } else if (daiTmpContent.includes('lt')) {
                        daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                    } else if (daiTmpContent.includes('dg')) {
                        daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                    } else if (daiTmpContent.includes('qg')) {
                        daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                    } else if (daiTmpContent.includes('do')) {
                        daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                    }

                    if (dis?.nums?.length > 0) {
                        content += `${daiTmpContent}.${dis.nums}.${dis.typePlay}.${dis.price}n.\t`;
                    }
                });
                setContentXiuChu(content);

                content = '';
                data?.dauduoi?.contentTotal?.map((dis, idx) => {
                    const daiTmpContent = [...dis.province];

                    if (daiTmpContent.includes('br')) {
                        daiTmpContent[daiTmpContent.indexOf('br')] = 'btr';
                    } else if (daiTmpContent.includes('bi')) {
                        daiTmpContent[daiTmpContent.indexOf('bi')] = 'bl';
                    } else if (daiTmpContent.includes('bu')) {
                        daiTmpContent[daiTmpContent.indexOf('bu')] = 'bd';
                    } else if (daiTmpContent.includes('lt')) {
                        daiTmpContent[daiTmpContent.indexOf('lt')] = 'dl';
                    } else if (daiTmpContent.includes('dg')) {
                        daiTmpContent[daiTmpContent.indexOf('dg')] = 'dn';
                    } else if (daiTmpContent.includes('qg')) {
                        daiTmpContent[daiTmpContent.indexOf('qg')] = 'qn';
                    } else if (daiTmpContent.includes('do')) {
                        daiTmpContent[daiTmpContent.indexOf('do')] = 'dn';
                    }

                    if (dis?.nums?.length > 0) {
                        content += `${daiTmpContent}.${dis.nums}.${dis.typePlay}.${dis.price}n.\t`;
                    }
                });
                setContentDauDuoi(content);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const notice = useSelector(noticeAdminSelector);
    useEffect(() => {
        if (!notice.state) {
            clearTimeout(setTimeoutTmp);
        }
    }, [notice.state]);

    const dispatch = useDispatch();

    const handleCopy = async (content) => {
        console.log(content);

        navigator?.clipboard
            ?.writeText(content)
            .then(() => {
                dispatch(noticeAdminSlice.actions.successNotice('Đã sao chép nội dung'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [5000]);
            })
            .catch((err) => {
                dispatch(noticeAdminSlice.actions.successNotice('Có lỗi xảy ra khi sao chép'));

                setTimeoutTmp = setTimeout(() => {
                    dispatch(noticeAdminSlice.actions.hiddenNotice());
                }, [5000]);
            });
    };

    return (
        <div
            onClick={() => {
                setModalDistribute(false);
            }}
            className="fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 z-[9999]"
        >
            {loading ? (
                <div className="left-0 right-0 fixed z-[999999] top-0">
                    <div className="bg-[#259dba] h-[3px] animate-loadingSlice"></div>
                    <div className="right-[6px] absolute top-[10px]">
                        <div className="flex justify-center items-center">
                            <div className="text-[26px] animate-loading2 text-[#259dba]">
                                <BsArrowClockwise />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
            <div className="top-0 absolute left-0 right-0 bottom-0 bg-[#000] opacity-[.4] z-[99]"></div>
            <div className="fixed flex justify-center overflow-y-auto overflow-x-hidden top-0 left-0 right-0 bottom-0 pb-[60px] opacity-[1] z-[999]">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#fff] animate-modalDownSlide text-[12px] lg:w-[600px] w-[96%] h-fit pb-[20px] shadow-xl rounded-[6px] mt-[30px] py-[14px]"
                >
                    <div className="flex justify-between items-center pb-[12px] border-b-[1px] border-solid border-[#f0f0f0] px-[26px]">
                        <h1 className="text-[14px] capitalize text-[#000] font-[620]">{`Phân loại đề ngày ${date.getDate()}-${
                            date.getMonth() + 1
                        }-${date.getFullYear()}`}</h1>
                        <div onClick={() => setModalDistribute(false)} className="cursor-pointer">
                            <AiOutlineClose />
                        </div>
                    </div>
                    <div className="mt-[16px] grid grid-cols-1 lg:grid-cols-2 gap-[24px] px-[26px]">
                        <div className="flex flex-col gap-[4px] lg:gap-[0px]">
                            <label className="text-[12px] flex text-[#000]">Người chơi</label>

                            <div className="mt-[4px] flex-1 text-[#000] font-[500] outline-none text-[12px]">
                                <Select
                                    options={members.slice(1)}
                                    value={idMemberSelect}
                                    onChange={(selectedOption) => {
                                        setIdMemberSelect(selectedOption);
                                        setIdMember(selectedOption.value);
                                    }}
                                    placeholder="Tên hoặc SĐT"
                                    isSearchable={true} // Kích hoạt ô tìm kiếm
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            minHeight: '26px', // Chiều cao tối thiểu
                                            height: '26px', // Chiều cao cố định
                                        }),
                                        input: (provided) => ({
                                            ...provided,
                                            margin: '0', // Loại bỏ khoảng cách thừa
                                        }),
                                        indicatorsContainer: (provided) => ({
                                            ...provided,
                                            height: '26px', // Độ cao của vùng chứa các icon
                                        }),
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-[4px] lg:gap-[0px]">
                            <label className="text-[12px] flex text-[#000]">Miền</label>

                            <div className="mt-[4px] flex-1 text-[#000] font-[500] outline-none text-[12px]">
                                <select
                                    value={domain}
                                    onChange={(e) => setDomain(e.target.value)}
                                    className="px-[4px] py-[4px] flex-1 w-[100%] text-[#000] font-[500] outline-none border-[1px] border-[#ccc] border-solid rounded-[4px] text-[12px]"
                                >
                                    <option value="mn">Miền Nam</option>
                                    <option value="mt">Miền Trung</option>
                                    <option value="mb">Miền Bắc</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[4px] lg:gap-[0px]">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <label className="text-[12px] flex text-[#000]">Bao 2 con: </label>
                                    <span className="font-[600] text-[13px] ml-[10px]">{`${distributes?.baolo2con?.priceTotal?.toLocaleString()} = ${distributes?.baolo2con?.diemTotal?.toLocaleString()} (${parseFloat(
                                        distributes?.baolo2con?.tienxacTotal?.toFixed(1),
                                    ).toLocaleString()})`}</span>
                                </div>
                                <div
                                    onClick={() => handleCopy(contentBaoLo2con)}
                                    className="text-[16px] cursor-pointer"
                                >
                                    <AiOutlineCopy />
                                </div>
                            </div>

                            <div className="mt-[4px] flex-1 text-[#000] outline-none text-[12px]">
                                <div className="border-[1px] break-words border-solid border-[#c0bebe] rounded-[6px] w-[100%] h-[90px] overflow-y-auto px-[12px] py-[4px]">
                                    {contentBaoLo2con}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[4px] lg:gap-[0px]">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <label className="text-[12px] flex text-[#000]">Bao 3 con: </label>
                                    <span className="font-[600] text-[13px] ml-[10px]">{`${distributes?.baolo3con?.priceTotal?.toLocaleString()} = ${distributes?.baolo3con?.diemTotal?.toLocaleString()} (${parseFloat(
                                        distributes?.baolo3con?.tienxacTotal?.toFixed(1),
                                    ).toLocaleString()})`}</span>
                                </div>
                                <div
                                    onClick={() => handleCopy(contentBaoLo3con)}
                                    className="text-[16px] cursor-pointer"
                                >
                                    <AiOutlineCopy />
                                </div>
                            </div>

                            <div className="mt-[4px] flex-1 text-[#000] outline-none text-[12px]">
                                <div className="border-[1px] break-words border-solid border-[#c0bebe] rounded-[6px] w-[100%] overflow-x-hidden overflow-y-auto h-[90px] px-[12px] py-[4px]">
                                    {contentBaoLo3con}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[4px] lg:gap-[0px]">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <label className="text-[12px] flex text-[#000]">Bao 4 con: </label>
                                    <span className="font-[600] text-[13px] ml-[10px]">{`${distributes?.baolo4con?.priceTotal?.toLocaleString()} = ${distributes?.baolo4con?.diemTotal?.toLocaleString()} (${parseFloat(
                                        distributes?.baolo4con?.tienxacTotal?.toFixed(1),
                                    ).toLocaleString()})`}</span>
                                </div>
                                <div
                                    onClick={() => handleCopy(contentBaoLo4con)}
                                    className="text-[16px] cursor-pointer"
                                >
                                    <AiOutlineCopy />
                                </div>
                            </div>

                            <div className="mt-[4px] flex-1 text-[#000] outline-none text-[12px]">
                                <div className="border-[1px] break-words border-solid border-[#c0bebe] rounded-[6px] w-[100%] h-[90px] overflow-y-auto px-[12px] py-[4px]">
                                    {contentBaoLo4con}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[4px] lg:gap-[0px]">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <label className="text-[12px] flex text-[#000]">Xỉu chủ: </label>
                                    <span className="font-[600] text-[13px] ml-[10px]">{`${distributes?.xiuchu?.priceTotal?.toLocaleString()} = ${distributes?.xiuchu?.diemTotal?.toLocaleString()} (${parseFloat(
                                        distributes?.xiuchu?.tienxacTotal?.toFixed(1),
                                    ).toLocaleString()})`}</span>
                                </div>
                                <div onClick={() => handleCopy(contentXiuChu)} className="text-[16px] cursor-pointer">
                                    <AiOutlineCopy />
                                </div>
                            </div>

                            <div className="mt-[4px] flex-1 text-[#000] outline-none text-[12px]">
                                <div className="border-[1px] break-words border-solid border-[#c0bebe] rounded-[6px] w-[100%] h-[90px] overflow-y-auto px-[12px] py-[4px]">
                                    {contentXiuChu}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[4px] lg:gap-[0px]">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <label className="text-[12px] flex text-[#000]">Đầu đuôi: </label>
                                    <span className="font-[600] text-[13px] ml-[10px]">{`${distributes?.dauduoi?.priceTotal?.toLocaleString()} = ${distributes?.dauduoi?.diemTotal?.toLocaleString()} (${parseFloat(
                                        distributes?.dauduoi?.tienxacTotal?.toFixed(1),
                                    ).toLocaleString()})`}</span>
                                </div>
                                <div onClick={() => handleCopy(contentDauDuoi)} className="text-[16px] cursor-pointer">
                                    <AiOutlineCopy />
                                </div>
                            </div>

                            <div className="mt-[4px] flex-1 text-[#000] outline-none text-[12px]">
                                <div className="border-[1px] break-words border-solid border-[#c0bebe] rounded-[6px] w-[100%] h-[90px] overflow-y-auto px-[12px] py-[4px]">
                                    {contentDauDuoi}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[4px] lg:gap-[0px]">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <label className="text-[12px] flex text-[#000]">Đá Thẳng: </label>
                                    <span className="font-[600] text-[13px] ml-[10px]">{`${distributes?.dathang?.priceTotal?.toLocaleString()} = ${distributes?.dathang?.diemTotal?.toLocaleString()} (${parseFloat(
                                        distributes?.dathang?.tienxacTotal?.toFixed(1),
                                    ).toLocaleString()})`}</span>
                                </div>
                                <div onClick={() => handleCopy(contentDaThang)} className="text-[16px] cursor-pointer">
                                    <AiOutlineCopy />
                                </div>
                            </div>

                            <div className="mt-[4px] flex-1 text-[#000] outline-none text-[12px]">
                                <div className="border-[1px] break-words border-solid border-[#c0bebe] rounded-[6px] w-[100%] h-[90px] overflow-y-auto px-[12px] py-[4px]">
                                    {contentDaThang}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[4px] lg:gap-[0px]">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <label className="text-[12px] flex text-[#000]">Đá Xiên: </label>
                                    <span className="font-[600] text-[13px] ml-[10px]">{`${distributes?.daxien?.priceTotal?.toLocaleString()} = ${distributes?.daxien?.diemTotal?.toLocaleString()} (${parseFloat(
                                        distributes?.daxien?.tienxacTotal?.toFixed(1),
                                    ).toLocaleString()})`}</span>
                                </div>
                                <div onClick={() => handleCopy(contentDaXien)} className="text-[16px] cursor-pointer">
                                    <AiOutlineCopy />
                                </div>
                            </div>

                            <div className="mt-[4px] flex-1 text-[#000] outline-none text-[12px]">
                                <div className="border-[1px] break-words border-solid border-[#c0bebe] rounded-[6px] w-[100%] h-[90px] overflow-y-auto px-[12px] py-[4px]">
                                    {contentDaXien}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[4px] lg:gap-[0px]">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <label className="text-[12px] flex text-[#000]">Bảy lô: </label>
                                    <span className="font-[600] text-[13px] ml-[10px]">{`${distributes?.baylo?.priceTotal?.toLocaleString()} = ${distributes?.baylo?.diemTotal?.toLocaleString()} (${parseFloat(
                                        distributes?.baylo?.tienxacTotal?.toFixed(1),
                                    ).toLocaleString()})`}</span>
                                </div>
                                <div onClick={() => handleCopy(contentBayLo)} className="text-[16px] cursor-pointer">
                                    <AiOutlineCopy />
                                </div>
                            </div>

                            <div className="mt-[4px] flex-1 text-[#000] outline-none text-[12px]">
                                <div className="border-[1px] break-words border-solid border-[#c0bebe] rounded-[6px] w-[100%] h-[90px] overflow-y-auto px-[12px] py-[4px]">
                                    {contentBayLo}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[4px] lg:gap-[0px]">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <label className="text-[12px] flex text-[#000]">Tám lô: </label>
                                    <span className="font-[600] text-[13px] ml-[10px]">{`${distributes?.tamlo?.priceTotal?.toLocaleString()} = ${distributes?.tamlo?.diemTotal?.toLocaleString()} (${parseFloat(
                                        distributes?.tamlo?.tienxacTotal?.toFixed(1),
                                    ).toLocaleString()})`}</span>
                                </div>
                                <div onClick={() => handleCopy(contentTamLo)} className="text-[16px] cursor-pointer">
                                    <AiOutlineCopy />
                                </div>
                            </div>

                            <div className="mt-[4px] flex-1 text-[#000] outline-none text-[12px]">
                                <div className="border-[1px] break-words border-solid border-[#c0bebe] rounded-[6px] w-[100%] h-[90px] overflow-y-auto px-[12px] py-[4px]">
                                    {contentTamLo}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalDistribute;
