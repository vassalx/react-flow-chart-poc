import { BuiltInEdge, BuiltInNode, Edge, EdgeTypes, HandleType, Node, NodeTypes } from "@xyflow/react";
import CustomEdge from "../components/CustomEdge";
import CustomNode from "../components/CustomNode";

export type EdgeLineType = "solid" | "dotted" | "dashed" | "solid-dotted";

export interface DiagramData {
  edges: Edge[];
  nodes: Node[];
}
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

export type CustomEdgeProps = Edge<
  {
    sourceLabel?: string;
    targetLabel?: string;
    lineType?: EdgeLineType;
  },
  "custom"
>;

export const edgeTypes = {
  custom: CustomEdge,
} satisfies EdgeTypes;

export const nodeTypes = {
  custom: CustomNode,
} satisfies NodeTypes;

export type AppNode = BuiltInEdge | CustomEdgeProps;
export type AppEdge = BuiltInNode | CustomNodeProps;
