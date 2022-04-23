import { alert, defaultModules, defaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as PnotifyMobile from 'pnotify-mobile';
import 'pnotify-mobile/dist/pnotify.mobile.css';
import 'pnotify/core/dist/Angeler.css';
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { useState } from "react";
import {v4 as uuid} from 'uuid';
import { Switch } from "react-router-dom";

defaultModules.set(PnotifyMobile, {});
defaults.closerHover = false;

    
function Form({
    onSubmit }) {
    const [text, setText] = useState("");
    const [category, setCategory] = useState('null');

    const handleTextNote = (e ) => {
        setText(e.target.value);
    }
    const handleCategory = (e) => {
        setCategory(e.target.value);
    }
    const handleSubmit = () => {
        let now = new Date();
        let dateTime = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} | ${now.getHours()}:${now.getMinutes()}`;

        if (text === '') {
            alert({ text: 'Please write something', type: 'notice', delay: 2500, styling: 'angeler', icons: 'angeler' })
            return
        } else if (category == 'null') {
            alert({ text: 'PLease select a category', type: 'notice', delay: 2000, styling: 'angeler', icons: 'angeler' })
            return
        }
        const id = uuid()
        const obj ={
            id,
            text,
            category,
            time: dateTime,
            isArchived: false
        }
        onSubmit(obj)
        setText('')
        setCategory('null')
    }
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

                    <select className="form-select" id="category" value={category}
                    onChange={handleCategory}>
              <option value="null">Choose category</option>
              <option value="Task">Task</option>
              <option value="Idea">Idea</option>
              <option value="Random Thought">Random Thought</option>
              <option value="Quote">Quote</option>
            </select>
          </div>
          <br />
                <button id="addBtn" className="btn btn-main" onClick={handleSubmit} >Add</button>
                <Switch/>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (note) => dispatch(addNote(note))
    };
}

export default connect(null, mapDispatchToProps)(Form);

    