import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Table,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faDumbbell,
  faMoon,
  faPersonRunning, faPoo,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../WelcomePage.module.css";
import axios from "axios";
export function MongStatusInfo() {
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
//
  useEffect(() => {
    axios
      .get(`/api/monginfo`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setMong(response.data);
      })
      .catch((error)=> console.log(error))
  }, []);

  const scale = 0.1;
  return (
    <div className={styles.container}>
      {mong && (
      <Center>
        <Box display="flex" color="white">
          {/*<FontAwesomeIcon icon={faAnglesLeft} size="lg" style={{color: "#ffffff",}} />*/}
        <Box w="500px" h="500px" position="relative" mt={200} mr={100} >
              <Box sixe="xl"  position="absolute" sx={{transform: `translate(${0 * scale}px, ${-1000 * scale}px)`}} >
                <CircularProgress value={mong.tired} color="red" max={100}>
                  <CircularProgressLabel>
                    <FontAwesomeIcon
                      icon={faPersonRunning}
                      size="2xl"
                      style={{ color: "red" }}
                    />
                  </CircularProgressLabel>
                </CircularProgress>
                {/*<Button onClick={handleClick}>업데이트</Button>*/}
              </Box>
              <Box position="absolute" sx={{transform: `translate(${-951 * scale}px, ${-309 * scale}px)`}} >

                <CircularProgress value={mong.feed} color="#9933ff">
                  <CircularProgressLabel>
                    <FontAwesomeIcon
                      icon={faUtensils}
                      size="2xl"
                      style={{ color: "#9933ff" }}
                    />
                  </CircularProgressLabel>
                </CircularProgress>
                {/*{mong.feed}%*/}
              </Box>
              <Box position="absolute" sx={{transform: `translate(${-588 * scale}px, ${809 * scale}px)`}} >
                <CircularProgress value={mong.sleep} color="#FFB300">
                  <CircularProgressLabel>
                    <FontAwesomeIcon
                      icon={faMoon}
                      size="2xl"
                      style={{ color: "#FFB300" }}
                    />
                  </CircularProgressLabel>
                </CircularProgress>
                {/*{mong.sleep}%*/}
              </Box>
              <Box position="absolute" sx={{transform: `translate(${588 * scale}px, ${809 * scale}px)`}} >
                <CircularProgress value={mong.clean} color="pink">
                  <CircularProgressLabel>
                    <FontAwesomeIcon icon={faPoo} size="2xl" style={{color: "pink",}} />
                  </CircularProgressLabel>
                </CircularProgress>
                {/*{mong.clean}%*/}
              </Box>
              <Box position="absolute" sx={{transform: `translate(${951 * scale}px, ${-309 * scale}px)`}} >
                <CircularProgress value={mong.strength} color="#00b303">
                  <CircularProgressLabel>
                    <FontAwesomeIcon
                      icon={faDumbbell}
                      size="2xl"
                      style={{ color: "#00b303" }}
                    />
                  </CircularProgressLabel>
                </CircularProgress>
                {/*{mong.strength}%*/}
              </Box>
        </Box>
        </Box>
          <Box mb={300} fontSize="1.5rem">
            <Box border="1px solid"color="white" >
              <Box>
                <p>Level:{mong.level}</p>
                <p>tired:{mong.tired}</p>
                <p>strength:{mong.strength}</p>
                <p>health:{mong.health}</p>
                <p>sleep: {mong.sleep}</p>
                <p>feed:{mong.feed}</p>
                <p>clean:{mong.clean}</p>
              </Box>
            </Box>
          </Box>
      </Center>
      )}
    </div>
  );
}

export default MongStatusInfo;
