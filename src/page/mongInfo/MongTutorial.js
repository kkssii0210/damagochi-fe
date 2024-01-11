// plan: damagochi's evolution level 다마고치 Mong의 진화 단계 설명서 페이지

import {
  Text,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid, Box, Image
} from "@chakra-ui/react";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons";
import Step1Damagochi from "../../알.gif";
import Step2Damagochi from "../../자아생성시기.gif";
import Step3Damagochi from "../../사춘기.gif";
import Step4Damagochi from "../../다큼.gif";
import styles from "../../WelcomePage.module.css";

export function MongTutorial(props) {
  return (
    <>
      <SimpleGrid border="1px solid" spacing={1} columns={7} margin="flex" >
        <Card>
          <CardHeader>
            <img src={Step1Damagochi} alt="step1" className={styles.step} />
          </CardHeader>
          <CardBody>
            <Text>전희연</Text>
          </CardBody>
        </Card>
        <FontAwesomeIcon size="5x" icon={faAngleUp} rotation={90} style={{color: "#3178f2",}} />
        <Card >
          <CardHeader>
            <img src={Step2Damagochi} alt="step1" className={styles.step} />
          </CardHeader>
          <CardBody>
            <Text>전희연</Text>
          </CardBody>
        </Card>
        <FontAwesomeIcon size="5x" icon={faAngleUp} rotation={90} style={{color: "#3178f2",}} />
        <Card>
          <CardHeader>
            <img src={Step3Damagochi} alt="step1" className={styles.step} />
          </CardHeader>
          <CardBody>
            <Text>전희연</Text>
          </CardBody>
        </Card>
        <FontAwesomeIcon size="5x" icon={faAngleUp} rotation={90} style={{color: "#3178f2",}} />
        <Card >
          <CardHeader>
            <img src={Step4Damagochi} alt="step1" className={styles.step} />
          </CardHeader>
          <CardBody>
            <Text>전희연</Text>
          </CardBody>
        </Card>
      </SimpleGrid>
      <FontAwesomeIcon size="5x" icon={faAngleUp} rotation={90} style={{color: "#3178f2",}} />
    </>
  )
}

export default MongTutorial;
