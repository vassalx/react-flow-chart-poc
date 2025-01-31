import { Edge, Node, Panel } from "@xyflow/react";

export interface ImportData {
    edges: Edge[];
    nodes: Node[];
}

interface UploadButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleFileUpload: (data: ImportData) => void;
}

const UploadButton = (props: UploadButtonProps) => {
  const { handleFileUpload } = props;
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = e.target?.result as string;
          const parsedData = JSON.parse(result);
          handleFileUpload(parsedData);
        } catch (error) {
          console.error("Error parsing JSON file:", error);
          alert("Invalid JSON file. Please upload a valid JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Panel position="top-left">
      <div>
        <span>Upload JSON: </span>
        <input type="file" accept=".json" onChange={handleFileChange} />
      </div>
    </Panel>
  );
};

export default UploadButton;
