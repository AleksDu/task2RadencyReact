// eslint-disable-next-line
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
        delay: 2500,
        styling: "angeler",
        icons: "angeler",
      });
      return;
    } else if (category === "null") {
      alert({
        text: "PLease select a category",
        type: "notice",
        delay: 2000,
        styling: "angeler",
        icons: "angeler",
      });
      return;
    }
    const editObj = {
      id: e.target.id,
      text,
      category,
    };
    submitEdit(editObj);
    setText("");
    setCategory("null");
    setNoteId(null);
    closeModal();
  };

  return (
    <div class="modal" id="exampleModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit note</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onclick="closeModal()"
            ></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <textarea
                id="editNote"
                class="control-form"
                aria-label="With textarea"
                placeholder="Enter your note"
              ></textarea>
              <p class="text-card c-3 font-weight-bold">Choose date</p>

              <div>
                <input
                  type="date"
                  id="editDate"
                  class="control-form date-input"
                />
                <input
                  type="time"
                  class="control-form date-input"
                  id="editTime"
                />
              </div>
              <p class="text-card c-3 font-weight-bold">Select category</p>

              <select class="form-select" id="select-modal">
                <option value="null">Choose category</option>
                <option value="Task">Task</option>
                <option value="Idea">Idea</option>
                <option value="Random Thought">Random Thought</option>
                <option value="Quote">Quote</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              onclick="closeModal()"
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
