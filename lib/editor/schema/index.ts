import OrderedMap from 'orderedmap';
import { NodeSpec, Schema } from 'prosemirror-model';
import { schema as basicSchema, marks, nodes } from 'prosemirror-schema-basic';

import { syntaxSpec } from './syntaxSpec';

type Nodes = typeof nodes & { syntax: NodeSpec };

export const schema = new Schema<keyof Nodes, keyof typeof marks>({
  nodes: (basicSchema.spec.nodes as OrderedMap<NodeSpec>).addToEnd(
    'syntax',
    syntaxSpec,
  ),
  marks: basicSchema.spec.marks,
});
