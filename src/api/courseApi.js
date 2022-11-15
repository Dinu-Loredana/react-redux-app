import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/courses/";

// Method - a command that tells the server what to do
// GET
export function getCourses() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
export async function getCourses1() {
  try {
    const response = await fetch(baseUrl);
    // if (response.ok) {
    //   return response.json();
    // } else {
    //   throw new Error("Something went wrong", response.status);
    // }
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
    //return error;
  }
  // return fetch(baseUrl).then(handleResponse).catch(handleError);
}

// POST / PUT Request
export async function saveCourse(course) {
  try {
    const response = await fetch(baseUrl + (course?.id || ""), {
      method: course.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
      headers: { "content-type": "application/json" },
      body: JSON.stringify(course),
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}

export async function deleteCourse(courseId) {
  try {
    const response = await fetch(baseUrl + courseId, { method: "DELETE" });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
