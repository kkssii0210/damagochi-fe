import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ItemRegister(props) {
  const [imageFile, setImageFile] = useState();
  const [itemName, setItemName] = useState();
  const [itemFunction, setItemFunction] = useState();
  const [itemPrice, setItemPrice] = useState();

  const [itemCategory, setItemCategory] = useState();
  const [food, setFood] = useState();
  const [liquidMedicine, setLiquidMedicine] = useState();
  const [map, setMap] = useState();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleCategoryChange = (selectedCategory) => {
    setItemCategory(selectedCategory);
  };

  const storeData = {
    // imageFile
    itemCategory,
    itemName,
    itemFunction,
    itemPrice,
  };

  function handleSubmit() {
    setIsSubmitting(true);

    axios
      .post("/api/store/item/register", storeData)
      .then(() => {
        toast({
          description: "새 아이템이 저장되었습니다",
          status: "success",
        });
        navigate("/store/item/list");
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 400) {
          toast({
            description: "작성한 내용을 확인 해주세요",
            status: "error",
          });
        } else {
          toast({
            description: "등록 중 문제가 발생하였습니다.",
            status: "error",
          });
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <Center>
      <Card w={"lg"}>
        <CardHeader>
          <Heading>아이템 등록</Heading>
        </CardHeader>

        <CardBody>
          <FormControl mb={5}>
            <FormLabel>아이템 이미지</FormLabel>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImageFile(e.target.files)}
              placeholder="이미지 url을 입력하세요"
            ></Input>
          </FormControl>

          <FormControl mb={5}>
            <FormLabel>아이템 분류</FormLabel>
            <ButtonGroup>
              <HStack mr={3}>
                <Button
                  isActive={itemCategory === "food"}
                  value={food}
                  onClick={() => handleCategoryChange("food")}
                >
                  음식
                </Button>
                <Button
                  isActive={itemCategory === "liquidMedicine"}
                  value={liquidMedicine}
                  onClick={() => handleCategoryChange("liquidMedicine")}
                >
                  물약
                </Button>
                <Button
                  isActive={itemCategory === "map"}
                  value={map}
                  onClick={() => handleCategoryChange("map")}
                >
                  맵
                </Button>
              </HStack>
            </ButtonGroup>
          </FormControl>

          <FormControl mb={5}>
            <FormLabel>아이템명</FormLabel>
            <Input
              value={itemName}
              placeholder="아이템 이름을 입력하세요"
              onChange={(e) => setItemName(e.target.value)}
            />
          </FormControl>

          <FormControl mb={5}>
            <FormLabel>아이템 기능</FormLabel>
            <Input
              value={itemFunction}
              type="text"
              placeholder="ex) 근력강화, 공격력증가, 방어력 증가, 포만감 상승 등"
              onChange={(e) => setItemFunction(e.target.value)}
            />
          </FormControl>

          <FormControl mb={5}>
            <FormLabel>아이템 가격</FormLabel>
            <Input
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              type="number"
              min="0"
              placeholder="포인트"
            />
          </FormControl>
        </CardBody>

        <CardFooter>
          <Button
            isDisabled={isSubmitting}
            onClick={handleSubmit}
            colorScheme="pink"
          >
            등록
          </Button>
        </CardFooter>
      </Card>
    </Center>
  );
}

export default ItemRegister;
