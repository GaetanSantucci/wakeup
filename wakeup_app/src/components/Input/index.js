import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';


export const FormInputText = ({ name, control, label }) => {

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <TextField
          value={value}
          onChange={onChange}
          id={name}
          label={label}
          size="small"
          variant="outlined"
          // error={!!error}
          // helperText={error ? error.message : null}
          sx={{ width: '100%', mb: 1.6 }}
        />
      )}
    />
  )
}