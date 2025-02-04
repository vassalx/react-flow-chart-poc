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
import UploadButton, { ImportData } from "./components/UploadButton";
import { useState } from "react";
import { nodeTypes } from "./nodes";
import { dataExample1, dataExample2 } from "./common/defaultData";

export default function App() {
  const [nodes, setNodes] = useState<Node[]>(dataExample1.nodes);
  const [edges, setEdges] = useState<Edge[]>(dataExample1.edges);

  const handleFileUpload = (data: ImportData) => {
    setNodes(data.nodes);
    setEdges(data.edges);
  };

  const handleClickExample1 = () => {
    setNodes(dataExample1.nodes);
    setEdges(dataExample1.edges);
  };

  const handleClickExample2 = () => {
    setNodes(dataExample2.nodes);
    setEdges(dataExample2.edges);
  };

  return (
    <ReactFlow nodes={nodes} edges={edges} fitView nodeTypes={nodeTypes}>
      <Background />
      <MiniMap />
      <Controls />
      <DownloadButton />
      <Panel position="top-left">
        <UploadButton handleFileUpload={handleFileUpload} />
        <input type="button" className="download-btn" onClick={handleClickExample1} value="View Example 1" />
        <input type="button" className="download-btn" onClick={handleClickExample2} value="View Example 2" />
      </Panel>
    </ReactFlow>
  );
}
