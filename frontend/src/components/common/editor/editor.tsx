import { FC } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorTheme } from './editor-theme';
import { EditorLang } from 'common/enums/enums';
import { langNameToLangExtension } from 'common/maps/maps';

interface Props {
  value: string;
  onChangeValue: React.Dispatch<React.SetStateAction<string>>;
  lang: EditorLang;
  placeholder?: string;
  height?: number;
}

const Editor: FC<Props> = ({
  value,
  onChangeValue,
  lang,
  placeholder,
  height = 500,
}) => {
  return (
    <CodeMirror
      height={`${height}px`}
      theme={EditorTheme}
      extensions={[langNameToLangExtension[lang]()]}
      placeholder={placeholder ?? ''}
      value={value}
      onChange={onChangeValue}
    />
  );
};

export { Editor };
