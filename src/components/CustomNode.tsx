import {
  Handle,
  Position,
  useUpdateNodeInternals,
  type NodeProps,
} from "@xyflow/react";
import { ReactNode, useEffect, useState } from "react";
import { CustomHandles, CustomNodeProps } from "../common/types";

const defaultHandles: CustomHandles = {
  left: "source",
  right: "source",
  bottom: "source",
  top: "target",
};

const CustomNode = (props: NodeProps<CustomNodeProps>) => {
  const { data, id, width, selected } = props;
  const [label, setLabel] = useState<string | ReactNode>(data.label);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    updateNodeInternals(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, data.handles]);

  const onChangeLabel = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLabel(event.target.value);
  };

  useEffect(() => {
    setLabel(data.label);
  }, [data.label]);

  return (
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
      {selected ? (
        <textarea
          className="block p-1 w-full text-sm bg-gray-50 rounded-sm border border-gray-300"
          id="w3review"
          name="w3review"
          defaultValue={typeof label === "string" ? label : ""}
          rows={2}
          cols={50}
          onChange={onChangeLabel}
        />
      ) : (
        label
      )}
      <>
        <Handle
          type={data.handles?.bottom || defaultHandles.bottom || "source"}
          position={Position.Bottom}
          id="bottom"
        />
        <Handle
          type={data.handles?.left || defaultHandles.left || "source"}
          position={Position.Left}
          id="left"
        />
        <Handle
          type={data.handles?.right || defaultHandles.right || "source"}
          position={Position.Right}
          id="right"
        />
        <Handle
          type={data.handles?.top || defaultHandles.top || "target"}
          position={Position.Top}
          id="top"
        />
      </>
    </div>
  );
};

export default CustomNode;
