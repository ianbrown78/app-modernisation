import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";

function Todo() {
    const params = useParams();
    const [todo, setTodo] = useState();

    useEffect(() => {
        console.log(params.id);
        fetch('/todo/' + params.id)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setTodo(data);
            });
    }, []);

    return (
        <Form>
            <FormGroup>
                <Label for="title">
                Title
                </Label>
                <Input
                    id="title"
                    name="title"
                    type="text"
                    disabled={true}
                    value={todo ? todo.title : ""}
                />
            </FormGroup>
            <FormGroup>
                <Label for="description">
                Description
                </Label>
                <Input
                    id="description"
                    name="text"
                    type="textarea"
                    disabled={true}
                    value={todo ? todo.description : ""}
                />
            </FormGroup>
            <FormGroup check>
                <Input
                    type="checkbox"
                    disabled={true}
                    checked={todo ? todo.complete : false}
                />
                {' '}
                <Label check>
                    Complete?
                </Label>
            </FormGroup>
        </Form>
    )
}

export default Todo;