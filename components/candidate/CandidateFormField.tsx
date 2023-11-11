import dayjs from "dayjs";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { InputLabel } from "@mui/material";

import { ISelectForm, ITextForm } from "@/types";
import FileDragDrop from "../FileDragDrop";

interface CandidateFormFieldProps {
  value: string;
  item: ITextForm | ISelectForm;
  handleChange: (newValue: string | string[] | Date | File) => void;
  errorMsg?: string;
}

function CandidateFormField({
  item,
  value,
  handleChange,
  errorMsg,
}: CandidateFormFieldProps) {
  let content = null;
  // console.log("FormField: ", item);
  if (["text", "email", "textarea"].includes(item.type)) {
    content = (
      <TextField
        //   type="text"
        type={item.type === "textarea" ? "text" : item.type}
        size="small"
        name={item.name}
        label={item.title}
        value={value === undefined ? "" : value}
        onChange={(e) => handleChange(e.target.value)}
        {...(item.type === "textarea" && { multiline: true, maxRows: 4 })}
        required={item.validation.required}
      />
    );
  } else if (item.type === "select" && "items" in item) {
    content = (
      <FormControl>
        <InputLabel id={item.name} size="small">
          {item.title}
        </InputLabel>
        <Select
          {...(item.attr.multiple ? { multiple: true } : { multiple: false })}
          size="small"
          labelId={item.name}
          // name={item.name}
          // label={item.title}
          value={
            !item.attr.multiple && value === undefined
              ? ""
              : item.attr.multiple && !value
              ? []
              : value
          }
          onChange={(event: SelectChangeEvent<string | string[]>) => {
            const {
              target: { value },
            } = event;
            handleChange(
              // On autofill we get a stringified value.
              typeof value === "string" && item.attr.multiple
                ? value.split(",")
                : value
            );
          }}
          required={item.validation.required}
          input={<OutlinedInput label={item.title} />}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5 + 8,
                // width: 250,
              },
            },
          }}
        >
          {/* {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))} */}
          {item.items.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  } else if (item.type === "date") {
    content = (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={item.title}
          value={dayjs(value)}
          // defaultValue={dayjs()}
          slotProps={{
            textField: {
              // fullWidth: true,
              size: "small",
              required: item.validation.required,
            },
          }}
          onChange={(newValue) => handleChange(newValue!.toString())}
        />
      </LocalizationProvider>
    );
  } else if (item.type === "file" && item.name === 'file_piece') {
    content = (
      <div>
        <label
          htmlFor={item.name}
          style={{ fontSize: "14px", marginRight: "8px" }}
        >
          {item.title} {' '}
            {item.validation.required && errorMsg && errorMsg.length > 0 ? (
            <span style={{ color: 'red' }}>* {errorMsg}</span>
        ) : null}
        </label>
        <FileDragDrop
          id={item.name}
          name={item.name}
          accept={{}}
          // value={value}
          onChange={(file) => handleChange(!!file ? file : "")}
          // required={item.validation.required}
        />
      </div>
    );
  } else if (item.type === "file" && item.name === 'file_lettre_formelle') {
    content = (
      <div>
        <label
          htmlFor={item.name}
          style={{ fontSize: "14px", marginRight: "8px" }}
        >
          {item.title} {' '}
            {item.validation.required && errorMsg && errorMsg.length > 0 ? (
            <span style={{ color: 'red' }}>* {errorMsg}</span>
        ) : null}
        </label>
        <FileDragDrop
          id={item.name}
          name={item.name}
          accept={{}}
          // value={value}
          onChange={(file) => handleChange(!!file ? file : "")}
          // required={item.validation.required}
        />
      </div>
    );
  } else if (item.type === "file") {
    content = (
      <div>
        <label
          htmlFor={item.name}
          style={{ fontSize: "14px", marginRight: "8px" }}
        >
          {item.title} {' '}
            {item.validation.required && errorMsg && errorMsg.length > 0 ? (
            <span style={{ color: 'red' }}>* {errorMsg}</span>
        ) : null}
        </label>
        <FileDragDrop
          id={item.name}
          name={item.name}
          // value={value}
          onChange={(file) => handleChange(!!file ? file : "")}
          // required={item.validation.required}
        />
      </div>
    );
  }
  return content;
}

export default CandidateFormField;
