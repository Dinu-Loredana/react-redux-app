import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
// import * as courseActions from "../../redux/actions/courseActions";
// import * as authorsActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});

  // fetch courses and authors when comp is mounted
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => alert("Error fetching courses" + error));
    }
    if (authors.length === 0) {
      loadAuthors().catch((error) => alert("Error fetching authors" + error));
    }
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prevState) => ({
      ...prevState,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  // dispatch create and update course when saving the form
  function handleSave(event) {
    event.preventDefault();
    saveCourse(course);
  }

  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    course: newCourse,
    courses: state.courses,
    authors: state.authors,
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse,
  //   loadCourses: courseActions.loadCourses, // redux thunk fn to fetch courses async
  //   loadAuthors: authorsActions.loadAuthors, // redux thunk fn to fetch authors async
  //   saveCourse: courseActions.saveCourse, // redux thunk fn to create/update course async
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
