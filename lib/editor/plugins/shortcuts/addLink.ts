import { O, pipe } from '@/utils/prelude';
import { lookup } from 'fp-ts/lib/Array';
import { constNull, identity } from 'fp-ts/lib/function';
import { Slice } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';

import { schema } from '../../schema';
import { getSliceText } from '../../utils';

export function addLink(
  state: EditorState<typeof schema>,
  dispatch: (tr: Transaction<typeof schema>) => void,
): boolean {
  const selection = state.selection;
  const selectionSlice = selection.content();
  const selectionSize = selectionSlice.content.childCount;
  // skip when no selection or selecting more than one blocks
  if (selectionSize !== 1) {
    return true;
  }

  // remove all links if the selection has any
  if (sliceHasLink(selectionSlice)) {
    dispatch(
      state.tr.removeMark(selection.from, selection.to, schema.marks.link),
    );
    return true; // end here to limit complexity. Just trigger this twice
  }

  const texts = getSliceText(selectionSlice);

  const matchesO = O.fromNullable(texts.match(/(^.+)(\[https?:\/\/.+\]$)/));

  // the anchor tag's content
  const textNode = pipe(
    matchesO,
    O.chain(matches => lookup(1, matches)),
    O.map(text => schema.text(text)),
    O.fold(constNull, identity),
  );
  // the anchor tag itself
  const anchorSet = pipe(
    matchesO,
    O.chain(matches => lookup(2, matches)),
    O.map(bracket => bracket.slice(1, -1)),
    O.map(
      href =>
        [
          schema.marks.link.create({
            href,
            rel: 'noopener',
            target: '_blank',
          }),
          href.length,
        ] as const,
    ),
    O.fold(constNull, identity),
  );
  if (!textNode || !anchorSet) {
    return true;
  }

  const [anchorMark, length] = anchorSet;
  dispatch(
    state.tr
      .replaceSelectionWith(textNode, true)
      .addMark(selection.from, selection.to - (length + 2), anchorMark),
  );

  return true;
}

/** Determines if the slice contains any node with link mark */
function sliceHasLink(slice: Slice<typeof schema>): boolean {
  let flag = false;
  slice.content.child(0).content.forEach(node => {
    if (node.marks.some(mark => mark.type.name === 'link')) {
      flag = true;
    }
  });

  return flag;
}
