import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Formik, Field, Form, FieldProps, FormikHelpers } from 'formik';
import { useAuth } from '../hooks/useAuth';
import { z } from 'zod';

type ModalProps = {
  onClose: () => void;
  isOpen: boolean;
};

const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export const RegisterModal: React.FC<ModalProps> = ({ onClose, isOpen }) => {
  const { register } = useAuth();

  const handleRegister = async (
    values: { email: string; name: string; password: string },
    actions: FormikHelpers<typeof values>
  ) => {
    try {
      registerSchema.parse(values);
      register({
        email: values.email,
        name: values.name,
        password: values.password,
      });
      actions.setSubmitting(false);
      actions.resetForm();
      onClose();
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
    <Modal isOpen={isOpen} onClose={onClose} size='md'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Register</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{ email: '', name: '', password: '' }}
            onSubmit={(values, actions) => handleRegister(values, actions)}
          >
            {() => (
              <Form>
                <Stack spacing={4}>
                  <Field name='email'>
                    {({
                      field,
                      form,
                    }: FieldProps<string, { email: string }>) => (
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

                  <Field name='name'>
                    {({
                      field,
                      form,
                    }: FieldProps<string, { name: string }>) => (
                      <FormControl
                        isInvalid={!!(form.errors.name && form.touched.name)}
                      >
                        <FormLabel>Name</FormLabel>
                        <Input {...field} placeholder='Enter your name' />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
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
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Stack>

                <ModalFooter>
                  <Button colorScheme='blue' mr={3} type='submit'>
                    Register
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
