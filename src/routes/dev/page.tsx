import IconHeart from '@/assets/icon-heart.svg?react';
import { useEffect, useState } from 'react';
import Chart from './components/Chart';
import LineChart from './components/LineChart';
import { useCommonModalStore, useLoginModalStore } from '@/store/store';
import productsAPI from '@/apis/productsAPI';
import followsAPI from '@/apis/followsAPI';
import postsAPI from '@/apis/postsAPI';
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
    async function fetchFollows() {
      try {
        const follows = new followsAPI();
        const myFollowers = await follows.myFollowers();
        const myFollowing = await follows.myFollowing();

        setUserProducts(myFollowers);
        setClubProducts(myFollowing);

        // 콘솔에서도 확인할 수 있게 로깅
        console.log('내 팔로워:', myFollowers);
        console.log('내 팔로잉:', myFollowing);
      } catch (error) {
        console.error('팔로윙 팔로워 로딩 실패:', error);
      }
    }
    async function testFollowUnfollow() {
      const follows = new followsAPI();
      try {
        console.log('userId=2로 팔로우 요청 중...');
        const followResponse = await follows.follow(105);
        console.log('팔로우 성공:', followResponse);

        console.log('userId=2로 언팔로우 요청 중...');
        const unFollowResponse = await follows.unFollow(105);
        console.log('언팔로우 성공:', unFollowResponse);
      } catch (error) {
        console.error('팔로우/언팔로우 테스트 실패:', error);
      }
    }

    async function testTargetUserFollows() {
      const follows = new followsAPI();
      const targetUserId = 2;
      try {
        console.log('userId=2로 팔로잉 조회 중...');
        const targetUserFollowing = await follows.targetUserFollowing(
          targetUserId
        );
        console.log('팔로잉 조회 성공:', targetUserFollowing);

        console.log('userId=2로 팔로우 조회 중...');
        const targetUserFollowers = await follows.targetUserFollowers(
          targetUserId
        );
        console.log('팔로우 조회 성공:', targetUserFollowers);
      } catch (error) {
        console.error('팔로우/언팔로우 조회 테스트 실패:', error);
      }
    }

    async function testTargetUserFollowsStatus() {
      const follows = new followsAPI();
      const targetUserId = 2;
      try {
        console.log(`${targetUserId}=2로 팔로잉 상태 조회 중...`);
        const targetUserFollowingStatus =
          await follows.targetUserFollowingStatus(targetUserId);
        console.log('팔로잉 상태 조회 성공:', targetUserFollowingStatus);
      } catch (error) {
        console.error('팔로잉 상태 조회 테스트 실패:', error);
      }
    }

    async function fetchPosts() {
      const posts = new postsAPI();
      try {
        console.log('전체포스트 가져오기중...');
        const publicPosts = await posts.public();
        console.log('전체 포스트:', publicPosts);

        console.log('내 클럽 포스트 가져오기중...');
        const clubPosts = await posts.myClub();
        console.log('내 클럽 포스트:', clubPosts);
      } catch (error) {
        console.log('포스트 가져오기 실패: ', error);
      }
    }

    fetchProducts();
    fetchFollows();
    testFollowUnfollow();
    testTargetUserFollows();
    testTargetUserFollowsStatus();
    fetchPosts();
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
