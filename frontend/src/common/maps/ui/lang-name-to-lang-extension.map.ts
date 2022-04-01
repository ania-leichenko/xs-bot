import { json } from '@codemirror/lang-json';
import { javascript } from '@codemirror/lang-javascript';
import { EditorLang } from 'common/enums/enums';

const langNameToLangExtension = {
  [EditorLang.JAVASCRIPT]: javascript,
  [EditorLang.JSON]: json,
} as const;

export { langNameToLangExtension };
