import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { useCallback, useEffect, useState } from "react";
import { dataExample1 } from "../common/defaultData";
import { DiagramData, edgeTypes, nodeTypes } from "../common/types";
import DownloadButton from "./DownloadButton";
import UploadButton from "./UploadButton";
import { SelectExample } from "./SelectExample";
import getElkLayout, { ElkDirectionType } from "../common/getElkLayout";
import PositioningTools from "./PositionTools";

export const LayoutFlow = () => {
  const { setNodes, setEdges, getNodes, getEdges, fitView } = useReactFlow();
  const [direction, setDirection] = useState<ElkDirectionType>("DOWN");

  const onUpdate = useCallback(async () => {
    const { nodes, edges } = await getElkLayout(
      getNodes(),
      getEdges(),
      direction
    );
    setNodes(nodes);
    setEdges(edges);
    fitView();
  }, [getNodes, getEdges, setNodes, setEdges, fitView, direction]);

  const handleSelectFile = async (data: DiagramData) => {
    const { nodes, edges } = await getElkLayout(
      data.nodes,
      data.edges,
      direction
    );
    setNodes(nodes);
    setEdges(edges);
    fitView();
  };

  useEffect(() => {
    onUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ReactFlow
      defaultNodes={dataExample1.nodes}
      defaultEdges={dataExample1.edges}
      fitView
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      defaultEdgeOptions={{ type: "custom" }}
    >
      <Background />
      <MiniMap />
      <Controls />

      <Panel position="top-left" className="mr-10">
        <UploadButton handleFileUpload={handleSelectFile} />
        <SelectExample onSelectExample={handleSelectFile} />
        <DownloadButton />
      </Panel>
      <Panel position="top-right">
        <PositioningTools
          selectedDirection={direction}
          onSelectDirection={(newDirection) => setDirection(newDirection)}
        />
      </Panel>
    </ReactFlow>
  );
};
