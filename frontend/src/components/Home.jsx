import React, { useEffect, useState } from "react";
import axios from "axios";
import { View } from "./View";
import {Box,Heading,VStack,FormControl,FormLabel,Input,Button, useToast,} from "@chakra-ui/react";


export const Home = () => {
  const [data, setData] = useState([]);
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    major: "",
    address: "",
    enrollmentDate: "",
  });

  useEffect(() => {
    fetchData();
  }, [formData]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.url}`);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
 // date validation
 const dateValid = (selectedDate) => {
  const currentDate = new Date();
  const selectedDateObj = new Date(selectedDate);
  return selectedDateObj >= currentDate;
};
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!dateValid(formData.enrollmentDate)) {
      toast({
        title: "Invalid Date",
        description: "Please select present or future date.",
        status: "error",
        duration: 3000, 
        isClosable: true,
      });
      return;
      
    }
   

    axios.post(`${process.env.url}add`,formData)
      .then((res) => {
        setFormData({name: "",major: "",address: "",enrollmentDate: "",});
        toast({
          title: "Student Added",
          description: "New student has been added",
          status: "success",
          duration: 3000, 
          isClosable: true,
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box p={4} display="flex" justifyContent="center" alignItems="center" >
      <VStack align="center" spacing={6} width="100%">
        <Heading as="h1" size="lg" mb={6}>Student Management System</Heading>
        <Box border="1px"  borderColor="gray.300"borderRadius="md" p={6}width="40%" >
          <form onSubmit={handleSubmit} width="100%">
            <VStack align="stretch" spacing={4}>
              <FormControl>
                <FormLabel>Name:</FormLabel>
                <Input type="text" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </FormControl>

              <FormControl>
                <FormLabel>Major:</FormLabel>
                <Input type="text"  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })} />
              </FormControl>

              <FormControl>
                <FormLabel>Address:</FormLabel>
                <Input  type="text" value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}/>
              </FormControl>

              <FormControl>
                <FormLabel>Enrollment Date:</FormLabel>
                <Input type="date" value={formData.enrollmentDate}  onChange={(e) =>
                    setFormData({ ...formData, enrollmentDate: e.target.value }) }  />
              </FormControl>

              <Button type="submit" colorScheme="teal" mt={4} width="100%" > Submit </Button>
            </VStack>
          </form>
        </Box>

        <Box width="80%" mt={6}> 
          <View data={data} fetchData={fetchData} />
        </Box>
      </VStack>
    </Box>
  );
};
