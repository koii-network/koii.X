import { Box, Button, ButtonProps, useColorModeValue, useId, useRadio, UseRadioProps } from "@chakra-ui/react";

export interface ToggleButtonProps extends ButtonProps {
  value: string;
  radioProps?: UseRadioProps;
}

export const ToggleButton = (props: ToggleButtonProps) => {
  const { radioProps, ...rest } = props;
  const { getInputProps, getCheckboxProps, getLabelProps } = useRadio(radioProps);
  const id = useId(undefined, "toggle-button");

  const inputProps = getInputProps();
  const checkboxProps = getCheckboxProps();
  const labelProps = getLabelProps();

  return (
    <Box as="label" cursor="pointer" {...labelProps}>
      <input {...inputProps} aria-labelledby={id} />
      <Button
        as="div"
        id={id}
        color="gray.600"
        borderColor="gray.200"
        _checked={{
          color: "white",
          bg: "blue.500",
          borderColor: "blue.500"
        }}
        {...checkboxProps}
        {...rest}
      />
    </Box>
  );
};
