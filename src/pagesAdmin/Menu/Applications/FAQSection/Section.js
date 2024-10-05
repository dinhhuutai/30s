import { BsBoxes } from "react-icons/bs";



function Section() {
    return (
        <div>
            <div className="p-[20px] bg-[#F7F9FA] flex items-center gap-[20px]">
                <div className="text-[26px] h-[50px] text-[#858080] w-[50px] box-shadow-admin-path rounded-[4px] bg-[#fff] flex items-center justify-center"><BsBoxes /></div>
                <h1 className="text-[20px] text-[#5a5757]">Application Section</h1>
            </div>

        </div>
    );
}

export default Section;