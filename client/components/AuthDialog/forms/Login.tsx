import React, { useState } from 'react';
import { Button, Alert } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormSchema } from '../../../utils/validations';
import FormField from '../../FormField';
import { LoginDto } from '../../../utils/api/types';
import { setCookie } from 'nookies';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { setUserData } from '../../../redux/slices/user';
import { Api } from '../../../utils/api';

interface LoginFormProps {
  onOpenRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onOpenRegister }) => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const form = useForm<LoginDto>({
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = async (dto: LoginDto) => {
    try {
      const data = await Api().user.login(dto);
      console.log(data);
      setCookie(null, 'rtoken', data.token, {
        maxAge: 30 * 24 * 30 * 30,
        path: '/',
      });
      setErrorMessage('');
      dispatch(setUserData(data));
    } catch (err: any) {
      console.warn('Login error', err);
      if (err.response) {
        setErrorMessage(err.response.data.message);
      }
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <FormField name="email" label="Почта" />
        <FormField name="password" label="Пароль" />
        {errorMessage && (
          <Alert severity="error" className="mb-20">
            {errorMessage}
          </Alert>
        )}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="d-flex align-center justify-between">
            <Button
              type="submit"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              color="primary"
              variant="contained"
            >
              Войти
            </Button>
            <Button onClick={onOpenRegister} color="primary" variant="text">
              Регистрация
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
