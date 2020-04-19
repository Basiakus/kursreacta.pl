export const timeboxesLoad = timeboxes => ({ type: "TIMEBOXES_LOAD", timeboxes });
export const setError = error => ({ type: "ERROR_SET", error });
export const setLoading = () => ({ type: "LOADING_SET" });
export const timeboxesSearch = searchTimeboxes => ({ type: "TIMEBOXES_SEARCH", searchTimeboxes });
export const addTimebox = timebox => ({ type: "TIMEBOX_ADD", timebox });
export const deleteTimebox = timebox => ({ type: 'TIMEBOX_DELETE', timeboxToRemove: timebox });
export const timeboxEditStart = currentTimeboxId => ({ type: 'TIMEBOX_EDIT_START', currentTimeboxId });
export const timeboxEditStop = () => ({ type: 'TIMEBOX_EDIT_STOP', currentTimeboxId: null });
export const updateTimebox = updatedTimebox => ({ type: "TIMEBOX_UPDATE", updatedTimebox });