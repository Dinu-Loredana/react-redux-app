import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorsActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";

class ManageCoursePage extends React.Component {
  componentDidMount() {
    const { courses, authors, loadCourses, loadAuthors } = this.props;
    if (courses.length === 0) {
      loadCourses().catch((error) => alert("Error fetching courses" + error));
    }
    if (authors.length === 0) {
      loadAuthors().catch((error) => alert("Error fetching authors" + error));
    }
  }

  render() {
    return (
      <>
        <h2>Courses</h2>
      </>
    );
  }
}

ManageCoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.function.isRequired,
  loadAuthors: PropTypes.function.isRequired,
};

function mapStateToProps(state) {
  return {
    courses: state.course,
    authors: state.authors,
  };
}

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses, //redux thunk fn to fetch courses async
  loadAuthors: authorsActions.loadAuthors, //redux thunk fn to fetch authors async
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
