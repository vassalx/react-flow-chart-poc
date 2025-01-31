import { ReactFlow, Background, Controls, MiniMap, Node, Edge } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import defaultData from "../assets/data.json";
import DownloadButton from "./components/DownloadButton";
import UploadButton, { ImportData } from "./components/UploadButton";
import { useState } from "react";

export default function App() {
  const [nodes, setNodes] = useState<Node[]>(defaultData.nodes);
  const [edges, setEdges] = useState<Edge[]>(defaultData.edges);

  const handleFileUpload = (data: ImportData) => {
    setNodes(data.nodes);
    setEdges(data.edges)
  }

  return (
    <ReactFlow nodes={nodes} edges={edges} style={{ borderRadius: 0 }} fitView>
      <Background />
      <MiniMap />
      <Controls />
      <DownloadButton />
      <UploadButton handleFileUpload={handleFileUpload} />
    </ReactFlow>
  );
}
