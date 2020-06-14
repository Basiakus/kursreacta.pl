import axiosTimeboxesApi from '../api/axiosTimeboxesApi.js' 
const timeboxesApi = axiosTimeboxesApi('http://localhost:4000/timeboxes/'); 
export const timeboxesLoad = timeboxes => ({ type: "TIMEBOXES_LOAD", timeboxes });
export const setError = error => ({ type: "ERROR_SET", error });
export const setLoading = () => ({ type: "LOADING_SET" });
export const timeboxesSearch = searchTimeboxes => ({ type: "TIMEBOXES_SEARCH", searchTimeboxes });
export const addTimebox = timebox => ({ type: "TIMEBOX_ADD", timebox });
export const deleteTimebox = timebox => ({ type: 'TIMEBOX_DELETE', timeboxToRemove: timebox });
export const timeboxEditStart = currentlyTimeboxId => ({ type: 'TIMEBOX_EDIT_START', currentlyTimeboxId });
export const timeboxEditStop = () => ({ type: 'TIMEBOX_EDIT_STOP', currentTimeboxId: null });
export const updateTimebox = updatedTimebox => ({ type: "TIMEBOX_UPDATE", updatedTimebox });
export const makeTimeboxCurrent = timebox => {
     console.log('timebox', timebox) 
     return {
          type: "TIMEBOX_MAKE_CURRENT", timebox
     }
};

export const fetchAllTimeboxes = accessToken => dispatch => {
     timeboxesApi.getAllTimeboxes(accessToken)
          .then((timeboxes) => dispatch(timeboxesLoad(timeboxes)))
          .catch((error) => Promise.reject(dispatch(setError(error))))
          .finally(() => dispatch(setLoading())) 
}

export const deleteTimeboxRemotely = (timebox, accessToken) => dispatch => {
     timeboxesApi.removeTimebox(timebox, accessToken)
          .then(
               () => {
                    dispatch(deleteTimebox(timebox))
               }
          )
}

export const editingTimeboxRemotely = (timebox, updatedTimebox, accessToken) => dispatch => {
     const updateingTimebox = { ...timebox, ...updatedTimebox };
     timeboxesApi.partiallyUpdateTimebox(updateingTimebox, accessToken).then(
          (updateingTimebox) => dispatch(updateTimebox(updatedTimebox)))
     dispatch(timeboxEditStop());
}