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

  return (
    <div>
      <Center>
        <Box>
          <Box display="flex" justifyContent="space-around" border="1px solid red" borderRadius="full">
            <SimpleGrid columns={2} spacingX="50px" spacingY="50px">
              <Box onChange={(e) => setTired(e.target.value)}>
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
              <Box onChange={(e) => setStrength(e.target.value)}>
                <CircularProgress value={strength} color="#00b303">
                  <CircularProgressLabel>
                    <FontAwesomeIcon
                      icon={faDumbbell}
                      size="2xl"
                      style={{ color: "#00b303" }}
                    />
                  </CircularProgressLabel>
                </CircularProgress>
                strength
              </Box>
              <Box  onChange={(e) => setSleep(e.target.value)}>
                <CircularProgress value={sleep} color="#FFB300">
                  <CircularProgressLabel>
                    <FontAwesomeIcon
                      icon={faMoon}
                      size="2xl"
                      style={{ color: "#FFB300" }}
                    />
                  </CircularProgressLabel>
                </CircularProgress>
                sleep
              </Box>
              <Box onChange={(e) => setStrength(e.target.value)}>
                <CircularProgress value={80} color="#FFB300">
                  <CircularProgressLabel>
                    <FontAwesomeIcon
                      icon={faMoon}
                      size="2xl"
                      style={{ color: "#FFB300" }}
                    />
                  </CircularProgressLabel>
                </CircularProgress>
                jeje'slike
              </Box>
              <Box onChange={(e) => setFeed(e.target.value)}>
                <CircularProgress value={feed} color="#9933ff">
                  <CircularProgressLabel>
                    <FontAwesomeIcon
                      icon={faUtensils}
                      size="2xl"
                      style={{ color: "#9933ff" }}
                    />
                  </CircularProgressLabel>
                </CircularProgress>
                feed
              </Box>
            </SimpleGrid>
          </Box>
        </Box>
      </Center>
    </div>
  );
}

export default MongStatusInfo;
