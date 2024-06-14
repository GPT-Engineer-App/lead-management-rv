import { Container, VStack, Heading } from "@chakra-ui/react";
import RoleSelector from "../components/RoleSelector.jsx";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Heading>Sales Lead Management Tool</Heading>
        <RoleSelector />
      </VStack>
    </Container>
  );
};

export default Index;