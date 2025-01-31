import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import defaultData from "../assets/data.json";
import DownloadButton from "./components/DownloadButton";
import UploadButton, { CustomNodeProps, ImportData } from "./components/UploadButton";
import { useState } from "react";
import { nodeTypes } from "./nodes";

const normalizeNodes = (nodes: CustomNodeProps[]): Node[] => {
  return nodes.map((node) => ({
    ...node,
    style: { ...node.style, backgroundColor: node.color },
  }));
};

export default function App() {
  const [nodes, setNodes] = useState<Node[]>(normalizeNodes(defaultData.nodes));
  const [edges, setEdges] = useState<Edge[]>(defaultData.edges);

  const handleFileUpload = (data: ImportData) => {
    setNodes(normalizeNodes(data.nodes));
    setEdges(data.edges);
  };

  return (
    <ReactFlow nodes={nodes} edges={edges} fitView nodeTypes={nodeTypes}>
      <Background />
      <MiniMap />
      <Controls />
      <DownloadButton />
      <UploadButton handleFileUpload={handleFileUpload} />
    </ReactFlow>
  );
}
