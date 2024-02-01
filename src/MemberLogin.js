import { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  extendTheme,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spacer,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import axios from "axios";
import styles from "./WelcomePage.module.css";
import KakaoLoginComponent from "./KakaoLoginComponent";

export function MemberLogin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [imagePrefix, setImagePrefix] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  function handleLogin() {
    axios
      .post("/auth/login", { playerId: id, password })
      .then((response) => {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        console.log(response.data.accessToken);
        console.log(response.data.refreshToken);
        toast({
          description: "로그인 되었습니다.",
          status: "success",
        });
        navigate("/");
      })
      .catch(() => {
        toast({
          description: "아이디나 비밀번호가 틀렸습니다.",
          status: "error",
        });
      });
  }

  function handleSignUp() {
    navigate("/MemberSignUp");
  }

  return (
    <div className={styles.container}>
      <Box
        bg="pink.50"
        position="center"
        m={0}
        p={10}
        borderRadius={10}
        mt={100}
        w="40%"
        border="1px solid purple"
        boxShadow={"0 0 10px rgba(121, 40, 202, 0.5)"}
      >
        <Heading textAlign="center" mb={10} color="#66349C">
          Login
        </Heading>
        <FormControl mb={5} textAlign="center">
          {/*<FormLabel>아이디</FormLabel>*/}
          <Input
            type="text"
            value={id}
            placeholder="아이디를 email형식으로 입력하세요"
            maxW={"400px"}
            onChange={(e) => setId(e.target.value)}
          />
        </FormControl>
        <FormControl mb={5} textAlign="center">
          {/*<FormLabel>비밀번호</FormLabel>*/}
          <Input
            type="password"
            value={password}
            placeholder="비밀번호를 입력하세요"
            maxW={"400px"}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl textAlign="center">
          <Button colorScheme={"purple"} onClick={handleLogin} width={"400px"}>
            로그인
          </Button>
        </FormControl>
        <Box display="flex" justifyContent="center" mt={"10px"}>
          <KakaoLoginComponent />
        </Box>
        <Divider my={5} border="1px solid" borderColor="gray.400" />
        <FormControl textAlign="center">
          <Button
            mt={5}
            bg={"#E5507D"}
            color={"white"}
            _hover={{
              bg: "#E5087E",
              color: "white",
            }}
            onClick={handleSignUp}
            width={"400px"}
          >
            회원가입
          </Button>
        </FormControl>
        <Spacer h={10} />
      </Box>
    </div>
  );
}
