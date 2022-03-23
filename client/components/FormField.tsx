import React from 'react';
import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

interface FormFieldProps {
  name: string;
  label: string;
}

const FormField: React.FC<FormFieldProps> = ({ name, label }) => {
  const { register, formState } = useFormContext();

  return (
    <TextField
      {...register(name)}
      className="mb-20"
      size="small"
      label={label}
      variant="outlined"
      name={name}
      error={!!formState.errors[name]?.message}
      helperText={formState.errors[name]?.message}
      fullWidth
    />
  );
};

export default FormField;
