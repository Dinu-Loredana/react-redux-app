import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/authors/";

export async function getAuthors() {
  try {
    const response = await fetch(baseUrl);
    return handleResponse(response);
  } catch (error) {
    return handleError(error); // catch the error thrown by apiUtils
  }
  //return fetch(baseUrl).then(handleResponse).catch(handleError);
}
