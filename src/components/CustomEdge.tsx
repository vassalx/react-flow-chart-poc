import {
  EdgeLabelRenderer,
  BaseEdge,
  type EdgeProps,
  getSmoothStepPath,
} from "@xyflow/react";
import { CustomEdgeProps } from "../common/types";

interface EdgeLabelProps {
  transform: string;
  label: string;
}

const EdgeLabel = (props: EdgeLabelProps) => {
  const { transform, label } = props;
  return (
    <div
      style={{
        position: "absolute",
        background: "transparent",
        padding: 10,
        fontSize: 12,
        fontWeight: 700,
        transform,
      }}
      className="nodrag nopan"
    >
      {label}
    </div>
  );
};

const CustomEdge = (props: EdgeProps<CustomEdgeProps>) => {
  const {
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    targetHandleId,
    sourceHandleId,
    data,
    selectable, // eslint-disable-line @typescript-eslint/no-unused-vars
    deletable, // eslint-disable-line @typescript-eslint/no-unused-vars
    pathOptions, // eslint-disable-line @typescript-eslint/no-unused-vars
    ...edgeProps
  } = props;
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 0,
  });

  const getTranslateSourceHandle = () => {
    switch (sourceHandleId) {
      case "left":
        return "translate(-100%, -75%)";
      case "bottom":
        return "translate(50%, 0%)";
      case "right":
        return "translate(0%, -25%)";
      case "top":
      default:
        return "translate(0%, -25%)";
    }
  };

  const getTranslateTargetHandle = () => {
    switch (targetHandleId) {
      case "left":
        return "translate(-100%, -25%)";
      case "bottom":
        return "translate(50%, 25%)";
      case "right":
        return "translate(0%, -25%)";
      case "top":
      default:
        return "translate(0%, -75%)";
    }
  };

  return (
    <>
      <BaseEdge path={edgePath} {...edgeProps} />
      <EdgeLabelRenderer>
        {data?.startLabel && (
          <EdgeLabel
            transform={`${getTranslateSourceHandle()} translate(${sourceX}px,${sourceY}px)`}
            label={data.startLabel}
          />
        )}
        {data?.endLabel && (
          <EdgeLabel
            transform={`${getTranslateTargetHandle()} translate(${targetX}px,${targetY}px)`}
            label={data.endLabel}
          />
        )}
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
