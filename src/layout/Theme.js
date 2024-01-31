import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "pink.50",
      },
    },
  },
  fonts: {
    heading: `''JalnanGothic'', sans-serif`,
    body: `'JalnanGothic', sans-serif`,
  },
});

export default theme;
