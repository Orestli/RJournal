import React, { useState } from 'react';
import { useComments } from '../../hooks/useComments';
import CommentItem from './CommentItem';
import { NavigateNextOutlined as ArrowRightIcon } from '@mui/icons-material';
import clsx from 'clsx';

import styles from './SideComments.module.scss';

const SideComments: React.FC = () => {
  const { comments } = useComments();
  const [visible, setVisible] = useState(true);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div className={clsx(styles.root, !visible && styles.rotated)}>
      <h3 onClick={toggleVisible}>
        Комментарии <ArrowRightIcon />
      </h3>
      {visible && comments.map((obj) => <CommentItem key={obj.id} {...obj} />)}
    </div>
  );
};

export default SideComments;
