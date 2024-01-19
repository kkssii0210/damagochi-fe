import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router";
import {
  faFontAwesome,
  faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Cart(props) {
  const navigate = useNavigate();
  const [member, setMember] = useState({ playerId: "" });
  const [cartItem, setCartItem] = useState([]);

  //member.playerId를 이용하기 위해 중간에 axios요청을 함.
  useEffect(() => {
    if (localStorage.getItem("accessToken") !== null) {
      console.log(localStorage.getItem("accessToken"));
      axios
        .get("/api/cart/accessToken", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => {
          setMember(response.data);
          axios
            .get("/api/cart/itemInfo", {
              params: { playerId: response.data.playerId },
            })
            .then((response) => setCartItem(response.data))
            .catch((error) => {
              console.log("카트 아이템의 정보를 가져오는데 실패하였습니다.");
            })
            .finally();
        })
        .catch((reason) => (error) => {
          navigate("/"); //혹은 토스트 메시지 날리기
        })
        .finally();
    }
  }, []);

  const playerIdWithoutAt = member.playerId.split("@")[0];

  function handleDeleteItem() {}

  return (
    <>
      <Box
        border="2px solid black"
        width="13%"
        height="50%"
        bg="white"
        zIndex={50}
        position="fixed"
        right={15}
        top="20%"
        textAlign="center"
        p={4}
      >
        <VStack spacing={2}>
          <Text fontSize="lg" fontWeight="bold" mb={5}>
            {playerIdWithoutAt} 님의 장바구니
          </Text>
          {cartItem.map((cartItem, index) => (
            <Flex key={index} alignItems="center">
              <Text mr={2}>{cartItem.cartItemName}</Text>
              <Text mr={2} color="gray.500" fontSize="sm">
                {cartItem.cartItemPrice}포인트
              </Text>
              <Text fontSize="sm">수량: {cartItem.cartItemCount}</Text>
              <Text>
                <FontAwesomeIcon
                  icon={faRectangleXmark}
                  onClick={handleDeleteItem}
                  color="purple"
                />
              </Text>
            </Flex>
          ))}
        </VStack>
      </Box>
    </>
  );
}
