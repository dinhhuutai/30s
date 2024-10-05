import { BsSearch, BsChevronDown, BsList } from 'react-icons/bs';

function HeaderSearch() {
    return (
        <div className="flex items-center h-full gap-[24px]">
            <div className="text-[26px] text-[#3e5cb1] cursor-pointer">
                <BsList />
            </div>
            <div className="text-[#3e5cb1] text-[12px] rotate p-[8px] rotateZ-90deg bg-[#EBECED] rounded-[50%] cursor-pointer">
                <BsSearch />
            </div>
            <div className="flex items-center cursor-pointer">
                <span className="text-[12px] text-[#fff] flex justify-center items-center font-[600] h-[14px] w-[14px] rounded-[50%] bg-[#D92550]">
                    4
                </span>
                <span className="text-[12px] px-[6px] text-[#6d6f71]">Settings</span>
                <span className="text-[12px] text-[#979A9E]">
                    <BsChevronDown />
                </span>
            </div>
        </div>
    );
}

export default HeaderSearch;
