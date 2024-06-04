import { useState } from "react";
import { Container, VStack, Text, Input, Button, HStack, Box, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [accounts, setAccounts] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [balance, setBalance] = useState("");
  const toast = useToast();

  const addAccount = () => {
    if (accountName === "" || balance === "") {
      toast({
        title: "Error",
        description: "Account name and balance are required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newAccount = { id: Date.now(), name: accountName, balance: parseFloat(balance) };
    setAccounts([...accounts, newAccount]);
    setAccountName("");
    setBalance("");
    toast({
      title: "Success",
      description: "Account added successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const deleteAccount = (id) => {
    setAccounts(accounts.filter((account) => account.id !== id));
    toast({
      title: "Success",
      description: "Account deleted successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Bank Account Management</Text>
        <HStack width="100%">
          <Input placeholder="Account Name" value={accountName} onChange={(e) => setAccountName(e.target.value)} />
          <Input placeholder="Balance" type="number" value={balance} onChange={(e) => setBalance(e.target.value)} />
          <IconButton aria-label="Add Account" icon={<FaPlus />} onClick={addAccount} />
        </HStack>
        <VStack spacing={2} width="100%">
          {accounts.map((account) => (
            <HStack key={account.id} width="100%" justifyContent="space-between" padding={2} borderWidth={1} borderRadius="md">
              <Box>
                <Text fontWeight="bold">{account.name}</Text>
                <Text>Balance: ${account.balance.toFixed(2)}</Text>
              </Box>
              <IconButton aria-label="Delete Account" icon={<FaTrash />} onClick={() => deleteAccount(account.id)} />
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
