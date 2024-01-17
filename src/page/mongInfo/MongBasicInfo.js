import React, {useState} from 'react';
import {Box, FormControl, FormLabel, Input} from "@chakra-ui/react";

export function MongBasicInfo(props) {
  const [mong, setMong] = useState(null);
  const [mongId, setMongId] = useState();
  const [name, setName] = useState();
  const [birth, setBirth] = useState();
  const [evolution, setEvolution] = useState();
  const [level, setLevel] = useState();
  const [attribute, setAttribute] = useState();

  return (
    <>
    <Box>
      <FormControl>
        <FormLabel>Mong Name</FormLabel>
        <Input value={mong.name} readOnly/>
      </FormControl>
    </Box>
    </>
  );
}

export default MongBasicInfo;