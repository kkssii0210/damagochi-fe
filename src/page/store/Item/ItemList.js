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
  const [itemInfo, setItemInfo] = useState();

  // function handleGetItemInfo() {
  //   axios
  //     .get("/api/store/itemInfo")
  //     .then((response) =>
  //         setItemInfo(response.data.content));
  // }

  useEffect(() => {
    axios.get("/api/store/itemInfo").then((response) => {
      setItemInfo(response.data);

      axios
        .get(`/api/store/item/list`, {
          params: {
            storeId: response.data.storeId,
            category: response.data.itemCategory,
          },
        })
        .then((response) => {
          const items = response.data.content;
          // setItemList(items);

          const itemFile = items.map((item) => {
            const fileUrls = item.itemFiles.map((file) => file.fileUrl);
            return { ...item, fileUrls };
          });

          setItemList(itemFile);
          setItemCount(response.data.totalElements);
        })
        .catch((error) => console.log(error))
        .finally();
    });
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
        border="0px solid black"
        placeItems="center"
        templateColumns="repeat(4, 1fr)" // 각 열에 4개의 카드를 나열
        gap={3}
        mr="15%"
      >
        {itemList === null ? (
          <Spinner />
        ) : (
          <>
            <Cart />

            {itemList.map((item, index) => (
              <Card
                key={index}
                // key={item.fileUrl}
                border="0px solid black"
                // key={item.fileUrl}
                width="100%"
                onClick={() => navigate(`/store/item/view/id/${item.storeId}`)}
              >
                <CardHeader>
                  <Heading size="sm">{index + 1}.</Heading>
                  <Center>
                    {item.fileUrls &&
                      item.fileUrls.map((url, index) => (
                        <Image
                          src={url}
                          borderRadius="xl"
                          style={{
                            width: "200px",
                            height: "200px",
                            objectFit: "cover",
                          }}
                        />
                      ))}
                  </Center>
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
            ))}
          </>
        )}
      </SimpleGrid>
    </>
  );
}

export default ItemList;
