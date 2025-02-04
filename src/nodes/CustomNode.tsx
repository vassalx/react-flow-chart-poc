import {
  Handle,
  Position,
  useUpdateNodeInternals,
  type NodeProps,
} from "@xyflow/react";
import { CustomHandles, CustomNodeProps } from "./types";
import { useEffect } from "react";

const defaultHandles: CustomHandles = {
  left: "source",
  right: "source",
  bottom: "source",
  top: "target",
};

const CustomNode = (props: NodeProps<CustomNodeProps>) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const { data, id, width = 150 } = props;
  const { label, handles } = data;
  useEffect(() => {
    updateNodeInternals(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, handles]);

  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <div
      style={{
        minWidth: width,
        padding: 10,
        border: "1px solid black",
        boxSizing: "border-box",
        textAlign: "center",
        fontSize: 12,
      }}
    >
      {label && <div>{label}</div>}
      <>
        <Handle
          type={handles?.bottom || defaultHandles.bottom || "source"}
          position={Position.Bottom}
          id="bottom"
        />
        <Handle
          type={handles?.left || defaultHandles.left || "source"}
          position={Position.Left}
          id="left"
        />
        <Handle
          type={handles?.right || defaultHandles.right || "source"}
          position={Position.Right}
          id="right"
        />
        <Handle
          type={handles?.top || defaultHandles.top || "target"}
          position={Position.Top}
          id="top"
        />
      </>
    </div>
  );
};

export default CustomNode;
