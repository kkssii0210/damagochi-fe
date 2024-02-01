import styles from "./WelcomePage.module.css";
import TamagotchiImage from "./다마고찌.gif";
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export function WelcomePage() {
  const [isTokenPresent, setIsTokenPresent] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    navigate("/login");
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsTokenPresent(!!token);
  }, []);

  return (
    <div className={styles.container}>
      {/* 첫 번째 박스 */}

      {/* 두 번째 박스와 세 번째 박스를 포함하는 컨테이너 */}
      <Box w="100%" display="flex" flexDirection="column">
        {/* 두 번째 박스 */}
        <Box
          w="100%"
          textAlign="center "
          border="0px solid red"
          marginBottom="1"
        >
          <div fontFamily="DungGeunMo" className={styles.logo}>
            Damagochi
          </div>
        </Box>
        <img
          src={TamagotchiImage}
          border="0px solid red"
          alt="캐릭터"
          className={styles.character}
        />
        {/* 세 번째 박스 */}
        <Box
          textAlign="center"
          mt="5%"
          border="0px solid red"
          fontFamily="DungGeunMo"
        >
          <button
            className={`${styles.button} ${isTokenPresent ? styles.hidden : ""}`}
            onClick={handleClick}
          >
            <FontAwesomeIcon
              icon={faPlay}
              size="xl"
              style={{ color: "#ffef42" }}
            />
            Game Start!
          </button>
        </Box>
      </Box>
    </div>
  );
}
