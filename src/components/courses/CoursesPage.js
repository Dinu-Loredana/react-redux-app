import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorsActions from "../../redux/actions/authorActions";
import * as sortActions from "../../redux/actions/sortActions";
import * as filterActions from "../../redux/actions/filterActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import { Spinner } from "../common/Spinner";
import { toast } from "react-toastify";
import { getSortedCourses, sortSelector } from "../../selectors";
import { SortInfo } from "./SortInfo";
// import { selectSortedCourses } from "../../redux/reducers";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
  };
  componentDidMount() {
    const { coursesList, authors, actions } = this.props;
    if (coursesList?.length === 0) {
      actions
        .loadCourses()
        .catch((error) => alert("Error fetching courses" + error));
    }
    if (authors?.length === 0) {
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
    console.log("COURSES", this.props.coursesList);
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        {this.props.loading ? (
          <Spinner /> //show Spinner if there is at least 1 apiCallsInProgress
        ) : (
          <>
            <button
              style={{ display: "block", margin: "0 auto", fontSize: "12px" }}
              className="btn btn-primary"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add New Course
            </button>
            <SortInfo
              sort={this.props.sortParams}
              onSortClear={this.props.actions.clearSortParams}
            />
            {this.props.coursesList?.length > 0 ? (
              <CourseList
                courses={this.props.coursesList}
                onDeleteClick={this.handleDeleteCourse}
                sort={this.props.sortParams}
                onSort={(key) => this.props.actions.setSortParams(key)}
                onSortClear={() => this.props.actions.clearSortParams()}
                onFilterAuthor={(a) => this.props.actions.setFilteredAuthor(a)}
                filteredAuthor={this.props.filteredAuthor}
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
  coursesList: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  handleDeleteCourse: PropTypes.func.isRequired,
  setSortParams: PropTypes.func.isRequired,
  clearSortParams: PropTypes.func.isRequired,
  sortParams: PropTypes.object.isRequired,
  setFilteredAuthor: PropTypes.func,
  filteredAuthor: PropTypes.string,
};

function mapStateToProps(state) {
  console.log("state mapStateToProps", state);
  return {
    coursesList: getSortedCourses(state),
    authors: state?.authors,
    loading: state?.apiCallsInProgress > 0,
    sortParams: sortSelector(state),
    filteredAuthor: state.filteredAuthor,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch), //redux thunk fn to fetch courses async
      loadAuthors: bindActionCreators(authorsActions.loadAuthors, dispatch), //redux thunk fn to fetch authors async
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
      setSortParams: bindActionCreators(sortActions.setSortParams, dispatch),
      clearSortParams: bindActionCreators(
        sortActions.clearSortParams,
        dispatch
      ),
      setFilteredAuthor: bindActionCreators(
        filterActions.setFilterAuthor,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
