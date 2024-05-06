import { Button, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'

const AddItems = () => {
    const [image,setImage] = useState('');

    const uploadButtonHandler = (e) =>{
        try{
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                console.log(reader.result);
            }
        }
        catch(err){   
            console.log("something went wrong while uploading image. Please try again lator!");
        }
    }

    const handleAddItem = () => {
        console.log("HandleAddItem is clicked");
    }

  return (
    <form onSubmit={handleAddItem}>
    <div className='AddItemBox'>
        <h1>Add Items</h1>
        <div>
            <span className='me-2' >Product Code: </span>
            <TextField variant='standard' required/>
        </div>
        <div>
            <span className='me-2'>Title: </span>
            <TextField variant='standard'required/>
        </div>
        <div>
            <span className='me-2'>Price: </span>
            <TextField variant='standard' type='number' required InputProps = {{startAdornment: <InputAdornment position='start'>₹</InputAdornment>}} />
        </div>
        <div>
            <span className='me-2'>Discount: </span>
            <TextField variant='standard' type='number' required InputProps = {{endAdornment: <InputAdornment position='end'>%</InputAdornment>}}/>
        </div>
        <div>
            <p>Description</p>
            <TextField variant='outlined' multiline rows={4} sx={{width:"100%"}} required/>
        </div>
        <label htmlFor="fileInput" style={{cursor:"pointer",color:"Blue"}}>Upload Image</label>
        <input type="file" accept='image/*' id='fileInput' style={{display:"none"}} onChange={uploadButtonHandler}/>
        <Button type='submit' variant='contained' className='mt-2' onClick={handleAddItem}>ADD ITEM</Button>
    </div>
    </form>
  )
}

export default AddItems