import OrderedMap from 'orderedmap';
import { NodeSpec, Schema } from 'prosemirror-model';
import { nodes, schema as basicSchema } from 'prosemirror-schema-basic';
import { syntaxSpec } from './syntaxSpec';

type Nodes = typeof nodes & { syntax: NodeSpec };

export const schema = new Schema<keyof Nodes>({
  nodes: (basicSchema.spec.nodes as OrderedMap<NodeSpec>).addToEnd(
    'syntax',
    syntaxSpec,
  ),
  marks: basicSchema.spec.marks,
});
