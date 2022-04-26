import { connect } from "react-redux";
import * as actions from "../../redux/actions";

function Switch({ showArchived }) {
  return (
    <div className="check-form form-toggle c-3">
      <input
        type="checkbox"
        className="form-check-input align-middle check-archived-switch"
        id="checkbox"
        role="switch"
        onChange={showArchived}
      />
      <label className="form-check-label align-middle d-3" htmlFor="checkbox">
        Show archived notes
      </label>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    showArchived: () => dispatch(actions.toggleShowArchived()),
  };
};

export default connect(null, mapDispatchToProps)(Switch);
