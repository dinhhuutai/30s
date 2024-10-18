import { BiLoaderCircle } from 'react-icons/bi';

function TableKqxsMB({ kqxsMB }) {
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
