import { Edge, Node } from "@xyflow/react";

export type EdgeLineType = "solid" | "dotted" | "dashed" | "solid-dotted";

export interface CustomEdgeProps extends Edge {
  lineType?: EdgeLineType;
}

export interface DiagramData {
  edges: Edge[];
  nodes: Node[];
}