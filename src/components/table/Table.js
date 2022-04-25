// eslint-disable-next-line
import { connect } from "react-redux";
// eslint-disable-next-line
import * as actions from "../../redux/actions";
import TableRows from "./TableRows";

function Table() {
  return (
    <div className="card">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Active</th>
            <th scope="col">Archived</th>
          </tr>
        </thead>
        <tbody>
          <TableRows />
        </tbody>
      </table>
    </div>
  );
}
export default Table;
