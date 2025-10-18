declare module 'draft-js-static-toolbar-plugin' {
    import { ComponentType, ReactNode } from 'react';
    import { EditorPlugin } from 'draft-js-plugins-editor';
  
    export interface ToolbarProps {
      children: (externalProps: any) => ReactNode;
    }
  
    export interface ToolbarPlugin extends EditorPlugin {
      Toolbar: ComponentType<ToolbarProps>;
    }
  
    const createToolbarPlugin: () => ToolbarPlugin;
  
    export default createToolbarPlugin;
  }
  