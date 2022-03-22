import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, tags } from '@codemirror/highlight';

const CHALKY = '#e5c07b',
  CORAL = '#e06c75',
  CYAN = '#56b6c2',
  INVALID = '#ffffff',
  IVORY = '#abb2bf',
  STONE = '#7d8799',
  MALIBU = '#61afef',
  SAGE = '#98c379',
  WHISKEY = '#d19a66',
  VIOLET = '#c678dd',
  DARK_BACKGROUND = '#21252b',
  HIGHLIGHT_BACKGROUND = '#2c313a',
  BACKGROUND = '#282c34',
  TOOLTIP_BACKGROUND = '#353a42',
  SELECTION = '#3E4451',
  CURSOR = '#528bff',
  SEARCH_BACKGROUND = '#72a1ff59',
  SEARCH_OUTLINE = '#457dff',
  SEARCH_SELECTED_BACKGROUND = '#6199ff2f',
  SELECTION_MATCH = '#aafe661a',
  BRACKET = '#bad0f847',
  BRACKET_OUTLINE = '#515a6b',
  WHITE = '#ddd',
  BLACK = '#000';

const Theme = EditorView.theme(
  {
    '&': {
      color: IVORY,
      backgroundColor: BACKGROUND,
      borderRadius: '10px',
      overflowX: 'hidden',
    },

    '.cm-content': {
      caretColor: CURSOR,
    },

    '.cm-cursor, .cm-dropCursor': { borderLeftColor: CURSOR },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      { backgroundColor: SELECTION },

    '.cm-panels': { backgroundColor: DARK_BACKGROUND, color: IVORY },
    '.cm-panels.cm-panels-top': {
      borderBottomWidth: '2px',
      borderBottomStyle: 'solid',
      borderBottomColor: BLACK,
    },
    '.cm-panels.cm-panels-bottom': {
      borderTopWidth: '2px',
      borderTopStyle: 'solid',
      borderTopColor: BLACK,
    },

    '.cm-searchMatch': {
      backgroundColor: SEARCH_BACKGROUND,
      outlineWidth: '1px',
      outlineStyle: 'solid',
      outlineColor: SEARCH_OUTLINE,
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: SEARCH_SELECTED_BACKGROUND,
    },

    '.cm-activeLine': { backgroundColor: HIGHLIGHT_BACKGROUND },
    '.cm-selectionMatch': { backgroundColor: SELECTION_MATCH },

    '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
      backgroundColor: BRACKET,
      outlineWidth: '1px',
      outlineStyle: 'solid',
      outlineColor: BRACKET_OUTLINE,
    },

    '.cm-gutters': {
      backgroundColor: BACKGROUND,
      color: STONE,
      border: 'none',
    },

    '.cm-activeLineGutter': {
      backgroundColor: HIGHLIGHT_BACKGROUND,
    },

    '.cm-foldPlaceholder': {
      backgroundColor: 'transparent',
      border: 'none',
      color: WHITE,
    },

    '.cm-tooltip': {
      border: 'none',
      backgroundColor: TOOLTIP_BACKGROUND,
    },
    '.cm-tooltip .cm-tooltip-arrow:before': {
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
    },
    '.cm-tooltip .cm-tooltip-arrow:after': {
      borderTopColor: TOOLTIP_BACKGROUND,
      borderBottomColor: TOOLTIP_BACKGROUND,
    },
    '.cm-tooltip-autocomplete': {
      '& > ul > li[aria-selected]': {
        backgroundColor: HIGHLIGHT_BACKGROUND,
        color: IVORY,
      },
    },
  },
  { dark: true },
);

const Highlight = HighlightStyle.define([
  { tag: tags.keyword, color: VIOLET },
  {
    tag: [
      tags.name,
      tags.deleted,
      tags.character,
      tags.propertyName,
      tags.macroName,
    ],
    color: CORAL,
  },
  { tag: [tags.function(tags.variableName), tags.labelName], color: MALIBU },
  {
    tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)],
    color: WHISKEY,
  },
  { tag: [tags.definition(tags.name), tags.separator], color: IVORY },
  {
    tag: [
      tags.typeName,
      tags.className,
      tags.number,
      tags.changed,
      tags.annotation,
      tags.modifier,
      tags.self,
      tags.namespace,
    ],
    color: CHALKY,
  },
  {
    tag: [
      tags.operator,
      tags.operatorKeyword,
      tags.url,
      tags.escape,
      tags.regexp,
      tags.link,
      tags.special(tags.string),
    ],
    color: CYAN,
  },
  { tag: [tags.meta, tags.comment], color: STONE },
  { tag: tags.strong, fontWeight: 'bold' },
  { tag: tags.emphasis, fontStyle: 'italic' },
  { tag: tags.strikethrough, textDecoration: 'line-through' },
  { tag: tags.link, color: STONE, textDecoration: 'underline' },
  { tag: tags.heading, fontWeight: 'bold', color: CORAL },
  {
    tag: [tags.atom, tags.bool, tags.special(tags.variableName)],
    color: WHISKEY,
  },
  {
    tag: [tags.processingInstruction, tags.string, tags.inserted],
    color: SAGE,
  },
  { tag: tags.invalid, color: INVALID },
]);

const EditorTheme: Extension = [Theme, Highlight];

export { EditorTheme };
