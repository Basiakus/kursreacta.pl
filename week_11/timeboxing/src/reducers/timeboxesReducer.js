const inicialState = {
     timeboxes: [],
     loading: true,
     error: null,
     currentTimeboxId: null
};

export const timeboxesReducer = (state = inicialState, action = {}) => {
     switch (action.type) {
          case "TIMEBOXES_LOAD": {
               const { timeboxes } = action;
               return { ...state, timeboxes };
          }
          case "LOADING_SET": {
               return { ...state, loading: false };
          }
          case "ERROR_SET": {
               const { error } = action;
               return { ...state, error }
          }
          case "TIMEBOX_ADD": {
               const { timebox } = action
               const timeboxes = [...state.timeboxes, timebox];
               return { ...state, timeboxes }
          }
          case "TIMEBOXES_SEARCH": {
               const { searchTimeboxes } = action;
               let timeboxes = [...state.timeboxes];
               timeboxes = searchTimeboxes;
               return { ...state, timeboxes }
          }
          case "TIMEBOX_DELETE": {
               const { timeboxToRemove } = action;
               const timeboxes = [...state.timeboxes.filter((timebox) => timebox.id !== timeboxToRemove.id)];
               return { ...state, timeboxes }
          }
          case "TIMEBOX_UPDATE": {
               const { updatedTimebox } = action;
               const timeboxes = [...state.timeboxes.map(timebox => timebox.id === updatedTimebox.id ? updatedTimebox : timebox)]
               return { ...state, timeboxes }
          }
          case "TIMEBOX_EDIT_START": {
               const { currentTimeboxId } = action;
               return { ...state, currentTimeboxId }
          }
          case "TIMEBOX_EDIT_STOP": {
               return { ...state, currentTimeboxId: null }
          }
          default: {
               return state;
          }
     }
}

export const getAllTimeboxes = state => state.timeboxes;
export const areTimeboxesLoading = state => state.loading;
export const getTimeboxesError = state => state.error;
export const isCurrentTimeboxEditing = (state, timebox) => state.currentTimeboxId && state.currentTimeboxId === timebox.id;
export const getTimeboxById = (state, timeboxId) => state.timeboxes.find(timebox => timebox.id === timeboxId);
export const getCurrentlyEditableTimebox = state => getTimeboxById(state, state.currentTimeboxId);
export const isAnyTimeboxEditabled = state => !!state.currentTimeboxId;