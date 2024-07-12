import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';
import AxiosInstance from '../Axios';
import FormHelperText from '@mui/material/FormHelperText'

export default function MySelectFieldInstitution(props) {
    const { label, name, control, width } = props;
    const [institutions, setInstitutions] = useState([]);

    useEffect(() => {
        AxiosInstance.get('api/institution/')
            .then((res) => {
                console.log(res.data)
                setInstitutions(res.data);
            })
            .catch((err) => {
                console.error('Failed to fetch institutions', err);
            });
    }, []);

    return (
        
            <Controller
                name={name}
                control={control}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                    formState,
                }) => (
                    <FormControl variant="standard" sx={{ width: { width } }}>
                        <InputLabel id="institution-select-label">{label}</InputLabel>
                        <Select
                            labelId="institution-select-label"
                            id="institution-select"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                        >
                            {institutions.map((institution) => (
                                <MenuItem key={institution.id} value={institution.id}>
                                    {institution.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText sx={{color:'#d32f2f'}}> {error?.message} </FormHelperText>
                    </FormControl>
                )}
            />
        
    );
}
