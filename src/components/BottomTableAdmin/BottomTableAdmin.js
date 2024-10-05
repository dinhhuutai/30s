import { useState } from 'react';
import { BsArrowLeft, BsArrowRight, BsThreeDots  } from 'react-icons/bs';

function BottomTableAdmin({ setCurrentPage, show, currentPage, totalItems }) {

    const [isPrev, setIsPrev] = useState(true);
    const [isNext, setIsNext] = useState(false);

    const handlePrev = (e) => {
        const page = currentPage === 0 ? 0 : currentPage - 1;
        setCurrentPage(page);
        if (page === 0) {
            setIsPrev(true);
        } else {
            setIsPrev(false);
        }
        if (page === Math.floor(totalItems / show)) {
            setIsNext(true);
        } else {
            setIsNext(false);
        }
    };

    const handleNext = (e) => {
        const page =
            currentPage === Math.floor(totalItems / show)
                ? Math.floor(totalItems / show)
                : currentPage + 1;

        setCurrentPage(page);
        if (page === 0) {
            setIsPrev(true);
        } else {
            setIsPrev(false);
        }
        if (page === Math.floor(totalItems / show)) {
            setIsNext(true);
        } else {
            setIsNext(false);
        }
    };
    
    const handleNum = (page) => {
        if (currentPage !== page) {
            setCurrentPage(page);
        }
        if (page === 0) {
            setIsPrev(true);
        } else {
            setIsPrev(false);
        }
        if (page === Math.floor(totalItems / show)) {
            setIsNext(true);
        } else {
            setIsNext(false);
        }
    };



    return (
        <div className="mt-[20px] flex justify-between pb-[10px]">
            <div className="text-[#484646]">
                {`Showing ${(Number(currentPage) * Number(show)) + 1} to ${(Number(currentPage) * Number(show)) + Number(show)} of ${totalItems} entries`}
            </div>
            <div className="flex items-center">
                <button onClick={handlePrev} className={`${isPrev && 'opacity-[.5] cursor-no-drop'} w-[30px] h-[30px] border-[1px] border-solid border-[#958e8e] cursor-pointer rounded-l-[2px] flex justify-center items-center`}>
                    <BsArrowLeft />
                </button>
                {[0, 1, 2, 3, 4].map((element, index) => {
                    if (Math.floor(totalItems / show) + 1 <= 5) {
                        if (index + 1 <= Math.floor(totalItems / show) + 1) {
                            return (
                                <button
                                    onClick={() => handleNum(element)}
                                    key={index}
                                    className={`${index === currentPage && "text-[#fff] bg-[#3f6ad8]"} w-[30px] h-[30px] border-[1px] border-solid border-[#958e8e] cursor-pointer flex justify-center items-center`}
                                >
                                    {element + 1}
                                </button>
                            );
                        }
                    } else {
                        if (
                            (index === 3 &&
                                currentPage + 1 < Math.floor(totalItems / show) + 1 - 2) ||
                            (index === 1 && currentPage + 1 >= Math.floor(totalItems / show) + 1 - 2)
                        ) {
                            return (
                                <button className="w-[30px] h-[30px] border-[1px] border-solid border-[#958e8e] cursor-pointer flex justify-center items-end">
                                    <BsThreeDots  />
                                </button>
                            );
                        } else if (
                            (index === 4 &&
                                currentPage + 1 < Math.floor(totalItems / show) + 1 - 2) ||
                            (index === 0 && currentPage + 1 >= Math.floor(totalItems / show) + 1 - 2)
                        ) {
                            if (index === 0) {
                                return (
                                    <button onClick={() => handleNum(0)} value={1} className="w-[30px] h-[30px] border-[1px] border-solid border-[#958e8e] cursor-pointer flex justify-center items-center">
                                        1
                                    </button>
                                );
                            } else {
                                return (
                                    <button
                                        onClick={() => handleNum(Math.floor(totalItems / show))}
                                        className="w-[30px] h-[30px] border-[1px] border-solid border-[#958e8e] cursor-pointer flex justify-center items-center"
                                    >
                                        {Math.floor(totalItems / show) + 1}
                                    </button>
                                );
                            }
                        } else {
                            if (currentPage + 1 === 1) {
                                return (
                                    <button
                                        onClick={() => handleNum(currentPage + element)}
                                        className={`${currentPage + 1 + element === currentPage + 1 && "text-[#fff] bg-[#3f6ad8]"} w-[30px] h-[30px] border-[1px] border-solid border-[#958e8e] cursor-pointer flex justify-center items-center` }
                                    >
                                        {currentPage + 1 + element}
                                    </button>
                                );
                            } else if (currentPage + 1 >= Math.floor(totalItems / show) + 1 - 2) {
                                return (
                                    <button
                                        onClick={() =>
                                            handleNum(Math.floor(totalItems / show) + element - 4)
                                        }
                                        className={`${Math.floor(totalItems / show) + 1 + element - 4 === currentPage + 1 && "text-[#fff] bg-[#3f6ad8]"} w-[30px] h-[30px] border-[1px] border-solid border-[#958e8e] cursor-pointer flex justify-center items-center`}
                                    >
                                        {Math.floor(totalItems / show) + 1 + element - 4}
                                    </button>
                                );
                            } else {
                                return (
                                    <button
                                        onClick={() => handleNum(currentPage + element - 1)}
                                        className={
                                            `${currentPage + 1 + element - 1 === currentPage + 1 && "text-[#fff] bg-[#3f6ad8]"} w-[30px] h-[30px] border-[1px] border-solid border-[#958e8e] cursor-pointer flex justify-center items-center`
                                        }
                                    >
                                        {currentPage + 1 + element - 1}
                                    </button>
                                );
                            }
                        }
                    }
                })}
                <button onClick={handleNext} className={`${isNext && 'opacity-[.5] cursor-no-drop'} w-[30px] h-[30px] border-[1px] border-solid border-[#958e8e] cursor-pointer rounded-r-[2px] flex justify-center items-center`}>
                    <BsArrowRight />
                </button>
            </div>
        </div>
    );
}

export default BottomTableAdmin;
