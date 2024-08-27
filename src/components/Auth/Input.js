import { Grid, TextField } from '@mui/material'
import React from 'react'

function Input({name,placeholder,handleChange,autoFocus,type,label}) {
  return (
      <Grid item  xs={12} sm={12}>
            <TextField
            style={{marginTop:'30px'}}
            variant='outlined'
            required
            fullWidth
            label={label}
            name={name}
            placeholder={placeholder}
            autoFocus={autoFocus}
            type={type}
            onChange={handleChange}
            inputProps={{accept:'image/*'}}
            />
      </Grid>
  )
}

export default Input