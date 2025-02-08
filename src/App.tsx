import { ReactFlowProvider } from "@xyflow/react";
import { LayoutFlow } from "./components/LayoutFlow";

const App = () => {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
};

export default App;
