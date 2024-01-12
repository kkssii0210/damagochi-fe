import { Box, Button, Progress, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

export function NavBar(props) {
  const [currentPoints, setCurrentPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(50); // 전체 포인트, 초기값 0
  const navigate = useNavigate();
  const filledPercentage = (currentPoints / totalPoints) * 100;
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSocial, setIsSocial] = useState(false);
  const location = useLocation();
  function sendRefreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    console.log("리프레시 토큰: ", refreshToken);

    axios
        .get("/auth/reissue", {
          headers: { Authorization: `Bearer ${refreshToken}` },
        })
        .then((response) => {
          console.log("sendRefreshToken()의 then 실행");

          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);

          console.log("토큰들 업데이트 리프레시 토큰: ");
          console.log(response.data.refreshToken);
          setLoggedIn(true);
        })
        .catch((error) => {
          console.log("sendRefreshToken()의 catch 실행");
          localStorage.removeItem("refreshToken");

          setLoggedIn(false);
        });
  }
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken !== null) {
      axios
          .get("/member/info", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            setTotalPoints(response.data.point);
          })
          .finally(() => {
            console.log("끝----");
          });
    }
  });
  useEffect(() => {
    if (localStorage.getItem("accessToken") !== null) {
      console.log(localStorage.getItem("accessToken"));
      axios
          .get("/auth/accessToken", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((response) => {
            console.log("accessToken then 수행");
            setLoggedIn(true);
            console.log(response.data);

            if (response.data.role === "ROLE_ADMIN") {
              console.log("setIsAdmin(true) 동작");
              setIsAdmin(true);
            }

            return axios.get("/auth/isSocialMember", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
              },
            });
          })
          .then((response) => {
            console.log("isSocialMember = " + response.data);
            if (response.data) {
              setIsSocial(true);
            }
          })
          .catch((error) => {
            sendRefreshToken();
            localStorage.removeItem("accessToken");
          })
          .finally(() => {
            console.log("finally loggedIn: ", loggedIn);
            console.log("isSocial: " + isSocial);
          });
    }
    console.log("loggedIn: ", loggedIn);
  }, [location]);

  const handleClick = () => {
    // 클릭 이벤트 핸들러
    navigate("/store/item/list");
  };
  return (
      <Box
          margin="8"
          border="1px solid black"
          style={{
            marginTop: "60px",
            display: "flex",
            border: "0px solid navy",
            width: "100%",
            height: "auto",
            justifyContent: "space-evenly",
            alignItems: "center", // Align items vertically in the center
          }}
      >
        <Button variant="ghost" size="lg" onClick={() => navigate("/")}>
          Home
        </Button>
        <Box
            padding="4"
            borderWidth="1px"
            borderRadius="lg"
            onClick={handleClick}
            cursor="pointer"
        >
          <Text mb="8px">내 포인트: {totalPoints}</Text>
        </Box>
      </Box>
  );
}
export default NavBar;
