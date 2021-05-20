import React from "react";

import NumberFormat from "react-number-format";

function TMKMaskInput(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isNumericString
      format="#-#-#-###-###-####"
      allowEmptyFormatting
      mask="__"
    />
  );
}
export default TMKMaskInput;
