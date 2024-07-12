import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';


export default function MyMultilineField(props) {
    const {label, placeholder, name, control, width} = props
    return (

    <Controller
        name={name}
        control={control}
        render={({
        field:{onChange, value},
        fieldState:{error},
        formState

        }) => (
            <TextField
            sx={{width:{width}}}
            id="standard-multiline-static"
            label={label}
            onChange={onChange}
            value={value}
            multiline
            rows={2}
            variant="standard"
            placeholder={placeholder}
            error={!!error}
            helperText={error?.message}
        />
        )
    }
        />
    );
}

