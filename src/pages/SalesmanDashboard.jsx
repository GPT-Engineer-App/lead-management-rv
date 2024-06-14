import { useState } from "react";
import { Container, VStack, Heading, Input, Button, List, ListItem, Text, Box, HStack, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Select, useToast } from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";

const SalesmanDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    rvType: "",
    leadSource: "",
    salesman: "",
    notes: ""
  });
  const toast = useToast();

  const deleteLead = (index) => {
    setLeads(leads.filter((_, i) => i !== index));
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(leads[index]);
  };

  const saveEdit = () => {
    const updatedLeads = leads.map((lead, index) => (index === editIndex ? editText : lead));
    setLeads(updatedLeads);
    setEditIndex(null);
    setEditText("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const saveLead = () => {
    setLeads([...leads, formData]);
    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      rvType: "",
      leadSource: "",
      salesman: "",
      notes: ""
    });
    onClose();
    toast({
      title: "Lead saved.",
      description: "The lead has been assigned to a salesman and saved successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const reassignLead = (index, newSalesman) => {
    const updatedLeads = leads.map((lead, i) => (i === index ? { ...lead, salesman: newSalesman } : lead));
    setLeads(updatedLeads);
    toast({
      title: "Lead reassigned.",
      description: "The lead has been reassigned successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Heading>Salesman Dashboard</Heading>
        <Input
          placeholder="Filter by first name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          mb={4}
        />
        <Button onClick={onOpen} colorScheme="teal">
          Add New Lead
        </Button>
        <List spacing={3} width="100%">
          {leads.filter(lead => lead.firstName.toLowerCase().includes(filter.toLowerCase())).map((lead, index) => (
            <ListItem key={index} borderWidth="1px" borderRadius="lg" p={4} display="flex" justifyContent="space-between" alignItems="center">
              {editIndex === index ? (
                <HStack width="100%">
                  <Input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <Button onClick={saveEdit} colorScheme="teal">
                    Save
                  </Button>
                </HStack>
              ) : (
                <>
                  <Text>{lead.firstName} {lead.lastName}</Text>
                  <Box>
                    <Select
                      value={lead.salesman}
                      onChange={(e) => reassignLead(index, e.target.value)}
                      placeholder="Reassign Salesman"
                      width="150px"
                      mr={2}
                    >
                      <option value="Salesman 1">Salesman 1</option>
                      <option value="Salesman 2">Salesman 2</option>
                      <option value="Salesman 3">Salesman 3</option>
                    </Select>
                    <IconButton
                      aria-label="Edit"
                      icon={<FaEdit />}
                      onClick={() => startEdit(index)}
                      mr={2}
                    />
                    <IconButton
                      aria-label="Delete"
                      icon={<FaTrash />}
                      onClick={() => deleteLead(index)}
                    />
                  </Box>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Lead</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="firstName" mb={4}>
              <FormLabel>First Name</FormLabel>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="lastName" mb={4}>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="phoneNumber" mb={4}>
              <FormLabel>Phone Number</FormLabel>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                maxLength={10}
              />
            </FormControl>
            <FormControl id="rvType" mb={4}>
              <FormLabel>RV Type</FormLabel>
              <Select
                name="rvType"
                value={formData.rvType}
                onChange={handleInputChange}
              >
                <option value="MotorHome Class A">MotorHome Class A</option>
                <option value="MotorHome Class B">MotorHome Class B</option>
                <option value="MotorHome Class C">MotorHome Class C</option>
                <option value="Fifth Wheel">Fifth Wheel</option>
                <option value="Travel Trailer">Travel Trailer</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>
            <FormControl id="leadSource" mb={4}>
              <FormLabel>Lead Source</FormLabel>
              <Input
                name="leadSource"
                value={formData.leadSource}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="salesman" mb={4}>
              <FormLabel>Salesman</FormLabel>
              <Select
                name="salesman"
                value={formData.salesman}
                onChange={handleInputChange}
              >
                <option value="Salesman 1">Salesman 1</option>
                <option value="Salesman 2">Salesman 2</option>
                <option value="Salesman 3">Salesman 3</option>
              </Select>
            </FormControl>
            <FormControl id="notes" mb={4}>
              <FormLabel>Notes</FormLabel>
              <Input
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={saveLead}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default SalesmanDashboard;