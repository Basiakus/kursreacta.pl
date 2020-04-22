const inicialState = {
     isRunning: false,
     isPaused: false,
     elapsedTimeInSeconds: 0,
     pausesCount: 0
}
// REDUCER
export const currentTimeboxReducer = (state = inicialState, action = {}) => {
     switch (action.type) {
          case "CURRENT_TIMEBOX_START": {
               return { ...state, isRunning: true, isPaused: false };
          }
          case "CURRENT_TIMEBOX_STOP": {
               return { ...state, isRunning: false };
          }
          case "CURRENT_TIMEBOX_RESET": {
               return { ...state, isRunning: false, isPaused: false, pausesCount: 0, elapsedTimeInSeconds: 0 };
          }
          case "CURRENT_TIMEBOX_PAUSE": {
               const { currentPause } = action;
               return { ...state, isPaused: currentPause };
          }
          case "CURRENT_TIMEBOX_PAUSES_COUNT": {
               const { currentPause } = action;
               const currentPausesValue = state.pausesCount;
               let pausesCount = null
               currentPause ? pausesCount = currentPausesValue + 1 : pausesCount = currentPausesValue;
               return { ...state, pausesCount }
          }
          case "CURRENT_TIMEBOX_ELAPSED_TIME": {
               let { elapsedTimeInSeconds } = action;
               elapsedTimeInSeconds = elapsedTimeInSeconds + 0.01;
               return { ...state, elapsedTimeInSeconds };
          }
          case "CURRENT_TIMEBOX_ELAPSED_TIME_RESET": {
               return { ...state, elapsedTimeInSeconds: 0 };
          }
          default: {
               return state;
          }
     }
}
//CURRENTTIMEBOX SELECTORS
export const setPauseValue = state => !state.currentTimeboxReducer.isPaused;
export const getPausesCount = state => state.currentTimeboxReducer.pausesCount;
export const isTimeRunning = state => state.currentTimeboxReducer.isRunning;
export const getElapsedTime = state => state.currentTimeboxReducer.elapsedTimeInSeconds;
export const isTimePaused = state => state.currentTimeboxReducer.isPaused;