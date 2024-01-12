import { getKakaoLoginLink } from "./page/api/kakaoApi";
import kakaoLoginImage from "./kakao_login_medium_narrow.png";
import { Link } from "@chakra-ui/react";
const KakaoLoginComponent = () => {
  const link = getKakaoLoginLink();
  return (
    <Link href={link}>
      <img
        src={kakaoLoginImage} // 이미지 경로
        alt="로그인 버튼"
        style={{ cursor: "pointer" }} // 마우스 커서를 포인터로 변경
      />
    </Link>
  );
};
export default KakaoLoginComponent;
