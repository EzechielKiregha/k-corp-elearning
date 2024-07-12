import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';
import AxiosInstance from '../Axios';
import FormHelperText from '@mui/material/FormHelperText'

export default function MySelectFieldInstructor(props) {
  const { label, name, control, width } = props;
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    AxiosInstance.get(`api/user/`)
        .then(response => {
          setInstructors(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the instructors!", error);
        });
  }, []);

  return (
    
      <Controller
        name={name}
        control={control}
        render={({ 
          field: { onChange, value }, 
          fieldState: { error }, 
          formState 
        }) => (
          <FormControl variant="standard" sx={{ width: { width } }}>
            <InputLabel id="demo-simple-select-filled-label">{label}</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={value}
                onChange={onChange}
                error={!!error}
              >
                {instructors.map((instructor) => (
                  <MenuItem key={instructor.id} value={instructor.id}>
                    {instructor.username}
                  </MenuItem>
                ))}
              </Select>
            <FormHelperText sx={{color:'#d32f2f'}}> {error?.message} </FormHelperText>
          </FormControl>
        )}
      />
      
  );
}
