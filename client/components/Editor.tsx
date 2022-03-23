import React, { useEffect } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';

interface EditorProps {
  onChange: (blocks: OutputData['blocks']) => void;
  initialBlocks?: OutputData['blocks'];
}

const Editor: React.FC<EditorProps> = ({ onChange, initialBlocks = [] }) => {
  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editor',
      placeholder: 'Введите текст вашей статьи',
      data: {
        blocks: initialBlocks,
      },
      async onChange() {
        const { blocks } = await editor.save();
        onChange(blocks);
      },
    });

    return () => {
      editor.isReady
        .then(() => {
          editor.destroy();
        })
        .catch((e) => console.log('ERROR editor cleanup', e));
    };
  }, []);

  return <div id="editor" />;
};

export default Editor;
