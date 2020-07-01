import React from "react";
import swal from 'sweetalert';
class Todoitem extends React.Component {
    constructor(props) {
        super(props)
        this.tick = this.tick.bind(this)
        this.delete = this.delete.bind(this)
    }
    tick() {
        this.props.tickItem(this.props.item)
    }
    delete() {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this todo?",
            icon: "warning",
            dangerMode: true,

        })
            .then(willDelete => {
                if (willDelete) {
                    this.props.deleteItem(this.props.item)
                    swal("Deleted!", "Your todo list has been deleted!", "success");
                }
            });
    }
    render() {
        const style = {
            textDecoration: "line-through",
            opacity: .5,
            fontStyle: "italic"
        }, secondStyle = {
            backgroundColor: "#90EE90",
        }, thirdStyle = {
            display: "none",
        }
        return (
            <>
                <li className="todo-item" id={this.props.id} style={this.props.item.deleted ? thirdStyle : null}>
                    <input id={this.props.id} type="checkbox" checked={this.props.item.checked} onChange={() => this.props.handleChange(this.props.item.id)} />
                    <label id={this.props.id} className="tick js-tick" onClick={this.tick} style={this.props.item.checked ? secondStyle : null}></label>
                    <span id={this.props.id} style={this.props.item.checked ? style : null} >{this.props.item.text}</span>
                    <button onClick={this.delete} id={this.props.id} className="delete-todo js-delete-todo">
                        <svg>
                            <use href="#delete-icon"></use>
                        </svg>
                    </button>
                </li>
            </>
        )
    }
}
export default Todoitem;