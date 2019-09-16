import { NodeSpec } from 'prosemirror-model';

export const syntaxSpec: NodeSpec = {
  content: 'text*',
  attrs: { lang: { default: undefined } },
  marks: '',
  group: 'block',
  code: true,
  defining: true,
  parseDOM: [
    {
      tag: 'pre[data-lang]',
      getAttrs: dom => {
        const lang = (dom as HTMLPreElement).classList.value
          .split(' ')
          .find(klass => /^language\-.+/.test(klass));
        return lang ? { lang } : false;
      },
    },
  ],
  toDOM: node => ['pre', { class: `language-${node.attrs.lang}` }, ['code', 0]],
};
