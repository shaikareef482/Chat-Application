import React from "react";
import { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Singup = () => {
  const toast = useToast();
  const history = useHistory();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  const [comfirmPassword, setcomfirmPassword] = useState();
  const [show, setshow] = useState(false);

  const [pic, setpic] = useState();
  const [picLoading, setpicLoading] = useState(false);

  const handleshow = () => {
    setshow((prev) => !prev);
  };

  const submitHandler = async () => {
    setpicLoading(true);

    if (!name || !email || !password || !comfirmPassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      return;
    }
    if (password !== comfirmPassword) {
      toast({
        title: "Password does not match.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    console.log(name, email, password, pic);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );

      console.log(data);

      toast({
        title: "Registration Successful.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setpicLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setpicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setpicLoading(true);

    if (pics === undefined) {
      toast({
        title: "Please select an Image.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      return;
    }
    console.log(pics);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_present", "chat-app");
      data.append("cloud_name", "dvjqfqzui");
      fetch("https://api.cloudinary.com/v1_1/dvjqfqzui", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setpic(data.url.toString());
          console.log(data.url.toString());
          setpicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setpicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setpicLoading(false);
      return;
    }
  };
  return (
    <VStack spacing={"5px"}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="enter your Name"
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Addresss</FormLabel>
        <Input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="enter your Email Address"
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            placeholder="enter your Password"
          />
          <InputRightElement>
            <Button h="1.75rem" size="sm" onClick={handleshow}>
              {show ? "hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Comfirmation Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            onChange={(e) => {
              setcomfirmPassword(e.target.value);
            }}
            placeholder="enter your Password"
          />
          <InputRightElement>
            <Button h="1.75rem" size="sm" onClick={handleshow}>
              {show ? "hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Select profile image</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        w="100%"
        onClick={submitHandler}
        colorScheme="blue"
        style={{ marginTop: 15 }}
        isLoading={picLoading}
      >
        SingUp
      </Button>
    </VStack>
  );
};

export default Singup;
