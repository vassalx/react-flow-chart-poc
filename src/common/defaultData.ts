import data1 from "../../assets/data1.json";
import data2 from "../../assets/data2.json";
import { normalizeEdges } from "./normalizeEdges";
import { normalizeNodes } from "./normalizeNodes";
import { CustomEdgeProps } from "./types";
import { CustomNodeProps } from "../nodes/types";

export const dataExample1 = {
  edges: normalizeEdges(data1.edges as CustomEdgeProps[]),
  nodes: normalizeNodes(data1.nodes as CustomNodeProps[]),
};

export const dataExample2 = {
  edges: normalizeEdges(data2.edges as CustomEdgeProps[]),
  nodes: normalizeNodes(data2.nodes as CustomNodeProps[]),
};
