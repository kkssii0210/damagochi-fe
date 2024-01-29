import React, { useEffect, useState } from "react";
import swordImage from "./칼1.png";
import fireImage from "./불공격.gif";
import waterImage from "./물공격.png";
import attackedImage from "./피격몽.gif";
import "./AttackAnimation.css";
import axios from "axios";
import {
  Box,
  Center,
  Flex,
  Text,
  Image,
  Badge,
  Button,
} from "@chakra-ui/react";
import { Inventory } from "./page/management/Inventory";

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
  const [userA, setUserA] = useState(null);
  const [userB, setUserB] = useState(null);
  const [userName, setUserName] = useState("");

  const [imageModuleA, setImageModuleA] = useState(null);
  const [imageModuleB, setImageModuleB] = useState(null);

  const [nowTurn, setNowTurn] = useState("");

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
  const attributeImage =
    userB?.attribute === "물"
      ? waterImage
      : userB?.attribute === "불"
        ? fireImage
        : null;

  // const info = JSON.parse(message);
  const info = message;
  const userAMongId = info.mongAId;
  const userBMongId = info.mongBId;

  const mongAMaxHp = 100;
  const mongBMaxHp = 100;

  const handleBattleRoomsMessage = (message) => {
    const receivedMessage = message;
    console.log("Received message:", receivedMessage);
    // 원하는 작업 수행
    // 예를 들면, 상태 업데이트 등

    if (receivedMessage.mongAId === userAMongId) {
      setMongAHp(receivedMessage.healthA);
      setMongBHp(receivedMessage.healthB);

      if (receivedMessage.attackBuff) {
        setAttackBuffA(receivedMessage.attackBuff);
      }
    }

    if (receivedMessage.mongAId === userBMongId) {
      setMongBHp(receivedMessage.healthA);
      setMongAHp(receivedMessage.healthB);

      if (receivedMessage.attackBuff) {
        setAttackBuffB(receivedMessage.attackBuff);
      }
    }

    if (receivedMessage.turn) {
      setNowTurn(receivedMessage.turn);
    }
    setNowTurn(receivedMessage.turn);
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
              }.png`
            );
            setImageModuleA(imageModuleA.default);
          }

          if (data.userB.evolutionLevel >= 2) {
            const imageModuleB = await import(
              `./img/${data.userB.mongCode}-${
                data.userB.evolutionLevel - 1
              }.png`
            );
            setImageModuleB(imageModuleB.default);
          }
        };

        loadImageModule();
        handleBattleRoomsMessage(message);
      });
  }, [message]);
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
      const response = await axios.put("/api/manage/mong", {
        mongAId: user1.id,
        mongBId: user2.id,
        healthA,
        healthB,
        attackBuff,
        battleRoomId: roomId,
        sessionIds: sessionIds,
      });
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

  if (battleFinished) {
    const victoriousUser = winner === "A" ? userA : userB;
    const victoriousImage = winner === "A" ? imageModuleA : imageModuleB;

    return (
      <Center>
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
  } else {
    if (userName === userA.memberId) {
      return (
        <div>
          <Center>
            <Flex
              display="flex"
              flexDirection="row"
              border="1px solid black"
              width="70%"
              height="700px"
              p="4"
              borderRadius="md"
              boxShadow="md"
              justifyContent="space-between"
            >
              <Box
                border="1px solid red"
                display="flex"
                width="30%"
                height="100%"
                p="2"
                borderRadius="md"
                boxShadow="sm"
                flexDirection="column"
                justifyContent="end"
              >
                <Box
                  width="100%"
                  height="70%"
                  border="1px solid black"
                  textAlign="center"
                >
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
                border="1px solid green"
                display="flex"
                width="35%"
                height="100%"
                p="2"
                borderRadius="md"
                boxShadow="sm"
                flexDirection="column"
                justifyContent="end"
              >
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
                            axios.put("/api/manage/mong/useItem", {
                              itemId: item.id,
                              mongAId: userA.id,
                              mongBId: userB.id,
                              healthA: mongAHp,
                              healthB: mongBHp,
                              battleRoomId: roomId,
                              sessionIds: sessionIds,
                            });
                          }}
                        />
                      )}
                    </div>
                  </div>
                )}
              </Box>
              <Box
                border="1px solid blue"
                display="flex"
                width="30%"
                height="100%"
                p="2"
                borderRadius="md"
                boxShadow="sm"
                flexDirection="column"
              >
                <Box
                  width="100%"
                  height="70%"
                  border="1px solid black"
                  textAlign="center"
                >
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
        </div>
      );
    } else if (userName === userB.memberId) {
      return (
        <div>
          <Center>
            <Flex
              display="flex"
              flexDirection="row"
              border="1px solid black"
              width="70%"
              height="700px"
              p="4"
              borderRadius="md"
              boxShadow="md"
              justifyContent="space-between"
            >
              <Box
                border="1px solid red"
                display="flex"
                width="30%"
                height="100%"
                p="2"
                borderRadius="md"
                boxShadow="sm"
                flexDirection="column"
                justifyContent="end"
              >
                <Box
                  width="100%"
                  height="70%"
                  border="1px solid black"
                  textAlign="center"
                >
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
                border="1px solid green"
                display="flex"
                width="35%"
                height="100%"
                p="2"
                borderRadius="md"
                boxShadow="sm"
                flexDirection="column"
                justifyContent="end"
              >
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
                            axios.put("/api/manage/mong/useItem", {
                              itemId: item.id,
                              mongAId: userB.id,
                              mongBId: userA.id,
                              healthA: mongBHp,
                              healthB: mongAHp,
                              battleRoomId: roomId,
                              sessionIds: sessionIds,
                            });
                          }}
                        />
                      )}
                    </div>
                  </div>
                )}
              </Box>
              <Box
                border="1px solid blue"
                display="flex"
                width="30%"
                height="100%"
                p="2"
                borderRadius="md"
                boxShadow="sm"
                flexDirection="column"
              >
                <Box
                  width="100%"
                  height="70%"
                  border="1px solid black"
                  textAlign="center"
                >
                  <HealthBar health={mongAHp} />
                  <Text fontSize="sm" mt="2" noOfLines={2}>
                    {mongAHp} / 100
                  </Text>
                  <Image
                    src={attacked ? attackedImage : imageModuleA}
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
        </div>
      );
    }
  }
}
