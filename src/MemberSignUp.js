import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
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
    <Flex
      direction="column"
      align="center" // 수직방향 가운데 정렬
      justify="center" // 수평방향 가운데 정렬
      minH="65vh" // 최소 높이
    >
      <Box border={"0px solid blue"} w={"35%"} position="center">
        <Spacer h={10} />
        <Card border="4px solid #B893BA" h={"400px"}>
          <CardHeader textAlign="center" color="#66349C" mt={10}>
            <Heading>회원 가입</Heading>
          </CardHeader>
          <CardBody>
            <FormControl>
              <Flex justify={"center"}>
                <Input
                  placeholder="ID : 이메일을 입력해주세요"
                  maxWidth={290}
                  mb={3}
                  value={playerId}
                  onChange={(e) => {
                    setPlayerId(e.target.value);
                    setIdAvailable(false);
                  }}
                />
                <Button
                  ml={1}
                  w={"100px"}
                  // colorScheme={"purple"}
                  bg={"#F2AE39"}
                  color={"white"}
                  _hover={{
                    bg: "#E57A08",
                    color: "white",
                  }}
                  isDisabled={idChecked}
                  onClick={handleIdCheck}
                >
                  중복 확인
                </Button>
              </Flex>
            </FormControl>
            <FormControl textAlign={"center"} mr={2} mb={10}>
              <Input
                maxWidth={390}
                type="password"
                value={password}
                placeholder="password : 비밀번호를 입력해주세요"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormErrorMessage>암호를 입력해 주세요.</FormErrorMessage>
            </FormControl>

            <FormControl textAlign={"center"}>
              <Button
                onClick={handleSubmit}
                w={390}
                colorScheme={"purple"}
                textAlign={"center"}
              >
                회원 가입
              </Button>
            </FormControl>
          </CardBody>
        </Card>
        <Spacer h={50} />
      </Box>
    </Flex>
  );
}
