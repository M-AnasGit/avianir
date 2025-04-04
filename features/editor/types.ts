export type DeviceTypes = 'desktop' | 'tablet' | 'mobile';
export type ElementTypes =
    | 'container'
    | 'text'
    | 'table'
    | 'image'
    | 'video'
    | 'audio'
    | 'form'
    | 'input'
    | 'radio'
    | 'checkbox';
export type FormDetails = {
    title: TextValueWithStyle;
    description: TextValueWithStyle;
    submit_btn: TextValueWithStyle;
};
export type InputDetails = {
    placeholder: TextValueWithStyle;
    label: TextValueWithStyle;
    answer: {
        value: string;
        exact: boolean;
        acceptance_threshold?: number;
    };
    config: {
        rows: number;
    };
};
export type RadioDetails = {
    label: TextValueWithStyle;
    options: {
        value: TextValueWithStyle;
        is_default: boolean;
        correct: boolean;
    }[];
};
export type EditorElement = {
    id: string;
    name: string;
    type: ElementTypes;
    stylePerDevice: Record<DeviceTypes, React.CSSProperties>;
    globalStyle: boolean;
    preset?: string;
    content:
        | EditorElement[]
        | {
              text?: string;
              src?: string;
              alt?: string;
          };
    formContent?: {
        form?: FormDetails;
        input?: InputDetails;
        radio_checkbox?: RadioDetails;
    };
};

export type Editor = {
    elements: EditorElement[];
    elementsMap: Map<string, { index: number; parentId: string | null }>;
    selectedElement: EditorElement | null;
    selectedElementId: string | null;
    device: DeviceTypes;
    preview: boolean;
};
export type EditorState = {
    course_id: string;
    chapter_id: string;
    editor: Editor;
    history: {
        history: Editor[];
        currentIndex: number;
    };
};
export type EditorAction =
    | {
          type: 'ADD_ELEMENT';
          payload: {
              containerId: string;
              elementDetails: EditorElement;
              position: number;
          };
      }
    | {
          type: 'UPDATE_ELEMENT';
          payload: {
              elementDetails: EditorElement;
          };
      }
    | {
          type: 'MOVE_ELEMENT';
          payload: {
              elementId: EditorElement['id'];
              containerId: EditorElement['id'];
              position: number;
          };
      }
    | {
          type: 'DELETE_ELEMENT';
      }
    | {
          type: 'CHANGE_CLICKED_ELEMENT';
          payload: {
              elementId: EditorElement['id'];
          };
      }
    | {
          type: 'CHANGE_DEVICE';
          payload: {
              device: DeviceTypes;
          };
      }
    | {
          type: 'TOGGLE_PREVIEW_MODE';
      }
    | { type: 'REDO' }
    | { type: 'UNDO' }
    | {
          type: 'LOAD_DATA';
          payload: {
              state: EditorState;
          };
      };

export type Preset = {
    name: string;
    stylePerDevice: EditorElement['stylePerDevice'];
    globalStyle: EditorElement['globalStyle'];
    type: EditorElement['type'];
    content: Preset[] | EditorElement['content'];
    formContent?: EditorElement['formContent'];
};

export type ChapterData = {
    elements: Editor['elements'];
    elementsMap: [
        string,
        {
            index: number;
            parentId: string | null;
        },
    ][];
};
export type Chapter = {
    course_id: string;
    created_at: string;
    id: string;
    name: string;
    updated_at: string;
    data: ChapterData;
};

export type CopilotHistory = {
    course_id: string;
    prompt: string;
    response: {
        content: {
            text: string;
        };
        stylePerDevice?: EditorElement['stylePerDevice'];
    };
    created_at: string;
};
