import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Circle,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Cart } from "./Cart";

function ItemList(props) {
  const [itemList, setItemList] = useState(null);
  const [itemCount, setItemCount] = useState();
  const navigate = useNavigate();
  const [fileUrl, setFileUrl] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get(`/api/store/item/list`)
      .then((response) => {
        setItemList(response.data.content);
        setItemCount(response.data.totalElements);
      })
      .catch((error) => console.log(error))
      .finally();
  }, [currentPage]);

  function handleAddCart() {}

  return (
    <>
      <Button
        ml={2}
        mr={5}
        mt={5}
        mb={8}
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        color={"white"}
        _hover={{
          bgGradient: "linear(to-l, #AB47BC, #FF4081)",
          color: "white",
        }}
        onClick={() => navigate("/Order")}
      >
        포인트 결제하기
      </Button>
      <Button
        mr={5}
        mt={5}
        mb={8}
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        color={"white"}
        _hover={{
          bgGradient: "linear(to-l, #AB47BC, #FF4081)",
          color: "white",
        }}
        onClick={() => navigate("/store/item/register")}
      >
        아이템 등록
      </Button>

      <Text mb={5} mt={3}>
        총 '{itemCount}개'의 아이템이 있습니다.
      </Text>
      <SimpleGrid
        border="0px solid black"
        // placeItems="center"
        templateColumns="repeat(4, 1fr)" // 각 열에 4개의 카드를 나열
        gap={3}
        mr="20%"
      >
        {itemList === null ? (
          <Spinner />
        ) : (
          <>
            <Cart />

            {itemList.map((item, index) => (
              <Card
                key={index}
                border="4px solid #CFA5D1"
                borderRadius={"5%"}
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                boxShadow={"0 0 10px rgba(121, 40, 202, 0.5)"}
                width="75%"
                onClick={() => navigate(`/store/item/view/id/${item.storeId}`)}
              >
                <CardHeader>
                  <Heading size="sm">{index + 1}.</Heading>
                  <Flex>
                    {item.itemFiles &&
                      item.itemFiles.map((e, index) => (
                        <Box key={e.id} border={"0px solid green"}>
                          {index === 0 && (
                            <Image
                              width="130px"
                              height="100px"
                              // objectFit="cover"
                              src={e.fileUrl}
                            />
                          )}
                        </Box>
                      ))}
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Box fontWeight="bold" fontSize="large">
                    {item.itemName}
                  </Box>
                  {/*<Box>{item.itemCategory}</Box>*/}
                  <Box mb={2}>{item.itemFunction}</Box>
                  <Box>{item.itemPrice} 포인트</Box>
                </CardBody>
                {/*<CardFooter>*/}
                {/*  <ButtonGroup>*/}
                {/*    <Button*/}
                {/*      variant="solid"*/}
                {/*      colorScheme="purple"*/}
                {/*      onClick={() => handleAddCart()}*/}
                {/*    >*/}
                {/*      담기*/}
                {/*    </Button>*/}
                {/*  </ButtonGroup>*/}
                {/*</CardFooter>*/}
              </Card>
            ))}
          </>
        )}
      </SimpleGrid>
    </>
  );
}

export default ItemList;
