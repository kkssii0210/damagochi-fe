import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Text
} from "@chakra-ui/react";
import React, {useEffect} from "react";
import {faList} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";

export function Cart(props) {

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
                    localStorage.setItem("accessToken", response.data);
                    console.log(response.data);
                })
                .catch()
                .finally();
        }
    }, []);


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
    >
      장바구니
    </Box>


      </>

  );
}

