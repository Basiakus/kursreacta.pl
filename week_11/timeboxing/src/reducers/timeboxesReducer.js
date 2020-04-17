const inicialState = {
     timeboxes: [],
     hasError: false,
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
               console.log(timeboxes);
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
               const timeboxes = [...state.timeboxes.filter((timebox) => timebox.id !== timeboxToRemove)];
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