import { dataExamples } from "../common/defaultData";
import { DiagramData } from "../common/types";

interface SelectExampleProps {
  onSelectExample: (data: DiagramData) => void;
}

export const SelectExample = (props: SelectExampleProps) => {
  const { onSelectExample } = props;
  return (
    <>
      {dataExamples.map((example, index) => (
        <input
          key={index}
          type="button"
          className="download-btn"
          onClick={() => onSelectExample(example)}
          value={`View Example ${index + 1}`}
        />
      ))}
    </>
  );
};
