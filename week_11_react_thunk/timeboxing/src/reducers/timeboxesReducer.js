const inicialState = {
     timeboxes: [],
     loading: true,
     error: null,
     currentlyTimeboxId: null,
     currentTimeboxId: null
};
// REDUCER
export const timeboxesReducer = (state = inicialState, action = {}) => {
     switch (action.type) {
          case "TIMEBOX_MAKE_CURRENT": {
               const {timebox} = action;
               console.log('state', state) 
               return { ...state, currentTimeboxId: timebox.id }
          }
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
               const { currentlyTimeboxId } = action;
               return { ...state, currentlyTimeboxId }
          }
          case "TIMEBOX_EDIT_STOP": {
               return { ...state, currentlyTimeboxId: null }
          }
          default: {
               return state;
          }
     }
}
//SELECTORS
export const getAllTimeboxes = state => state.timeboxesReducer.timeboxes;
export const areTimeboxesLoading = state => state.timeboxesReducer.loading;
export const getTimeboxesError = state => state.timeboxesReducer.error;
export const isCurrentTimeboxEditing = (state, timebox) => state.timeboxesReducer.currentlyTimeboxId && state.timeboxesReducer.currentlyTimeboxId === timebox.id;
export const getTimeboxById = (state, timeboxId) => state.timeboxesReducer.timeboxes.find(timebox => timebox.id === timeboxId);
export const getCurrentlyEditableTimebox = state => getTimeboxById(state, state.timeboxesReducer.currentlyTimeboxId);
export const isAnyTimeboxEditabled = state => !!state.timeboxesReducer.currentlyTimeboxId;
export const isAnyTimeboxCurrent = state => !!state.timeboxesReducer.currentTimeboxId;
export const getCurrentTimebox = state => isAnyTimeboxCurrent(state) ? getTimeboxById(state, state.timeboxesReducer.currentTimeboxId) : null;