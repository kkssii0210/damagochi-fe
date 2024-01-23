import { useState } from "react";
import {
  Box,
  Button,
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
    <Box bg="white" position="center" m={0} p={10} borderRadius={10} mt={100} w="60%" >
      <Heading textAlign="center" mb={10}>
        Login
      </Heading>
      <FormControl mb={5}>
        <FormLabel>아이디</FormLabel>
        <Input
          type="text"
          value={id}
          placeholder="아이디를 email형식으로 입력하세요"
          onChange={(e) => setId(e.target.value)}
        />
      </FormControl>
      <FormControl mb={5}>
        <FormLabel>비밀번호</FormLabel>
        <Input
          type="password"
          value={password}
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button colorScheme="blue" onClick={handleLogin}>
        로그인
      </Button>
      <Button colorScheme="blue" onClick={handleSignUp}>
        회원가입
      </Button>
      <Spacer h={20} />
    </Box>
    </div>
  );
}
