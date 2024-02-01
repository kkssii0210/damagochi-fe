import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Circle,
  CircularProgress,
  CircularProgressLabel,
  SimpleGrid,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Th,
  Tr,
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
import { MapListContext } from "../../MapListContext";

const statusCss = {
  background:
    "linear-gradient(45deg, rgba(255,0,0,1) 0%, rgba(0,255,0,1) 50%, rgba(0,0,255,1) 100%)",
};

export function MongStatusInfo() {
  const navigate = useNavigate();
  const [mong_id, setMong_id] = useState("");
  const [mongInfo, setMongInfo] = useState("");
  const [memberId, setMemberId] = useState(null);
  const { mapList, setMapList } = useContext(MapListContext);

  //mong id 찾는 건 백으로 -- member id
  //240115 멤버 아이디로 몽의 정보 가져오기
  // const colors = useColorModeValue(
  //   ["teal.50", "yellow.50", "blue.50"],
  //   ["teal.500", "yellow.100", "blue.500"],
  // );
  useEffect(() => {
    axios
      .get(`/api/monginfo/id`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log(response);
        setMong_id(response.data.id);
        setMemberId(response.data.memberId);
        setMongInfo(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const scale = 0.1;
  const [tabIndex, setTabIndex] = useState(0);
  // const bg = colors[tabIndex];
  // function getImage(level) {
  //   switch (level) {
  //     case 1:
  //       return level1;
  //     case 2:
  //       return level2;
  //     case 3:
  //       return level3;
  //     case 4:
  //       return level4;
  //     default:
  //       return null;
  //   }
  // }

  function takeMapList() {
    axios
      .get("/api/purchase/myMapList", {
        headers: {
          MemberId: memberId,
        },
      })
      .then((response) => {
        // response.data.mapCode가 배열인지 확인
        if (Array.isArray(response.data.mapCode)) {
          setMapList(response.data.mapCode);
        } else {
          // response.data.mapCode가 배열이 아닐 경우의 처리
          console.error("mapCode is not an array:", response.data.mapCode);
        }
        console.log(response.data);
      });
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div>
      <Box margin="30px" border="3px solid #A592F0">
        <Tabs
          mt="20px"
          colorScheme="red"
          variant="soft-rounded"
          colomn={3}
          onChange={(index) => setTabIndex(index)}
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
            <Tab fontSize={"1.5rem"}>나의 다마고찌 정보</Tab>
            <Tab fontSize={"1.5rem"}>다마고찌 진화 단계</Tab>
            <Tab fontSize={"1.5rem"} onClick={takeMapList}>
              내 계정
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel border="0px solid red">
              <div border="0px solid black">
                <SimpleGrid
                  border="0px solid red"
                  display="flex"
                  columns={1}
                  w="100%"
                >
                  {/*<img*/}
                  {/*  src={getImage(mong.level)}*/}
                  {/*  style={{*/}
                  {/*    width: "200px",*/}
                  {/*    height: "130px",*/}
                  {/*    border: "1px solid green",*/}
                  {/*  }}*/}
                  {/*/>*/}
                  {/*alt={`Mong 레벨 ${mong.level}`*/}
                  <Circle
                    border="6px solid pink"
                    ml={350}
                    mr="-23.4rem"
                    mt={50}
                    mb={500}
                    w="300px"
                    h="300px"
                    fontSize="25px"
                  >
                    Level : {mongInfo.level}
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
                          value={mongInfo.tired}
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
                          value={mongInfo.feed}
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
                          value={mongInfo.tired}
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
                          value={mongInfo.clean}
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
                          value={mongInfo.strength}
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
                  <Box
                    border="0px solid purple"
                    fontSize="1.7rem"
                    mt={50}
                    w="350px"
                    h="500px"
                  >
                    <p style={{ marginBottom: "10px", color: "rebeccapurple" }}>
                      ❣️나의 다마고찌 정보❣️
                    </p>
                    <p mb={10}> 이름 : {mongInfo.name}</p>
                    <p mb={10}> 속성 : {mongInfo.attribute}</p>
                    <p mb={10}> 레벨 : {mongInfo.level}</p>
                    <p mb={10}> 경험치 : {mongInfo.exp}/100</p>
                    <p mb={10}> 건강 : {mongInfo.health}/100</p>
                    <p mb={10}>근력 : {mongInfo.strength}/100</p>
                    <p mb={10}>방어력 : {mongInfo.defense}/100</p>
                    <p mb={10}>민첩성 : {mongInfo.defense}/100</p>
                    <p mb={10}>포만감 : {mongInfo.feed}/100</p>
                    <p mb={10}>배틀 우승 : {mongInfo.win}회</p>
                    <p mb={4}>배틀 패배 : {mongInfo.lose}회</p>
                    <p>생성날짜: {formatDate(mongInfo.birth)}</p>
                  </Box>
                </SimpleGrid>
              </div>
            </TabPanel>
            <TabPanel>
              <MongTutorial />
            </TabPanel>
            <TabPanel>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                내가 보유한 맵 종류
              </p>
              <div>
                {mapList &&
                  mapList.map((url, index) =>
                    url ? (
                      <img
                        key={index}
                        src={url}
                        alt={`Map Preview ${index}`}
                        style={{ width: "100px", height: "100px" }}
                      />
                    ) : (
                      <p style={{ textAlign: "center", fontSize: "1.1rem" }}>
                        현재 보유한 맵이 없습니다.
                      </p>
                    ),
                  )}
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
}

export default MongStatusInfo;
