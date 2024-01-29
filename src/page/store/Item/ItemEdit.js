import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import { CloseIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";

function ItemEdit(props) {
  const [updateFiles, setUpdateFiles] = useState();
  const [item, updateItem] = useImmer(null);
  const [itemFiles, setItemFiles] = useState(null);

  const { storeId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    axios
      .get("/api/store/item/id/" + storeId)
      .then((response) => updateItem(response.data))
      .catch((error) => console.log(error))
      .finally();
  }, [updateFiles]);

  if (item === null) {
    return <Spinner />;
  }

  function handleSubmit(e) {
    const formData = new FormData();
    let leng = 0;
    updateFiles && (leng = updateFiles.length);
    for (let i = 0; i < leng; i++) {
      formData.append("newItemFiles", updateFiles[i]);
    }

    formData.append("itemName", item.itemName);
    formData.append("itemCategory", item.itemCategory);
    formData.append("itemFunction", item.itemFunction);
    formData.append("itemPrice", item.itemPrice);

    axios
      .post("/api/store/item/edit/id/" + storeId, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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

  // 수정 시, 아이템 파일 삭제
  function handleDeleteFile(index) {
    const fileId = item.itemFiles[index].id;

    axios.delete("/api/store/deleteFile/" + fileId).then((response) => {
      updateItem((draft) => {
        draft.itemFiles.splice(index, 1);
      });
    });
  }

  return (
    <Container>
      <Heading mt={7} mb={10}>
        {item.storeId}. {item.itemName} 아이템 수정
      </Heading>

      <FormControl mb={10}>
        <FormLabel>아이템 이미지</FormLabel>
        <Flex>
          {item.itemFiles.map((e, index) => (
            <Box key={e.id} border={"0px solid green"} mb={10}>
              <IconButton
                size="xs"
                colorScheme="red"
                color="white"
                icon={<CloseIcon />}
                top={8}
                left={125}
                onClick={() => handleDeleteFile(index)}
                // position="absolute"
              />
              <Image mr={3} width="150px" height="100px" src={e.fileUrl} />
            </Box>
          ))}
        </Flex>
        <Flex>
          <Box mb={3} mr={3}>
            <FontAwesomeIcon icon={faFolderPlus} color="gray" size={"2xl"} />
          </Box>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setUpdateFiles(e.target.files)}
          ></Input>
        </Flex>
      </FormControl>

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
