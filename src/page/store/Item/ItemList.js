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
      })
      .catch((error) => console.log(error))
      .finally();
  }, [currentPage]);

  return (
    <>
      <Button mr={5} onClick={() => navigate("/store/item/register")}>
        아이템 등록
      </Button>

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
              border="1px solid black"
              // key={item.fileUrl}
              width="100%"
              onClick={() => navigate(`/store/item/view`)}
            >
              <CardHeader>
                <Heading size="m">{item.itemName}</Heading>
              </CardHeader>
              <CardBody>
                <Box>{item.itemCategory}</Box>
                <Box>{item.itemFunction}</Box>
                <Box>{item.itemPrice}</Box>
              </CardBody>
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button w="60%" variant="solid" colorScheme="pink">
                    장바구니
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
