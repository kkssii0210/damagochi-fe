import styles from "./WelcomePage.module.css";
import TamagotchiImage from "./다마고찌.gif";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {Box, Button, ButtonGroup} from "@chakra-ui/react";
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
      // <div className={styles.container}>
      //     <Box h="90%" padding="5" display="flex" border="1px solid white">
      //         {/* 첫 번째 박스 */}
      //         <Box h="100%" border="1px solid red" marginRight="1">1</Box>
      //
      //         {/* 두 번째 박스와 세 번째 박스를 포함하는 컨테이너 */}
      //         <Box display="flex" flexDirection="column">
      //
      //             {/* 두 번째 박스 */}
      //             <Box flex="1" border="1px solid red" marginBottom="1">2</Box>
      //
      //             {/* 세 번째 박스 */}
      //             <Box flex="1" border="1px solid red">3</Box>
      //
      //         </Box>
      //     </Box>
      // </div>
      <div className={styles.container}>
          <Box h="90%" padding="5" display="flex" border="1px solid white">
              {/* 첫 번째 박스 */}
              <Box h="100%" border="1px solid red" marginRight="1">1</Box>

              {/* 두 번째 박스와 세 번째 박스를 포함하는 컨테이너 */}
              <Box display="flex" flexDirection="column">

                  {/* 두 번째 박스 */}
                  <Box flex="7" border="1px solid red" marginBottom="1">2</Box>

                  {/* 세 번째 박스 */}
                  <Box flex="3" border="1px solid red">3</Box>

              </Box>
          </Box>
      </div>


  );
}

// <div fontFamily="DungGeunMo" className={styles.logo}>
//     Damagochi
// </div>
// <img src={TamagotchiImage} alt="캐릭터" className={styles.character} />
// <Button
//     className={`${styles.button} ${isTokenPresent ? styles.hidden : ""}`}
//     onClick={handleClick}
// >
//     시작하기
// </Button>
//