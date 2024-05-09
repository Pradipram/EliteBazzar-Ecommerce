import { Button, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';
import { useDispatch } from 'react-redux';

import { addProduct } from '../../redux/actions/productActions';

const ItemInitialsValues = {
    productCode : "",
    title: "",
    quantity: "",
    price: "",
    discount: "",
    description:"",
    url:""
}

const AddItems = ({handleModalClose}) => {
    const [item,setItem] = useState(ItemInitialsValues);
    const dispatch = useDispatch();

    const uploadButtonHandler = async (e) =>{
        try{
            const imageFile = e.target.files[0];
            const options = {
                maxSizeKB: 100,
                maxWidthOrHeight : 1920,
                useWebWorker : true
            }
            const compressedFile = await imageCompression(imageFile,options);
            let reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onload = () => {
                console.log(reader.result);
                setItem({...item,'url':reader.result});
            }
        }
        catch(err){   
            console.log("something went wrong while uploading image. Please try again lator!");
        }
    }

    const handleInputChange = (e) => {
        // console.log(e.target.name,e.target.value);
        setItem({...item,[e.target.name]:e.target.value});
    }

    const handleAddItem = async (e) => {
        e.preventDefault();
        try{
            let isAnyFieldEmpty  = false;
            Object.keys(item).forEach((key) => {
                if(!item[key]){
                    let message = "Please Enter "+ key;
                    toast.error(message);
                    isAnyFieldEmpty = true;
                }
            });   
            if(!isAnyFieldEmpty){
                dispatch(addProduct(item,toast,handleModalClose));
                // toast.success("Product added Successfully");
            }
        }
        catch(err){
            toast.error(err);
        }
    }

  return (
    <form onSubmit={(e) => handleAddItem(e)}>
    <div className='AddItemBox'>
        <h1>Add Items</h1>
        <div>
            <span className='me-2' >Product Code: </span>
            <TextField variant='standard' required name='productCode' onChange={(e) => handleInputChange(e)} value={item.productCode}/>
        </div>
        <div>
            <span className='me-2'>Title: </span>
            <TextField variant='standard' required name='title' onChange={(e) => handleInputChange(e)}/>
        </div>
        <div>
            <span className='me-2'>Quantity: </span>
            <TextField variant='standard' required type='number' name='quantity' onChange={(e) => handleInputChange(e)}/>
        </div>
        <div>
            <span className='me-2'>Price: </span>
            <TextField variant='standard' type='number' required InputProps = {{startAdornment: <InputAdornment position='start'>₹</InputAdornment>}} name='price' onChange={(e) => handleInputChange(e)}/>
        </div>
        <div>
            <span className='me-2'>Discount: </span>
            <TextField variant='standard' type='number' required InputProps = {{endAdornment: <InputAdornment position='end'>%</InputAdornment>}} name='discount' onChange={(e) => handleInputChange(e)}/>
        </div>
        <div>
            <p>Description</p>
            <TextField variant='outlined' multiline rows={4} sx={{width:"100%"}} required name='description' onChange={(e) => handleInputChange(e)}/>
        </div>
        <label htmlFor="fileInput" style={{cursor:"pointer",color:"Blue"}}>Upload Image</label>
        <input type="file" accept='image/*' id='fileInput' style={{display:"none"}} onChange={(e) => uploadButtonHandler(e)}/>
        <Button type='submit' variant='contained' className='mt-2' >ADD ITEM</Button>
    </div>
    </form>
  )
}

export default AddItems