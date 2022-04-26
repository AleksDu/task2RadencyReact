import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import React, { ReactComponentElement, useEffect } from "react";
import { Note, State } from "../../types";
import { table } from 'console'
import { AppDispatch } from "../../redux/store";

interface TableRowsProps {
  notesArray: Note[],
  onUpdate: (data: TableData) => void,
}
type TableData = { [key: string]: { active: number, isArchived: number } }[]

type Category = {
  [key: string]: { active: number, isArchived: number }
}


const  TableRows =({ notesArray, onUpdate }: TableRowsProps) => {
  useEffect(() => {
    const data = getTableData();
    onUpdate(data);
  });

  const getTableData = () => {
    const allCategories = notesArray.map((note) => note.category);
    const uniqueCategories = [...new Set(allCategories)];
    const filteredCategories = uniqueCategories.map((uniqueCategories) => {
      const obj = {
        [uniqueCategories]: {
          active: notesArray.filter(
            (note) =>
              note.category === uniqueCategories && note.isArchived === false
          ).length,
          isArchived: notesArray.filter(
            (note) =>
              note.category === uniqueCategories && note.isArchived === true
          ).length,
        },
      };
      return obj;
    });
    return filteredCategories;
  };

  const tableData = getTableData();
  const tableMarkup = (tableData: TableData) => {
    const markup = tableData.map((category: Category, index: number) => {
      const key = Object.keys(category);
      return (
        <tr key={index}>
          <th scope="row">{key}</th>
          <td>{category[identifier].active}</td>
          <td>{category[identifier].isArchived}</td>
        </tr>
      );
    });
    return markup;
  };
  return ( <>{tableData.length > 0 ? 
    tableMarkup(tableData)
   : 
    <h3 className="c-3" style={{ color: "white", fontSize: 19 + "px" }}>
      No data to display
    </h3> 
}</>
  );
  
}

const mapStateToProps = (state: State) => {
  return {
    notesArray: state.notes,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    onUpdate: (data: TableData) => dispatch(actions.setTableData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableRows);
