import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const Note = ({ notes }) =>
  notes !== null &&
  notes.length > 0 &&
  notes.map((note) => (
    <div className="container" align="center" key={note.id}>
      <Alert variant={`${note.noteType}`}>{note.msg}</Alert>
    </div>
  ));

Note.propTypes = {
  notes: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  notes: state.note,
});

export default connect(mapStateToProps)(Note);
