"use client";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";
import { Autocomplete, Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { categories } from "@/data/index";
import DataTable from "./DataTable";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const itemData = docSnap.data();
      await setDoc(docRef, {quantity: itemData.quantity + parseInt(quantity, 10)}, {merge: true});
    } else {
      await setDoc(docRef, {quantity: parseInt(quantity, 10), category: selectedCategory}, {merge: true});
    };
    
    setItemName("");
    setQuantity(0);
    setSelectedCategory("");
    await updateInventory();
    handleClose();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const {quantity} = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, {quantity: quantity - 1}, {merge: true});
      };
    };

    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: "translate(-50%,-50%)"
          }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Autocomplete
            disablePortal
            required
            options={categories}
            sx={{ width: "100%" }}
            value={selectedCategory}
            onChange={(event, newValue) => setSelectedCategory(newValue)}
            renderInput={(params) => (<TextField {...params} label="Category" required />)}
          />
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              required
              label="Item Name"
              value={itemName}
              onChange={(e) =>
                setItemName(e.target.value)
              }
            />
            <TextField
              variant="outlined"
              fullWidth
              required
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => 
                setQuantity(e.target.value)
              }
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Typography variant="h3">
        Welcome to Inventory Management!
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          handleOpen();
        }}
      >
        Add New Item
      </Button>

      <Stack width="50%" direction="row" spacing={2}>
        <Autocomplete
          disablePortal
          required
          options={categories}
          sx={{ width: "100%" }}
          value={selectedCategory}
          onChange={(event, newValue) => setSelectedCategory(newValue)}
          renderInput={(params) => (<TextField {...params} label="Category" required />)}
        />
        <TextField
          variant="outlined"
          fullWidth
          required
          label="Item Name"
          value={itemName}
          onChange={(e) =>
            setItemName(e.target.value)
          }
        />
        <TextField
          variant="outlined"
          fullWidth
          required
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => 
            setQuantity(e.target.value)
          }
        />
        <Button
          variant="outlined"
          onClick={() => {
            addItem(itemName);
          }}
        >
          Add
        </Button>
      </Stack>

      {/* <Box border="1px solid #333">
        <Box
          width="800px"
          heigt="100px"
          bgcolor="#ADD8E6"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2" color="#333">
            Inventory
          </Typography>
        </Box>
        <Stack width="800px" height="300px" spacing={2} overflow="auto ">
          {inventory.map(({name, quantity}) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgcolor="#f0f0f0"
              padding={5}
            >
              <Typography variant="h5" color="#333" textAlign="center">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant="h5" color="#333" textAlign="center">
                Quantity: {quantity}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  onClick={() => {
                    addItem(name);
                  }}
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    removeItem(name);
                  }}
                >
                  Remove
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box> */}

      <DataTable inventory={inventory} addItem={addItem} removeItem={removeItem} />
    </Box>
  );
};

export default Inventory;