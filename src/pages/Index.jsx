import { useState } from "react";
import { Container, VStack, Heading, Input, Button, List, ListItem, Text, Box, HStack, IconButton } from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [leads, setLeads] = useState([]);
  const [newLead, setNewLead] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const addLead = () => {
    if (newLead.trim() !== "") {
      setLeads([...leads, newLead]);
      setNewLead("");
    }
  };

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

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Heading>Sales Lead Management Tool</Heading>
        <HStack width="100%">
          <Input
            placeholder="Enter new lead"
            value={newLead}
            onChange={(e) => setNewLead(e.target.value)}
          />
          <Button onClick={addLead} colorScheme="teal">
            Add Lead
          </Button>
        </HStack>
        <List spacing={3} width="100%">
          {leads.map((lead, index) => (
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
                  <Text>{lead}</Text>
                  <Box>
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
    </Container>
  );
};

export default Index;