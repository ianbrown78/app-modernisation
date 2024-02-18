import { Fragment, useEffect, useState } from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBinoculars, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-hot-toast";

function Todos() {
    const [todos, setTodos] = useState(0);

    useEffect(() => {
        fetch('/todos')
            .then(res => res.json())
            .then(data => {
                setTodos(data);
            });
    }, []);

    const renderNone = () => {
        return (
            <tr>
                <td colSpan={4} align="center">No jobs found</td>
            </tr>
        );
    }

    const handleDeleteTodo = (id) => {
        fetch('/todo/' + id, { method: 'DELETE' })
            .then((response) => {
                if (response.ok) {
                    toast.success('Todo deleted successfully.');
                } else {
                    toast.error('Error deleting Todo item.');
                }
            });
        setTimeout(() => {
            window.location.reload(false)
        }, 2500);
    }

    const renderTodos = (todos) => {
        return (
            <Fragment>
                {todos.map((todo) => (
                    <tr key={todo.id}>
                        <td>{todo.title}</td>
                        <td>{todo.complete ? 'Yes' : 'No'}</td>
                        <td>
                            <Button href={"/v/" + todo.id} className="actionButton">
                                <FontAwesomeIcon icon={faBinoculars} />
                            </Button>
                            <Button href={"/e/" + todo.id} className="actionButton">
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </Button>
                            <Button onClick={() => handleDeleteTodo(todo.id)} className="actionButton">
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </td>
                    </tr>
                ))}
            </Fragment>
        );
    }

    return (
        <Fragment>
            <div className="row">
                <Button href={"/e"} className="btn btn-success">New</Button>
            </div>
            <div className="row">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Complete</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {todos?.length > 0 ?
                        renderTodos(todos)
                        :
                        renderNone()
                    }
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}
export default Todos;