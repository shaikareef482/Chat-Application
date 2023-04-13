import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import Chatbox from "../component/Chatbox";
import MyChats from "../component/MyChats";
import SideDrawer from "../component/miscellaneous/SideDrawer";
const ChatsPage = () => {
  const [fetchAgain,setFetchAgain]=useState(false);
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  );
};

export default ChatsPage;
