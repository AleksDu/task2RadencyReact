// eslint-disable-next-line
import { alert, defaultModules, defaults } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import * as PNotifyMobile from "@pnotify/mobile";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { ChangeEvent, ChangeEventHandler, FormEvent, MouseEventHandler, useState, VoidFunctionComponent } from 'react'
import { ModalData, State, SubmitEdit } from '../../types'
import { AppDispatch } from '../../redux/store'

interface Props {
  modalData: ModalData,
  closeModal: () => void,
  submitEdit: (cred: SubmitEdit) => void,
}

function Modal({ modalData, closeModal, submitEdit }: Props) {
  const [text, setText] = useState(modalData.text);
  const [category, setCategory] = useState(modalData.category);
  const [noteId, setNoteId] = useState(modalData.id);
  const handleTextNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const handleSubmitEdit = (e: FormEvent) => {
    if (text === "") {
      alert({
        text: "Please write something",
        type: "notice",
        delay: 2000,
      });
      return;
    } else if (category === "null") {
      alert({
        text: "PLease select a category",
        type: "notice",
        delay: 2000,
      });
      return;
    }
    const editObj = {
      id: (e.target as HTMLButtonElement).id,
      text: text,
      category: category,
    };
    submitEdit(editObj);
    setText("");
    setCategory("");
    setNoteId('');
    closeModal();
  };

  return (
    <div className="modal" id="exampleModal" tabindex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit note</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <textarea
                id="editNote"
                className="control-form"
                aria-label="With textarea"
                placeholder="Enter your note"
                value={text}
                onChange={handleTextNote}
              ></textarea>
              <p className="text-card c-3 font-weight-bold">Choose date</p>

              <div>
                <input
                  type="date"
                  id="editDate"
                  className="control-form date-input"
                />
                <input
                  type="time"
                  className="control-form date-input"
                  id="editTime"
                />
              </div>
              <p className="text-card c-3 font-weight-bold">Select category</p>

              <select
                className="form-select"
                id="select-modal"
                value={category}
                onChange={handleCategory}
              >
                <option value="null">Choose category</option>
                <option value="Task">Task</option>
                <option value="Idea">Idea</option>
                <option value="Random Thought">Random Thought</option>
                <option value="Quote">Quote</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              id={noteId}
              onClick={handleSubmitEdit}
              type="button"
              className="btn btn-main"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: State) => {
  return {
    modalData: state.modal,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    closeModal: () => dispatch(actions.closeModal()),
    submitEdit: (editObj: SubmitEdit) => dispatch(actions.editNote(editObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
