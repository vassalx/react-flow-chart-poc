import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Panel,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import DownloadButton from "./components/DownloadButton";
import UploadButton from "./components/UploadButton";
import { useState } from "react";
import { nodeTypes } from "./nodes";
import { dataExample3 } from "./common/defaultData";
import { edgeTypes } from "./common/edges";
import { SelectExample } from "./components/SelectExample";
import { DiagramData } from "./common/types";

export default function App() {
  const [nodes, setNodes] = useState<Node[]>(dataExample3.nodes);
  const [edges, setEdges] = useState<Edge[]>(dataExample3.edges);

  const handleSelectFile = (data: DiagramData) => {
    setNodes(data.nodes);
    setEdges(data.edges);
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      fitView
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
    >
      <Background />
      <MiniMap />
      <Controls />
      <DownloadButton />
      <Panel position="top-left">
        <UploadButton handleFileUpload={handleSelectFile} />
        <SelectExample onSelectExample={handleSelectFile} />
      </Panel>
    </ReactFlow>
  );
}
