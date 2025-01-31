import type { NodeTypes } from "@xyflow/react";

import CustomNode from "./CustomNode";

export const nodeTypes = {
  custom: CustomNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
