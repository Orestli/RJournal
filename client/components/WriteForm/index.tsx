import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Api } from '../../utils/api';
import { PostItem } from '../../utils/api/types';
import { OutputData } from '@editorjs/editorjs';
import { useRouter } from 'next/router';
import { Button, Input } from '@mui/material';

import styles from './WriteForm.module.scss';

const Editor = dynamic(() => import('../Editor'), { ssr: false });

interface WriteFormProps {
  data?: PostItem;
}

const WriteForm: React.FC<WriteFormProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState(data?.title || '');
  const [blocks, setBlocks] = useState<OutputData['blocks']>(data?.body || []);

  const onAddPost = async () => {
    try {
      setLoading(true);

      const obj = {
        title,
        body: blocks,
      };

      if (!data) {
        const post = await Api().post.create(obj);
        await router.push(`/write/${post.id}`);
      } else {
        await Api().post.update(data.id, obj);
      }
    } catch (err) {
      console.warn(`Create post ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        classes={{ root: styles.titleField }}
        placeholder="Заголовок"
      />
      <div className={styles.editor}>
        <Editor initialBlocks={data?.body} onChange={(arr) => setBlocks(arr)} />
      </div>
      <Button
        onClick={onAddPost}
        disabled={isLoading || !title || !blocks.length}
        style={{ height: 42 }}
        variant="contained"
        color="primary"
      >
        {data ? 'Сохранить' : 'Опубликовать'}
      </Button>
    </div>
  );
};

export default WriteForm;
