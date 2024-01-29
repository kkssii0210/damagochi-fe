// plan: damagochi's evolution level 다마고치 Mong의 진화 단계 설명서 페이지

import {
    Box,
    Card,
    CardBody,
    CardHeader,
    SimpleGrid,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import Step1Damagochi from "../../알.gif";
import Step2Damagochi from "../../자아생성시기.gif";
import Step3Damagochi from "../../사춘기.gif";
import Step4Damagochi from "../../다큼.gif";
import { useNavigate } from "react-router";

const iconStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "yellow",
};
// const cardStyleInHeader={
//   color: "white", fontSize:"1.5rem",textAlign:"center"};
export function MongTutorial(props) {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseOver = () => {
        onOpen();
        setIsHovered(true);
    };

    const handleMouseOut = () => {
        onClose();
        setIsHovered(false);
    };
    const cardStyle = {
        // backgroundColor: isHovered ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.3)",
        borderRadius: "20px",
        transition: "transform 0.3s",
        transform: isHovered ? "scale(1.2)" : "scale(1)",
    };

    const [popoverOpen, setPopoverOpen] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const [stepInfo, setStepInfo] = useState({
        step: 1,
        info: "알 정보를 입력해주세요",
    });
    const handlePopoverOpen = (step) => {
        setPopoverOpen(true);
        setStepInfo({ step, info: `Step ${step} 정보입니다.` });
    };
    // const [isClicked, setIsClicked] = useState(false);
    // const handleButtonClick= ()=> {
    //   setIsClicked(true);
    // };
    // const handlePopoverClose = () => {
    //     setPopoverOpen(false);
    // };
    return (
        <div position="center" border="0px solid green">
            <SimpleGrid
                border="0px solid red"
                justifyContent="center"
                ml="10%"
                display="flex"
                columns={2}
                w="80%"
            >
                <Card

                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                        borderRadius: "20px",
                    }}
                >
                    <CardHeader style={cardStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >
                        {/*<Text style={cardStyleInHeader}>Baby Mong</Text>*/}
                    </CardHeader>
                    <CardBody w="230px" h="250px"  border="0px solid green">
                        <img  src={Step1Damagochi} />
                    </CardBody>
                </Card>
                <Box style={iconStyle}>
                    <FontAwesomeIcon size="5x" icon={faAngleUp} rotation={90} />
                </Box>
                <Card
                    h="80"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                        borderRadius: "20px",
                    }}
                >
                    <CardHeader>
                        {/*<Text style={cardStyleInHeader}>Step 2</Text>*/}
                    </CardHeader>
                    <CardBody w="263px" h="259px" border="0px solid green">
                        <img  src={Step2Damagochi} />
                    </CardBody>
                </Card>
                <Box style={iconStyle}>
                    <FontAwesomeIcon size="5x" icon={faAngleUp} rotation={90} />
                </Box>
                <Card
                    h="80"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                        borderRadius: "20px",
                    }}
                >
                    <CardHeader>
                        {/*<Text style={cardStyleInHeader}>Step 3</Text>*/}
                    </CardHeader>
                    <CardBody w="263px" h="259px" border="0px solid green">
                        <img src={Step3Damagochi} />
                    </CardBody>

                </Card>
                <Box style={iconStyle}>
                    <FontAwesomeIcon size="5x" icon={faAngleUp} rotation={90} />
                </Box>
                <Card
                    h="80"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                        borderRadius: "20px",
                    }}
                >
                    <CardHeader>
                        {/*<Text style={cardStyleInHeader}>Step 4</Text>*/}
                    </CardHeader>
                    <CardBody w="263px" h="259px"  border="0px solid green">
                        <img  src={Step4Damagochi} />
                    </CardBody>
                </Card>
            </SimpleGrid>
        </div>
    );
}

export default MongTutorial;
