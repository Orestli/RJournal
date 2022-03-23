import React, { ChangeEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import AuthDialog from '../AuthDialog';
import { useAppSelector } from '../../hooks/redux-hooks';
import { selectUserData } from '../../redux/slices/user';
import { PostItem } from '../../utils/api/types';
import { Api } from '../../utils/api';
import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Paper,
} from '@mui/material';
import {
  SearchOutlined as SearchIcon,
  SmsOutlined as MessageIcon,
  Menu as MenuIcon,
  NotificationsNoneOutlined as NotificationIcon,
  AccountCircleOutlined as UserIcon,
  ExpandMoreOutlined as ArrowBottom,
} from '@mui/icons-material';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const userData = useAppSelector(selectUserData);
  const [authVisible, setAuthVisible] = React.useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [posts, setPosts] = useState<PostItem[]>([]);

  useEffect(() => {
    if (authVisible && userData) {
      setAuthVisible(false);
    }
  }, [authVisible, userData]);

  const openAuthDialog = () => {
    setAuthVisible(true);
  };

  const closeAuthDialog = () => {
    setAuthVisible(false);
  };

  const handleChangeInput = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);

    try {
      const { items } = await Api().post.search({ title: e.target.value });
      setPosts(items);
    } catch (err) {
      console.warn('Header error', err);
    }
  };

  return (
    <Paper classes={{ root: styles.root }} elevation={0}>
      <div className="d-flex align-center">
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Link href="/">
          <a>
            <img
              src={'/static/img/logo.svg'}
              alt="Logo"
              className="mr-15"
              height={35}
            />
          </a>
        </Link>

        <div className={styles.searchBlock}>
          <SearchIcon />
          <input
            value={searchValue}
            onChange={handleChangeInput}
            placeholder="Поиск"
          />
          {posts.length > 0 && (
            <Paper className={styles.searchBlockPopup}>
              <List>
                {posts.map((obj) => (
                  <Link key={obj.id} href={`/news/${obj.id}`}>
                    <a>
                      <ListItem>
                        <ListItemButton onClick={() => setPosts([])}>
                          {obj.title}
                        </ListItemButton>
                      </ListItem>
                    </a>
                  </Link>
                ))}
              </List>
            </Paper>
          )}
        </div>

        <Link href={'/write'}>
          <a>
            <Button variant="contained" className={styles.penButton}>
              Новая запись
            </Button>
          </a>
        </Link>
      </div>
      <div className="d-flex align-center">
        <IconButton>
          <MessageIcon />
        </IconButton>
        <IconButton>
          <NotificationIcon />
        </IconButton>
        {userData ? (
          <Link href={'/profile/1'}>
            <a className="d-flex align-center">
              <Avatar
                className={styles.avatar}
                src="https://leonardo.osnova.io/5ffeac9a-a0e5-5be6-98af-659bfaabd2a6/-/scale_crop/108x108/-/format/webp/"
                alt="Remy Sharp"
              />
              <ArrowBottom />
            </a>
          </Link>
        ) : (
          <div className={styles.loginButton} onClick={openAuthDialog}>
            <UserIcon />
            Войти
          </div>
        )}
      </div>
      <AuthDialog visible={authVisible} onClose={closeAuthDialog} />
    </Paper>
  );
};
