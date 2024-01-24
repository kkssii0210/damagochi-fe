import React, {useEffect, useState} from "react";
import {
  Text,
  Box,
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel, ButtonGroup, SimpleGrid, Circle, Spacer,
} from "@chakra-ui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faDumbbell,
  faMoon,
  faPersonRunning,
  faPoo,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../WelcomePage.module.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import level1 from "../../알.gif";
import level2 from "../../자아생성시기.gif";
import level3 from "../../사춘기.gif";
import level4 from "../../다큼.gif";

export function MongStatusInfo() {
  const navigate = useNavigate();
  const [mong_id, setMong_id] = useState("");
  //Mong 갹체의 초기 상태를 미리 설정
  const [mong, setMong] = useState({
    level: 1,
    tired: 100,
    strength: 50,
    health: 100,
    sleep: 100,
    feed: 100,
    clean: 100,
  });
//mong id 찾는 건 백으로 -- member id
//240115 멤버 아이디로 몽의 정보 가져오기

  useEffect(() => {
    axios
      .get(`/api/monginfo/${mong_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setMong_id(response.data);
      })
      .catch((error) => console.log(error))
  }, [mong_id]);

  const scale = 0.1;

  function getImage(level) {
    switch (level){
      case 1: return {level1};
      case 2: return {level2};
      case 3: return {level3};
      case 4: return {level4};
      default:return null;
    }
    return undefined;
  }

  return (
    <div className={styles.container}>
      <ButtonGroup
        colorScheme="green"
        w="85%"
        mt={20}
        justifyContent="space-between"
      >
        <Button borderRadius="30px" onClick={() => navigate("/")}>
          홈 화면
        </Button>
        <Text color="white" fontSize="3xl">
          My Mong status
        </Text>
        <Button borderRadius="30px" onClick={() => navigate("/MongTutorial")}>
          마이 몽 정보
        </Button>
      </ButtonGroup>
      <Box border="1px solid yellow">
        <SimpleGrid ml="10%" display="flex" columns={2} mb={400} w="80%" h="3%">
          <Box
            color="white"
            fontSize="1.5rem"
            mt={51}
            mb={500}
            ml={0}
            w="500px"
            h="300px"
            border="1px solid red"
          >
            <img src={getImage(mong.level)}/>
            {/*alt={`Mong 레벨 ${mong.level}`*/}
            </Box>
          <Circle
            border="1px solid blue"
            ml={200}
            mr="-23.4rem"
            mt={50}
            bg="rgba(255, 255, 255, 0.3)"
            mb={500}
            w="300px"
            h="300px"
            fontSize="25px"
            color="white"
          >
            Level:{mong.level}
          </Circle>
          <Box ml={195} mt={22} mb={500} w="300px" h="300px" border="1px solid yellow">
            <Box position="relative" mt={150} mr={300} border="1px solid yellow">
              <Box
                border="1px solid yellow"
                size="xl"
                position="absolute"
                sx={{
                  transform: `translate(${0 * scale}px, ${-1000 * scale}px)`,
                }}
              >
                <CircularProgress
                  size="4rem"
                  value={mong.tired}
                  color="red"
                  max={100}
                >
                  <CircularProgressLabel>
                    <FontAwesomeIcon
                      icon={faPersonRunning}
                      size="2x"
                      style={{ color: "red" }}
                    />
                  </CircularProgressLabel>
                </CircularProgress>
                {/*<Button onClick={handleClick}>업데이트</Button>*/}
              </Box>
              <Box
                border="1px solid yellow"
                position="absolute"
                sx={{
                  transform: `translate(${-951 * scale}px, ${-309 * scale}px)`,
                }}
              >
                <CircularProgress size="4rem" value={mong.feed} color="#9933ff">
                  <CircularProgressLabel>
                    <FontAwesomeIcon
                      icon={faUtensils}
                      size="2x"
                      style={{ color: "#9933ff" }}
                    />
                  </CircularProgressLabel>
                </CircularProgress>
              </Box>
              <Box
                border="1px solid yellow"
                position="absolute"
                sx={{
                  transform: `translate(${-588 * scale}px, ${809 * scale}px)`,
                }}
              >
                <CircularProgress
                  size="4rem"
                  value={mong.sleep}
                  color="#FFB300"
                >
                  <CircularProgressLabel>
                    <FontAwesomeIcon
                      icon={faMoon}
                      size="2x"
                      style={{ color: "#FFB300" }}
                    />
                  </CircularProgressLabel>
                </CircularProgress>
                {/*{mong.sleep}%*/}
              </Box>
              <Box
                border="1px solid yellow"
                position="absolute"
                sx={{
                  transform: `translate(${588 * scale}px, ${809 * scale}px)`,
                }}
              >
                <CircularProgress size="4rem" value={mong.clean} color="pink">
                  <CircularProgressLabel>
                    <FontAwesomeIcon
                      icon={faPoo}
                      size="2xl"
                      style={{ color: "pink" }}
                    />
                  </CircularProgressLabel>
                </CircularProgress>
                {/*{mong.clean}%*/}
              </Box>
              <Box
                border="1px solid yellow"
                position="absolute"
                sx={{
                  transform: `translate(${951 * scale}px, ${-309 * scale}px)`,
                }}
              >
                <CircularProgress
                  size="4rem"
                  value={mong.strength}
                  color="#00b303"
                >
                  <CircularProgressLabel>
                    <FontAwesomeIcon
                      icon={faDumbbell}
                      size="2x"
                      style={{ color: "#00b303" }}
                    />
                  </CircularProgressLabel>
                </CircularProgress>
              </Box>
            </Box>
          </Box>
        </SimpleGrid>
        <Box w="80%" h="300px" ml="10%" border="1px solid yellow"><p> 몽 이름: {mong.name}</p>
          <p> 레벨: {mong.level}</p>

          {/*전희연 의도: 각 레벨에 맞는 이미지 반환하는 코드 작성..*/}
          <p>피로도 : {mong.tired}</p>
          <p>근력 : {mong.strength}</p>
          <p>수면 : {mong.sleep}</p>
          <p>배고픔 : {mong.feed}</p>
          <p>청소 : {mong.clean}</p>
        </Box>
      </Box>
    </div>
  );

}

export default MongStatusInfo;
