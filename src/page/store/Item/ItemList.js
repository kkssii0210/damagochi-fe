import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function ItemList(props) {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate("/store/item/register")}>
      아이템 등록
    </Button>
  );
}

export default ItemList;
