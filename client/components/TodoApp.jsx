import React from 'react';

const Title = ({todoCount}) => {
  return (
    <div>
       <div>
          <h1>to-do ({todoCount})</h1>
       </div>
    </div>
  );
}

const TodoForm = ({addTodo}) => {
  // Input Tracker
  let input;
  // Return JSX
  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        addTodo(input.value);
        input.value = '';
      }}>
        +
      </button>
    </div>
  );
};

const Todo = ({todo, remove}) => {
  // Each Todo
  return (<li onClick={() => {remove(todo.id)}}>{todo.text}</li>);
}

const TodoList = ({todos, remove}) => {
  // Map through the todos
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove}/>)
  });
  return (<ul>{todoNode}</ul>);
}

// Contaner Component
// Todo Id
window.id = 0;
export default class TodoApp extends React.Component{
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: []
    }
  }
  // Lifecycle method
  componentDidMount(){
    // Log component mount
    console.log("TodoApp mounted");
    /*
    This can be a good place to make an API call,
    then use this.setState({stateObj}); to fill the state
    with data upon arrival
    */
  }
  // Add todo handler
  addTodo(val){
    // Assemble data
    const todo = {text: val, id: window.id++}
    // Update data
    this.state.data.push(todo);
    // Update state
    this.setState({data: this.state.data});
  }
  // Handle remove
  handleRemove(id){
    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter((todo) => {
      if(todo.id !== id) return todo;
    });
    // Update state with filter
    this.setState({data: remainder});
  }

  render(){
    // Render JSX
    return (
      <div>
        <Title todoCount={this.state.data.length}/>
        <TodoForm addTodo={this.addTodo.bind(this)}/>
        <TodoList
          todos={this.state.data}
          remove={this.handleRemove.bind(this)}
        />
      </div>
    );
  }
}
//ReactDOM.render(<TodoApp />, document.getElementById('container'));
