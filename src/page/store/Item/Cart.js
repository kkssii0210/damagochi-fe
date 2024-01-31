import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
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
  const [boxHeight, setBoxHeight] = useState(10);

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
      .then((response) => {
        setCartItem(response.data);
        setBoxHeight(15 + response.data.length * 7);
      })
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
        border="4px solid #B893BA"
        borderRadius={20}
        width="18%"
        height={`${boxHeight}%`}
        bg="rgba(255, 255, 255, 0.8)"
        opacity={0.8}
        zIndex={50}
        position="fixed"
        right={15}
        top="25%"
        textAlign="center"
        p={4}
      >
        <VStack spacing={4}>
          <Text fontSize="lg" fontWeight="bold" mb={5} color="black">
            🧺 {playerIdWithoutAt}님의 장바구니
          </Text>
          {cartItem.map((cartItem, index) => (
            <Flex key={index} alignItems="center">
              <Text mr={2} color="black">
                {cartItem.cartItemName}
              </Text>
              <Text mr={2} color="#B893BA" fontSize="sm">
                {cartItem.cartItemPrice}포인트
              </Text>
              <Text fontSize="sm" mr={4} color="black">
                수량: {cartItem.cartItemCount}
              </Text>
              <Text>
                <FontAwesomeIcon
                  icon={faRectangleXmark}
                  onClick={() => handleDeleteItem(index)}
                  color="#AFAFB8"
                />
              </Text>
            </Flex>
          ))}
          <Divider border={"1px solid gray"} />
          {cartItem.length > 0 && (
            <Button
              mt={5}
              bg={"palevioletred"}
              color={"white"}
              _hover={{
                bg: "#E5087E",
                color: "white",
              }}
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
