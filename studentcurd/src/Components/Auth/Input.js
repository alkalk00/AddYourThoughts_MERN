import React from 'react'
import { Grid, TextField, InputAdornment, IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const Input = ({name,handleChange,label, type, autoFocus, changePasswordVisible, half}) => {

  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField 
        name={name}
        onChange={handleChange}
        variant='outlined'
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        inputProps={name === 'password' &&{
            endAdorment:(
                <InputAdornment position='end'>
                    <IconButton onClick={changePasswordVisible}>
                        {type === 'password' ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
            ),
        }}
        />
    </Grid>
  )
}


export default Input