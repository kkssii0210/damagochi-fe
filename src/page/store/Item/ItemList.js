import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  return (
    <>
      <Button mr={5} mt={5} onClick={() => navigate("/store/item/register")}>
        아이템 등록
      </Button>

      <Text mb={3} mt={3}>
        총 '{itemCount}개'의 아이템이 있습니다.
      </Text>
      <SimpleGrid
        border="1px solid black"
        placeItems="center"
        templateColumns="repeat(4, 1fr)" // 각 열에 4개의 카드를 나열
        gap={3}
      >
        {itemList === null ? (
          <Spinner />
        ) : (
          itemList.map((item) => (
            <Card
              border="0px solid black"
              // key={item.fileUrl}
              width="100%"
              onClick={() => navigate(`/store/item/view/id/${item.storeId}`)}
            >
              <CardHeader>
                <Heading size="sm">{item.storeId}.</Heading>
                <Heading size="m">{item.itemName}</Heading>
              </CardHeader>
              <CardBody>
                <Box>{item.itemCategory}</Box>
                <Box mb={2}>{item.itemFunction}</Box>
                <Box>{item.itemPrice} 포인트</Box>
              </CardBody>
              <CardFooter>
                <ButtonGroup>
                  <Button w="70%" variant="solid" colorScheme="purple">
                    담기
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))
        )}
      </SimpleGrid>
    </>
  );
}

export default ItemList;
