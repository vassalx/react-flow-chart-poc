import type { Node, BuiltInNode } from '@xyflow/react';

export type TextNode = Node<{ label: string }, 'custom'>;
export type AppNode = BuiltInNode | TextNode;
