import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Spinner,
    Stack,
    Switch,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";

function ItemEdit(props) {
    const [updateImage, setUpdateImage] = useState();
    const [item, updateItem] = useImmer(null);

    const { storeId } = useParams();
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        axios
            .get("/api/store/item/id/" + storeId)
            .then((response) => updateItem(response.data))
            .catch((error) => console.log(error))
            .finally();
    }, []);

    if (item === null) {
        return <Spinner />;
    }

  function handleSubmit(e) {
    axios
      .put("/api/store/item/edit/id/" + storeId, {
        itemName: item.itemName,
        itemCategory: item.itemCategory,
        itemFunction: item.itemFunction,
        itemPrice: item.itemPrice,
      })
      .then((response) => {
        toast({
          description: storeId + "번 아이템이 수정되었습니다.",
          status: "success",
        });
        navigate("/store/item/list");
      })
      .catch((error) =>
        toast({
          description: "수정 중 문제가 발생하였습니다.",
          status: "error",
        }),
      )
      .finally();
  }

    return (
        <Container>
            <Heading mt={7} mb={5}>
                {storeId}번 아이템 수정
            </Heading>

            {/*TODO: item image 넣기*/}

            <FormControl mb={4}>
                <FormLabel>아이템 분류</FormLabel>
                <Input
                    value={item.itemCategory}
                    onChange={(e) => {
                        updateItem((draft) => {
                            draft.itemCategory = e.target.value;
                        });
                    }}
                />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel>아이템명</FormLabel>
                <Input
                    value={item.itemName}
                    onChange={(e) => {
                        updateItem((draft) => {
                            draft.itemName = e.target.value;
                        });
                    }}
                    v
                />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel>아이템 기능</FormLabel>
                <Input
                    value={item.itemFunction}
                    onChange={(e) => {
                        updateItem((draft) => {
                            draft.itemFunction = e.target.value;
                        });
                    }}
                />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel>아이템 가격</FormLabel>
                <Input
                    value={item.itemPrice}
                    onChange={(e) => {
                        updateItem((draft) => {
                            draft.itemPrice = e.target.value;
                        });
                    }}
                />
            </FormControl>
            <ButtonGroup mt={5}>
                <Button onClick={handleSubmit} colorScheme="purple">
                    수정
                </Button>
                <Button onClick={() => navigate(-1)} colorScheme="purple">
                    취소
                </Button>
            </ButtonGroup>
        </Container>
    );
}

export default ItemEdit;
