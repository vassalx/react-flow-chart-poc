import { Edge } from "@xyflow/react";
import { CustomEdgeProps, EdgeLineType } from "./types";

const getStrokeDasharrayForEdgeLineType = (lineType?: EdgeLineType): string => {
  switch (lineType) {
    case "dashed":
      return "4";
    case "dotted":
      return "1 4";
    case "solid-dotted":
      return "40 4 4 4";
    case "solid":
    default:
      return "";
  }
};

export const normalizeEdges = (edges: CustomEdgeProps[]): Edge[] => {
  return edges.map((edge) => ({
    ...edge,
    style: {
      ...edge.style,
      strokeDasharray: getStrokeDasharrayForEdgeLineType(edge.data?.lineType),
    },
  }));
};
