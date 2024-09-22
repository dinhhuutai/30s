import { AiFillHome, AiOutlineRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

function HeaderPage({ pageCurr }) {
    const navigate = useNavigate();

    return (
        <div className="text-[12px] flex items-center">
            <div
                onClick={() => navigate(config.routes.dashboard)}
                className="flex items-center cursor-pointer text-[#545b68] hover:text-[#3d424c]"
            >
                <div>
                    <AiFillHome />
                </div>
                <div className="ml-[4px] font-[480] capitalize">Trang chủ</div>
            </div>
            <div className="flex items-center mx-[10px] text-[8px] text-[#818da7]">
                <AiOutlineRight />
            </div>
            <div className="text-[#464f63] font-[500]">{pageCurr}</div>
        </div>
    );
}

export default HeaderPage;
