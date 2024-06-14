import { useState } from "react";
import { Select, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const RoleSelector = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleLogin = () => {
    localStorage.setItem("userRole", role);
    navigate("/dashboard");
  };

  return (
    <VStack spacing={4}>
      <Select placeholder="Select role" value={role} onChange={handleRoleChange}>
        <option value="salesman">Salesman</option>
        <option value="admin">Admin</option>
      </Select>
      <Button onClick={handleLogin} colorScheme="teal">
        Login
      </Button>
    </VStack>
  );
};

export default RoleSelector;