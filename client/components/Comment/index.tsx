import React from 'react';
import { ResponseUser } from '../../utils/api/types';
import { Api } from '../../utils/api';
import { Avatar, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { MoreHorizOutlined as MoreIcon } from '@mui/icons-material';

import styles from './Comment.module.scss';

interface CommentPostProps {
  id: number;
  user: ResponseUser;
  text: string;
  createdAt: string;
  currentUserId: number | undefined;
  onRemove: (id: number) => void;
}

const Comment: React.FC<CommentPostProps> = ({
  id,
  user,
  text,
  createdAt,
  currentUserId,
  onRemove,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickRemove = async () => {
    if (window.confirm('Удалить комментарий?')) {
      try {
        await Api().comment.remove(id);
        onRemove(id);
      } catch (err) {
        console.warn('Error remove comment', err);
      } finally {
        handleClose();
      }
    }
  };

  return (
    <div className={styles.comment}>
      <div className={styles.userInfo}>
        <Avatar className="mr-10">{user.fullName[0]}</Avatar>
        <b>{user.fullName}</b>
        <span>{createdAt}</span>
      </div>
      <Typography className={styles.text}>{text}</Typography>
      {user.id === currentUserId && (
        <>
          <span className={styles.replyBtn}>Ответить</span>
          <IconButton onClick={handleClick}>
            <MoreIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            elevation={2}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            keepMounted
          >
            <MenuItem onClick={handleClickRemove}>Удалить</MenuItem>
            <MenuItem onClick={handleClose}>Редактировать</MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
};

export default Comment;
