import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
    Form,
    FormGroup,
    Label,
    Input,
    Button,
} from "reactstrap";

function TodoForm() {
    const params = useParams();
    const navigate = useNavigate();
    const [id, setId] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [complete, setComplete] = useState();

    useEffect(() => {
        if (params.id !== undefined) {
            fetch('/todo/' + params.id)
            .then(res => res.json())
            .then(data => {
                setId(data.id);
                setTitle(data.title);
                setDescription(data.description);
                setComplete(data.complete);
            });
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id !== undefined) {
            fetch('/todo/' + id, { method: 'PUT' } )
                .then(res => res.json())
                .then(data => {
                    setId(data.id);
                    setTitle(data.title);
                    setDescription(data.description);
                    setComplete(data.complete);
                });
            navigate("/");
        } else {
            const reqOpts = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: title, description: description, complete: complete ? 1 : 0 })
            };
            fetch('/todos', reqOpts)
                .then(res => res.json())
                .then(data => {
                    setId(data.id);
                    setTitle(data.title);
                    setDescription(data.description);
                    setComplete(data.complete);
                });
            navigate("/");
        }
    };

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
                    value={title ? title : ""}
                    onChange={e => setTitle(e.target.value)}
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
                    value={description ? description : ""}
                    onChange={e => setDescription(e.target.value)}
                />
            </FormGroup>
            <FormGroup check>
                <Input
                    id="complete"
                    name="complete"
                    type="checkbox"
                    checked={complete ? complete : false}
                    onChange={e => setComplete(!complete)}
                />
                {' '}
                <Label check>
                    Complete?
                </Label>
            </FormGroup>
            <Button className="btn btn-primary mt-1" type="submit" onClick={(e) => handleSubmit(e)}>Save</Button>
        </Form>
    )
}
export default TodoForm;