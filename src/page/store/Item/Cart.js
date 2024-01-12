import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

export function Cart(props) {
    return (
        <Box
            border="2px solid black"
            width="13%"
            height="50%"
            bg="white"
            zIndex={50}
            position="fixed"
            right={15}
            top="20%"
            textAlign="center"
        >
            장바구니
        </Box>
    );
}
