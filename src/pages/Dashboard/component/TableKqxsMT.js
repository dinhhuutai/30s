import { useEffect, useState } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';

function TableKqxsMT({ kqxsMT, day }) {
    let pro1 =
        day === 2
            ? 'py'
            : day === 3
            ? 'dl'
            : day === 4
            ? 'dg'
            : day === 5
            ? 'qb'
            : day === 6
            ? 'gl'
            : day === 7
            ? 'dg'
            : 'kh';

    let pro2 =
        day === 2
            ? 'hu'
            : day === 3
            ? 'qn'
            : day === 4
            ? 'kh'
            : day === 5
            ? 'bd'
            : day === 6
            ? 'nt'
            : day === 7
            ? 'qg'
            : 'kt';

    let pro3 = day === 5 ? 'qt' : day === 7 ? 'do' : day === 1 ? 'hu' : '';

    const [vtRotateCol1, setVtRotateCol1] = useState({
        i: undefined,
        ii: undefined,
    });

    const [vtRotateCol2, setVtRotateCol2] = useState({
        i: undefined,
        ii: undefined,
    });

    const [vtRotateCol3, setVtRotateCol3] = useState({
        i: undefined,
        ii: undefined,
    });

    const [numbers, setNumbers] = useState([5, 8, 4, 1, 9, 3]);

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
    }, [kqxsMT]);

    const handleVt = async () => {
        let kt1 = true;
        let kt2 = true;
        let kt3 = true;

        kqxsMT?.map((e, i) => {
            e?.[pro1]?.map((el, ii) => {
                if (el === '' && kt1) {
                    setVtRotateCol1({
                        i,
                        ii,
                    });

                    kt1 = false;
                }
            });

            e?.[pro2]?.map((el, ii) => {
                if (el === '' && kt2) {
                    setVtRotateCol2({
                        i,
                        ii,
                    });

                    kt2 = false;
                }
            });

            e?.[pro3]?.map((el, ii) => {
                if (el === '' && kt3) {
                    setVtRotateCol3({
                        i,
                        ii,
                    });

                    kt3 = false;
                }
            });
        });
    };

    return (
        <div class="mt-[10px] overflow-x-auto w-[100%] flex">
            <table className="w-[100%]">
                <thead>
                    <tr className="bg-[#f0f1f4] flex grid-flow-col">
                        <th className="justify-center flex items-center w-[50px] px-[2px] py-[6px] border-[1px] border-[#fff]"></th>
                        <th
                            className={`justify-center flex flex-1 items-center ${
                                day === 1 || day === 5 || day === 7 ? 'w-[90px]' : 'w-[135px]'
                            } px-[2px] py-[6px] capitalize text-[12px] border-[1px] border-[#fff]`}
                        >
                            {day === 2
                                ? 'phú yên'
                                : day === 3
                                ? 'đắk lắk'
                                : day === 4
                                ? 'đà nẵng'
                                : day === 5
                                ? 'quảng bình'
                                : day === 6
                                ? 'gia lai'
                                : day === 7
                                ? 'đà nẵng'
                                : 'khánh hòa'}
                        </th>
                        <th
                            className={`justify-center flex flex-1 items-center ${
                                day === 1 || day === 5 || day === 7 ? 'w-[90px]' : 'w-[135px]'
                            } px-[2px] py-[6px] capitalize text-[12px] border-[1px] border-[#fff]`}
                        >
                            {day === 2
                                ? 'Huế'
                                : day === 3
                                ? 'quảng nam'
                                : day === 4
                                ? 'khánh hòa'
                                : day === 5
                                ? 'bình định'
                                : day === 6
                                ? 'ninh thuận'
                                : day === 7
                                ? 'quảng ngãi'
                                : 'kom tum'}
                        </th>
                        {(day === 1 || day === 5 || day === 7) && (
                            <th className="justify-center flex flex-1 items-center w-[90px] px-[2px] py-[6px] capitalize text-[12px] border-[1px] border-[#fff]">
                                {day === 1 ? 'huế' : day === 5 ? 'quảng trị' : day === 7 ? 'đắc nông' : ''}
                            </th>
                        )}
                    </tr>
                </thead>

                <tbody>
                    {kqxsMT?.map((e, i) => (
                        <tr key={i} className="bg-[#f0f1f4] flex grid-flow-col text-[12px]">
                            <td className="px-[2px] py-[6px] w-[50px] flex justify-center items-center border-[1px] border-[#fff]">{`${
                                i !== 8 ? `Giải ${8 - i}` : 'ĐB'
                            }`}</td>
                            <td
                                className={`flex flex-1 flex-col gap-[6px] items-center justify-center ${
                                    day === 1 || day === 5 || day === 7 ? 'w-[90px]' : 'w-[135px]'
                                } px-[2px] py-[6px] col-span-2 border-[1px] border-[#fff] ${
                                    i === 0 || i === 8
                                        ? 'text-[14px] text-[#f02b2b] font-[650]'
                                        : 'text-[#000] font-[600]'
                                }`}
                            >
                                {e?.[pro1]
                                    ? e?.[pro1]?.map((el, ii) => (
                                          <div className="w-[100%] flex justify-center" key={ii}>
                                              {el ? (
                                                  el
                                              ) : i === vtRotateCol1.i && ii === vtRotateCol1.ii ? (
                                                  <div className="flex gap-[1px]">
                                                      {i === 0 ? (
                                                          <>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[0]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[1]}</div>
                                                          </>
                                                      ) : i === 1 ? (
                                                          <>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[0]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[1]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[2]}</div>
                                                          </>
                                                      ) : i <= 3 ? (
                                                          <>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[0]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[1]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[2]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[3]}</div>
                                                          </>
                                                      ) : i <= 7 ? (
                                                          <>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[0]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[1]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[2]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[3]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[4]}</div>
                                                          </>
                                                      ) : (
                                                          <>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[0]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[1]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[2]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[3]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[4]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[5]}</div>
                                                          </>
                                                      )}
                                                  </div>
                                              ) : (
                                                  <div className="flex gap-[1px] text-[12px] text-[#5d5c5c]">
                                                      {i === 0 ? (
                                                          <>
                                                              <div className="animate-loading3">
                                                                  <BiLoaderCircle />
                                                              </div>
                                                              <div className="animate-loading3">
                                                                  <BiLoaderCircle />
                                                              </div>
                                                          </>
                                                      ) : i === 1 ? (
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
                                                      ) : i <= 3 ? (
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
                                                      ) : i <= 7 ? (
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
                                                      ) : (
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
                                                              <div className="animate-loading3">
                                                                  <BiLoaderCircle />
                                                              </div>
                                                          </>
                                                      )}
                                                  </div>
                                              )}
                                          </div>
                                      ))
                                    : e?.undefined?.map((el, ii) => (
                                          <div key={ii} className="flex gap-[1px] text-[12px] text-[#5d5c5c]">
                                              {i === 0 ? (
                                                  <>
                                                      <div className="animate-loading3">
                                                          <BiLoaderCircle />
                                                      </div>
                                                      <div className="animate-loading3">
                                                          <BiLoaderCircle />
                                                      </div>
                                                  </>
                                              ) : i === 1 ? (
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
                                              ) : i <= 3 ? (
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
                                              ) : i <= 7 ? (
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
                                              ) : (
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
                                                      <div className="animate-loading3">
                                                          <BiLoaderCircle />
                                                      </div>
                                                  </>
                                              )}
                                          </div>
                                      ))}
                            </td>
                            <td
                                className={`flex flex-1 flex-col gap-[6px] items-center justify-center ${
                                    day === 1 || day === 5 || day === 7 ? 'w-[90px]' : 'w-[135px]'
                                } px-[2px] py-[6px] col-span-2 border-[1px] border-[#fff] ${
                                    i === 0 || i === 8
                                        ? 'text-[14px] text-[#f02b2b] font-[650]'
                                        : 'text-[#000] font-[600]'
                                }`}
                            >
                                {e?.[pro2]
                                    ? e?.[pro2]?.map((el, ii) => (
                                          <div className="w-[100%] flex justify-center" key={ii}>
                                              {el ? (
                                                  el
                                              ) : i === vtRotateCol2.i && ii === vtRotateCol2.ii ? (
                                                  <div className="flex gap-[1px]">
                                                      {i === 0 ? (
                                                          <>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[0]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[1]}</div>
                                                          </>
                                                      ) : i === 1 ? (
                                                          <>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[0]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[1]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[2]}</div>
                                                          </>
                                                      ) : i <= 3 ? (
                                                          <>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[0]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[1]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[2]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[3]}</div>
                                                          </>
                                                      ) : i <= 7 ? (
                                                          <>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[0]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[1]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[2]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[3]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[4]}</div>
                                                          </>
                                                      ) : (
                                                          <>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[0]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[1]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[2]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[3]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[4]}</div>
                                                              <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[5]}</div>
                                                          </>
                                                      )}
                                                  </div>
                                              ) : (
                                                  <div className="flex gap-[1px] text-[12px] text-[#5d5c5c]">
                                                      {i === 0 ? (
                                                          <>
                                                              <div className="animate-loading3">
                                                                  <BiLoaderCircle />
                                                              </div>
                                                              <div className="animate-loading3">
                                                                  <BiLoaderCircle />
                                                              </div>
                                                          </>
                                                      ) : i === 1 ? (
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
                                                      ) : i <= 3 ? (
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
                                                      ) : i <= 7 ? (
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
                                                      ) : (
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
                                                              <div className="animate-loading3">
                                                                  <BiLoaderCircle />
                                                              </div>
                                                          </>
                                                      )}
                                                  </div>
                                              )}
                                          </div>
                                      ))
                                    : e?.undefined?.map((el, ii) => (
                                          <div key={ii} className="flex gap-[1px] text-[12px] text-[#5d5c5c]">
                                              {i === 0 ? (
                                                  <>
                                                      <div className="animate-loading3">
                                                          <BiLoaderCircle />
                                                      </div>
                                                      <div className="animate-loading3">
                                                          <BiLoaderCircle />
                                                      </div>
                                                  </>
                                              ) : i === 1 ? (
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
                                              ) : i <= 3 ? (
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
                                              ) : i <= 7 ? (
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
                                              ) : (
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
                                                      <div className="animate-loading3">
                                                          <BiLoaderCircle />
                                                      </div>
                                                  </>
                                              )}
                                          </div>
                                      ))}
                            </td>
                            {(day === 1 || day === 5 || day === 7) && (
                                <td
                                    className={`flex flex-1 flex-col gap-[6px] items-center justify-center w-[90px] px-[2px] py-[6px] col-span-2 border-[1px] border-[#fff] ${
                                        i === 0 || i === 8
                                            ? 'text-[14px] text-[#f02b2b] font-[650]'
                                            : 'text-[#000] font-[600]'
                                    }`}
                                >
                                    {e?.[pro3]
                                        ? e?.[pro3]?.map((el, ii) => (
                                              <div className="w-[100%] flex justify-center" key={ii}>
                                                  {el ? (
                                                      el
                                                  ) : i === vtRotateCol3.i && ii === vtRotateCol3.ii ? (
                                                      <div className="flex gap-[1px]">
                                                          {i === 0 ? (
                                                              <>
                                                                  <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[0]}</div>
                                                                  <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[1]}</div>
                                                              </>
                                                          ) : i === 1 ? (
                                                              <>
                                                                  <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[0]}</div>
                                                                  <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[1]}</div>
                                                                  <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[2]}</div>
                                                              </>
                                                          ) : i <= 3 ? (
                                                              <>
                                                                  <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[0]}</div>
                                                                  <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[1]}</div>
                                                                  <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[2]}</div>
                                                                  <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[3]}</div>
                                                              </>
                                                          ) : i <= 7 ? (
                                                              <>
                                                                  <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[0]}</div>
                                                                  <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[1]}</div>
                                                                  <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[2]}</div>
                                                                  <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[3]}</div>
                                                                  <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[4]}</div>
                                                              </>
                                                          ) : (
                                                              <>
                                                                  <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[0]}</div>
                                                                  <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[1]}</div>
                                                                  <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[2]}</div>
                                                                  <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[3]}</div>
                                                                  <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[4]}</div>
                                                                  <div className="bg-[#f9ffa9] rounded-[10px] px-[1px]">{numbers[5]}</div>
                                                              </>
                                                          )}
                                                      </div>
                                                  ) : (
                                                      <div className="flex gap-[1px] text-[12px] text-[#5d5c5c]">
                                                          {i === 0 ? (
                                                              <>
                                                                  <div className="animate-loading3">
                                                                      <BiLoaderCircle />
                                                                  </div>
                                                                  <div className="animate-loading3">
                                                                      <BiLoaderCircle />
                                                                  </div>
                                                              </>
                                                          ) : i === 1 ? (
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
                                                          ) : i <= 3 ? (
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
                                                          ) : i <= 7 ? (
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
                                                          ) : (
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
                                                                  <div className="animate-loading3">
                                                                      <BiLoaderCircle />
                                                                  </div>
                                                              </>
                                                          )}
                                                      </div>
                                                  )}
                                              </div>
                                          ))
                                        : e?.undefined?.map((el, ii) => (
                                              <div key={ii} className="flex gap-[1px] text-[12px] text-[#5d5c5c]">
                                                  {i === 0 ? (
                                                      <>
                                                          <div className="animate-loading3">
                                                              <BiLoaderCircle />
                                                          </div>
                                                          <div className="animate-loading3">
                                                              <BiLoaderCircle />
                                                          </div>
                                                      </>
                                                  ) : i === 1 ? (
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
                                                  ) : i <= 3 ? (
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
                                                  ) : i <= 7 ? (
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
                                                  ) : (
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
                                                          <div className="animate-loading3">
                                                              <BiLoaderCircle />
                                                          </div>
                                                      </>
                                                  )}
                                              </div>
                                          ))}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableKqxsMT;
