import { Slice } from 'prosemirror-model';
import { Node as ProsemirrorNode } from 'prosemirror-model';

/**
 * Takes selection slice from `selection.content()`, and returns all texts inside it.
 */
export function getSliceText(slice: Slice): string {
  const nodes: ProsemirrorNode[] = [];
  slice.content.child(0).content.descendants(node => {
    if (node.text) {
      nodes.push(node);
    }
  });
  console.log(nodes.map(node => node.text));

  return nodes.map(node => node.text).join();
}
