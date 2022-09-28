import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorsActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";

class CoursesPage extends React.Component {
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

  render() {
    return (
      <>
        <h2>Courses</h2>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch), //redux thunk fn to fetch courses async
      loadAuthors: bindActionCreators(authorsActions.loadAuthors, dispatch), //redux thunk fn to fetch authors async
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

// state = {
//   course: {
//     title: "",
//   },
// };

// // if you don't use arrow fn, need to bind 'this' to the class instance
// handleChange = (event) => {
//   const course = { ...this.state.course, title: event.target.value };
//   this.setState({ course });
// };

// handleSubmit = (event) => {
//   event.preventDefault();
//   this.props.actions.createCourse(this.state.course);
// };

{
  /* <form onSubmit={this.handleSubmit}>
          <h2>Courses</h2>
          <h3>Add Course</h3>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.course.title}
          />

          <input type="submit" value="Save" />
        </form> */
}
