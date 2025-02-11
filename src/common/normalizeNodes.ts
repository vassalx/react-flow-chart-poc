import { Node, Position } from "@xyflow/react";
import { getLinearGradientFromColorsArray } from "./getLinearGradientFromColorsArray";
import { CustomNodeProps } from "./types";

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
    position: node.position || { x: 0, y: 0 },
    handles: [{ x: 0, y: 0, position: "left" as Position, type: "source" }],
  }));
};
