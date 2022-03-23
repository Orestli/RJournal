import React, { useState } from 'react';
import { CommentItem } from '../../utils/api/types';
import { Button, Input } from '@mui/material';
import { Api } from '../../utils/api';

import styles from './AddCommentForm.module.scss';

interface AddCommentFormProps {
  postId: number;
  onSuccessAdd: (obj: CommentItem) => void;
}

const AddCommentForm: React.FC<AddCommentFormProps> = ({
  postId,
  onSuccessAdd,
}) => {
  const [clicked, setClicked] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState('');

  const onAddComment = async () => {
    try {
      setLoading(true);
      const comment = await Api().comment.create({
        postId,
        text,
      });

      onSuccessAdd(comment);
      setClicked(false);
      setText('');
    } catch (err) {
      console.warn('AddComment', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.form}>
      <Input
        classes={{ root: styles.fieldRoot }}
        onFocus={() => setClicked(true)}
        onChange={(e) => setText(e.target.value)}
        value={text}
        disabled={isLoading}
        minRows={clicked ? 5 : 1}
        placeholder="Написать комментарий..."
        fullWidth
        multiline
      />
      {clicked && (
        <Button
          className={styles.addButton}
          onClick={onAddComment}
          disabled={isLoading}
          style={{ height: 42 }}
          variant="contained"
          color="primary"
        >
          Опубликовать
        </Button>
      )}
    </div>
  );
};

export default AddCommentForm;
