import axios from "axios";
import React, { useState } from "react";
import { Box,Button, Table, Thead, Tbody, Tr,Th, Td, Input, Heading, useToast} from "@chakra-ui/react";

export const View = ({ data, fetchData }) => {
  const [edtStuId, setEditstu] = useState(null);
  const [editDataSt, setEditedData] = useState({});
  const toast = useToast();

  const handleDelete = async (edtStuId) => {
    // console.log(edtStuId,"studentId")
    try {
      await axios.delete(`${process.env.url}${edtStuId}`);
      fetchData();
      toast({
        title: "Student Deleted",
        description: "Student data has been Deleted",
        status: "warning",
        duration: 3000, 
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (studentId) => {
    setEditstu(studentId);
    setEditedData({...data.find((student) => student._id == studentId), });
  };

  const handleSaveUpdate = async () => {
    try {
      await axios.patch(`${process.env.url}/${edtStuId}`,editDataSt);
      fetchData();
      toast({
        title: "Student Edited",
        description: "Student data has been Edited",
        status: "success",
        duration: 3000, 
        isClosable: true,
      });
      setEditstu(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelUpdate = () => {
    setEditstu(null);
    setEditedData({});
  };

 

  return (
    <Box>
      <Heading as="h1" size="lg" mb={6} textAlign="center">Student Data </Heading>
      <Table variant="striped" colorScheme="teal" size="md">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Major</Th>
            <Th>Address</Th>
            <Th>Enrollment Date</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((ele) => (
            <Tr key={ele._id}>
              <Td>
                {edtStuId ==ele._id ? (
                  <Input value={editDataSt.name} onChange={(e) => setEditedData({ ...editDataSt, name: e.target.value }) }  />
                ):(
                  ele.name
                )}
              </Td>
              <Td>
                {edtStuId ==ele._id ? (
                  <Input value={editDataSt.major}
                    onChange={(e) => setEditedData({ ...editDataSt, major: e.target.value }) } />
                ) :( ele.major )}
              </Td>
              <Td>
                {edtStuId ==ele._id ? (
                  <Input value={editDataSt.address}
                    onChange={(e) => setEditedData({ ...editDataSt, address: e.target.value }) } />
                ) :( ele.address )}
              </Td>
              <Td>
                {edtStuId ==ele._id ? (
                  <Input value={editDataSt.enrollmentDate} onChange={(e) =>
                      setEditedData({...editDataSt, enrollmentDate: e.target.value, })  } />
                ) : ( ele.enrollmentDate  )}
              </Td>
              <Td>
                {edtStuId ==ele._id ? (
                  <>
                    <Button onClick={handleSaveUpdate} colorScheme="green"> Save </Button>
                    <Button onClick={handleCancelUpdate} colorScheme="red"> Cancel</Button>
                  </>
                ) : (
                  <Button onClick={() => handleUpdate(ele._id)} colorScheme="blue" > Edit</Button>
                )}
                <Button onClick={() => handleDelete(ele._id)} colorScheme="red"> Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      
    </Box>
  );
};
