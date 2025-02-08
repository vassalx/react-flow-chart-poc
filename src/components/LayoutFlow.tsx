import ELK, {
  ElkLayoutArguments,
  LayoutOptions,
} from "elkjs/lib/elk.bundled.js";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Panel,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { useCallback, useLayoutEffect } from "react";
import { dataExample4 } from "../common/defaultData";
import { DiagramData, edgeTypes, nodeTypes } from "../common/types";
import DownloadButton from "./DownloadButton";
import UploadButton from "./UploadButton";
import { SelectExample } from "./SelectExample";

const elk = new ELK();

const elkOptions = {
  "elk.algorithm": "layered",
  "elk.layered.spacing.nodeNodeBetweenLayers": "100",
  "elk.spacing.nodeNode": "80",
};

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  options: LayoutOptions
) => {
  const isHorizontal = options?.["elk.direction"] === "RIGHT";
  const graph = {
    id: "root",
    children: nodes.map((node) => ({
      ...node,
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",

      // Hardcode a width and height for elk to use when layouting.
      width: 150,
			height: 50,
    })),
    edges: edges.map((edge) => ({
      sources: [edge.source],
      targets: [edge.target],
      ...edge,
    })),
  };

  const args: ElkLayoutArguments = {
    layoutOptions: options,
  };

  return elk
    .layout(graph, args)
    .then((layoutedGraph) => ({
      nodes: layoutedGraph.children
        ? layoutedGraph.children.map((node) => ({
            ...node,
            // React Flow expects a position property on the node instead of `x`
            // and `y` fields.
            position: { x: node.x, y: node.y },
          }))
        : [],

      edges: layoutedGraph.edges,
    }))
    .catch(console.error);
};

export const LayoutFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(dataExample4.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(dataExample4.edges);
  const { fitView } = useReactFlow();

  const onLayout = useCallback(
    ({
      direction,
      useInitialNodes = false,
    }: {
      direction: string;
      useInitialNodes: boolean;
    }) => {
      const opts = { "elk.direction": direction, ...elkOptions };
      const ns = useInitialNodes ? dataExample4.nodes : nodes;
      const es = useInitialNodes ? dataExample4.edges : edges;

      getLayoutedElements(ns, es, opts).then((result) => {
        if (result) {
          setNodes(result.nodes as Node[]);
          setEdges(
            result.edges?.map((edge) => ({
              source: edge.sources[0],
              target: edge.targets[0],
              ...edge,
            })) || []
          );

          window.requestAnimationFrame(() => fitView());
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nodes, edges]
  );

  // Calculate the initial layout on mount.
  useLayoutEffect(() => {
    onLayout({ direction: "DOWN", useInitialNodes: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
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
};
