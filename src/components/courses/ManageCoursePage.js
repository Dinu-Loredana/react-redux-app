import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
// import { loadAuthors } from "../../redux/actions/authorActions";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorsActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import { Spinner } from "../common/Spinner";
import { toast } from "react-toastify";

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  history, //destructure here cuz it's being passed in on props
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course }); //copy the course passed in on props to state (empty course initially cuz courses aren't available- on load)
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  console.log("props", props);
  // fetch courses and authors when comp is mounted
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => alert("Error fetching courses" + error));
    } else {
      setCourse({ ...props.course }); //when props change (props.course), update state (course) with new data; copy the course passed in on props to state any time a new course is passed in
    }
    if (authors.length === 0) {
      loadAuthors().catch((error) => alert("Error fetching authors" + error));
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  // dispatch create and update course when saving the form
  function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    saveCourse(course).then(() => {
      toast.success("Course saved!");
      history.push("/courses"); //after saving the course, redirect to CoursesPage
    });
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
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
  // console.log(ownProps)
  const slug = ownProps.match.params.slug; // read slug from url data beign passed by React Router
  const course =
    slug && state.courses.length > 0 // getCourseBySlug is called after courses are available, mapStateToProps is called every time redux store changes
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  //   console.log(course);
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
