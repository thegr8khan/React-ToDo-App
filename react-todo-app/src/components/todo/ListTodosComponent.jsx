import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { retrieveAllTodosForUsernameApi, deleteTodoApi } from "./api/TodoAPIService";
import { useAuth } from "./security/AuthContext";

function ListTodosComponent() {

  //const today = new Date();

  const authContext = useAuth();
  
  const username = authContext.username

  const navigate = useNavigate();

  //const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay());
  
  const [todos, setTodos] = useState([])
  const [message, setMessage] = useState(null)


  // const refreshTodos = useCallback(() => {
  //     retrieveAllTodosForUsernameApi(username)
  //     .then(response => setTodos(response.data))
  //     .catch(error => console.log(error))
  //     .finally(() => console.log('cleanup'));  
  //     }, [username]);

      useEffect( 
        () => refreshTodos()
    );

    function refreshTodos() {
      retrieveAllTodosForUsernameApi(username)
      .then(response => {
        setTodos(response.data)
      })
      .catch(error => console.log(error))
    }
  function deleteTodo(id) {
    console.log("clicked " + id);
    deleteTodoApi(username, id)
    .then(
      () => {
        setMessage(`Todo ID = ${id} Successfully Deleted!`);
        refreshTodos();
      }
    )
  }
  
  function updateTodo(id) {
    console.log("clicked" + id);
    navigate(`/todo/${id}`);
    //setMessage(`Todo ID = ${id} Successfully Updated!`);
  }

  return (
    <div className="container">
      <h1>Things You Want To  Do!</h1>
      {message && <div className="alert alert-warning">{message}</div>}
      <div>
         <table className="table">
          <thead>
              <tr>
                <th>Description</th>
                <th>Is Done?</th>
                <th>Target Date</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {
                todos.map(
                  todo => (
                    <tr key={todo.id}>
                      <td>{todo.description}</td>
                      <td>{todo.done.toString()}</td>
                      <td>{todo.targetDate.toString()}</td>
                      <td><button className="btn btn-warning" 
                            onClick={() => deleteTodo(todo.id)}>Delete</button> </td>
                      <td><button className="btn btn-warning" 
                            onClick={() => updateTodo(todo.id)}>Update</button> </td>      
                    </tr>
                  )
                )
              }
              
            </tbody>
          </table>
      </div>
    </div>
  );
}

export default ListTodosComponent