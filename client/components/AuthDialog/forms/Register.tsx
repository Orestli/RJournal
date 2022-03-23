import React, { useState } from 'react';
import { Alert, Button } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { RegisterFormSchema } from '../../../utils/validations';
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from '../../FormField';
import { CreateUserDto } from '../../../utils/api/types';
import { setCookie } from 'nookies';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { setUserData } from '../../../redux/slices/user';
import { Api } from '../../../utils/api';

interface RegisterFormProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onOpenRegister,
  onOpenLogin,
}) => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const form = useForm<CreateUserDto>({
    mode: 'onChange',
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = async (dto: CreateUserDto) => {
    try {
      const data = await Api().user.register(dto);
      console.log(data);
      setCookie(null, 'rtoken', data.token, {
        maxAge: 30 * 24 * 30 * 30,
        path: '/',
      });
      setErrorMessage('');
      dispatch(setUserData(data));
    } catch (err: any) {
      console.warn('Register error', err);
      if (err.response) {
        setErrorMessage(err.response.data.message);
      }
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField name="fullName" label="Имя и фамилия" />
          <FormField name="email" label="Почта" />
          <FormField name="password" label="Пароль" />
          {errorMessage && (
            <Alert severity="error" className="mb-20">
              {errorMessage}
            </Alert>
          )}
          <div className="d-flex align-center justify-between">
            <Button
              type="submit"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              color="primary"
              variant="contained"
            >
              Зарегистрироваться
            </Button>
            <Button onClick={onOpenLogin} color="primary" variant="text">
              Войти
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default RegisterForm;
