import type { EdgeTypes } from "@xyflow/react";

import CustomEdge from "./CustomEdge";

export const edgeTypes = {
  custom: CustomEdge,
  // Add any of your custom nodes here!
} satisfies EdgeTypes;
