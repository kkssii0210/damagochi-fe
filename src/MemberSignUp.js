import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export function MemberSignUp() {
  const [playerId, setPlayerId] = useState("");
  const [password, setPassword] = useState("");
  const [idAvailable, setIdAvailable] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  let sameOriginId = false;
  let idChecked = sameOriginId || idAvailable;
  function handleSubmit() {
    axios
      .post("/member/login", {
        playerId,
        password,
      })
      .then(() => {
        toast({
          description: "회원가입이 완료되었습니다",
          status: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast({
            description: "입력값을 확인해주세요",
            status: "error",
          });
        } else {
          toast({
            description: "입력값을 확인해주세요",
            status: "error",
          });
        }
        toast({
          description: "가입중에 오류가 발생하였습니다.",
          status: "error",
        });
      })
      .finally(() => console.log("done"));
  }
  function handleIdCheck() {
    const params = new URLSearchParams();
    params.set("playerId", playerId);
    axios
      .get("/member/check", {
        params: params,
      })
      .then(() => {
        setIdAvailable(false);
        toast({
          description: "이미 사용 중인 Id입니다.",
          status: "warning",
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIdAvailable(true);
          toast({
            description: "사용 가능한 Id입니다.",
            status: "success",
          });
        }
      });
  }
  return (
    <Box>
      <Spacer h={10} />
      {/* card안에 있던 내용//backgroundColor={"#fae0ea"} overflow={"hidden"}*/}
      <Card>
        {/*backgroundColor="#b4c0ea":헤더에 있던거*/}
        <CardHeader>
          <Heading>회원 가입</Heading>
        </CardHeader>
        <CardBody>
          <FormControl>
            <FormLabel>아이디</FormLabel>
            <Flex>
              <Input
                placeholder="이메일을 입력해주세요"
                maxWidth={200}
                value={playerId}
                onChange={(e) => {
                  setPlayerId(e.target.value);
                  setIdAvailable(false);
                }}
              />
              <Button isDisabled={idChecked} onClick={handleIdCheck}>
                중복확인
              </Button>
            </Flex>
          </FormControl>
          <FormControl>
            <FormLabel>비밀번호</FormLabel>
            <Input
              maxWidth={250}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormErrorMessage>암호를 입력해 주세요.</FormErrorMessage>
          </FormControl>
        </CardBody>
        <CardFooter>
          <Button onClick={handleSubmit}>
            {/*backgroundColor="#b4c0ea": 버튼 온 클릭뒤에 있던거*/}
            회원 가입
          </Button>
        </CardFooter>
      </Card>
      <Spacer h={50} />
    </Box>
  );
}
