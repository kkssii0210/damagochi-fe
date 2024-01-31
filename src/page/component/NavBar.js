import {
  Box,
  Button,
  Card,
  CardBody,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  Flex,
  Image,
  Stack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { getKakaoLogoutLink } from "../api/kakaoApi";
import nav from "../../TutorialPage.module.css";
import fireMong from "../../다큼.gif";

import Step3Damagochi from "../../사춘기.gif";
import { NavLink } from "react-router-dom";

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
  const [size, setSize] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClickDrawer = (newSize) => {
    setSize(newSize);
    onOpen();
  };

  const sizes = ["sm"];

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
    <Box border="0px solid yellow" ml="1%" mt={8}>
      {sizes.map((size) => (
        <Button
          onClick={() => handleClickDrawer(size)}
          key={size}
          colorScheme={"purple"}
        >
          {/*<FontAwesomeIcon*/}
          {/*  icon={faPlay}*/}
          {/*  size="xl"*/}
          {/*  style={{ color: "#ffef42" }}*/}
          {/*/>*/}
          {/*{"  "}*/}
          {/*Start !*/}
          <FontAwesomeIcon icon={faBars} size="xl" />
        </Button>
      ))}

      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size={size}>
        <DrawerContent colorScheme="white">
          <DrawerCloseButton color={"hotpink"} border={"2px solid hotpink"} />
          <DrawerBody className={nav.status1} color="white">
            <Card
              m="10%"
              w="85%"
              h={loggedIn ? "90%" : "60%"}
              backgroundColor="rgba(255, 255, 255, 0.5)"
            >
              <Text
                textAlign="Center"
                fontSize="4rem"
                fontFamily="DungGeunMo"
                color={"rebeccapurple"}
                fontWeight={"bold"}
              >
                다마고찌
              </Text>

              {/*{loggedIn && (*/}
              <CardBody
                display={"flex"}
                justifyContent={"center"}
                h={"140px"}
                border="0px solid green"
              >
                <Image w={"50%"} src={Step3Damagochi} />
              </CardBody>
              <Stack
                w="80%"
                m="10%"
                mt="10%"
                direction={["column", "row"]}
                display="flex"
                justifyContent="space-evenly"
              >
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  border="0px solid purple"
                  // onClick={handleClick}
                  // cursor="pointer"
                >
                  <Text textAlign="center" fontSize="1em">
                    💰 나의 보유 포인트 : {totalPoints}
                  </Text>
                  {/*<Progress*/}
                  {/*  value={filledPercentage}*/}
                  {/*  colorScheme={filledPercentage > 50 ? "green" : "yellow"}*/}
                  {/*/>*/}
                </Box>
              </Stack>
              <Stack
                variant="ghost"
                border="0px solid white"
                w="80%"
                marginInline="10%"
                flexDirection="column"
              >
                {!loggedIn && (
                  <VStack>
                    <Text>로그인 후 다마고찌를 시작해보세요 !</Text>
                    <Button
                      color={"hotpink"}
                      border={"3px solid pink"}
                      bg={"white"}
                      mb={10}
                      w={"100%"}
                    >
                      <NavLink to={"/login"}>로그인 하러 가기</NavLink>
                    </Button>
                  </VStack>
                )}
                <Button
                  bg={"#9F60B8"}
                  color={"white"}
                  _hover={{
                    bg: "#7B4A8F",
                    color: "white",
                  }}
                  size="lg"
                  onClick={() => navigate("/")}
                  mb={loggedIn ? "none" : "100px"}
                >
                  🏠 홈
                </Button>

                {loggedIn && (
                  <Button
                    bg={"#9F60B8"}
                    color={"white"}
                    _hover={{
                      bg: "#7B4A8F",
                      color: "white",
                    }}
                    mt="30px"
                    size="lg"
                    onClick={() => navigate("/MongStatusInfo")}
                  >
                    ℹ️ 나의 다마고찌 정보
                  </Button>
                )}
                {loggedIn && (
                  <Button
                    bg={"#9F60B8"}
                    color={"white"}
                    _hover={{
                      bg: "#7B4A8F",
                      color: "white",
                    }}
                    mt="30px"
                    size="lg"
                    onClick={() => navigate("management")}
                  >
                    {" "}
                    😺 다마고찌 키우기
                  </Button>
                )}
                {loggedIn && (
                  <Button
                    bg={"#9F60B8"}
                    color={"white"}
                    _hover={{
                      bg: "#7B4A8F",
                      color: "white",
                    }}
                    mt="30px"
                    size="lg"
                    onClick={() => navigate("/battle")}
                  >
                    🔥 배틀 시작 🔥
                  </Button>
                )}
                {loggedIn && (
                  <Button
                    bg={"#9F60B8"}
                    color={"white"}
                    _hover={{
                      bg: "#7B4A8F",
                      color: "white",
                    }}
                    mt="30px"
                    size="lg"
                    onClick={() => navigate("store/item/list")}
                  >
                    🛒 상점
                  </Button>
                )}
              </Stack>

              {/*로그인 상태에서 -- 로그아웃*/}
              {loggedIn && (
                <Flex justify={"center"}>
                  <Button
                    mt="50px"
                    mb="20px"
                    color={"hotpink"}
                    border={"3px solid pink"}
                    bg={"white"}
                    w={"35%"}
                    onClick={handleLogout}
                    leftIcon={<FontAwesomeIcon icon={faRightFromBracket} />}
                  >
                    log out
                  </Button>
                </Flex>
              )}
            </Card>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default NavBar;
