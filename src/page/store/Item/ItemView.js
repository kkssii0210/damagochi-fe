import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ItemView(props) {
  const { storeId } = useParams(); //URL에서 동적인 값을 컴포넌트 내에서 쓸때 사용. <Route>컴포넌트 내에서 렌더링되는 컴포넌트에서만 사용가능
  const [item, setItem] = useState(null);
  const [fileURL, setFileURL] = useState([]);

  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios
      .get("/api/store/item/view/id/" + storeId)
      .then((response) => setItem(response.data))
      .catch((error) => console.log(error))
      .finally(() => console.log("끝"));
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("/api/board/file/id/" + id)
  //     .then((response) => setFileURL(response.data))
  //     .catch((e) => console.log(e))
  //     .finally(() => console.log("끝"));
  // }, []);

  if (item === null) {
    return <Spinner />;
  }

  function handleDelete() {
    axios
      .delete("/api/store/item/delete/" + storeId)
      .then((response) => {
        toast({
          description: storeId + "번 아이템이 삭제되었습니다.",
          status: "success",
        });
        navigate("/store/item/list");
      })
      .catch((error) => {
        toast({
          description: "삭제 중 문제가 발생하였습니다.",
          status: "error",
        });
      })
      .finally(() => onClose());
  }

  return (
    <Center>
      <Box border="2px solid black" w="95%" h="90%" bg="white">
        {/*{fileURL.map((url) => (*/}
        {/*  <Box key={url}>*/}
        {/*    <Image src={url} border="1px solid black" />*/}
        {/*  </Box>*/}
        {/*))}*/}
        <Card
          border="0px solid black"
          // key={item.fileUrl}
          width="100%"
        >
          <CardHeader>
            <Heading size="m">{item.itemName}</Heading>
          </CardHeader>
          <CardBody>
            <Box mb={2}>분 류 : {item.itemCategory}</Box>
            <Box mb={2}>기 능 : {item.itemFunction}</Box>
            <Box>가 격 : {item.itemPrice} 포인트</Box>
          </CardBody>
          <CardFooter>
            <ButtonGroup>
              <Button w="70%" variant="solid" colorScheme="purple">
                담기
              </Button>
              <Button w="70%" variant="solid" colorScheme="purple">
                구매
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>

        <ButtonGroup>
          <Button
            colorScheme="blue"
            onClick={() => navigate("/store/item/edit/id/" + storeId)}
          >
            편집
          </Button>

          <Button colorScheme="red" onClick={onOpen}>
            삭제
          </Button>
        </ButtonGroup>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Message</ModalHeader>
            <ModalCloseButton />
            <ModalBody>아이템을 삭제 하시겠습니까?</ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>닫기</Button>
              <Button onClick={handleDelete} colorScheme="red">
                삭제
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Center>
  );
}

export default ItemView;
