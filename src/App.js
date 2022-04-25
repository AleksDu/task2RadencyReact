import { connect } from "react-redux";
import "./App.scss";
import Entity from "./components/entitys/Entity";
import Form from "./components/forms/Form";
import Table from "./components/table/Table";
import Modal from "./components/modal/Modal";
import ArchiveEntity from "./components/entitys/ArchiveEntitys";

function App({ modalData, showArchived }) {
  return (
    <div className="App container a-3">
      {modalData.isOpen && <Modal />}
      <Form />
      <hr />
      <ul className="row container-fluid">
        {showArchived ? <ArchiveEntity /> : <Entity />}
      </ul>
      <hr />
      <Table />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    modalData: state.modal,
    showArchived: state.showArchived,
  };
};

export default connect(mapStateToProps)(App);
