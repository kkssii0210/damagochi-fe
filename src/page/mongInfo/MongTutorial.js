// plan: damagochi's evolution level 다마고치 Mong의 진화 단계 설명서 페이지

import {
  Text,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid
} from "@chakra-ui/react";
import React from "react";

export function MongTutorial(props) {
  return (
    <>
      <SimpleGrid border="1px solid" spacing={4} columns={4}>
        <Card border="1px solid">
          <CardHeader>
          </CardHeader>
          <CardBody>
            <Text>전희연</Text>
          </CardBody>
        </Card>
        <Card border="1px solid">
          <CardHeader>
          </CardHeader>
          <CardBody>
            <Text>전희연</Text>
          </CardBody>
        </Card>
        <Card border="1px solid">
          <CardHeader>
          </CardHeader>
          <CardBody>
            <Text>전희연</Text>
          </CardBody>
        </Card>
        <Card border="1px solid">
          <CardHeader>
          </CardHeader>
          <CardBody>
            <Text>전희연</Text>
          </CardBody>
        </Card>
      </SimpleGrid>
    </>
  )
}

export default MongTutorial;
