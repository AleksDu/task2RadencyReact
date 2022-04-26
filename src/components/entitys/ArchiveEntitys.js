import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import EmptyShow from "./EmptyShow";

function Entity({ notesArray, unarchiveNote }) {
  const allArchived = notesArray.filter((note) => note.isArchived == true);
  const entitysMarkup = allArchived.map((note, index) => {
    const markup = (
      <div
        key={index}
        className="card d-4 a-2 bg-dark text-white thatsMyNote"
        style={{ width: 19 + "rem" }}
      >
        <div className="card-body">
          <h6>{note.time}</h6>
          <p className="card-text">
            {note.text.replace(/</g, "&lt;").replace(/</g, "&gt")}
          </p>

          <p className="card-text text-info">Category : {note.category}</p>
          <button
            id={note.id}
            className="btn btn-success a-2"
            onClick={unarchiveNote}
          >
            Unarchive
          </button>
        </div>
      </div>
    );
    return markup;
  });
  return entitysMarkup.length > 0 ? entitysMarkup : <EmptyShow />;
}
const mapStateToProps = (state) => {
  return {
    notesArray: state.notes,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    unarchiveNote: (e) => dispatch(actions.unarchiveNote(e.target.id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Entity);
