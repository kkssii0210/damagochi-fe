import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Table,
  Td,
  Th,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEquals } from "@fortawesome/free-solid-svg-icons/faEquals";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";

// 실제 카드결제를 해서 포인트를 결제하는건 payment.js
// 결제된 포인트를 이용해 상점에서 아이템을 구매하는건 purchase.js

// 포인트 부족하면 토스트로 포인트가 상품 금액보다 적은데 결제하시겠습니까? 띄우고 결제하기, 취소하기 버튼 만들어서
// 결제하기 누르면 navigate로 payment페이지로 이동하도록 설정하면 됨
// response에 로그인한 멤버의 아이디, 자기포인트, itemPrice를 가져와야함
// 멤버 아이디 가져오기
export function ItemPurchase() {
  const navigate = useNavigate();
  const [purchaseInfo, setPurchaseInfo] = useState(null);
  const { storeId } = useParams();

  const [member, setMember] = useState({ playerId: "" });
  const [cartInfo, setCartInfo] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);
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
          console.log(response.data);
          setMember(response.data);
          handleGetCartItem(response.data.playerId, response.data.point);
        })
        .catch()
        .finally();
    }
  }, []);

  function handleGetCartItem(playerId, point) {
    axios
      .get("/api/purchase/cartInfo", {
        params: { playerId: playerId },
      })
      .then((response) => {
        setCartInfo(response.data);

        const totalPrice = response.data.reduce(
          (acc, item) => acc + item.cartItemCount * item.cartItemPrice,
          0,
        );
        setTotalPrice(totalPrice);
        const remainPoint = point - totalPrice;
        setRemainingPoint(remainPoint);
      })
      .catch((error) => {
        console.log("카트 아이템의 정보를 가져오는데 실패하였습니다.");
      })
      .finally();
  }

  function handlePurchaseItem() {}

  const playerIdWithoutAt = member.playerId.split("@")[0];

  return (
    // Member: 포인트, item: price
    <Container
      mt={20}
      border="0px solid black"
      borderRadius="20px"
      variant="ghost"
    >
      <VStack>
        <Heading mt={8} mb={20}>
          {playerIdWithoutAt}님의 구매 목록
        </Heading>

        <Table mb={5} border={"0px solid blue"}>
          <Tr>
            <Th
              textAlign={"center"}
              fontSize={"medium"}
              borderBottom={"3px solid darkGray"}
            >
              목록
            </Th>
            <Th
              textAlign={"center"}
              fontSize={"medium"}
              borderBottom={"3px solid darkGray"}
            >
              아이템명
            </Th>

            <Th
              textAlign={"center"}
              fontSize={"medium"}
              borderBottom={"3px solid darkGray"}
            >
              아이템 수량
            </Th>
            <Th
              textAlign={"center"}
              fontSize={"medium"}
              borderBottom={"3px solid darkGray"}
            >
              아이템 가격
            </Th>
          </Tr>
          {cartInfo.map((cartItem, index) => (
            <Tr>
              <Td textAlign={"center"}>{index + 1}</Td>
              <Td textAlign={"center"}>{cartItem.cartItemName}</Td>
              <Td textAlign={"center"}>{cartItem.cartItemCount}개</Td>
              <Td textAlign={"center"}>{cartItem.cartItemPrice} 포인트</Td>
            </Tr>
          ))}
        </Table>

        <HStack
          fontSize={"x-large"}
          width={"100%"}
          justify={"flex-end"}
          mb={20}
        >
          <Box fontWeight={"bold"}>아이템 총 금액 =</Box>
          <Box fontWeight={"bold"} textColor={"#C00"}>
            {totalPrice}
          </Box>
          <Box textColor={"#C00"} fontSize={"lg"} fontWeight={"bold"}>
            포인트
          </Box>
        </HStack>

        <Table mb={10} mt={5} border="0px solid blue">
          <Tr>
            <Th fontSize="large" padding="5px" textAlign="center">
              현재 내 포인트 <FontAwesomeIcon icon={faCircleMinus} />
            </Th>
            <Th fontSize="large" padding="5px" textAlign="center">
              아이템의 총 가격 <FontAwesomeIcon icon={faEquals} />
            </Th>
            <Th fontSize="large" padding="5px" textAlign="center">
              구매 후 포인트
            </Th>
          </Tr>
          <Tr>
            <Td textAlign="center">{member.point} 포인트</Td>
            <Td textAlign="center">{totalPrice} 포인트</Td>
            <Td textAlign="center">{remainingPoint} 포인트</Td>
          </Tr>
        </Table>

        <Button colorScheme="purple" mb={20} onClick={handlePurchaseItem}>
          아이템 구매하기
        </Button>
      </VStack>
    </Container>
  );
}
