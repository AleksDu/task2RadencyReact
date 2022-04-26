// eslint-disable-next-line
import { alert, defaultModules, defaults } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import * as PNotifyMobile from "@pnotify/mobile";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { useState } from "react";

function Modal({ modalData, closeModal, submitEdit }) {
  const [text, setText] = useState(modalData.text);
  const [category, setCategory] = useState(modalData.category);
  const [noteId, setNoteId] = useState(modalData.id);
  // eslint-disable-next-line
  const handleTextNote = (e) => {
    setText(e.target.value);
  };
  // eslint-disable-next-line
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleSubmitEdit = (e) => {
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
      id: e.target.id,
      text: text,
      category: category,
    };
    submitEdit(editObj);
    setText("");
    setCategory("");
    setNoteId(null);
    closeModal();
  };

  return (
    <div className="modal" id="exampleModal" tabindex="-1">
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

const mapStateToProps = (state) => {
  return {
    modalData: state.modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(actions.closeModal()),
    submitEdit: (editObj) => dispatch(actions.editNote(editObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
