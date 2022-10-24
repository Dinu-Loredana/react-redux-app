import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { SortableTableHeader } from "./SortableTableHeader";

const CourseList = ({ courses, onDeleteClick, onSort, onSortClear, sort }) => {
  // const [selectedAuthor, setSelectedAuthor] = useState("All");
  // const uniqueAuthor = ["All", ...new Set(courses.map((c) => c.authorName))];
  // const [filteredCoursesByAuthor, setFilteredCoursesByAuthor] =
  //   useState(courses);

  // const handleChange = (event) => {
  //   setSelectedAuthor(event.target.value);
  // };

  // const getFilteredCourses = () => {
  //   if (selectedAuthor !== "All") {
  //     const filteredData = courses.filter(
  //       (c) => c.authorName === selectedAuthor
  //     );
  //     setFilteredCoursesByAuthor(filteredData);
  //   } else {
  //     setFilteredCoursesByAuthor(courses);
  //   }
  // };

  // useEffect(() => {
  //   getFilteredCourses();
  // }, [selectedAuthor]);

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <SortableTableHeader
              label="Title"
              sortKey="title"
              sort={sort}
              onSort={onSort}
              onSortClear={onSortClear}
            />
            <SortableTableHeader
              label="Author"
              sortKey="authorName"
              sort={sort}
              onSort={onSort}
              onSortClear={onSortClear}
            />

            {/* <select value={selectedAuthor} onChange={handleChange}>
              {uniqueAuthor?.map((author) => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </select> */}
            <SortableTableHeader
              label="Category"
              sortKey="category"
              sort={sort}
              onSort={onSort}
              onSortClear={onSortClear}
            />
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {courses?.map((course) => {
            return (
              <tr key={course.id}>
                <td>
                  <Link to={"/course/" + course.slug}>{course.title}</Link>
                </td>
                <td>{course.authorName}</td>
                <td>{course.category}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => onDeleteClick(course)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onSortClear: PropTypes.func.isRequired,
  sort: PropTypes.object.isRequired,
};

export default CourseList;
