import { Node, Position } from "@xyflow/react";
import { CustomNodeProps } from "../nodes/types";
import { getLinearGradientFromColorsArray } from "./getLinearGradientFromColorsArray";

export const normalizeNodes = (nodes: CustomNodeProps[]): Node[] => {
  return nodes.map((node) => ({
    ...node,
    style: {
      ...node.style,
      background: Array.isArray(node.data.color)
        ? getLinearGradientFromColorsArray(node.data.color)
        : node.data.color,
      color: node.data.textColor,
    },
    handles: [{ x: 0, y: 0, position: "left" as Position, type: "source" }],
  }));
};
