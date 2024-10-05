import { AiOutlineClose } from 'react-icons/ai';

function ModalContent({ setModalContent, selectorContent }) {
    return (
        <div
            onClick={() => {
                setModalContent(false);
            }}
            className="fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 z-[9999]"
        >
            <div className="top-0 absolute left-0 right-0 bottom-0 bg-[#000] opacity-[.4] z-[99]"></div>
            <div className="fixed flex justify-center overflow-y-auto overflow-x-hidden top-0 left-0 right-0 bottom-0 pb-[60px] opacity-[1] z-[999]">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#fff] animate-modalDownSlide text-[12px] lg:w-[700px] w-[370px] h-fit pb-[26px] shadow-xl rounded-[6px] mt-[30px] py-[14px]"
                >
                    <div className="flex justify-between items-center pb-[12px] border-b-[1px] border-solid border-[#f0f0f0] px-[26px]">
                        <h1 className="text-[14px] capitalize text-[#000] font-[620]">{`Nội dung STT #${selectorContent.index}`}</h1>
                        <div onClick={() => setModalContent(false)} className="cursor-pointer">
                            <AiOutlineClose />
                        </div>
                    </div>

                    <div className="mt-[16px] px-[26px] flex">
                        <textarea
                            className="rounded-[4px] flex-1 outline-none border-[1px] border-solid border-[#bdc3d1] text-[12px] py-[4px] px-[8px]"
                            rows={14}
                            cols={60}
                            value={selectorContent.content}
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalContent;
