import { BiLoaderCircle } from 'react-icons/bi';

function TableKqxsMN({ kqxsMN, day }) {
    let pro1 =
        day === 2 || day === 7
            ? 'tp'
            : day === 3
            ? 'br'
            : day === 4
            ? 'dn'
            : day === 5
            ? 'tn'
            : day === 6
            ? 'vl'
            : 'tg';

    let pro2 =
        day === 2
            ? 'dt'
            : day === 3
            ? 'vt'
            : day === 4
            ? 'ct'
            : day === 5
            ? 'ag'
            : day === 6
            ? 'bu'
            : day === 7
            ? 'la'
            : 'kg';

    let pro3 =
        day === 2
            ? 'cm'
            : day === 3
            ? 'bi'
            : day === 4
            ? 'st'
            : day === 5
            ? 'bt'
            : day === 6
            ? 'tv'
            : day === 7
            ? 'bp'
            : 'lt';

    return (
        <div class="mt-[10px] overflow-x-auto w-[100%] flex">
            <table className="w-[100%]">
                <thead>
                    <tr className="bg-[#f0f1f4] flex grid-flow-col">
                        <th className="justify-center flex items-center w-[50px] px-[2px] py-[6px] border-[1px] border-[#fff]"></th>
                        <th className="justify-center flex-1 flex items-center w-[90px] px-[2px] py-[6px] capitalize text-[12px] border-[1px] border-[#fff]">
                            {day === 2 || day === 7
                                ? 'TP.HCM'
                                : day === 3
                                ? 'bến tre'
                                : day === 4
                                ? 'đồng nai'
                                : day === 5
                                ? 'tây ninh'
                                : day === 6
                                ? 'vĩnh long'
                                : 'tiền giang'}
                        </th>
                        <th className="justify-center flex-1 flex items-center w-[90px] px-[2px] py-[6px] capitalize text-[12px] border-[1px] border-[#fff]">
                            {day === 2
                                ? 'đồng tháp'
                                : day === 3
                                ? 'vũng tàu'
                                : day === 4
                                ? 'cần thơ'
                                : day === 5
                                ? 'an giang'
                                : day === 6
                                ? 'bình dương'
                                : day === 7
                                ? 'long an'
                                : 'kiên giang'}
                        </th>
                        <th className="justify-center flex-1 flex items-center w-[90px] px-[2px] py-[6px] capitalize text-[12px] border-[1px] border-[#fff]">
                            {day === 2
                                ? 'cà mau'
                                : day === 3
                                ? 'bạc liêu'
                                : day === 4
                                ? 'sóc trăng'
                                : day === 5
                                ? 'bình thuận'
                                : day === 6
                                ? 'trà vinh'
                                : day === 7
                                ? 'bình phước'
                                : 'đà lạt'}
                        </th>
                        {day === 7 && (
                            <th className="justify-center flex-1 flex items-center w-[90px] px-[2px] py-[6px] capitalize text-[12px] border-[1px] border-[#fff]">
                                hậu giang
                            </th>
                        )}
                    </tr>
                </thead>

                <tbody>
                    {kqxsMN?.map((e, i) => (
                        <tr key={i} className="bg-[#f0f1f4] flex grid-flow-col text-[12px]">
                            <td className="px-[2px] py-[6px] w-[50px] flex justify-center items-center border-[1px] border-[#fff]">{`${
                                i !== 8 ? `Giải ${8 - i}` : 'ĐB'
                            }`}</td>
                            <td
                                className={`flex flex-1 flex-col gap-[6px] items-center justify-center w-[90px] px-[2px] py-[6px] col-span-2 border-[1px] border-[#fff] ${
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
                                className={`flex flex-1 flex-col gap-[6px] items-center justify-center w-[90px] px-[2px] py-[6px] col-span-2 border-[1px] border-[#fff] ${
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
                            {day === 7 && (
                                <td
                                    className={`flex flex-1 flex-col gap-[6px] items-center justify-center w-[90px] px-[2px] py-[6px] col-span-2 border-[1px] border-[#fff] ${
                                        i === 0 || i === 8
                                            ? 'text-[14px] text-[#f02b2b] font-[650]'
                                            : 'text-[#000] font-[600]'
                                    }`}
                                >
                                    {e?.hg
                                        ? e?.hg?.map((el, ii) => (
                                              <div className="w-[100%] flex justify-center" key={ii}>
                                                  {el ? (
                                                      el
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

export default TableKqxsMN;
