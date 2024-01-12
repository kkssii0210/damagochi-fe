import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  SimpleGrid,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faMoon,
  faPersonRunning,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../WelcomePage.module.css"
import axios from "axios";


export function MongStatusInfo(props) {
  const [tired, setTired] = useState();
  const [feed, setFeed] = useState();
  const [sleep, setSleep] = useState();

  const [strength, setStrength] = useState(0);
  const [mong_id, setMong_id] = useState([]);

  useEffect(() => {
    axios
      .get("/MongStatus/tired")
      .then((response) => {
        setTired(response.data.tired);
      })
      .catch((error) => {
        console.error("피로 상태를 적용할 수 없습니다. 다시 시도하세요", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/MongStatus/Strength")
      .then((response) => {
        setStrength(response.data.Strength);
      })
      .catch((error) => {
        console.error("다시 시도하세요", error);
      });
  }, []);

  // function handleClick(e) {
  //   axios.get("").then((response) => setStrength(response.data));
  // }

  const scale = 0.1;
  return (
    <div className={styles.container}>
      <Center>
        <Box border="1px solid white" w="500px" h="500px"  >
          <Box border="1px solid" w="500px" h="500px" position="relative" mt={300} borderRadius="full">
              <Box border="1px solid" position="absolute" sx={{transform: `translate(${0 * scale}px, ${-1000 * scale}px)`}} onChange={(e) => setTired(e.target.value)}>
                <CircularProgress value={tired} color="red" max={100}>
                  <CircularProgressLabel>
                    <FontAwesomeIcon
                      icon={faPersonRunning}
                      size="2xl"
                      style={{ color: "red" }}
                    />
                  </CircularProgressLabel>
                </CircularProgress>
                {tired}
                {/*<Button onClick={handleClick}>업데이트</Button>*/}
              </Box>
              <Box position="absolute" sx={{transform: `translate(${-951 * scale}px, ${-309 * scale}px)`}} onChange={(e) => setStrength(e.target.value)}>
                <CircularProgress value={strength} color="#00b303">
                  <CircularProgressLabel>
                    <FontAwesomeIcon
                      icon={faDumbbell}
                      size="2xl"
                      style={{ color: "#00b303" }}
                    />
                  </CircularProgressLabel>
                </CircularProgress>
              </Box>
              <Box position="absolute" sx={{transform: `translate(${-588 * scale}px, ${809 * scale}px)`}} onChange={(e) => setSleep(e.target.value)}>
                <CircularProgress value={sleep} color="#FFB300">
                  <CircularProgressLabel>
                    <FontAwesomeIcon
                      icon={faMoon}
                      size="2xl"
                      style={{ color: "#FFB300" }}
                    />
                  </CircularProgressLabel>
                </CircularProgress>
              </Box>
              <Box position="absolute" sx={{transform: `translate(${588 * scale}px, ${809 * scale}px)`}} onChange={(e) => setStrength(e.target.value)}>
                <CircularProgress value={80} color="#FFB300">
                  <CircularProgressLabel>
                    <FontAwesomeIcon
                      icon={faMoon}
                      size="2xl"
                      style={{ color: "#FFB300" }}
                    />
                  </CircularProgressLabel>
                </CircularProgress>
              </Box>
              <Box position="absolute" sx={{transform: `translate(${951 * scale}px, ${-309 * scale}px)`}} onChange={(e) => setFeed(e.target.value)}>
                <CircularProgress value={feed} color="#9933ff">
                  <CircularProgressLabel>
                    <FontAwesomeIcon
                      icon={faUtensils}
                      size="2xl"
                      style={{ color: "#9933ff" }}
                    />
                  </CircularProgressLabel>
                </CircularProgress> gmldus
              </Box>
          </Box>
        </Box>
      </Center>
    </div>
  );
}

export default MongStatusInfo;
