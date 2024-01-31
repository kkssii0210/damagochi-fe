import React from 'react';
import {Box, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import MongTutorial from "./MongTutorial";
import MongStatusInfo from "./MongStatusInfo";
import HumanInfo from "./HumanInfo";

function Information(props) {
  return (
    <div>
      <Box border="1px solid black">
        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>

          <TabPanels>

            <TabPanel>
              <MongStatusInfo />
            </TabPanel>

            <TabPanel>
              <HumanInfo/>
            </TabPanel>

            <TabPanel>
              <MongTutorial />
            </TabPanel>

          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
}

export default Information;