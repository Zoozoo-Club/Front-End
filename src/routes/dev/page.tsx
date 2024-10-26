import IconHeart from '@/assets/icon-heart.svg?react';
import { useEffect, useState } from 'react';
import Chart from './components/Chart';
import LineChart from './components/LineChart';
import { useCommonModalStore, useLoginModalStore } from '@/store/store';
import productsAPI from '@/apis/productsAPI';
//테스트용 페이지
export default function Dev() {
  const { closeModal, openModal } = useCommonModalStore();
  const [userProducts, setUserProducts] = useState([]);
  const [clubProducts, setClubProducts] = useState([]);
  const { openModal: login } = useLoginModalStore();

  const handleModal = () => {
    openModal('title', '이런식으로 모달을 사용하면 됩니다.', closeModal);
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = new productsAPI();
        const userRecommended =
          await products.recommendedProductsByUserProfit();
        const clubRecommended =
          await products.recommendedProductsByClubProfit();

        setUserProducts(userRecommended);
        setClubProducts(clubRecommended);

        // 콘솔에서도 확인할 수 있게 로깅
        console.log('사용자 추천 상품:', userRecommended);
        console.log('클럽 추천 상품:', clubRecommended);
      } catch (error) {
        console.error('상품 로딩 실패:', error);
      }
    }

    fetchProducts();
  }, []);
  return (
    <div>
      <button onClick={() => login()}>로그인!</button>
      <p>test page</p>
      <p>
        <span> svg 넣기 :</span>
        <IconHeart
          width={100}
          height={100}
          fill={'#2cffd1'}
          stroke={'#2cffd1'}
        />
      </p>
      <button className="btn border m-2 p-1" onClick={handleModal}>
        모달 버튼
      </button>
      <div>
        <p>chart example </p>
        <p>Pie chart</p>
        <Chart />
        <p>Line chart</p>
        <LineChart />
        <p>button shadcn</p>
        {/* className으로 색상및 디자인 변경 가능합니다. */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          버튼버튼
        </button>
      </div>
    </div>
  );
}
