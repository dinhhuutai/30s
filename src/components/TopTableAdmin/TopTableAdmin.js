import { BsSearch } from 'react-icons/bs';
import Alert from '../Alert';

function TopTableAdmin({
    handleDelete,
    handleSearch,
    setShow,
    setSearch,
    search,
    totalAddToday,
    show,
    setCurrentPage,
    listArtist,
    listGenre,
    setSelectArtist,
    setSelectGenre,
}) {
    const handleShow = (e) => {
        setShow(e.target.value);
        setCurrentPage(0);
    };

    const handleArtist = (e) => {
        setSelectArtist(e.target.value);
        setCurrentPage(0);
    };

    const handleGenre = (e) => {
        setSelectGenre(e.target.value);
        setCurrentPage(0);
    };

    return (
        <div className="flex justify-between items-center gap-[20px]">
            <div className="flex items-center gap-[10px]">
                <div>
                    <label>Show</label>
                    <select
                        onChange={handleShow}
                        className="border-solid border-[1px] rounded-[2px] ml-[4px] outline-none"
                    >
                        <option selected={show === 5} value="5">
                            5
                        </option>
                        <option selected={show === 10} value="10">
                            10
                        </option>
                        <option selected={show === 25} value="25">
                            25
                        </option>
                        <option selected={show === 50} value="50">
                            50
                        </option>
                        <option selected={show === 100} value="100">
                            100
                        </option>
                    </select>
                </div>
                <div>
                    <label>Thêm hôm nay: </label>
                    <span>{totalAddToday}</span>
                </div>
            </div>
            <div className={`flex flex-1 items-center gap-[10px] ${listArtist ? 'justify-between' : 'justify-end'}`}>
                {listArtist && (
                    <div>
                        <label>Artist: </label>
                        <select
                            onChange={handleArtist}
                            className="border-solid border-[1px] rounded-[2px] ml-[4px] outline-none"
                        >
                            <option value="">Tất cả</option>
                            {listArtist?.map((artist, index) => {
                                return <option key={index} value={`${artist._id}`}>{`${artist.name}`}</option>;
                            })}
                        </select>
                    </div>
                )}
                {listGenre && (
                    <div>
                        <label>Genre: </label>
                        <select
                            onChange={handleGenre}
                            className="border-solid border-[1px] rounded-[2px] ml-[4px] outline-none scrollbar-admin-sidebar"
                        >
                            <option value="">Tất cả</option>
                            {listGenre?.map((genre, index) => {
                                return <option key={index} value={`${genre._id}`}>{`${genre.name}`}</option>;
                            })}
                        </select>
                    </div>
                )}
                <div className="flex items-center">
                    <label>Search: </label>
                    <div className="flex items-center relative ml-[6px] border-[1px] border-[#888585] border-solid rounded-[4px] overflow-hidden">
                        <input
                            placeholder="Name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-[180px] outline-none pl-[8px] pr-[40px] py-[2px]"
                            type="text"
                            name="search"
                        />
                        <button
                            onClick={handleSearch}
                            className="absolute right-0 px-[10px] cursor-pointer h-full flex items-center border-l-[1px] border-l-solid border-l-[#cfcaca] bg-[#f2f1f1] hover:opacity-[.9] active:opacity-[.7]"
                        >
                            <BsSearch className="" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopTableAdmin;
