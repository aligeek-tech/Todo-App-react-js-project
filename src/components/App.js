import React from "react";
import TodoItem from "./Todoitem"
import todoData from "./todoData"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      appTitle: "Todo App",
      inputPlacholder: "What Do You Want To Get Done Today? ",
      todos: todoData,
      emptyInput: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.tickItem = this.tickItem.bind(this)

  }
  handleInputChange(e) {
    this.setState(prev => {
      return (
        prev.emptyInput = false
      )
    })
    if (e.key === 'Enter') {
      if (e.target.value !== "") {
        e.preventDefault();
        const data = { id: this.state.todos.length + 1, text: e.target.value, checked: false }
        this.setState(prev => {
          return (
            prev.todos.push(data),
            prev.emptyInput = false
          )
        })
        e.target.value = "";
      }
      else {
        e.preventDefault();
        this.setState(prev => {
          return (
            prev.emptyInput = true
          )
        })
      }
    }
  }
  deleteItem(data) {
    this.setState({
      todos: this.state.todos.filter(el => el !== data)
    })
  }
  tickItem(data) {
    let check = this.state.todos.findIndex((e => e === data))
    this.setState(prev => {
      let final = prev.todos[check]
      return final.checked = !prev.todos[check].checked
    })
  }
  render() {
    const todoItems = this.state.todos.map(item => <TodoItem key={item.id} item={item} handleChange={this.handleChange} tickItem={this.tickItem} deleteItem={this.deleteItem} todos={this.state.todos} />)
    const style = {
      opacity: .7,
      color: "red",
      width: "100%",
      textAlign: "center",
      fontSize: "20px"
    }
    return (
      <>
        <main>
          <div className="container">
            <h1 className="app-title">{this.state.appTitle}</h1>
            <form className="js-form">
              <input type="text" onKeyDown={this.handleInputChange} autoFocus={true}
                placeholder={this.state.inputPlacholder} className="js-todo-input" />
            </form>
            <p style={this.state.emptyInput ? style : { display: "none" }}>please enter something . . .</p>
            <ul className="todo-list js-todo-list">
              {todoItems}
            </ul>
          </div>
        </main>
        <svg>
          <defs>
            <symbol id="delete-icon" viewBox="0 0 448 448">
              <path
                d="m224 0c-123.710938 0-224 100.289062-224 224s100.289062 224 224 224 224-100.289062 224-224c-.132812-123.65625-100.34375-223.867188-224-224zm124.449219 325.824219c4.15625 4.015625 5.828125 9.964843 4.363281 15.558593s-5.835938 9.964844-11.429688 11.429688-11.542968-.207031-15.558593-4.363281l-101.824219-101.824219-101.824219 101.824219c-6.277343 6.0625-16.257812 5.976562-22.429687-.195313s-6.257813-16.152344-.195313-22.429687l101.824219-101.824219-101.824219-101.824219c-4.15625-4.015625-5.828125-9.964843-4.363281-15.558593s5.835938-9.964844 11.429688-11.429688 11.542968.207031 15.558593 4.363281l101.824219 101.824219 101.824219-101.824219c6.277343-6.0625 16.257812-5.976562 22.429687.195313s6.257813 16.152344.195313 22.429687l-101.824219 101.824219zm0 0"
                fill="#D80027" />
            </symbol>
          </defs>
        </svg>
      </>
    );
  }
}
export default App;