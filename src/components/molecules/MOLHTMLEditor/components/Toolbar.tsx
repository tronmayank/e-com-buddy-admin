import {
  IconBlockquote,
  IconBold,
  IconH1,
  IconH2,
  IconH3,
  IconItalic,
  IconList,
  IconListNumbers,
  IconStrikethrough,
  IconUnderline,
} from "@tabler/icons-react";
import { EditorState, RichUtils } from "draft-js";
import { MouseEvent, useState } from "react";

type Props = {
  value: EditorState;
  onChange: (value: EditorState) => void;
};

const Toolbar = ({ value, onChange }: Props) => {
  const [showURLInput, setShowURLInput] = useState(false);
  const [urlValue, setUrlValue] = useState("");

  // Handle Bold
  const toggleInlineStyle = (inlineStyle: string) => {
    onChange(RichUtils.toggleInlineStyle(value, inlineStyle));
  };

  const toggleblockType = (blockType: string) => {
    onChange(RichUtils.toggleBlockType(value, blockType));
  };

  const toolbarButtons = [
    {
      section: "BLOCK",
      toolbars: [
        {
          icon: IconH1,
          blockTypeOrinlineStyle: "header-one",
        },
        {
          icon: IconH2,
          blockTypeOrinlineStyle: "header-two",
        },
        {
          icon: IconH3,
          blockTypeOrinlineStyle: "header-three",
        },
        {
          icon: IconBlockquote,
          blockTypeOrinlineStyle: "blockquote",
        },
        {
          icon: IconList,
          blockTypeOrinlineStyle: "unordered-list-item",
        },
        {
          icon: IconListNumbers,
          blockTypeOrinlineStyle: "ordered-list-item",
        },
      ],
    },
    {
      section: "INLINE_STYLE",
      toolbars: [
        {
          icon: IconBold,
          blockTypeOrinlineStyle: "BOLD",
        },
        {
          icon: IconItalic,
          blockTypeOrinlineStyle: "ITALIC",
        },
        {
          icon: IconUnderline,
          blockTypeOrinlineStyle: "UNDERLINE",
        },
        {
          icon: IconStrikethrough,
          blockTypeOrinlineStyle: "STRIKETHROUGH",
        },
      ],
    },
  ];

  const handleAddLink = (url: string) => {
    const contentState = value.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(value, {
      currentContent: contentStateWithEntity,
    });
    onChange(
      RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      )
    );
  };

  const promptForLink = (e: any) => {
    e.preventDefault();
    const selection = value.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = value.getCurrentContent();
      const startKey = value.getSelection().getStartKey();
      const startOffset = value.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = "";
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }

      setShowURLInput(true);
      setUrlValue(url);
      // setTimeout(() => this.refs.url.focus(), 0);
    }
  };

  const handleConfirmLink = (e: any) => {
    e.preventDefault();
    const contentState = value.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(value, {
      currentContent: contentStateWithEntity,
    });

    onChange(
      RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      )
    );

    setShowURLInput(false);
    setUrlValue("");

    // setTimeout(() => this.refs.editor.focus(), 0);
  };

  const onLinkInputKeyDown = (e: any) => {
    if (e.which === 13) {
      handleConfirmLink(e);
    }
  };

  return (
    <div className="flex items-center p-1 bg-gray-100 divide-x divide-gray-400 rounded-t divide-dashed">
      {toolbarButtons?.map((toolbarGroup, index) => {
        return (
          <div key={index} className="flex items-center gap-1 px-1">
            {toolbarGroup?.toolbars?.map((toolbarBtn) => {
              const isSelected =
                toolbarGroup?.section === "BLOCK"
                  ? RichUtils.getCurrentBlockType(value) ===
                    toolbarBtn?.blockTypeOrinlineStyle
                  : value
                      ?.getCurrentInlineStyle()
                      ?.has(toolbarBtn?.blockTypeOrinlineStyle);
              return (
                <button
                  type="button"
                  onClick={() =>
                    toolbarGroup?.section === "BLOCK"
                      ? toggleblockType(toolbarBtn?.blockTypeOrinlineStyle)
                      : toggleInlineStyle(toolbarBtn?.blockTypeOrinlineStyle)
                  }
                  className={`text-slate-700 p-1 rounded ${
                    isSelected
                      ? "bg-gray-300 text-slate-900"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {<toolbarBtn.icon size={15} />}
                </button>
              );
            })}
          </div>
        );
      })}
      <button onMouseDown={promptForLink}>Link</button>

      {showURLInput ? (
        <div className="mb-2">
          <input
            onChange={(e) => setUrlValue(e.target.value)}
            // ref="url"
            type="text"
            value={urlValue}
            onKeyDown={onLinkInputKeyDown}
          />
          <button onMouseDown={handleConfirmLink}>Confirm</button>
        </div>
      ) : null}
    </div>
  );
};

export default Toolbar;
