import React, { useEffect, useState } from "react";
import swordImage from "./칼1.png";
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

  const [reload, setReload] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [sessionIds, setSessionIds] = useState({ A: null, B: null });

  const info = message;
  const userAMongId = info.mongAId;
  const userBMongId = info.mongBId;

  const handleBattleRoomsMessage = (message) => {
    const receivedMessage = message;
    console.log("Received message:", receivedMessage);
    // 원하는 작업 수행
    // 예를 들면, 상태 업데이트 등
    if (receivedMessage.mongAId === userAMongId) {
      setMongAHp(receivedMessage.healthA);
      setMongBHp(receivedMessage.healthB);
    }
    if (receivedMessage.mongAId === userBMongId) {
      setMongBHp(receivedMessage.healthA);
      setMongAHp(receivedMessage.healthB);
    }
    setNowTurn(receivedMessage.turn);
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
  console.log(nowTurn);
  if (userAMongId === null || userBMongId === null) {
    return <div>로딩~</div>;
  }
  if (userA === null || userB === null) {
    return <div>로딩중...</div>;
  }
  function waitForAnimation(duration) {
    return new Promise((resolve) => setTimeout(resolve, duration));
  }
  async function handleAttackClick(user1, user2, healthA, healthB) {
    console.log(user1.name + "가 " + user2.name + "에게 공격");
    setIsAnimating(true); // 애니메이션 시작
    // 애니메이션 완료까지 기다림
    await waitForAnimation(4000);
    // 애니메이션이 끝난 후 axios 요청 수행
    try {
      const response = await axios.put("/api/manage/mong", {
        mongAId: user1.id,
        mongBId: user2.id,
        healthA,
        healthB,
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

  if (userName === userA.memberId) {
    return (
      <div>
        {userA.mongId}
        {nowTurn === userA.name && (
          <Button
            onClick={() => handleAttackClick(userA, userB, mongAHp, mongBHp)}
          >
            공격
          </Button>
        )}
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
                    src={swordImage}
                    className="sword-animation"
                    position="absolute"
                  />
                )}
              </Box>
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
  } else {
    return (
      <div>
        {nowTurn === userB.name && (
          <Button
            onClick={() => handleAttackClick(userB, userA, mongBHp, mongAHp)}
          >
            공격
          </Button>
        )}
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
                    src={swordImage}
                    className="sword-animation"
                    position="absolute"
                    left="0"
                    top="0"
                  />
                )}
              </Box>
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
