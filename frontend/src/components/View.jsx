import axios from "axios";
import React, { useState } from "react";
import { Box,Button, Table, Thead, Tbody, Tr,Th, Td, Input, Heading} from "@chakra-ui/react";

export const View = ({ data, fetchData }) => {
  const [edtStuId, setEditstu] = useState(null);
  const [editDataSt, setEditedData] = useState({});

  const handleDelete = async (edtStuId) => {
    // console.log(edtStuId,"studentId")
    try {
      await axios.delete(`${process.env.PORT}/${edtStuId}`);
      fetchData();
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
      await axios.patch(`${process.env.PORT}/${edtStuId}`,editDataSt);
      fetchData();
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
