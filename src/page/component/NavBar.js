import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function NavBar(props) {
  const navigate = useNavigate();

  return (
    <Flex>
      <Button variant="ghost" size="lg" onClick={() => navigate("/")}>
        Home
      </Button>
      <Button
        variant="ghost"
        size="lg"
        onClick={() => navigate("/store/item/list")}
      >
        상점가기
      </Button>
    </Flex>
  );
}

export default NavBar;
