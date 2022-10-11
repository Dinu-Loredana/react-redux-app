import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CourseList = ({ courses, onDeleteClick }) => {
  const [selectedAuthor, setSelectedAuthor] = useState("All");
  const uniqueAuthor = ["All", ...new Set(courses.map((c) => c.authorName))];
  const [filteredCoursesByAuthor, setFilteredCoursesByAuthor] =
    useState(courses);

  const handleChange = (event) => {
    setSelectedAuthor(event.target.value);
  };

  const getFilteredCourses = () => {
    if (selectedAuthor !== "All") {
      const filteredData = courses.filter(
        (c) => c.authorName === selectedAuthor
      );
      setFilteredCoursesByAuthor(filteredData);
    } else {
      setFilteredCoursesByAuthor(courses);
    }
  };

  useEffect(() => {
    getFilteredCourses();
  }, [selectedAuthor]);

  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <th>Title</th>
          <th>
            <label>
              Author
              <select value={selectedAuthor} onChange={handleChange}>
                {uniqueAuthor?.map((author) => (
                  <option key={author} value={author}>
                    {author}
                  </option>
                ))}
              </select>
            </label>
          </th>
          <th>Category</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {filteredCoursesByAuthor?.map((course) => {
          return (
            <tr key={course.id}>
              <td>
                <a
                  className="btn btn-light"
                  href={"http://pluralsight.com/courses/" + course.slug}
                >
                  Watch
                </a>
              </td>
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
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default CourseList;
