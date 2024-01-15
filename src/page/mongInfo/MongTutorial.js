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
  Image,
  Grid,
  Flex,
  Popover,
  PopoverHeader,
  PopoverContent,
  PopoverTrigger,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal, useDisclosure
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons";
import Step1Damagochi from "../../알.gif";
import Step2Damagochi from "../../자아생성시기.gif";
import Step3Damagochi from "../../사춘기.gif";
import Step4Damagochi from "../../다큼.gif";
import styles from "../../WelcomePage.module.css";
import axios from "axios";
//20240112
//전희연: 게임 유저의 현재 상태 'my status' or 'my stage' or 'level'로 띄워서 알려주기 : 멤버 아이디든, 몽의 아이디든. 가져와서 ..
// 각 단계의 카드 클릭하면 해당 단계의 정보 알려주기
const sg1Style ={border:"1px solid",marginTop:"1rem",color: "white"};
const sg2Style ={display: "flex", border: "1px solid white", marginTop:"8rem"};
const iconStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "yellow"
};
const cardStyleInHeader={
  textAlign:"center"};
export function MongTutorial(props) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [stepInfo, setStepInfo] = useState({
    step: 1,
    info: "알 정보를 입력해주세요"
  });
  const handlePopoverOpen = (step) => {
    setPopoverOpen(true);
    setStepInfo({step, info: `Step ${step} 정보입니다.`});
  };

  const handlePopoverClose = () => {
      setPopoverOpen(false);
  };
  return (
    <div className={styles.container}>
      <SimpleGrid spacing={1} columns={7} style={sg2Style} >
        <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
          <CardHeader>
            <Text style={cardStyleInHeader}>Step 1</Text>
          </CardHeader>
          <CardBody>
          <img src={Step1Damagochi} alt="step1" className={styles.step} />
          </CardBody>
          <CardFooter><Text>"알 정보를 입력해주세요 "</Text></CardFooter>
          <Button onClick={onOpen}>About Baby Mong</Button>
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
        <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
          <CardHeader>
            <Text style={cardStyleInHeader}>Step 2</Text>
          </CardHeader>
          <CardBody>
            <img src={Step2Damagochi} alt="step1" className={styles.step} />
          </CardBody>
          <CardFooter><Text>알 정보를 입력해주세요</Text></CardFooter>
          <Button onClick={onOpen}>About Baby Mong</Button>
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
        <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
          <CardHeader>
          <Text style={cardStyleInHeader}>Step 3</Text>
          </CardHeader>
          <CardBody>
            <img src={Step3Damagochi} alt="step1" className={styles.step} />
          </CardBody>
          <CardFooter>
            <Text>알 정보를 입력해주세요</Text></CardFooter>
          <Button onClick={onOpen}>About Baby Mong</Button>
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
        <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
          <CardHeader>
            <Text style={cardStyleInHeader}>Step 4</Text>
          </CardHeader>
          <CardBody>
            <img src={Step4Damagochi} alt="step1" className={styles.step} />
          </CardBody>
          <CardFooter><Text>알 정보를 입력해주세요</Text></CardFooter>
          <Button onClick={onOpen}>About Baby Mong</Button>
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
