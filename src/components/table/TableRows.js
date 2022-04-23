import { connect } from "react-redux";
import * as actions from "../../actions";
import { useEffect } from "react";

function TableRows({ notesArray, onUpdate }) {
    UseEffect(() => {
        const data=getTableData()
        onUpdate(data)
    })

    const getTableData = () => {
        const allCategories = notesArray.map(note => note.category);
        const uniqueCategories = [...new Set(allCategories)];
        const filteredCategories = uniqueCategories.map(uniqueCategories => {
            const obj = {
                [uniqueCategories]: {
                    active: notesArray.filter(note => note.category === uniqueCategories && note.isArchived === false).length,
                    archived: notesArray.filter(note => note.category === uniqueCategories && note.isArchived === true).length,
                
                }
            }
            return obj
        })
        return filteredCategories
    }

    const tableData = getTableData()
    const tableMarkup = (tableData) => {
        const markup = tableData.map((category, index) => {
            const key = Object.keys(category)
            return (
                <tr key={index}>
                    <th scope="row">{key}</th>
                    <td>{category[key].active}</td>
                    <td>{category[key].archived}</td>
                </tr>

            )
        })
        return markup
    }
    return (
        tableData.length > 0 ? tableMarkup(tableData) : <h3 className="c-3" style={{ color: "white", fontSize: 19 + 'px' }}>No data to display</h3>
    )
        



}

const mapStateToProps = state => {
    return {
        notesArray: state.notes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdate: (data) => dispatch(actions.changeTableData(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRows);