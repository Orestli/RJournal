import React from 'react';
import { Button } from '@mui/material';
import EmailIcon from '../../../public/email.svg';
import VKIcon from '../../../public/vk.svg';
import GoogleIcon from '../../../public/google.svg';
import styles from '../AuthDialog.module.scss';
import FacebookIcon from '../../../public/facebook.svg';
import TwitterIcon from '../../../public/twitter.svg';
import AppleIcon from '../../../public/apple.svg';

interface MainFormProps {
  onOpenLogin: () => void;
}

const MainForm: React.FC<MainFormProps> = ({ onOpenLogin }) => {
  return (
    <>
      <div>
        <Button
          onClick={onOpenLogin}
          className="mb-15"
          variant="contained"
          fullWidth
        >
          <EmailIcon />
          Почта
        </Button>
        <Button className="mb-15" variant="contained" fullWidth>
          <VKIcon />
          ВКонтакте
        </Button>
        <Button className="mb-15" variant="contained" fullWidth>
          <GoogleIcon />
          Google
        </Button>
      </div>
      <div className={styles.miniButtons}>
        <Button className="mb-15" variant="contained" fullWidth>
          <FacebookIcon />
        </Button>
        <Button className="mb-15" variant="contained" fullWidth>
          <TwitterIcon />
        </Button>
        <Button className="mb-15" variant="contained" fullWidth>
          <AppleIcon />
        </Button>
      </div>
    </>
  );
};

export default MainForm;
