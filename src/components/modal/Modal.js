import { alert, defaultModules, defaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PnotifyMobile from 'pnotify-mobile';
import 'pnotify-mobile/dist/pnotify.mobile.css';
import 'pnotify/core/dist/Angeler.css';

import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { useState } from "react";


function Modal({ modalData, closeModal, submitEdit }) {
    const [text, setText] = useState(modalData.text);
    const [category, setCategory] = useState(modalData.category);
    const [noteId, setNoteId] = useState(modalData.id);

    const handleTextNote = (e) => {
        setText(e.target.value);
    }
    const handleCategory = (e) => {
        setCategory(e.target.value);
    }
    const handleSubmitEdit = (e) => {
         if (text === '') {
            alert({ text: 'Please write something', type: 'notice', delay: 2500, styling: 'angeler', icons: 'angeler' })
            return
        } else if (category == 'null') {
            alert({ text: 'PLease select a category', type: 'notice', delay: 2000, styling: 'angeler', icons: 'angeler' })
            return
        }
        const obj = {
            id: e.target.id,
            text,
            category,
            
        }
        submitEdit(obj)
        setText('')
        setCategory('null')
        setNoteId(null)
        closeModal()
    }

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
          </div>
        </div>
      </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        modalData: state.modal,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(actions.closeModal()),
        submitEdit: (obj) => dispatch(actions.submitEdit(obj)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)