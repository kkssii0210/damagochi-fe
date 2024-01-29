import { Box, Button, Flex, Text, useToast, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "bootstrap/js/src/toast";

export function Cart({ cartItems, storeId }) {
  const navigate = useNavigate();
  const toast = useToast();
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
          handleGetCartItem(response.data.playerId); // playerId를 함수에 넘겨줘야함
        })
        .catch((reason) => (error) => {
          navigate("/"); //혹은 토스트 메시지 날리기
        })
        .finally();
    }
  }, [cartItems]);

  function handleGetCartItem(playerId) {
    axios
      .get("/api/cart/itemInfo", {
        params: { playerId: playerId },
      })
      .then((response) => setCartItem(response.data))
      .catch((error) => {
        console.log("카트 아이템의 정보를 가져오는데 실패하였습니다.");
      })
      .finally();
  }

  const playerIdWithoutAt = member.playerId.split("@")[0];

  function handleDeleteItem(index) {
    // cartItem이 배열이라 삭제 시 index 줌
    const deleteItem = cartItem[index];

    axios
      .delete("/api/cart/delete", {
        data: {
          playerId: deleteItem.playerId,
          itemName: deleteItem.cartItemName,
        },
      })
      .then(() => {
        toast({
          description:
            deleteItem.cartItemName + " 아이템이 장바구니에서 삭제되었습니다",
          status: "success",
        });
        handleGetCartItem(deleteItem.playerId); // 업데이트 위해 삭제 후 다시 카트정보 호출
      })
      .catch(() =>
        toast({
          description: "삭제 중 문제가 발생하였습니다",
          status: "error",
        }),
      )
      .finally();
  }

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
            {playerIdWithoutAt}님의 장바구니
          </Text>
          {cartItem.map((cartItem, index) => (
            <Flex key={index} alignItems="center">
              <Text mr={2}>{cartItem.cartItemName}</Text>
              <Text mr={2} color="gray.500" fontSize="sm">
                {cartItem.cartItemPrice}포인트
              </Text>
              <Text fontSize="sm" mr={4}>
                수량: {cartItem.cartItemCount}
              </Text>
              <Text>
                <FontAwesomeIcon
                  icon={faRectangleXmark}
                  onClick={() => handleDeleteItem(index)}
                  color="purple"
                />
              </Text>
            </Flex>
          ))}
          {cartItem.length > 0 && (
            <Button
              mt={5}
              colorScheme="purple"
              onClick={() => navigate("/purchase/" + storeId)}
            >
              아이템 구매
            </Button>
          )}
        </VStack>
      </Box>
    </>
  );
}
