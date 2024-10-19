import { useEffect, useState } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';

function TableKqxsMB({ kqxsMB }) {

    const [vtRotate, setVtRotate] = useState({
        i: undefined,
        ii: undefined,
    });

    const [numbers, setNumbers] = useState([0, 7, 5, 8, 2]);

    useEffect(() => {
        const intervals = numbers.map(
            (_, index) =>
                setInterval(() => {
                    setNumbers((prevNumbers) => {
                        const newNumbers = [...prevNumbers];
                        newNumbers[index] = (newNumbers[index] + 1) % 10; // Tăng từng số
                        return newNumbers;
                    });
                }, 100), // Thay đổi thời gian giữa các số
        );

        return () => intervals.forEach(clearInterval); // Dọn dẹp tất cả interval khi component unmount
    }, []);

    useEffect(() => {
        handleVt();
    }, []);

    const handleVt = async () => {
        let kt = true;
        let iTmp = undefined;
        let iiTmp = undefined;

        kqxsMB.map((e, i) => {
            e.map((el, ii) => {
                if (el === '' && kt) {
                    iTmp = i;
                    iiTmp = ii;

                    if (i !== 0 || ii !== 0) {
                        kt = false;
                    }
                }

                if (i === 7 && (ii === 3) & (el !== '') && el !== undefined) {
                    iTmp = 0;
                    iiTmp = 0;
                }
            });
        });

        setVtRotate({
            i: iTmp,
            ii: iiTmp,
        });
    };

    return (
        <div class="mt-[10px] overflow-x-auto w-[100%] flex">
            <table className="w-[100%]">
                <tbody>
                    {kqxsMB?.map((e, i) => (
                        <tr key={i} className="bg-[#f0f1f4] flex grid-flow-col text-[12px]">
                            <td className="px-[2px] py-[6px] w-[50px] flex justify-center items-center border-[1px] border-[#fff]">{`${
                                i !== 0 ? `Giải ${i}` : 'ĐB'
                            }`}</td>
                            <td
                                className={`grid ${
                                    i === 0 || i === 1
                                        ? 'grid-cols-1'
                                        : i === 2
                                        ? 'grid-cols-2'
                                        : i === 3 || i === 5 || i === 6
                                        ? 'grid-cols-3'
                                        : i === 4 || i === 7
                                        ? 'grid-cols-4'
                                        : ''
                                } items-center justify-center flex-1 gap-[6px] px-[2px] py-[6px] border-[1px] border-[#fff] ${
                                    i === 0 || i === 7
                                        ? 'text-[14px] text-[#f02b2b] font-[650]'
                                        : 'text-[#000] font-[600]'
                                }`}
                            >
                                {e?.map((el, ii) => (
                                    <div key={ii} className="grid col-span-1 justify-center">
                                        {el ? (
                                            el
                                        ) : i === vtRotate.i && ii === vtRotate.ii ? (
                                            <div className="flex gap-[1px]">
                                                {i <= 3 ? (
                                                    <>
                                                        <div className="">{numbers[0]}</div>
                                                        <div className="">{numbers[1]}</div>
                                                        <div className="">{numbers[2]}</div>
                                                        <div className="">{numbers[3]}</div>
                                                        <div className="">{numbers[4]}</div>
                                                    </>
                                                ) : i <= 5 ? (
                                                    <>
                                                        <div className="">{numbers[0]}</div>
                                                        <div className="">{numbers[1]}</div>
                                                        <div className="">{numbers[2]}</div>
                                                        <div className="">{numbers[3]}</div>
                                                    </>
                                                ) : i <= 6 ? (
                                                    <>
                                                        <div className="">{numbers[0]}</div>
                                                        <div className="">{numbers[1]}</div>
                                                        <div className="">{numbers[2]}</div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="">{numbers[0]}</div>
                                                        <div className="">{numbers[1]}</div>
                                                    </>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex gap-[1px] text-[12px] text-[#5d5c5c]">
                                                {i <= 3 ? (
                                                    <>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                    </>
                                                ) : i <= 5 ? (
                                                    <>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                    </>
                                                ) : i <= 6 ? (
                                                    <>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                        <div className="animate-loading3">
                                                            <BiLoaderCircle />
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableKqxsMB;
