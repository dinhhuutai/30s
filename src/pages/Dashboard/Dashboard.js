import axios from 'axios';

function Dashboard() {
    // URL của API cung cấp kết quả xổ số
    const apiUrl = 'https://xoso188.net/api/front/open/lottery/history/list/5/miba'; // Thay thế bằng URL API thực tế

    async function fetchLotteryResults() {
        try {
            const response = await axios.get(apiUrl);
            return response.data; // Giả sử dữ liệu trả về là dạng JSON
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy kết quả xổ số:', error);
            throw error;
        }
    }

    // Gọi hàm để lấy kết quả và in ra kết quả
    fetchLotteryResults().then((results) => {
        console.log('Kết quả xổ số:', results);
    });
    return <div>Dashboard</div>;
}

export default Dashboard;
