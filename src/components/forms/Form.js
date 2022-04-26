import { alert, defaultModules, defaults } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import * as PNotifyMobile from "@pnotify/mobile";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { useState } from "react";
import Swich from "./Swich";
import { v4 as uuid } from "uuid";

defaultModules.set(PNotifyMobile, {});
defaults.closerHover = false;

function Form({ onSubmit }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("null");

  const handleTextNote = (e) => {
    setText(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleSubmit = () => {
    let now = new Date();
    let dateTime = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} | ${now.getHours()}:${now.getMinutes()}`;

    if (text === "") {
      alert({
        text: "Please write something",
        type: "notice",
        delay: 2000,
      });
      return;
    } else if (category == "null") {
      alert({
        text: "PLease select a category",
        type: "notice",
        delay: 2000,
      });
      return;
    }
    const id = uuid();
    const obj = {
      id: id,
      text: text,
      category: category,
      time: dateTime,
      isArchived: false,
    };
    onSubmit(obj);

    setText("");
    setCategory("null");
  };
  return (
    <div className="card text-dark bg-light b-3">
      <div className="body-card">
        <h5 className="title-card">Enter a note</h5>
        <div className="form-group">
          <textarea
            id="addNote"
            className="control-form"
            aria-label="With textarea"
            value={text}
            placeholder="Enter your note"
            onChange={handleTextNote}
          ></textarea>

          <p className="text-card c-3 font-weight-bold">Select category</p>

          <select
            className="form-select"
            id="category"
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
        <br />
        <button id="addBtn" className="btn btn-main" onClick={handleSubmit}>
          Add
        </button>
        <Swich />
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (noteObj) => dispatch(actions.addNote(noteObj)),
  };
};

export default connect(null, mapDispatchToProps)(Form);
