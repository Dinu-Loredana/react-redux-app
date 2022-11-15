import { createSelector } from "reselect";

// selectors
const coursesSelector = (state) => state && state.courses; // returns courses from redux store state
const authorsSelector = (state) => state && state.authors; // returns authors from redux store state
export const sortSelector = (state) => state && state.sortParams; // returns sortParams from redux store state
// const filteredAuthorSelector = (state) => state && state.filteredAuthor;

export const getSortedCourses = createSelector(
  coursesSelector,
  authorsSelector,
  sortSelector,
  (courses, authors, sortParams) => {
    if (!authors?.length) return [];
    //const authorsMap = keyBy(authors, "id");
    const authorsAddedToCourses = courses?.map((course) => ({
      ...course,
      authorName:
        authors?.find((a) => a.id === course.authorId)?.name || "loading",
      //authorName: authorsMap[course.authorId]?.name || "loading",
    }));

    // order courses without lodash, with sort method
    if (sortParams?.key !== "") {
      if (sortParams?.order === "desc") {
        return [
          ...authorsAddedToCourses.sort((c1, c2) => {
            return c1[sortParams?.key] > c2[sortParams?.key] ? -1 : 0; // desc
          }),
        ];
      } else if (sortParams?.order === "asc") {
        return [
          ...authorsAddedToCourses.sort((c1, c2) => {
            return c1[sortParams?.key] < c2[sortParams?.key] ? -1 : 0; // asc
          }),
        ];
      }
    }

    // if (sortParams.key !== "") {
    //   return orderBy(
    //     authorsAddedToCourses,
    //     [sortParams.key],
    //     [sortParams.order]
    //   );
    // }

    return authorsAddedToCourses;
  }
);

// export const getFilteredCoursesByAuthor = createSelector(
//   coursesSelector,
//   filteredAuthorSelector,
//   (coursesResult, filteredAuthor) => {
//     if (filteredAuthor !== "All") {
//       const filteredCourses = coursesResult.filter(
//         (c) => c.authorName === filteredAuthor
//       );
//       return filteredCourses;
//     } else {
//       return coursesResult;
//     }
//   }
// );
