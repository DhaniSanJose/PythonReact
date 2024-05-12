import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Controller} from 'react-hook-form'


export default function MyMultilineField(props) {
    const {label,width, placeholder, name, control} = props
    return (
    <Controller
        name={name}
        control = {control}
        render={({
            field:{onChange, value},
            fieldState:{error},
            formState,
        }) =>(
            <TextField
            id="standard-multiline-static"
            onChange={onChange}
            value={value}
            sx={{width:{width}}}
            label={label}
            multiline
            rows={1}
            variant="standard"
            placeholder={placeholder} 
          />


        )
        }
        />
  );
}