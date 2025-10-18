import { ContentBlock, Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import Toolbar from "./components/Toolbar";

type Props = {
  value: EditorState;
  onChange: (value: EditorState) => void;
};

const MOLHTMLEditor = ({ value, onChange }: Props) => {
  const handleKeyCommand = (command: any, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      onChange(newState);
      return "handled";
    }

    return "not-handled";
  };

  const myBlockStyleFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    switch (type) {
      case "header-one":
        return "text-4xl";
      case "header-two":
        return "text-3xl";
      case "header-three":
        return "text-xl";
      case "blockquote":
        return "italic text-center text-gray-500";

      default:
        return "text-sm";
    }
  };

  return (
    <div className="border rounded max-h-[500px] flex flex-col">
      <Toolbar onChange={onChange} value={value} />
      <div className="flex-1 p-2 overflow-auto text-slate-700">
        <Editor
          editorState={value}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          blockStyleFn={myBlockStyleFn}
        />
      </div>
    </div>
  );
};

export default MOLHTMLEditor;
