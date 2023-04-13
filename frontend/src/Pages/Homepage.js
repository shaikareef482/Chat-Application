import {
  Box,
  Container,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import React,{useEffect} from "react";
import Login from "../component/Authentication/Login";
import Singup from "../component/Authentication/Singup";
import { useHistory } from "react-router-dom";
const Homepage = () => {
  const history = useHistory();

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if(user) history.push("/chats");

},[history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        bg="white"
        p={3}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text color="black" fontFamily="work sans">
          Talk-A-Tive
        </Text>
      </Box>
      <Box w="100%" bg="white" borderRadius="lg"  >
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab>Login</Tab>
            <Tab>SingUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Singup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
