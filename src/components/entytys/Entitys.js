import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import EmptyShow from "./EmptyShow";

function Entitys({ archiveNote, openModal, deleteNote, notesArray }) {
  const allActive = notesArray.filter((note) => note.isArchived === false);
  const dates = allActive.map((note) => {
    const dateType =
      /(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}/g;
    const isMatch = [...note.text.matchAll(dateType)];
    const foundDate = isMatch.map((match) => {
      return match[0];
    });
    let dates = "";
    if (foundDate.length > 0) {
      foundDate.forEach((date) => {
        dates += " | " + date + " | ";
      });
    }
    return dates;
  });

  const entitysMarkup = allActive.map((note, index) => {
    const markup = (
      <div
        key={index}
        className="card d-4 a-2 bg-success text-white thatsMyNote"
        style={{ width: 19 + "rem" }}
      >
        <div className="card-body">
          <h6>${note.time}</h6>
          <p className="card-text">
            ${note.text.replace(/</g, "&lt;").replace(/</g, "&gt")}
          </p>

          <p className="card-text text-info">Category : ${note.category}</p>
          {dates[index].length > 0 ? (
            <p className="card-text text-danger">Dates: ${dates[index]}</p>
          ) : null}
          <button id="{note.id}" className="btn btn-info" onclick={openModal}>
            Edit
          </button>
          <button
            id="{note.id}"
            className="btn btn-danger"
            onclick={deleteNote}
          >
            Delete
          </button>
          <button
            id="{note.id}"
            className="btn btn-success"
            onclick={archiveNote}
          >
            Archive
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
    openModal: (e) => dispatch(actions.openModal(e.target.id)),
    deleteNote: (e) => dispatch(actions.deleteNote(e.target.id)),
    archiveNote: (e) => dispatch(actions.archiveNote(e.target.id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Entitys);
