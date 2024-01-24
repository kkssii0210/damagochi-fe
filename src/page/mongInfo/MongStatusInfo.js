import React, {useEffect, useState} from "react";
import {
  Text,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel, ButtonGroup, SimpleGrid, Circle,
} from "@chakra-ui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faMoon,
  faPersonRunning,
  faPoo,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../WelcomePage.module.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function MongStatusInfo() {
  const [evolutionLevel, setEvolutionLevel] = useState("");
  const navigate = useNavigate();
  const [mong_id, setMong_id] = useState("");
  //Mong 갹체의 초기 상태를 미리 설정
  const [mong, setMong] = useState({
    evolutionLevel:1,
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
      .get(`/api/mong/${mong_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }) .then((response) => {
      setMong(response.data);
      if (response.data.level === 1) {
        setEvolutionImage(`/images/step1.png`);
      } else {
        setEvolutionImage(`/images/step${response.data.evolutionLevel}.png`);
      }
    })
    const evolutionImageModule = async () => {
      if (data.evolutionLevel >= 2) {
        const imageModule = await import(`../../img/${data.mongLevel}-${data.evolutionLevel-1}.png`);
        setEvolutionLevel(evolutionLevel.default);
      }
    };

    evolutionImageModule();

  const scale = 0.1;
  return (
    <div className={styles.container} w="100%">
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
      <Box border="0px solid yellow">
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
            {mong.evolutionLevel === 1 && (
              <img src={evolutionImage} alt={"Step1"} />
            )}
            {mong.evolutionLevel !== 1 && evolutionImage && (
              <img
                style={{ height: "100%", width: "100%" }}
                src={evolutionImage}
                alt={`step${mong.evolutionLevel}`}
              />
            )}
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
          <Box
            ml={195}
            mt={22}
            mb={500}
            w="300px"
            h="300px"
            border="1px solid yellow"
          >
            <Box
              position="relative"
              mt={150}
              mr={300}
              border="1px solid yellow"
            >
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
      </Box>
    </div>
  );}
export default MongStatusInfo;
