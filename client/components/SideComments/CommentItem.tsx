import Link from 'next/link';
import React from 'react';
import { Avatar } from '@mui/material';
import { PostItem, ResponseUser } from '../../utils/api/types';

import styles from './SideComments.module.scss';

interface CommentItemProps {
  user: ResponseUser;
  text: string;
  post: PostItem;
}

const CommentItem: React.FC<CommentItemProps> = ({ user, text, post }) => {
  return (
    <div className={styles.commentItem}>
      <div className={styles.userInfo}>
        <Avatar className="mr-10">{user.fullName[0]}</Avatar>
        <Link href={`/profile/${user.id}`}>
          <a>
            <b>{user.fullName}</b>
          </a>
        </Link>
      </div>
      <p className={styles.text}>{text}</p>
      <Link href={`/news/${post.id}`}>
        <a>
          <span className={styles.postTitle}>{post.title}</span>
        </a>
      </Link>
    </div>
  );
};

export default CommentItem;
