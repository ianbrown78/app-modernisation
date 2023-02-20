import { Fragment, useEffect, useState } from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBinoculars, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

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
        var list = todos;
        var newList;
        fetch('/todo/' + id, { method: 'DELETE' })
            .then(res => res.json());
        window.location.reload(false);
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