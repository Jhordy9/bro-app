'use client';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@repo/ui';

type Credentials = {
  email: string;
  password: string;
};

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const toast = useToast();

  const validateEmail = (value: string) => {
    let error;
    if (!value) {
      error = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  };

  const validatePassword = (value: string) => {
    let error;
    if (!value) {
      error = 'Password is required';
    } else if (value.length < 6) {
      error = 'Password must be at least 6 characters';
    }
    return error;
  };

  const handleLogin = (
    values: Credentials,
    actions: FormikHelpers<Credentials>
  ) => {};

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values, actions) => handleLogin(values, actions)}
    >
      {() => (
        <Form>
          <VStack spacing={2}>
            <Field name='email' validate={validateEmail}>
              {({ field, form }: FieldProps<string, { email: string }>) => (
                <FormControl
                  isInvalid={!!(form.errors.email && form.touched.email)}
                >
                  <FormLabel>Email</FormLabel>
                  <Input
                    {...field}
                    type='email'
                    placeholder='Enter your email'
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name='password' validate={validatePassword}>
              {({ field, form }: FieldProps<string, { password: string }>) => (
                <FormControl
                  isInvalid={!!(form.errors.password && form.touched.password)}
                >
                  <FormLabel>Password</FormLabel>
                  <Input
                    {...field}
                    placeholder='Enter your password'
                    type='password'
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </VStack>

          <Button mt={4} text='Login' type='submit' />
        </Form>
      )}
    </Formik>
  );
};
