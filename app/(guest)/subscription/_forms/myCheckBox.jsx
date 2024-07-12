import * as React from 'react';
// import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Controller } from 'react-hook-form';

export default function MyCheckBox(props) {
    const {label, name, control } = props
    return (

        <Controller
        name={name}
        control={control}
        render={({
            field:{onChange, value},
        }) => (
            <FormControlLabel control={<Checkbox defaultChecked />} label={label} />
        )
        }
        />
        
    );
}
