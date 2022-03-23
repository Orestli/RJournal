import React, { useState } from 'react';
import MainForm from './forms/Main';
import LoginForm from './forms/Login';
import RegisterForm from './forms/Register';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

import styles from './AuthDialog.module.scss';

interface AuthDialogProps {
  onClose: () => void;
  visible: boolean;
}

const AuthDialog: React.FC<AuthDialogProps> = ({ onClose, visible }) => {
  const [formType, setFormType] = useState<'main' | 'login' | 'register'>('main');

  return (
    <Dialog
      open={visible}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth
      maxWidth="xs"
    >
      <DialogContent>
        <DialogContentText>
          <div className={styles.content}>
            <Typography className={styles.title}>
              {formType === 'main' ? (
                'Вход в RJ'
              ) : (
                <p
                  onClick={() => setFormType('main')}
                  className={styles.backTitle}
                >
                  <ArrowBackIcon /> К авторизации
                </p>
              )}
            </Typography>
            {formType === 'main' && (
              <MainForm onOpenLogin={() => setFormType('login')} />
            )}
            {formType === 'login' && (
              <LoginForm onOpenRegister={() => setFormType('register')} />
            )}
            {formType === 'register' && (
              <RegisterForm
                onOpenRegister={() => setFormType('register')}
                onOpenLogin={() => setFormType('login')}
              />
            )}
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
