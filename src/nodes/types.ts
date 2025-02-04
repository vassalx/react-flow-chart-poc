import type { Node, BuiltInNode, HandleType } from "@xyflow/react";

export interface CustomHandles {
  left?: HandleType;
  right?: HandleType;
  top?: HandleType;
  bottom?: HandleType;
}

export type CustomNodeProps = Node<
  {
    label: string;
    handles?: CustomHandles;
    color?: string | string[];
    textColor?: string;
  },
  "custom"
>;
export type AppNode = BuiltInNode | CustomNodeProps;
