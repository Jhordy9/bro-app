'use client';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik';
import { useAuth } from '../hooks/useAuth';
import { z } from 'zod';

type Credentials = {
  email: string;
  password: string;
};

type Props = {
  onOpen: () => void;
};

const credentialsSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export const LoginForm: React.FC<Props> = ({ onOpen }) => {
  const { login } = useAuth();

  const handleLogin = (
    values: Credentials,
    actions: FormikHelpers<Credentials>
  ) => {
    try {
      credentialsSchema.parse(values);
      login(values.email, values.password);
      actions.setSubmitting(false);
      actions.resetForm();
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((e) => {
          if (e.path) {
            actions.setFieldError(e.path[0].toString(), e.message);
          }
        });
      } else {
        console.error(error);
      }
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, actions) => handleLogin(values, actions)}
      >
        {() => (
          <Form>
            <VStack spacing={2}>
              <Field name='email' validate={credentialsSchema}>
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

              <Field name='password'>
                {({
                  field,
                  form,
                }: FieldProps<string, { password: string }>) => (
                  <FormControl
                    isInvalid={
                      !!(form.errors.password && form.touched.password)
                    }
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

            <Flex w='100%' justifyContent='space-between'>
              <Button mt={4} type='submit'>
                Login
              </Button>

              <Button mt={4} onClick={onOpen}>
                Register
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};
