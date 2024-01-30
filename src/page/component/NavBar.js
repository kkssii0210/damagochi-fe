import {
  Box,
  Button,
  Drawer, DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Progress,
  Text, useDisclosure,
  useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faStore } from "@fortawesome/free-solid-svg-icons";
import KakaoLoginComponent from "../../KakaoLoginComponent";
import { getKakaoLogoutLink } from "../api/kakaoApi";

export function NavBar(props) {
  const [currentPoints, setCurrentPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(50); // 전체 포인트, 초기값 0
  const navigate = useNavigate();
  const filledPercentage = (currentPoints / totalPoints) * 100;
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSocial, setIsSocial] = useState(false);
  const location = useLocation();
  const toast = useToast();
  const [size, setSize] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClickDrawer = (newSize) => {
    setSize(newSize)
    onOpen()
  }

  const sizes = [ 'full']

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
    if (localStorage.getItem("accessToken")) {
      console.log("----" + localStorage.getItem("accessToken"));
      axios
        .get("/auth/isSocialMember", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => {
          if (response.data) {
            console.log("isSocialMember = " + response.data);
            // 소셜 회원일 경우의 로직
            setIsSocial(true);
            // 소셜 토큰 검증 로직
            setLoggedIn(true);
          } else {
            // 소셜 회원이 아닐 경우의 로직
            setIsSocial(false);
            // 기존 토큰 검증 로직
            axios
              .get("/auth/accessToken", {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "accessToken",
                  )}`,
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
              });
          }
        })
        .catch((error) => {
          // 오류 처리 로직
          sendRefreshToken();
          localStorage.removeItem("accessToken");
        })
        .finally(() => {
          console.log("finally loggedIn: ", loggedIn);
          console.log("isSocial: " + isSocial);
        });
    }
    console.log("loggedIn: ", loggedIn);
  }, [location]); // 의존성 배열

  const handleClick = () => {
    // 클릭 이벤트 핸들러
    navigate("/store/item/list");
  };

  function handleLogout() {
    console.log("handleLogout");
    // 소셜 로그인 사용자인 경우 카카오 로그아웃 API 호출
    const handleSocialLogout = () => {
      axios
        .post(
          "https://kapi.kakao.com/v1/user/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
        )
        .then(() => {
          console.log("카카오 로그아웃 성공");
          window.location.href = getKakaoLogoutLink();
        })
        .catch((error) => {
          console.error("카카오 로그아웃 실패", error);
        });
    };

    axios
      .get("/auth/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        console.log("!!!!!!!!!!!!!!!!!!!");
        // 소셜 로그인 사용자인 경우 카카오 로그아웃 진행
        if (isSocial) {
          console.log("카카오에 신호보내서 토큰만료시키기.");
          handleSocialLogout();
        }
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        if (isAdmin) {
          setIsAdmin(false);
        }
        setLoggedIn(false);
        toast({
          description: "성공적으로 로그아웃 되었습니다",
          status: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.status === 302) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setLoggedIn(false);
          if (isAdmin) {
            setIsAdmin(false);
          }
          // Open a new popup window for the logout URL
          const popupWindow = window.open(
            "http://nid.naver.com/nidlogin.logout",
            "_blank",
          );
          if (popupWindow) {
            setTimeout(() => {
              popupWindow.close();
            }, 0); //바로 닫기
          }
          toast({
            description: "성공적으로 로그아웃 되었습니다",
            status: "success",
          });
        } else {
          console.log(
            "로컬스토리지 refreshToken 상태: ",
            localStorage.getItem("refreshToken"),
          );
          console.log(
            "로컬스토리지 accessToken 상태: ",
            localStorage.getItem("accessToken"),
          );
          toast({
            description: "로그아웃 도중 에러가 발생했습니다",
            status: "error",
          });
        }
      })
      .finally(() => {
        console.log("로그아웃 finally");
        navigate("/");
        window.location.reload();
      });
  }

  return (
    <Box border="0px solid yellow">
      {sizes.map((size) => (
        <Button
          onClick={() => handleClickDrawer(size)}
          key={size}
          m={4}
        ></Button>
      ))}

      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size={size}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Button mt="30px" color="white" variant="ghost" size="lg" onClick={() => navigate("/")}>
              Home
            </Button>
            {/*포인트 표시*/}
            <Box
              padding="4"
              borderWidth="1px"
              borderRadius="lg"
              onClick={handleClick}
              cursor="pointer"
            >
              <Text mb="8px" textAlign="center">
                <FontAwesomeIcon icon={faStore} fontSize="large" /> 내 포인트 :
                {totalPoints}
              </Text>
              <Progress
                value={filledPercentage}
                colorScheme={filledPercentage > 50 ? "green" : "red"}
              />
              {/*로그인 상태에서 -- 로그아웃*/}
              {loggedIn && (
                <Button
                  variant="ghost"
                  size="lg"
                  fontFamily="Constantia"
                  border="0px solid red"
                  _hover={{ bg: "none" }}
                  onClick={handleLogout}
                  leftIcon={<FontAwesomeIcon icon={faRightFromBracket} />}
                >
                  log out
                </Button>
                //   <KakaoLogoutComponent/>
              )}
            </Box>
            <Box>
              <KakaoLoginComponent />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
export default NavBar;
