import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import EmptyShow from "./EmptyShow";

import { Note, State } from "../../types";
import { AppDispatch } from "../../redux/store";
import { MouseEventHandler } from "react";

interface Props {
  notesArray: Note[];
  unarchiveNote: (id: string) => void;
}

function Entity({ notesArray, unarchiveNote }: Props) {
  const handleUnarchive: MouseEventHandler<HTMLButtonElement> = (e) => {
    unarchiveNote((e.target! as HTMLButtonElement).id);
  };
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
            className="btn btn-success"
            onClick={handleUnarchive}
          >
            Unarchive
          </button>
        </div>
      </div>
    );
    return markup;
  });
  return (<>{entitysMarkup.length > 0 ? entitysMarkup : <EmptyShow />}</>);
}
const mapStateToProps = (state: State) => {
  return {
    notesArray: state.notes,
  };
};
const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    unarchiveNote: (id: string) => dispatch(actions.unarchiveNote(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Entity);

