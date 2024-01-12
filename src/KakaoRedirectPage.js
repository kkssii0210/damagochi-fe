import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { getAccessToken, getMemberWithAccessToken } from "./page/api/kakaoApi";
import { useNavigate } from "react-router";

const KakaoRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get("code");
  const navigate = useNavigate();
  useEffect(() => {
    getAccessToken(authCode).then((res) => {
      console.log(res);
      getMemberWithAccessToken(res.data)
        .then((memberInfo) => {
          console.log("--------------");
          console.log(memberInfo);
          localStorage.setItem("accessToken", memberInfo.accessToken);
          localStorage.setItem("refreshToken", memberInfo.refreshToken);
        })
        .finally(() => {
          navigate("/");
        });
    });
  }, [authCode]);
  return (
    <div>
      <div>Kakao Login Redirect</div>
      <div>{authCode}</div>
    </div>
  );
};
export default KakaoRedirectPage;
