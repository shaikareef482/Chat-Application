import React, { useState } from "react";
import {
  VStack,
  StackDivider,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import {useHistory} from 'react-router-dom'


const Login = () => {
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  const [show, setshow] = useState(false);
  const [loading, setloading] = useState(false);
  const history = useHistory();
  const handleshow = () => {
    setshow((prev) => !prev);
  };

  const submitHandler = async () => {
    setloading(false);

    if (!email || !password) {
      toast({
        title: "Plesae fill the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
      return;
    }

    console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo",JSON.stringify(data));
      setloading(false);
      history.push("/chats")
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
    }
  };
  return (
    <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4}>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="enter your Email Address"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text": "password"}
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
      <Button
        w="100%"
        onClick={submitHandler}
        style={{ marginTop: 15 }}
        colorScheme="blue"
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        w="100%"
        colorScheme="red"
        onClick={() => {
          setEmail("guest@example.com");
          setpassword("12345678");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
