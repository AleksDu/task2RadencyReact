// eslint-disable-next-line
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import EmptyShow from "./EmptyShow";
import { Note, State } from "../../types";
import { MouseEventHandler } from 'react';
import { AppDispatch } from "../../redux/store";

interface Props {
  notesArray: Note[],
  openModal: (id: string) => void,
  deleteNote: (id: string) => void,
  archiveNote: (id: string) => void,
}

function Entity({ notesArray, deleteNote, archiveNote, openModal }: Props) {
  
  const handleOpenModal: MouseEventHandler<HTMLButtonElement> = (e) => {
    openModal((e.target! as HTMLButtonElement).id);
  };

  const handleArchive: MouseEventHandler<HTMLButtonElement> = (e) => {
    archiveNote((e.target! as HTMLButtonElement).id);
  };

  const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    deleteNote((e.target! as HTMLButtonElement).id);
  };

  const allActive = notesArray.filter((note) => note.isArchived == false);

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
        dates += "0| " + date + " | ";
      });
    }
    return dates;
  });

  const entityMarkup = allActive.map((note, index) => {
    const markup = (
      <div
        key={index}
        className="card d-4 a-2 bg-success text-white thatsMyNote"
        style={{ width: 19 + "rem" }}
      >
        <div className="card-body">
          <h6>{note.time}</h6>
          <p className="card-text">
            {note.text.replace(/</g, "&lt;").replace(/</g, "&gt")}
          </p>

          <p className="card-text text-info">Category : {note.category}</p>
          {dates[index].length > 0 ? (
            <p className="card-text text-danger">DATES: {dates[index]}</p>
          ) : null}
          <button id={note.id} onClick={handleOpenModal} className="btn btn-info" >
            Edit
          </button>
          <button
            id={note.id}
            className="btn btn-danger a-2"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            id={note.id}
            className="btn btn-success a-2"
            onClick={handleArchive}
          >
            Archive
          </button>
        </div>
      </div>
    );

    return markup;
  });
  return (<>{entityMarkup.length > 0 ? entityMarkup : <EmptyShow />}</>);
}
const mapStateToProps = (state: State) => {
  return {
    notesArray: state.notes,
  };
};
const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    openModal: (id: string) => dispatch(actions.openModal(id)),
    deleteNote: (id: string) => dispatch(actions.deleteNote(id)),
    archiveNote: (id: string) => dispatch(actions.archiveNote(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Entity);
