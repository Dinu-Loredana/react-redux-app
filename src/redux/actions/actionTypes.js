export const CREATE_COURSE = "CREATE_COURSE";
export const LOAD_COURSE_SUCCESS = "LOAD_COURSE_SUCCESS";
export const LOAD_AUTHOR_SUCCESS = "LOAD_AUTHOR_SUCCESS";
export const UPDATE_COURSE_SUCCESS = "UPDATE_COURSE_SUCCESS";
export const CREATE_COURSE_SUCCESS = "CREATE_COURSE_SUCCESS";
export const BEGIN_API_CALL = "BEGIN_API_CALL";
export const API_CALL_ERROR = "API_CALL_ERROR";
export const DELETE_COURSE_OPTIMISTIC = "DELETE_COURSE_OPTIMISTIC";
export const SET_SORT_PARAMS = "SET_SORT_PARAMS";
/*
By convension, action types ended in "_SUCCESS" are the result of api call succesfully.
Since it's an optimistic delete (positive case), we are omiting the loading state.
So this action name omits suffix _SUCCESS. If it'd had one, counter would be decremented below zero
because it doesnn't increment no of apiCallsInProgress when delete request begins.
*/
