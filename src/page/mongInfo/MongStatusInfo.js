import React, { useEffect, useState } from "react";
import {
  Box,
  Circle,
  CircularProgress,
  CircularProgressLabel,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faMoon,
  faPersonRunning,
  faPoo,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import level1 from "../../알.gif";
import level2 from "../../자아생성시기.gif";
import level3 from "../../사춘기.gif";
import level4 from "../../다큼.gif";
import MongTutorial from "./MongTutorial";

const statusCss = {
  background:
    "linear-gradient(45deg, rgba(255,0,0,1) 0%, rgba(0,255,0,1) 50%, rgba(0,0,255,1) 100%)",
};


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
  // const colors = useColorModeValue(
  //   ["teal.50", "yellow.50", "blue.50"],
  //   ["teal.500", "yellow.100", "blue.500"],
  // );
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
      .catch((error) => console.log(error));
  }, [mong_id]);

  const scale = 0.1;
  const [tabIndex, setTabIndex] = useState(0);
  // const bg = colors[tabIndex];
  function getImage(level) {
    switch (level) {
      case 1:
        return level1;
      case 2:
        return level2;
      case 3:
        return level3;
      case 4:
        return level4;
      default:
        return null;
    }
  }

  console.log(level1);
  return (
    <div>
      <Box margin="30px" border="1px solid black">
      <Tabs
        mt="20px"
        colorScheme="red"
        variant="soft-rounded"
        colomn={3}
        onChange={(index) => setTabIndex(index)}
        // bg={bg}
        border="0px solid blue"
        w="100%"
      >
        <TabList
          display="flex"
          justifyContent="space-evenly"
          mb="1em"
          fontSize="2rem"
          border="0px solid black"
        >
          <Tab>My Mong Status</Tab>
          <Tab>Mong Evolution Info</Tab>
          <Tab>My Account</Tab>
        </TabList>
        <TabPanels>
          <TabPanel border="6px solid red">
            <div border="0px solid black">
              <SimpleGrid
                border="0px solid red"
                ml="10%"
                display="flex"
                columns={2}
                w="80%"
              >
                <Box
                  color="white"
                  fontSize="1.5rem"
                  borderRadius="20px"
                  mt={51}
                  mb={500}
                  w="sm"
                  bg="rgba(255, 255, 255, 0.3)"
                  border="0px solid red"
                >
                  <img
                    src={getImage(mong.level)}
                    style={{ width: "500px", height: "500px" }}
                  />
                  {/*alt={`Mong 레벨 ${mong.level}`*/}
                </Box>
                <Circle
                  border="2px solid blue"
                  ml={200}
                  mr="-23.4rem"
                  mt={50}
                  mb={500}
                  w="300px"
                  h="300px"
                  fontSize="25px"
                >
                  Level:{mong.level}
                </Circle>
                <Box
                  ml={195}
                  mt={22}
                  mb={500}
                  w="300px"
                  h="300px"
                  border="0px solid yellow"
                >
                  <Box
                    position="relative"
                    mt={150}
                    mr={300}
                    border="0px solid yellow"
                  >
                    <Box
                      border="0px solid yellow"
                      size="xl"
                      position="absolute"
                      sx={{
                        transform: `translate(${0 * scale}px, ${
                          -1000 * scale
                        }px)`,
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
                      border="0px solid yellow"
                      position="absolute"
                      sx={{
                        transform: `translate(${-951 * scale}px, ${
                          -309 * scale
                        }px)`,
                      }}
                    >
                      <CircularProgress
                        size="4rem"
                        value={mong.feed}
                        color="#9933ff"
                      >
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
                      border="0px solid yellow"
                      position="absolute"
                      sx={{
                        transform: `translate(${-588 * scale}px, ${
                          809 * scale
                        }px)`,
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
                      border="0px solid yellow"
                      position="absolute"
                      sx={{
                        transform: `translate(${588 * scale}px, ${
                          809 * scale
                        }px)`,
                      }}
                    >
                      <CircularProgress
                        size="4rem"
                        value={mong.clean}
                        color="pink"
                      >
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
                      border="0px solid yellow"
                      position="absolute"
                      sx={{
                        transform: `translate(${951 * scale}px, ${
                          -309 * scale
                        }px)`,
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
                    <Box> </Box>
                  </Box>
                </Box>
              </SimpleGrid>
            </div>
          </TabPanel>
          <TabPanel>
            <MongTutorial />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/*<Box border="0px solid red">*/}
      {/*  <SimpleGrid border="0px solid yellow" ml="10%" display="flex" columns={2} mb={400} w="80%" h="3%">*/}
      {/*    <Box*/}
      {/*      color="white"*/}
      {/*      fontSize="1.5rem"*/}
      {/*      borderRadius="20px"*/}
      {/*      mt={51}*/}
      {/*      mb={500}*/}
      {/*      ml={0}*/}
      {/*      w="500px"*/}
      {/*      h="300px"*/}
      {/*      bg="rgba(255, 255, 255, 0.3)"*/}
      {/*      border="0px solid red"*/}
      {/*    >*/}
      {/*      <img src={getImage(mong.level)}/>*/}
      {/*      /!*alt={`Mong 레벨 ${mong.level}`*!/*/}
      {/*    </Box>*/}
      {/*    <Circle*/}
      {/*      border="0px solid blue"*/}
      {/*      ml={200}*/}
      {/*      mr="-23.4rem"*/}
      {/*      mt={50}*/}
      {/*      bg="rgba(255, 255, 255, 0.3)"*/}
      {/*      mb={500}*/}
      {/*      w="300px"*/}
      {/*      h="300px"*/}
      {/*      fontSize="25px"*/}
      {/*      color="white"*/}
      {/*    >*/}
      {/*      Level:{mong.level}*/}
      {/*    </Circle>*/}
      {/*    <Box ml={195} mt={22} mb={500} w="300px" h="300px" border="0px solid yellow">*/}
      {/*      <Box position="relative" mt={150} mr={300} border="0px solid yellow">*/}
      {/*        <Box*/}
      {/*          border="0px solid yellow"*/}
      {/*          size="xl"*/}
      {/*          position="absolute"*/}
      {/*          sx={{*/}
      {/*            transform: `translate(${0 * scale}px, ${-1000 * scale}px)`,*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <CircularProgress*/}
      {/*            size="4rem"*/}
      {/*            value={mong.tired}*/}
      {/*            color="red"*/}
      {/*            max={100}*/}
      {/*          >*/}
      {/*            <CircularProgressLabel>*/}
      {/*              <FontAwesomeIcon*/}
      {/*                icon={faPersonRunning}*/}
      {/*                size="2x"*/}
      {/*                style={{ color: "red" }}*/}
      {/*              />*/}
      {/*            </CircularProgressLabel>*/}
      {/*          </CircularProgress>*/}
      {/*          /!*<Button onClick={handleClick}>업데이트</Button>*!/*/}
      {/*        </Box>*/}
      {/*        <Box*/}
      {/*          border="0px solid yellow"*/}
      {/*          position="absolute"*/}
      {/*          sx={{*/}
      {/*            transform: `translate(${-951 * scale}px, ${-309 * scale}px)`,*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <CircularProgress size="4rem" value={mong.feed} color="#9933ff">*/}
      {/*            <CircularProgressLabel>*/}
      {/*              <FontAwesomeIcon*/}
      {/*                icon={faUtensils}*/}
      {/*                size="2x"*/}
      {/*                style={{ color: "#9933ff" }}*/}
      {/*              />*/}
      {/*            </CircularProgressLabel>*/}
      {/*          </CircularProgress>*/}
      {/*        </Box>*/}
      {/*        <Box*/}
      {/*          border="0px solid yellow"*/}
      {/*          position="absolute"*/}
      {/*          sx={{*/}
      {/*            transform: `translate(${-588 * scale}px, ${809 * scale}px)`,*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <CircularProgress*/}
      {/*            size="4rem"*/}
      {/*            value={mong.sleep}*/}
      {/*            color="#FFB300"*/}
      {/*          >*/}
      {/*            <CircularProgressLabel>*/}
      {/*              <FontAwesomeIcon*/}
      {/*                icon={faMoon}*/}
      {/*                size="2x"*/}
      {/*                style={{ color: "#FFB300" }}*/}
      {/*              />*/}
      {/*            </CircularProgressLabel>*/}
      {/*          </CircularProgress>*/}
      {/*          /!*{mong.sleep}%*!/*/}
      {/*        </Box>*/}
      {/*        <Box*/}
      {/*          border="0px solid yellow"*/}
      {/*          position="absolute"*/}
      {/*          sx={{*/}
      {/*            transform: `translate(${588 * scale}px, ${809 * scale}px)`,*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <CircularProgress size="4rem" value={mong.clean} color="pink">*/}
      {/*            <CircularProgressLabel>*/}
      {/*              <FontAwesomeIcon*/}
      {/*                icon={faPoo}*/}
      {/*                size="2xl"*/}
      {/*                style={{ color: "pink" }}*/}
      {/*              />*/}
      {/*            </CircularProgressLabel>*/}
      {/*          </CircularProgress>*/}
      {/*          /!*{mong.clean}%*!/*/}
      {/*        </Box>*/}
      {/*        <Box*/}
      {/*          border="0px solid yellow"*/}
      {/*          position="absolute"*/}
      {/*          sx={{*/}
      {/*            transform: `translate(${951 * scale}px, ${-309 * scale}px)`,*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <CircularProgress*/}
      {/*            size="4rem"*/}
      {/*            value={mong.strength}*/}
      {/*            color="#00b303"*/}
      {/*          >*/}
      {/*            <CircularProgressLabel>*/}
      {/*              <FontAwesomeIcon*/}
      {/*                icon={faDumbbell}*/}
      {/*                size="2x"*/}
      {/*                style={{ color: "#00b303" }}*/}
      {/*              />*/}
      {/*            </CircularProgressLabel>*/}
      {/*          </CircularProgress>*/}
      {/*        </Box>*/}
      {/*        <Box > </Box>*/}
      {/*      </Box>*/}
      {/*    </Box>*/}
      {/*  </SimpleGrid>*/}
      {/*</Box>*/}
    </Box>
  </div>
  );
}

export default MongStatusInfo;
