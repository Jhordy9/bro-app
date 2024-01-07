import { Input as ChakraInput, InputProps } from '@chakra-ui/react';

type InputPropsType = {
  type?: string;
  placeholder: string;
  value: string;
} & InputProps;

export const Input: React.FC<InputPropsType> = ({
  type,
  placeholder,
  value,
  ...props
}) => (
  <ChakraInput {...props} type={type} placeholder={placeholder} value={value} />
);
