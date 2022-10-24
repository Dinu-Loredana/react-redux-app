import { orderBy, keyBy } from "lodash";
import { createSelector } from "reselect";

// selectors
const coursesSelector = (state) => state && state.courses; // returns courses from redux store state
const authorsSelector = (state) => state && state.authors; // returns authors from redux store state
export const sortSelector = (state) => state && state.sortParams; // returns sortParams from redux store state

export const getSortedCourses = createSelector(
  coursesSelector,
  authorsSelector,
  sortSelector,
  (courses, authors, sortParams) => {
    if (!authors?.length) return [];
    const authorsMap = keyBy(authors, "id");
    const authorsAddedToCourses = courses.map((course) => ({
      ...course,
      authorName: authorsMap[course.authorId]?.name || "loading",
    })); //state.authors?.find((a) => a.id === c.authorId)

    if (sortParams.key !== "") {
      return orderBy(
        authorsAddedToCourses,
        [sortParams.key],
        [sortParams.order]
      );
    }
    return authorsAddedToCourses;
  }
);
