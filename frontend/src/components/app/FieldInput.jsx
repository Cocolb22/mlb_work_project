import {  Input } from "@chakra-ui/react"
import { Field } from "../../components/ui/field"

export default function FieldInput({label, required, errorText, onChange}) {
  return (
    <Field label={label} required={required} errorText={errorText}>
      <Input type="text" onChange={onChange} />
    </Field>
  );
};
