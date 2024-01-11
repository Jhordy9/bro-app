import { useCallback, useEffect, useMemo, useState } from 'react';
import { graphql, useMutation } from 'react-relay';
import { useAuthLoginMutation } from '../__generated__/useAuthLoginMutation.graphql';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useAuthRegisterMutation } from '../__generated__/useAuthRegisterMutation.graphql';

type RegisterType = {
  email: string;
  name: string;
  password: string;
};

export const useAuth = () => {
  const [loginCommit] = useMutation<useAuthLoginMutation>(graphql`
    mutation useAuthLoginMutation($input: UserLoginInput!) {
      UserLogin(input: $input) {
        token
      }
    }
  `);

  const [registerCommit] = useMutation<useAuthRegisterMutation>(graphql`
    mutation useAuthRegisterMutation($input: UserRegisterInput!) {
      UserRegister(input: $input) {
        token
      }
    }
  `);

  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const firetoast = useToast();

  const login = useCallback(
    (email: string, password: string) => {
      loginCommit({
        variables: {
          input: {
            email,
            password,
          },
        },
        onCompleted: (response) => {
          setToken(response.UserLogin?.token ?? null);
          localStorage.setItem('bro-token', response.UserLogin?.token ?? '');
          firetoast({
            title: 'Logado com sucesso!',
            status: 'success',
            duration: 2500,
            isClosable: true,
          });
          router.push('/timeline');
        },
        onError(error) {
          firetoast({
            title: 'Erro ao logar!',
            description: error.message,
            status: 'error',
            duration: 2500,
            isClosable: true,
          });
        },
      });
    },
    [firetoast, loginCommit, router]
  );

  const register = useCallback(
    ({ email, name, password }: RegisterType) => {
      registerCommit({
        variables: {
          input: {
            email,
            name,
            password,
          },
        },
        onCompleted: (response) => {
          setToken(response.UserRegister?.token ?? null);
          localStorage.setItem('bro-token', response.UserRegister?.token ?? '');
          firetoast({
            title: 'Registrado com sucesso!',
            status: 'success',
            duration: 2500,
            isClosable: true,
          });
        },
        onError(error) {
          firetoast({
            title: 'Erro ao registrar!',
            description: error.message,
            status: 'error',
            duration: 2500,
            isClosable: true,
          });
        },
      });
    },
    [firetoast, registerCommit]
  );

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem('bro-token');
    router.push('/');
  }, [router]);

  useEffect(() => {
    const getStorageToken = localStorage.getItem('bro-token');
    setToken(getStorageToken);
  }, []);

  const tokenMemo = useMemo(() => token, [token]);

  return {
    login,
    logout,
    register,
    token: tokenMemo,
  };
};
