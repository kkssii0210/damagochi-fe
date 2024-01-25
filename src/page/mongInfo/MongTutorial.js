// plan: damagochi's evolution level 다마고치 Mong의 진화 단계 설명서 페이지

import {
  Text,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Box,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal, useDisclosure, Link, ButtonGroup
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons";
import Step1Damagochi from "../../알.gif";
import Step2Damagochi from "../../자아생성시기.gif";
import Step3Damagochi from "../../사춘기.gif";
import Step4Damagochi from "../../다큼.gif";
import styles from "../../WelcomePage.module.css";
import {useNavigate} from "react-router";
const sg2Style ={ justifyContent:"space-arround", marginTop:"2rem"};
const iconStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "yellow"
};
const cardStyleInHeader={
  color: "white", fontSize:"1.5rem",ㅜㅁ
  textAlign:"center"};
export function MongTutorial(props) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate =useNavigate();
  const [stepInfo, setStepInfo] = useState({
    step: 1,
    info: "알 정보를 입력해주세요"
  });
  const handlePopoverOpen = (step) => {
    setPopoverOpen(true);
    setStepInfo({step, info: `Step ${step} 정보입니다.`});
  };
  // const [isClicked, setIsClicked] = useState(false);
  // const handleButtonClick= ()=> {
  //   setIsClicked(true);
  // };
  // const handlePopoverClose = () => {
  //     setPopoverOpen(false);
  // };
  return (
    <div className={styles.container}>
      <ButtonGroup
        colorScheme='green'
        w="85%"
        mt={20}
        justifyContent="space-between" >
      <Button borderRadius="30px" onClick={() => navigate("/MongStatusInfo")}>
        My
      </Button>
        <Text color="white" fontSize="3xl">
          Mong's Evolution
        </Text>
      <Button  borderRadius="30px" onClick={() => navigate("/MongStatusInfo")}>
        My Mong Info
      </Button>
      </ButtonGroup>
      <SimpleGrid mb={400} w="85%" columns={7} style={sg2Style} >
        <Card h="80"style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", borderRadius:"20px" }}>
          <CardHeader>
            <Text style={cardStyleInHeader}>Baby Mong</Text>
          </CardHeader>
          <CardBody>
            <img src={Step1Damagochi} />
          </CardBody>
          <Button borderRadius="20px" mb={2} mr={10} ml={10} onClick={onOpen}>Click me!</Button>
          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                WKS
              </ModalBody>
              <ModalFooter>
                <Button borderRadius="20px" mb={3} m={3} onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Card>
        <Box style={iconStyle}><FontAwesomeIcon size="5x" icon={faAngleUp} rotation={90} /></Box>
        <Card h="80" style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", borderRadius:"20px" }}>
          <CardHeader>
            <Text style={cardStyleInHeader}>Step 2</Text>
          </CardHeader>
          <CardBody>
            <img src={Step2Damagochi}/>
          </CardBody>

          <Button borderRadius="20px" mb={2} mr={10} ml={10} onClick={onOpen}>Click me!</Button>
          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                WKS
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Card>
        <Box style={iconStyle}><FontAwesomeIcon size="5x" icon={faAngleUp} rotation={90} /></Box>
        <Card h="80" style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", borderRadius:"20px" }}>
          <CardHeader>
          <Text style={cardStyleInHeader}>Step 3</Text>
          </CardHeader>
          <CardBody>
            <img src={Step3Damagochi} />
          </CardBody>
          <Button borderRadius="20px" mb={2} mr={10} ml={10} onClick={onOpen}>Click me!</Button>
          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                WKS
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Card>
        <Box style={iconStyle}><FontAwesomeIcon size="5x" icon={faAngleUp} rotation={90}/></Box>
        <Card h="80" style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", borderRadius:"20px" }}>
            <CardHeader>
            <Text style={cardStyleInHeader}>Step 4</Text>
          </CardHeader>
          <CardBody>
            <img src={Step4Damagochi}/>
          </CardBody>
          <Button borderRadius="20px" mb={2} mr={10} ml={10} onClick={onOpen}>Click me!</Button>
          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                WKS
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Card>
      </SimpleGrid>
            </div>
  )
}

export default MongTutorial;
