import React, { Component } from "react"; 
import { Container, Title, Form, TextInput, TodoList, TodoListItem, Button, Div } from "./styles";

export default class Main extends Component {
  state = {
    todos: [],
    newTodo: ""
  };

  componentDidMount() {
    const todos = JSON.parse(localStorage.getItem("@tarefas/todos"));
    if (todos) {
      this.setState({ todos: todos})
    }
  }

  componentDidUpdate() {
    const todos = this.state.todos;
    localStorage.setItem("@tarefas/todos", JSON.stringify(todos));
  }

  handleKeyDown = e => {
    const { newTodo } = this.state;

    if (e.keyCode === 13 && newTodo) {
      this.setState({
        todos: [
          ...this.state.todos,
          {
            text: newTodo,
            completed: false
          }
        ],
        newTodo: ""
      });
    }
  };

  handleToggle = index => {
    const { todos } = this.state;
    const todo = todos[index];

    todo.completed = !todo.completed;

    this.setState({ ...this.state, todos });
  };

  clearDoneHandler = () => {
    let tasks = this.state.todos.filter(t => !t.completed);

    this.setState({ todos: tasks});
  }

  clearAllHandler = () => {
    const todos = [];
    this.setState({ todos: todos});
  }

  render() {
    return (
      <Container>
        <Title>To do List!</Title>
        <Form onSubmit={e => e.preventDefault()}>
          <TextInput
            placeholder="What I need to do?"
            value={this.state.newTodo}
            onChange={e =>
              this.setState({ ...this.state, newTodo: e.target.value })
            }
            onKeyDown={this.handleKeyDown}
          />
          <TodoList>
            {this.state.todos.map((todo, index) => (
              <TodoListItem key={index} item={todo}>
                <div>
                  <input
                    type="checkbox"
                    onClick={e => this.handleToggle(index)}
                    checked={todo.completed}
                  />
                  <label>{todo.text}</label>
                </div>
              </TodoListItem>
            ))}
          </TodoList>
        </Form>
        <Div>
          <Button onClick={this.clearDoneHandler}>Clear Completed Tasks! <i class="fa fa-trash-o" aria-hidden="true"></i></Button>
          <Button onClick={this.clearAllHandler}>Clear All Tasks! <i class="fa fa-trash-o" aria-hidden="true"></i></Button>
        </Div>
      </Container>
    );
  }
}
