import { TextInput } from "@mantine/core";
import { IMaskInput } from "react-imask";

function MaskInput({maskFormat, ...props }) {
  return (
    <TextInput
      component={IMaskInput}
      mask={maskFormat}
      {...props}
    />
  )
}


export {MaskInput};