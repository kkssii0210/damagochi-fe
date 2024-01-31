import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  VStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import axios from "axios";
import { useNavigate } from "react-router";

function OrderWrite(props) {
  const [amount, setAmount] = useState(0);
  const [points, setPoints] = useState(0);
  const [orderName, setOrderName] = useState("");
  const navigate = useNavigate();
  const calculatePoints = (selectedAmount) => {
    switch (selectedAmount) {
      case 10000:
        return 12000;
      case 20000:
        return 30000;
      case 40000:
        return 60000;
      default:
        return 0;
    }
  };
  const handleSelectAmount = (selectedAmount) => {
    setAmount(selectedAmount);
    const calculatedPoints = calculatePoints(selectedAmount);
    setPoints(calculatedPoints);
    setOrderName(calculatedPoints + "P에 대한 결제 건");
  };
  const handleSubmit = async () => {
    try {
      // 요청을 위한 데이터 생성
      const requestData = {
        orderId: nanoid(),
        orderName: orderName, // 실제 아이템 이름의 일부를 사용
        amount: amount,
      };

      // 서버에 POST 요청 보내기
      const response = await axios.post("/payment/toss", requestData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      //응답 데이터를 사용하여 Payment페이지로 넘기기
      navigate("/payment", {
        state: {
          ...response.data,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("결제 요청 실패:", error);
    }
  };
  return (
    <Container maxW="container.sm" centerContent p={120}>
      <Box
        padding="4"
        boxShadow="md"
        borderRadius="lg"
        border="4px solid #B893BA"
      >
        <VStack spacing={4}>
          <Heading as="h1" size="lg" mb={8}>
            포인트 상점
          </Heading>
          <Text fontSize={"large"}>결제하실 금액을 선택하세요</Text>
          <HStack p={5}>
            <Button
              colorScheme={amount === 10000 ? "purple" : undefined}
              onClick={() => handleSelectAmount(10000)}
            >
              10,000원 결제
            </Button>
            <Button
              colorScheme={amount === 20000 ? "purple" : undefined}
              onClick={() => handleSelectAmount(20000)}
            >
              20,000원 결제
            </Button>
            <Button
              colorScheme={amount === 40000 ? "purple" : undefined}
              onClick={() => handleSelectAmount(40000)}
            >
              40,000원 결제
            </Button>
          </HStack>
          <VStack p={5} mb={15}>
            <Text>선택한 금액 : {amount}원</Text>
            <HStack>
              <Text>적립될 포인트 : </Text>
              <Text color={"#C00"}>{points} P</Text>
            </HStack>
          </VStack>
          <Flex>
            <Button
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-l, #AB47BC, #FF4081)",
                color: "white",
              }}
              onClick={handleSubmit}
              mr={2}
            >
              포인트 결제하기
            </Button>
            <Button colorScheme={"red"} onClick={() => navigate(-1)}>
              취소
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Container>
  );
}

export default OrderWrite;
