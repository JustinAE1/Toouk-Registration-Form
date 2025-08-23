// components/AppSelect.jsx
import { MenuItem, Select } from "@mui/material";

export function AppSelect(props) {
  return (
    <Select
      fullWidth
      size="small"
      {...props}
      sx={{
        backgroundColor: "#0f1115",
        borderRadius: 8,
        "& fieldset": { borderColor: "#2a2f36" },
        "&:hover fieldset": { borderColor: "#3a414d" },
        "&.Mui-focused fieldset": { borderColor: "#4da3ff" },
        "&.Mui-focused": { boxShadow: "0 0 0 3px rgba(43,112,255,.35)" },
        "& .MuiSelect-select": { color: "#e6e8ee", padding: "12px 14px" },
      }}
    />
  );
}

// <AppSelect value={formData.propertyType} onChange={handleChange} name="propertyType">
//   <MenuItem value=""><em>Property Type</em></MenuItem>
//   <MenuItem value="building">Building</MenuItem>
// </AppSelect>

// components/AppTextarea.jsx
// import TextField from "@mui/material/TextField";
// export function AppTextarea(props) {
//   return <AppInput multiline rows={4} {...props} />;
// }
