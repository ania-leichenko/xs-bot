import { FC } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

interface Props {
  value: string;
  onChangeValue: React.Dispatch<React.SetStateAction<string>>;
}

const Editor: FC<Props> = ({ value, onChangeValue }) => {
  return (
    <CodeMirror
      height="500px"
      theme="dark"
      extensions={[javascript()]}
      placeholder="Source code can't be empty."
      value={value}
      onChange={onChangeValue}
    />
  );
};

export { Editor };
