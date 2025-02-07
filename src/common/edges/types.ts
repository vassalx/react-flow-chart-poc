import type { BuiltInNode, Edge } from "@xyflow/react";

export type CustomEdgeProps = Edge<
  {
    startLabel?: string;
    endLabel?: string;
  },
  "custom"
>;
export type AppNode = BuiltInNode | CustomEdgeProps;
