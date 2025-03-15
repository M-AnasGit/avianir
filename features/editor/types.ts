export type DeviceTypes = 'desktop' | 'tablet' | 'mobile';
export type ElementTypes = 'container' | 'text' | 'table' | 'image' | 'video' | 'audio' | 'form';
export type FormDetails = {
    title: TextValueWithStyle;
    description: TextValueWithStyle;
    submit_btn_text: string;
};
export type InputDetails = {
    placholder: TextValueWithStyle;
    label: TextValueWithStyle;
    answer: {
        value: string;
        exact: boolean;
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
              href?: string;
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
};

export type Palette = {
    default: {
        text: Color;
        link: Color;
        quote: Color;
        'code keyword': Color;
        'code variable': Color;
        'code number': Color;
        'code string': Color;
        'code title': Color;
        'code comment': Color;
        'code background': Color;
        'table header': Color;
        'table select': Color;
        'table border color': Color;
    };
    custom: Record<string, Color>;
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
