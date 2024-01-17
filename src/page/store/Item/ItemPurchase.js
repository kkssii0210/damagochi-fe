import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// 실제 카드결제를 해서 포인트를 결제하는건 payment.js
// 결제된 포인트를 이용해 상점에서 아이템을 구매하는건 purchase.js

// 포인트 부족하면 토스트로 포인트가 상품 금액보다 적은데 결제하시겠습니까? 띄우고 결제하기, 취소하기 버튼 만들어서
// 결제하기 누르면 navigate로 payment페이지로 이동하도록 설정하면 됨
// response에 로그인한 멤버의 아이디, 자기포인트, itemPrice를 가져와야함
// 멤버 아이디 가져오기
export function ItemPurchase() {
  const [purchaseInfo, setPurchaseInfo] = useState(null);
  const { storeId } = useParams();
  const [myPoint, setMyPoint] = useState(null);
  const [itemPrice, setItemPrice] = useState(null);
  const [remainingPoint, setRemainingPoint] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("accessToken") !== null) {
            console.log(localStorage.getItem("accessToken"));
            axios
                .get("/api/purchase/accessToken", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                })
                .then((response) => {
                    localStorage.setItem("accessToken", response.data.accessToken);
                    console.log(response.data.accessToken);
                })
                .catch()
                .finally();
        }
    }, []);

    return (
        <Container
            mt={20}
            border="3px solid black"
            borderRadius="20px"
            variant="ghost"
        >
            <VStack>
                <Heading mt={8} mb={8}>
                    아이템 구매
                </Heading>

                <HStack mb={3}>
                    <Text>현재 내 포인트</Text>
                    <Text>-</Text>
                    <Text>아이템 가격</Text>
                    <Text>=</Text>
                    <Text>남은 포인트</Text>
                </HStack>
                <HStack mb={10}>
                    <Text>포인트{}</Text>
                    <Text>-</Text>
                    <Text>가격{}</Text>
                    <Text>=</Text>
                    <Text>포인트</Text>
                </HStack>
                <Button colorScheme="purple" mb={20}>
                    결제하기
                </Button>
            </VStack>
        </Container>
    );
}
