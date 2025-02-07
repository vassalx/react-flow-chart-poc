import { normalizeEdges } from "../common/normalizeEdges";
import { normalizeNodes } from "../common/normalizeNodes";
import { DiagramData } from "../common/types";

interface UploadButtonProps {
  handleFileUpload: (data: DiagramData) => void;
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
          handleFileUpload({
            edges: normalizeEdges(parsedData.edges),
            nodes: normalizeNodes(parsedData.nodes),
          });
        } catch (error) {
          console.error("Error parsing JSON file:", error);
          alert("Invalid JSON file. Please upload a valid JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <span>
      <span>Upload JSON: </span>
      <input type="file" accept=".json" onChange={handleFileChange} />
    </span>
  );
};

export default UploadButton;
