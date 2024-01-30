import styles from "./WelcomePage.module.css";
import TamagotchiImage from "./다마고찌.gif";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Tooltip } from "@chakra-ui/react";
import NavBar from "./page/component/NavBar";

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
      <div fontFamily="DungGeunMo" className={styles.logo}>
        Damagochi
      </div>
      <NavBar />
      <img src={TamagotchiImage} alt="캐릭터" className={styles.character} />
      <button
        className={`${styles.button} ${isTokenPresent ? styles.hidden : ""}`}
        onClick={handleClick}
      >
        시작하기
      </button>
    </div>
  );
}
