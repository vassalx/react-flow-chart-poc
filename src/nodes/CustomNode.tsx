import { Handle, Position, type NodeProps } from "@xyflow/react";
import { TextNode } from "./types";

const CustomNode = (props: NodeProps<TextNode>) => {
  const { data, width = 150 } = props;
  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <div
      style={{ minWidth: width, padding: 10, border: "1px solid black", borderRadius: 5, boxSizing: 'border-box' }}
    >
      {data.label && <div>{data.label}</div>}
      <Handle type="target" position={Position.Bottom} />
      <Handle type="source" position={Position.Right} id="a" />
      <Handle type="source" position={Position.Left} id="b" />
      <Handle type="source" position={Position.Top} id="c" />
    </div>
  );
};

export default CustomNode;
