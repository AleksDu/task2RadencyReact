import {ChangeEvent, ChangeEventHandler} from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { AppDispatch } from "../../redux/store";

interface Props {
  showArchived: ChangeEventHandler<HTMLInputElement>
}

function Switch({ showArchived }: Props) {
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

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    showArchived: () => dispatch(actions.toggleShowArchived()),
  };
};

export default connect(null, mapDispatchToProps)(Switch);
