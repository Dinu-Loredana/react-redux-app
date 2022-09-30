import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
// import { loadAuthors } from "../../redux/actions/authorActions";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorsActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  history, //destructure here cuz it's being passed in on props
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  console.log("props", props);
  // fetch courses and authors when comp is mounted
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => alert("Error fetching courses" + error));
    } else {
      setCourse({ ...props.course });
    }
    if (authors.length === 0) {
      loadAuthors().catch((error) => alert("Error fetching authors" + error));
    }
  }, [props.course]);

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
    saveCourse(course).then(() => {
      history.push("/courses"); //after saving the course, redirect to CoursesPage
    });
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
  history: PropTypes.object.isRequired, // any compon loaded via <Route> gets history passed in on props from React Router (destructure it)
};

function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug; // read slug from url data beign passed by React Router
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  console.log(course);
  return {
    course,
    courses: state.courses,
    authors: state.authors,
  };
}

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses, // redux thunk fn to fetch courses async
  loadAuthors: authorsActions.loadAuthors, // redux thunk fn to fetch authors async
  saveCourse: courseActions.saveCourse, // redux thunk fn to create/update course async
  //   loadCourses,
  //   loadAuthors,
  //   saveCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
