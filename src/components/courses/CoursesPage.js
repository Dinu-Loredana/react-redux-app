import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorsActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import { Spinner } from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
  };
  componentDidMount() {
    const { courses, authors, actions } = this.props;
    if (courses.length === 0) {
      actions
        .loadCourses()
        .catch((error) => alert("Error fetching courses" + error));
    }
    if (authors.length === 0) {
      actions
        .loadAuthors()
        .catch((error) => alert("Error fetching authors" + error));
    }
  }

  handleDeleteCourse = async (course) => {
    toast.success("Course deleted!"); // show message before api call finishes the deleting
    try {
      await this.props.actions.deleteCourse(course); // behind the scenes, the req are still in progress
    } catch (error) {
      toast.error("Delete failed" + error.message, { autoClose: false }); // handle fail in case or optimistic delete (show another message - error - that closes when user close it)
    }
  };
  // Syntatic sugar to promises: async/await -> uses promises behind the scenes. Can interact with promises.
  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner /> //show Spinner if there is at least 1 apiCallsInProgress
        ) : (
          <>
            <button
              style={{ marginBottom: "20" }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            {this.props.courses.length > 0 ? (
              <CourseList
                courses={this.props.courses}
                onDeleteClick={this.handleDeleteCourse}
              />
            ) : (
              <h4 className="add-course" style={{ textAlign: "center" }}>
                No courses available.
              </h4>
            )}
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  handleDeleteCourse: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses
            .map((course) => {
              return {
                ...course,
                authorName: state.authors.find((a) => a.id === course.authorId)
                  .name,
              };
            })
            .sort((c1, c2) => c1.title.localeCompare(c2.title)),

    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch), //redux thunk fn to fetch courses async
      loadAuthors: bindActionCreators(authorsActions.loadAuthors, dispatch), //redux thunk fn to fetch authors async
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
