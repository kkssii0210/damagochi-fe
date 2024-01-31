import styles from "./WelcomePage.module.css";
import TamagotchiImage from "./다마고찌.gif";
import {useNavigate} from "react-router";
import React, {useEffect, useState} from "react";
import {Box, Button, ButtonGroup} from "@chakra-ui/react";
import NavBar from "./page/component/NavBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear, faHouseChimney} from "@fortawesome/free-solid-svg-icons";

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
            <Box mt={12} w="90%" h="90%" mr="25px" padding="5" display="flex" border="0px solid white">
                {/* 첫 번째 박스 */}
                <Box w="5%" h="100%" border="0px solid red" marginRight="1">
                    {/*<NavBar/>*/}
                    {/*<ButtonGroup h="100%" justifyContent="center" flexDirection="column" display="flex" >*/}
                    {/*    <Button><FontAwesomeIcon icon={faHouseChimney} style={{color: "#9abffe",}} /></Button>*/}
                    {/*    <Button><FontAwesomeIcon icon={faGear} style={{color: "#74C0FC",}} /></Button>*/}

                    {/*</ButtonGroup>*/}
                </Box>

                {/* 두 번째 박스와 세 번째 박스를 포함하는 컨테이너 */}
                <Box w="100%" display="flex" flexDirection="column">

                    {/* 두 번째 박스 */}
                    <Box w="100%" textAlign="center "  mt ="-5.5rem" border="0px solid red" marginBottom="1">
                        <div fontFamily="DungGeunMo" className={styles.logo}>
                            Damagochi
                        </div>
                    </Box>
                    <img src={TamagotchiImage} border="0px solid red" alt="캐릭터" className={styles.character}/>

                    {/* 세 번째 박스 */}
                    <Box w="40%" textAlign="center" ml="25%" mt="5%" border="0px solid red"><Button
                        className={`${styles.button} ${isTokenPresent ? styles.hidden : ""}`}
                        onClick={handleClick}
                    >
                        시작하기
                    </Button></Box>


                </Box>
            </Box>
        </div>


    );
}


//