import React, {useEffect, useState} from "react";
import axios from "axios";
import {Box, Center, Flex, Text, Image, Badge} from "@chakra-ui/react";
import * as PropTypes from "prop-types";

function HealthBar({health}) {
// 체력바 스타일을 계산하는 함수
    const calculateHealthBarStyle = () => {
        const percentage = (health / 100) * 100;
        return {
            width: `${percentage}%`,
            backgroundColor: percentage > 70 ? 'green' : percentage > 30 ? 'yellow' : 'red',
            height: '10px',
            borderRadius: 'md',
            transition: 'width 0.3s ease',
        };
    };

    return (
        <Box w="100%" bg="gray.300" borderRadius="md" overflow="hidden">
            <Box style={calculateHealthBarStyle()} bg="green.500" h="100%" />
        </Box>
    );
}


export function Ba() {
    const [userA, setUserA] = useState(null);
    const [userB, setUserB] = useState(null);
    const [userName, setUserName] = useState("");

    const [imageModuleA, setImageModuleA] = useState(null);
    const [imageModuleB, setImageModuleB] = useState(null);


    useEffect(() => {
        axios.get("api/manage/mong/getUser", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            }
        })
            .then(({data}) => {
                setUserA(data.userA);
                setUserB(data.userB);
                setUserName(data.userName);

                const loadImageModule = async () => {
                    if (data.userA.evolutionLevel >= 2) {
                        const imageModuleA = await import(`./img/${data.userA.mongCode}-${data.userA.evolutionLevel-1}.png`);
                        setImageModuleA(imageModuleA.default);
                    }

                    if (data.userB.evolutionLevel >= 2) {
                        const imageModuleB = await import(`./img/${data.userB.mongCode}-${data.userB.evolutionLevel-1}.png`);
                        setImageModuleB(imageModuleB.default);
                    }
                };

                loadImageModule();
            });


    }, []);


    if (userA === null || userB === null) {
        return <div>로딩중...</div>
    }

    if (userName === userA.memberId) {
        return (
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
                        <Box width="100%" height="70%" border="1px solid black" textAlign="center">
                            <HealthBar health={userA.health} />
                            <Text fontSize="sm" mt="2" noOfLines={2}>
                                {userA.health} / 100
                            </Text>
                            <Image src={imageModuleA} alt="" w="70%" h="70%" m="auto" mb="2" />
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
                        <Box width="100%" height="70%" border="1px solid black" textAlign="center">
                            <HealthBar health={userB.health} />
                            <Text fontSize="sm" mt="2" noOfLines={2}>
                                {userB.health} / 100
                            </Text>
                            <Image src={imageModuleB} alt="" w="70%" h="70%" m="auto" mb="2" />
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


        );
    } else {
        return (
            <Center>
                <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid black', width: '80%', height: '700px' }}>
                    <div style={{ border: '1px solid blue', display : "flex", width: '70%', height : "50%", marginLeft : "30%" }}>
                        <div style={{width : "50%", height : "100%", border : "1px solid black"}}></div>
                        <img style={{width : "50%", height : "100%", border : "1px solid green"}} src={imageModuleA} alt=""/>
                    </div>
                    <div style={{ border: '1px solid red', display : "flex", width: '70%', height : "50%" }}>
                        <img style={{width : "50%", height : "100%"}} src={imageModuleB} alt=""/>
                        <div style={{width : "50%", height : "100%"}}>
                        </div>
                    </div>
                </div>
            </Center>
        );
    }
}