import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, tags } from '@codemirror/highlight';
import { EditorColor } from 'common/enums/enums';

const Theme = EditorView.theme(
  {
    '&': {
      color: EditorColor.IVORY,
      backgroundColor: EditorColor.BACKGROUND,
      borderRadius: '10px',
      overflowX: 'hidden',
    },

    '.cm-content': {
      caretColor: EditorColor.CURSOR,
    },

    '.cm-cursor, .cm-dropCursor': { borderLeftColor: EditorColor.CURSOR },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      { backgroundColor: EditorColor.SELECTION },

    '.cm-panels': {
      backgroundColor: EditorColor.DARK_BACKGROUND,
      color: EditorColor.IVORY,
    },
    '.cm-panels.cm-panels-top': {
      borderBottomWidth: '2px',
      borderBottomStyle: 'solid',
      borderBottomColor: EditorColor.BLACK,
    },
    '.cm-panels.cm-panels-bottom': {
      borderTopWidth: '2px',
      borderTopStyle: 'solid',
      borderTopColor: EditorColor.BLACK,
    },

    '.cm-searchMatch': {
      backgroundColor: EditorColor.SEARCH_BACKGROUND,
      outlineWidth: '1px',
      outlineStyle: 'solid',
      outlineColor: EditorColor.SEARCH_OUTLINE,
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: EditorColor.SEARCH_SELECTED_BACKGROUND,
    },

    '.cm-activeLine': { backgroundColor: EditorColor.HIGHLIGHT_BACKGROUND },
    '.cm-selectionMatch': { backgroundColor: EditorColor.SELECTION_MATCH },

    '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
      backgroundColor: EditorColor.BRACKET,
      outlineWidth: '1px',
      outlineStyle: 'solid',
      outlineColor: EditorColor.BRACKET_OUTLINE,
    },

    '.cm-gutters': {
      backgroundColor: EditorColor.BACKGROUND,
      color: EditorColor.STONE,
      border: 'none',
    },

    '.cm-activeLineGutter': {
      backgroundColor: EditorColor.HIGHLIGHT_BACKGROUND,
    },

    '.cm-foldPlaceholder': {
      backgroundColor: 'transparent',
      border: 'none',
      color: EditorColor.WHITE,
    },

    '.cm-tooltip': {
      border: 'none',
      backgroundColor: EditorColor.TOOLTIP_BACKGROUND,
    },
    '.cm-tooltip .cm-tooltip-arrow:before': {
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
    },
    '.cm-tooltip .cm-tooltip-arrow:after': {
      borderTopColor: EditorColor.TOOLTIP_BACKGROUND,
      borderBottomColor: EditorColor.TOOLTIP_BACKGROUND,
    },
    '.cm-tooltip-autocomplete': {
      '& > ul > li[aria-selected]': {
        backgroundColor: EditorColor.HIGHLIGHT_BACKGROUND,
        color: EditorColor.IVORY,
      },
    },
  },
  { dark: true },
);

const Highlight = HighlightStyle.define([
  { tag: tags.keyword, color: EditorColor.VIOLET },
  {
    tag: [
      tags.name,
      tags.deleted,
      tags.character,
      tags.propertyName,
      tags.macroName,
    ],
    color: EditorColor.CORAL,
  },
  {
    tag: [tags.function(tags.variableName), tags.labelName],
    color: EditorColor.MALIBU,
  },
  {
    tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)],
    color: EditorColor.WHISKEY,
  },
  {
    tag: [tags.definition(tags.name), tags.separator],
    color: EditorColor.IVORY,
  },
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
    color: EditorColor.CHALKY,
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
    color: EditorColor.CYAN,
  },
  { tag: [tags.meta, tags.comment], color: EditorColor.STONE },
  { tag: tags.strong, fontWeight: 'bold' },
  { tag: tags.emphasis, fontStyle: 'italic' },
  { tag: tags.strikethrough, textDecoration: 'line-through' },
  { tag: tags.link, color: EditorColor.STONE, textDecoration: 'underline' },
  { tag: tags.heading, fontWeight: 'bold', color: EditorColor.CORAL },
  {
    tag: [tags.atom, tags.bool, tags.special(tags.variableName)],
    color: EditorColor.WHISKEY,
  },
  {
    tag: [tags.processingInstruction, tags.string, tags.inserted],
    color: EditorColor.SAGE,
  },
  { tag: tags.invalid, color: EditorColor.INVALID },
]);

const EditorTheme: Extension = [Theme, Highlight];

export { EditorTheme };
