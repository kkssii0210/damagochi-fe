import React, { useEffect, useRef, useState, useContext } from "react";
import fireImage from "./불공격.gif";
import waterImage from "./물공격.png";
import attackedImage from "./피격몽.gif";
import "./AttackAnimation.css";
import axios from "axios";
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Inventory } from "./page/management/Inventory";
import { MapListContext } from "./MapListContext";
import * as PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const DivWithBackground = styled.div`
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${(props) => props.backgroundImage});
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.5;
    z-index: -1;
  }
`;
function ScrollableBox({ battleLog }) {
  const boxRef = useRef();

  useEffect(() => {
    // 스크롤 위치를 항상 가장 아래로 설정
    boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [battleLog]); // battleLog이 변경될 때마다 호출

  return (
    <div
      ref={boxRef}
      style={{
        border: "1px solid black",
        width: "100%",
        height: "70%",
        overflow: "auto",
      }}
    >
      {battleLog.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </div>
  );
}

function HealthBar({ health }) {
  // 체력바 스타일을 계산하는 함수
  const calculateHealthBarStyle = () => {
    const percentage = (health / 100) * 100;
    return {
      width: `${percentage}%`,
      backgroundColor:
        percentage > 70 ? "green" : percentage > 30 ? "yellow" : "red",
      height: "10px",
      borderRadius: "md",
      transition: "width 0.3s ease",
    };
  };

  return (
    <Box w="100%" bg="gray.300" borderRadius="md" overflow="hidden">
      <Box style={calculateHealthBarStyle()} bg="green.500" h="100%" />
    </Box>
  );
}

export function Ba({ message, roomId }) {
  const toast = useToast();
  const navigate = useNavigate();
  const [userA, setUserA] = useState(null);
  const [userB, setUserB] = useState(null);
  const [userName, setUserName] = useState("");

  const [imageModuleA, setImageModuleA] = useState(null);
  const [imageModuleB, setImageModuleB] = useState(null);
  const [attackedImageModuleA, setAttackedImageModuleA] = useState(null);
  const [attackedImageModuleB, setAttackedImageModuleB] = useState(null);

  const [nowTurn, setNowTurn] = useState("");
  const [totalTurn, setTotalTurn] = useState(0);

  const [mongAHp, setMongAHp] = useState(0);
  const [mongBHp, setMongBHp] = useState(0);

  const [attackBuffA, setAttackBuffA] = useState(1);
  const [attackBuffB, setAttackBuffB] = useState(1);

  const [showInventory, setShowInventory] = useState(false);

  const [useItem, setUseItem] = useState("");

  const [reload, setReload] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [sessionIds, setSessionIds] = useState({ A: null, B: null });
  //배틀 종료시 필요한 상태들
  const [battleFinished, setBattleFinished] = useState(false);
  const [winner, setWinner] = useState(null);
  //피격상태
  const [attacked, setAttacked] = useState(false);
  // Attribute에 따라서 다른 이미지를 선택
  let attributeImage = null;

  // const info = JSON.parse(message);
  const info = message;
  const userAMongId = info.mongAId;
  const userBMongId = info.mongBId;

  const mongAMaxHp = 100;
  const mongBMaxHp = 100;
  //보유한 맵의 List불러오기
  const { mapList } = useContext(MapListContext);
  let firstMapUrl = mapList[0] || "";

  const [battleLog, setBattleLog] = useState("게임 시작!!");
  const [endMessage, setEndMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleBattleRoomsMessage = (message) => {
    const receivedMessage = message;
    console.log("Received message:", receivedMessage);
    console.log("mapList",mapList);
    console.log(firstMapUrl);
    // 원하는 작업 수행
    // 예를 들면, 상태 업데이트 등
    if (receivedMessage.battleLog) {
      setBattleLog(battleLog + "\n" + receivedMessage.battleLog);
    }

    if (receivedMessage.mongAId === userAMongId) {
      setMongAHp(receivedMessage.healthA);
      setMongBHp(receivedMessage.healthB);

      if (receivedMessage.healthB <= 0) {
        if (userName === userA.memberId) {
          setEndMessage("승리!!");
        } else if (userName === userB.memberId) {
          setEndMessage("패배!!");
        }
        setModalOpen(true);
      }

      if (receivedMessage.attackBuff) {
        setAttackBuffA(receivedMessage.attackBuff);
      }
    }

    if (receivedMessage.mongAId === userBMongId) {
      setMongBHp(receivedMessage.healthA);
      setMongAHp(receivedMessage.healthB);

      if (receivedMessage.healthB <= 0) {
        if (userName === userA.memberId) {
          setEndMessage("패배!!");
        } else if (userName === userB.memberId) {
          setEndMessage("승리!!");
        }
        setModalOpen(true);
      }

      if (receivedMessage.attackBuff) {
        setAttackBuffB(receivedMessage.attackBuff);
      }
    }

    if (receivedMessage.turn) {
      setNowTurn(receivedMessage.turn);
    }
    setNowTurn(receivedMessage.turn);
    if (receivedMessage.totalTurn) {
      setTotalTurn(receivedMessage.totalTurn);

      if (totalTurn >= 30) {
        setEndMessage("무승부!!");
        setModalOpen(true);
      }
    }

    // if ((totalTurn >= 30 || mongAHp <= 0 || mongBHp <= 0) && userA && userB) {
    //
    //
    //   if (mongAHp <= 0) {
    //     if (userName === userA.memberId) {
    //       console.log("배틀 종료 (패배)");
    //       setEndMessage("배틀 종료 (패배)")
    //
    //     } else if (userName === userB.memberId) {
    //       console.log("배틀 죵료 (승리)")
    //       setEndMessage("배틀 종료 (승리)")
    //
    //     }
    //
    //   } else if (mongBHp <= 0) {
    //     if (userName === userA.memberId) {
    //       console.log("배틀 종료 (승리)");
    //       setEndMessage("배틀 종료 (승리)")
    //
    //     } else if (userName === userB.memberId) {
    //       console.log("배틀 죵료 (패배)")
    //       setEndMessage("배틀 종료 (패배)")
    //     }
    //
    //   } else if (totalTurn >= 30) {
    //     console.log("배틀 종료 (무승부)");
    //     setEndMessage("배틀 종료 (무승부)")
    //
    //   }
    //
    //   setModalOpen(true);
    // }

    // 배틀 종료 조건 확인
    if (receivedMessage.healthA <= 0 || receivedMessage.healthB <= 0) {
      setBattleFinished(true);
      // 체력이 남아 있는 쪽을 승리자로 설정
      if (receivedMessage.healthA > 0) {
        setWinner("A");
      } else if (receivedMessage.healthB > 0) {
        setWinner("B");
      }
    }
  };
  useEffect(() => {
    if (message && message.sessionIds) {
      setSessionIds(message.sessionIds);
    }
    axios
      .get("api/manage/mong/getUser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          userAMongId: userAMongId,
          userBMongId: userBMongId,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setUserA(data.userA);
        setUserB(data.userB);
        setUserName(data.userName);
        setNowTurn(data.userA.name);
        setMongAHp(data.userA.health);
        setMongBHp(data.userB.health);

        const loadImageModule = async () => {
          if (data.userA.evolutionLevel >= 2) {
            const imageModuleA = await import(
              `./img/${data.userA.mongCode}-${
                data.userA.evolutionLevel - 1
              }.gif`
            );
            const attackedImageModuleA = await import(
              `./img/${data.userA.mongCode}-${
                data.userA.evolutionLevel - 1
              }-1.gif`
            );
            setImageModuleA(imageModuleA.default);
            setAttackedImageModuleA(attackedImageModuleA.default);
          }

          if (data.userB.evolutionLevel >= 2) {
            const imageModuleB = await import(
              `./img/${data.userB.mongCode}-${
                data.userB.evolutionLevel - 1
              }.gif`
            );
            const attackedImageModuleB = await import(
              `./img/${data.userB.mongCode}-${
                data.userB.evolutionLevel - 1
              }-1.gif`
            );
            setImageModuleB(imageModuleB.default);
            setAttackedImageModuleB(attackedImageModuleB.default);
          }
        };

        loadImageModule();
        handleBattleRoomsMessage(message);
      });
  }, [message, modalOpen]);
  useEffect(() => {
    console.log(nowTurn);
  }, [nowTurn]);
  if (userAMongId === null || userBMongId === null) {
    return <div>로딩~</div>;
  }
  if (userA === null || userB === null) {
    return <div>로딩중...</div>;
  }
  // 기다리게 하는 promise 함수들
  function waitForAnimation(duration) {
    return new Promise((resolve) => setTimeout(resolve, duration));
  }
  function waitFor(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }
  async function handleAttackClick(user1, user2, healthA, healthB, attackBuff) {
    console.log(user1.name + "가 " + user2.name + "에게 공격");
    setIsAnimating(true); // 애니메이션 시작
    // 애니메이션 완료까지 기다림
    await waitForAnimation(2000);
    // 피격 이미지로 전환
    setAttacked(true);
    // 1초간 대기
    await waitFor(1);
    setAttacked(false);
    // 애니메이션이 끝난 후 axios 요청 수행
    try {
      const response = await axios
        .put("/api/manage/mong", {
          mongAId: user1.id,
          mongBId: user2.id,
          healthA,
          healthB,
          attackBuff,
          battleRoomId: roomId,
          sessionIds: sessionIds,
          totalTurn,
        })
        .then(() => setUseItem(false));
      // 요청 성공에 대한 처리
    } catch (error) {
      // 오류 처리
      console.error("API 요청 중 오류 발생:", error);
    } finally {
      setIsAnimating(false); // 애니메이션 상태를 false로 설정
      console.log("애니메이션 종료");
    }
  }

  function handleInvenButtonClick() {
    setShowInventory(!showInventory);
  }

  const handleInventoryClose = () => {
    setShowInventory(false);
  };

  // battle 종료
  console.log("modal : " + modalOpen);

  if (battleFinished) {
    const victoriousUser = winner === "A" ? userA : userB;
    const victoriousImage = winner === "A" ? imageModuleA : imageModuleB;

    return (
      <Center
        style={{
          backgroundImage: `url(${firstMapUrl})`, // 첫 번째 URL을 배경 이미지로 설정
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // 필요한 경우 다른 스타일을 추가합니다.
        }}
      >
        <Box
          border="1px solid green"
          display="flex"
          flexDirection="column"
          p="4"
          borderRadius="md"
          boxShadow="md"
          width="auto"
          height="auto"
        >
          <Text fontSize="xl" fontWeight="bold">
            승리자: {victoriousUser.name}
          </Text>
          <Image
            src={victoriousImage}
            alt="Victorious Mong"
            boxSize="200px"
            objectFit="cover"
            m="auto"
            my="4"
          />
          <Text fontSize="md">Level: {victoriousUser.level}</Text>
          <Text fontSize="md">Type: {victoriousUser.attribute}</Text>
        </Box>
      </Center>
    );
  } else if (userName === userA.memberId) {
    attributeImage =
      userA.attribute === "물"
        ? waterImage
        : userA.attribute === "불"
          ? fireImage
          : null;
    return (
      // <div
      //   style={{
      //     backgroundImage: `url(${firstMapUrl})`, // 첫 번째 URL을 배경 이미지로 설정
      //     backgroundSize: "cover",
      //     backgroundRepeat: "no-repeat",
      //     // 필요한 경우 다른 스타일을 추가합니다.
      //   }}
      // >
      <DivWithBackground backgroundImage={firstMapUrl}>
        <Center>
          <Flex
            display="flex"
            flexDirection="row"
            width="70%"
            height="700px"
            p="4"
            borderRadius="md"
            boxShadow="md"
            justifyContent="space-between"
          >
            <Box
              display="flex"
              width="30%"
              height="100%"
              p="2"
              borderRadius="md"
              boxShadow="sm"
              flexDirection="column"
              justifyContent="end"
            >
              <Box width="100%" height="70%" textAlign="center">
                <HealthBar health={mongAHp} />
                <Text fontSize="sm" mt="2" noOfLines={2}>
                  {mongAHp} / 100
                </Text>
                <Image
                  src={imageModuleA}
                  alt=""
                  w="70%"
                  h="70%"
                  m="auto"
                  mb="2"
                />
                <Text fontSize="lg" fontWeight="bold" noOfLines={2}>
                  {userA.name}
                </Text>
                <Badge colorScheme="red" borderRadius="full" px="2" mb="2">
                  Lv. {userA.level}
                </Badge>
                <Text fontSize="sm" noOfLines={2}>
                  Type: {userA.attribute}
                </Text>
              </Box>
              <Box>
                {isAnimating && (
                  <Image
                    src={attributeImage}
                    className="sword-animation"
                    position="absolute"
                  />
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              width="35%"
              height="100%"
              p="2"
              borderRadius="md"
              boxShadow="sm"
              flexDirection="column"
              justifyContent="space-between"
            >
              <ScrollableBox battleLog={battleLog} />

              {nowTurn === userA.name && (
                <div>
                  <Button
                    onClick={() =>
                      handleAttackClick(
                        userA,
                        userB,
                        mongAHp,
                        mongBHp,
                        attackBuffA,
                      )
                    }
                  >
                    공격
                  </Button>
                  <Button onClick={handleInvenButtonClick}>인벤토리</Button>
                  <div style={{ position: "relative" }}>
                    {showInventory && (
                      <Inventory
                        memberId={userA.memberId}
                        mystyle={{ border: "10px solid green" }}
                        onClose={handleInventoryClose}
                        onClick={(item) => {
                          console.log(item.name + "사용");
                          if (!useItem) {
                            axios
                              .put("/api/manage/mong/useItem", {
                                itemId: item.id,
                                mongAId: userA.id,
                                mongBId: userB.id,
                                healthA: mongAHp,
                                healthB: mongBHp,
                                battleRoomId: roomId,
                                sessionIds: sessionIds,
                              })
                              .then(() => setUseItem(true));
                          } else {
                            console.log("아이템은 하나만 사용 가능");
                            toast({
                              description: "아이템은 하나만 사용 가능",
                              status: "warning",
                            });
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
              )}
            </Box>
            <Box
              display="flex"
              width="30%"
              height="100%"
              p="2"
              borderRadius="md"
              boxShadow="sm"
              flexDirection="column"
            >
              <Box width="100%" height="70%" textAlign="center">
                <HealthBar health={mongBHp} />
                <Text fontSize="sm" mt="2" noOfLines={2}>
                  {mongBHp} / 100
                </Text>
                <Image
                  src={imageModuleB}
                  alt=""
                  w="70%"
                  h="70%"
                  m="auto"
                  mb="2"
                />
                <Text fontSize="lg" fontWeight="bold" noOfLines={2}>
                  {userB.name}
                </Text>
                <Badge colorScheme="blue" borderRadius="full" px="2" mb="2">
                  Lv. {userB.level}
                </Badge>
                <Text fontSize="sm" noOfLines={2}>
                  Type: {userB.attribute}
                </Text>
              </Box>
            </Box>
          </Flex>
        </Center>
        <Modal closeOnOverlayClick={false} isOpen={modalOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>{endMessage}</ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  axios.put("/api/manage/mong/battleEnd", {
                    endMessage: endMessage,
                    memberId: userA.memberId,
                  });
                  navigate("/management");
                }}
              >
                나가기
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/*</div>*/}
      </DivWithBackground>
    );
  } else {
    attributeImage =
      userB.attribute === "물"
        ? waterImage
        : userB.attribute === "불"
          ? fireImage
          : null;
    return (
      // <div
      //   style={{
      //     backgroundImage: `url(${firstMapUrl})`, // 첫 번째 URL을 배경 이미지로 설정
      //     backgroundSize: "cover",
      //     backgroundRepeat: "no-repeat",
      //     // 필요한 경우 다른 스타일을 추가합니다.
      //   }}
      // >
      <DivWithBackground backgroundImage={firstMapUrl}>
        <Center>
          <Flex
            display="flex"
            flexDirection="row"
            width="70%"
            height="700px"
            p="4"
            borderRadius="md"
            boxShadow="md"
            justifyContent="space-between"
          >
            <Box
              display="flex"
              width="30%"
              height="100%"
              p="2"
              borderRadius="md"
              boxShadow="sm"
              flexDirection="column"
              justifyContent="end"
            >
              <Box width="100%" height="70%" textAlign="center">
                <HealthBar health={mongBHp} />
                <Text fontSize="sm" mt="2" noOfLines={2}>
                  {mongBHp} / 100
                </Text>
                <Image
                  src={imageModuleB}
                  alt=""
                  w="70%"
                  h="70%"
                  m="auto"
                  mb="2"
                />
                <Text fontSize="lg" fontWeight="bold" noOfLines={2}>
                  {userB.name}
                </Text>
                <Badge colorScheme="red" borderRadius="full" px="2" mb="2">
                  Lv. {userB.level}
                </Badge>
                <Text fontSize="sm" noOfLines={2}>
                  Type: {userB.attribute}
                </Text>
              </Box>
              <Box>
                {isAnimating && (
                  <Image
                    src={attributeImage}
                    className="sword-animation"
                    position="absolute"
                  />
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              width="35%"
              height="100%"
              p="2"
              borderRadius="md"
              boxShadow="sm"
              flexDirection="column"
              justifyContent="space-between"
            >
              <ScrollableBox battleLog={battleLog} />
              {nowTurn === userB.name && (
                <div>
                  <Button
                    onClick={() =>
                      handleAttackClick(
                        userB,
                        userA,
                        mongBHp,
                        mongAHp,
                        attackBuffB,
                      )
                    }
                  >
                    공격
                  </Button>
                  <Button onClick={handleInvenButtonClick}>인벤토리</Button>

                  <div style={{ position: "relative" }}>
                    {showInventory && (
                      <Inventory
                        memberId={userB.memberId}
                        mystyle={{ border: "10px solid green" }}
                        onClose={handleInventoryClose}
                        onClick={(item) => {
                          console.log(item.name + "사용");
                          if (!useItem) {
                            axios
                              .put("/api/manage/mong/useItem", {
                                itemId: item.id,
                                mongAId: userB.id,
                                mongBId: userA.id,
                                healthA: mongBHp,
                                healthB: mongAHp,
                                battleRoomId: roomId,
                                sessionIds: sessionIds,
                              })
                              .then(() => setUseItem(true));
                          } else {
                            console.log("아이템은 하나만 사용 가능");
                            toast({
                              description: "아이템은 하나만 사용 가능",
                              status: "warning",
                            });
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
              )}
            </Box>
            <Box
              display="flex"
              width="30%"
              height="100%"
              p="2"
              borderRadius="md"
              boxShadow="sm"
              flexDirection="column"
            >
              <Box width="100%" height="70%" textAlign="center">
                <HealthBar health={mongAHp} />
                <Text fontSize="sm" mt="2" noOfLines={2}>
                  {mongAHp} / 100
                </Text>
                <Image
                  src={attacked ? attackedImageModuleA : imageModuleA}
                  alt=""
                  w="70%"
                  h="70%"
                  m="auto"
                  mb="2"
                />
                <Text fontSize="lg" fontWeight="bold" noOfLines={2}>
                  {userA.name}
                </Text>
                <Badge colorScheme="blue" borderRadius="full" px="2" mb="2">
                  Lv. {userA.level}
                </Badge>
                <Text fontSize="sm" noOfLines={2}>
                  Type: {userA.attribute}
                </Text>
              </Box>
            </Box>
          </Flex>
        </Center>
        <Modal closeOnOverlayClick={false} isOpen={modalOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>{endMessage}</ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  axios.put("/api/manage/mong/battleEnd", {
                    endMessage: endMessage,
                    memberId: userB.memberId,
                  });
                  navigate("/management");
                }}
              >
                나가기
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </DivWithBackground>
    );
  }
}
