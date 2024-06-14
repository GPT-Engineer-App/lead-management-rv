import { useState } from "react";
import { Container, VStack, Heading, Input, Button, Text, Box, HStack, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Select, useToast, SimpleGrid } from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    leadSource: ""
  });
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
    notes: "",
    status: "new" // Default status
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
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
      notes: "",
      status: "new"
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

  const updateLeadStatus = (index, newStatus) => {
    const updatedLeads = leads.map((lead, i) => (i === index ? { ...lead, status: newStatus } : lead));
    setLeads(updatedLeads);
    toast({
      title: "Lead status updated.",
      description: "The lead status has been updated successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Heading>Admin Dashboard</Heading>
        <Box width="100%">
          <Heading size="md" mb={4}>Search Leads</Heading>
          <SimpleGrid columns={2} spacing={4} mb={4}>
            <Input
              placeholder="First Name"
              name="firstName"
              value={filter.firstName}
              onChange={handleFilterChange}
            />
            <Input
              placeholder="Last Name"
              name="lastName"
              value={filter.lastName}
              onChange={handleFilterChange}
            />
            <Input
              placeholder="Phone Number"
              name="phoneNumber"
              value={filter.phoneNumber}
              onChange={handleFilterChange}
            />
            <Input
              placeholder="Lead Source"
              name="leadSource"
              value={filter.leadSource}
              onChange={handleFilterChange}
            />
          </SimpleGrid>
        </Box>
        <Button onClick={onOpen} colorScheme="teal" mb={4}>
          Add New Lead
        </Button>
        <VStack spacing={4} width="100%">
          {leads.filter(lead => 
            lead.firstName.toLowerCase().includes(filter.firstName.toLowerCase()) &&
            lead.lastName.toLowerCase().includes(filter.lastName.toLowerCase()) &&
            lead.phoneNumber.includes(filter.phoneNumber) &&
            lead.leadSource.toLowerCase().includes(filter.leadSource.toLowerCase())
          ).map((lead, index) => (
            <Box key={index} borderWidth="1px" borderRadius="lg" p={4} width="100%">
              <Heading size="md" mb={2}>{lead.firstName} {lead.lastName}</Heading>
              <Text>Phone: {lead.phoneNumber}</Text>
              <Text>RV Type: {lead.rvType}</Text>
              <Text>Lead Source: {lead.leadSource}</Text>
              <Text>Salesman: {lead.salesman}</Text>
              <Text>Status: {lead.status}</Text>
              <Text>Notes: {lead.notes}</Text>
              <HStack width="100%" mt={4}>
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
                <Select
                  value={lead.status}
                  onChange={(e) => updateLeadStatus(index, e.target.value)}
                  placeholder="Update Status"
                  width="150px"
                  mr={2}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="in progress">In Progress</option>
                  <option value="closed">Closed</option>
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
              </HStack>
            </Box>
          ))}
        </VStack>
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
            <FormControl id="status" mb={4}>
              <FormLabel>Status</FormLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in progress">In Progress</option>
                <option value="closed">Closed</option>
              </Select>
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

export default AdminDashboard;