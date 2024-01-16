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
    Container,
    Flex,
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
    VStack,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Cart } from "./Cart";

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

    function handleAddCart() {

    }

    return (
        <>
            <Cart />
            <Container border="0px solid black" w="40%" h="70%" mt="10%" mb="5%">
                {/*<Box>*/}
                {/*{fileURL.map((url) => (*/}
                {/*  <Box key={url}>*/}
                {/*    <Image src={url} border="1px solid black" />*/}
                {/*  </Box>*/}
                {/*))}*/}
                <Card
                    border="0px solid black"
                    // key={item.fileUrl}
                    // width="60%"
                    mr="15%"
                >
                    <CardHeader>
                        <Flex>
                            <Heading size="m" mr={10}>
                                {item.itemName}
                            </Heading>
                            <Button
                                colorScheme="purple"
                                mr={1}
                                onClick={() => navigate("/store/item/edit/id/" + storeId)}
                            >
                                편집
                            </Button>

                            <Button colorScheme="red" onClick={onOpen}>
                                삭제
                            </Button>
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Box mb={2}>분 류 : {item.itemCategory}</Box>
                        <Box mb={2}>기 능 : {item.itemFunction}</Box>
                        <Box>가 격 : {item.itemPrice} 포인트</Box>
                    </CardBody>
                    <CardFooter>
                        <ButtonGroup>
                            <Button w="70%" variant="solid" colorScheme="purple" onClick={handleAddCart}>
                                담기
                            </Button>
                            <Button
                                onClick={() => navigate(`/purchase/${item.storeId}`)}
                                w="70%"
                                variant="solid"
                                colorScheme="purple"
                            >
                                구매
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Delete Message</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>아이템을 삭제 하시겠습니까?</ModalBody>
                        <ModalFooter>
                            <Button onClick={onClose} colorScheme="purple" mr={1}>
                                닫기
                            </Button>
                            <Button onClick={handleDelete} colorScheme="red">
                                삭제
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                {/*</Box>*/}
            </Container>
        </>
    );
}

export default ItemView;
