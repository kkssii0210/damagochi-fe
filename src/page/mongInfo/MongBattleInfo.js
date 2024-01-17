import styles from "../../WelcomePage.module.css";
import React, {useEffect, useState} from 'react';
import {Box, Card, Center, Table, Th, Thead, Tr} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
//     mongId;health;tired; defense;strength;agility;debuff;win;lose;
export function MongBattleInfo() {
    useD
  const navigate= useNavigate();
  const [mong, setMong] = useState();
  const [health, setHealth] = useState();
    useEffect(() => {
        axios
            .get("/api/MongInfo/id")
            .then((response)=> {setHealth(response.data);})
            .catch((error)=> console.error(error))
    }, []);
  return (
    <div >
        {/*className={styles.container}*/}
        <Box border="1px solid orange" gap={5} justifyContent="space-evenly" display="flex">
        <Box border="1px solid skyblue">{mong.health}</Box>
        <Box border="1px solid skyblue"></Box>
        </Box>
    </div>
  );
}

export default MongBattleInfo;