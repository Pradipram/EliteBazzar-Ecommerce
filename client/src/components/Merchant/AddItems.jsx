import { Button, InputAdornment, TextField, Autocomplete } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
import { useDispatch } from "react-redux";
import {Loader} from "@p__radip/react-loader";

import { addProduct } from "../../redux/actions/productActions";

const ItemInitialsValues = {
  productCode: "",
  title: "",
  quantity: "",
  price: "",
  discount: "",
  description: "",
  url: "",
  tag: [], // Initialize tag as an empty array for multiple selections
};

const tagOptions = [
  "Grocery",
  "Mobile",
  "Fashion",
  "Electronics",
  "Home",
  "Appliances",
  "Beauty",
  "Toys",
]; // Example tags

const AddItems = ({ handleModalClose }) => {
  const [item, setItem] = useState(ItemInitialsValues);
  const [imageName, setImageName] = useState("Upload Image");
  const [addItemLoader, setAddItemLoader] = useState(false);
  const dispatch = useDispatch();

  const uploadButtonHandler = async (e) => {
    try {
      const imageFile = e.target.files[0];
      if (imageFile) {
        setImageName(imageFile.name); // Set the image name
        const options = {
          maxSizeKB: 100,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(imageFile, options);
        let reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = () => {
          setItem({ ...item, url: reader.result });
        };
      }
    } catch (err) {
      console.log("Error uploading image.");
    }
  };

  const handleInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleTagChange = (event, value) => {
    setItem({ ...item, tag: value });
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      let isAnyFieldEmpty = false;
      Object.keys(item).forEach((key) => {
        if (!item[key]) {
          let message = "Please Enter " + key;
          toast.error(message);
          isAnyFieldEmpty = true;
        }
      });
      if (!isAnyFieldEmpty) {
        setAddItemLoader(true);
        dispatch(addProduct(item, toast, handleModalClose));
        setAddItemLoader(false);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div>
        {
            addItemLoader ? <Loader/>:
      <form onSubmit={(e) => handleAddItem(e)}>
        <div className="AddItemBox">
          <h1>Add Items</h1>
          <div>
            <span className="me-2">Product Code: </span>
            <TextField
              variant="standard"
              required
              name="productCode"
              onChange={(e) => handleInputChange(e)}
              value={item.productCode}
            />
          </div>
          <div>
            <span className="me-2">Title: </span>
            <TextField
              variant="standard"
              required
              name="title"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <span className="me-2">Quantity: </span>
            <TextField
              variant="standard"
              required
              type="number"
              name="quantity"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <span className="me-2">Price: </span>
            <TextField
              variant="standard"
              type="number"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
              name="price"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <span className="me-2">Discount: </span>
            <TextField
              variant="standard"
              type="number"
              required
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              name="discount"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <span className="me-2">Tags: </span>
            <Autocomplete
              multiple
              options={tagOptions}
              getOptionLabel={(option) => option}
              value={item.tag}
              onChange={handleTagChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  placeholder="Select Tags"
                />
              )}
            />
          </div>
          <div>
            <p>Description</p>
            <TextField
              variant="outlined"
              multiline
              rows={4}
              sx={{ width: "100%" }}
              required
              name="description"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <label
            htmlFor="fileInput"
            style={{ cursor: "pointer", color: "Blue" }}
          >
            {imageName}
          </label>

          <input
            type="file"
            accept="image/*"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => uploadButtonHandler(e)}
          />
          <Button type="submit" variant="contained" className="mt-2">
            ADD ITEM
          </Button>
        </div>
      </form>}
    </div>
  );
};

export default AddItems;
