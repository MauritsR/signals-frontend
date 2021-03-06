import {
  CLOSE_ALL,
  EDIT,
  PATCH_START,
  PATCH_SUCCESS,
  PREVIEW,
  RESET,
  SET_ATTACHMENTS,
  SET_CHILDREN,
  SET_DEFAULT_TEXTS,
  SET_ERROR,
  SET_HISTORY,
  SET_INCIDENT,
} from './constants';

export const initialState = {
  attachmentHref: undefined,
  attachments: undefined,
  children: undefined,
  error: undefined,
  history: undefined,
  incident: undefined,
  patching: undefined,
};

// values that will be set whenever the CLOSE_ALL type is dispatched
export const closedState = {
  preview: undefined,
  edit: undefined,
  error: undefined,
  attachmentHref: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case CLOSE_ALL:
      return { ...state, ...closedState };

    case SET_ERROR:
      return { ...state, error: action.payload };

    case SET_ATTACHMENTS:
      return { ...state, attachments: action.payload };

    case SET_HISTORY:
      return { ...state, history: action.payload };

    case SET_CHILDREN:
      return { ...state, children: action.payload };

    case SET_DEFAULT_TEXTS:
      return { ...state, defaultTexts: action.payload };

    case SET_INCIDENT:
      return { ...state, incident: action.payload };

    case PATCH_START:
      return { ...state, patching: action.payload };

    case PATCH_SUCCESS:
      return { ...state, patching: undefined };

    case PREVIEW:
      return { ...state, edit: undefined, ...action.payload, preview: action.payload.preview };

    case EDIT:
      return { ...state, preview: undefined, ...action.payload, edit: action.payload.edit };

    case RESET:
      return { ...initialState, incident: state.incident };

    default:
      return state;
  }
};

export default reducer;
