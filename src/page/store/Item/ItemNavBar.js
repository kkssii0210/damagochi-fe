import React from "react";
import * as PropTypes from "prop-types";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function ItemNavBar(props) {
  const navigate = useNavigate();

  return <Button size="lg" onClick={() => navigate("")}></Button>;
}

export default ItemNavBar;
