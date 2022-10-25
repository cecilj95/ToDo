import React from 'react';
import { Page, Navbar, Link, NavLeft, NavRight, NavTitle, List, ListInput, Button, Block, Col, Row, f7 } from 'framework7-react';



export default ({ f7router }) => {
    const DoAddNewTask = (e) => {
        e.preventDefault();
        const formData = f7.form.convertToData(e.target)
       
            const opts = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                //body: JSON.stringify(formData)
            }
            fetch("https://auhz40r9vl.execute-api.us-east-2.amazonaws.com/test/newtask?user_id=2&title="+formData.title+"&description="+formData.description+"&tasktime="+formData.tasktime, opts).then(() => {
                f7.dialog.alert("Task Created", "To Do");
                f7router.navigate('/tasks/');             
            });
        }
return (<Page name="newtask">
        <Navbar>
            <NavLeft backLink="Back"></NavLeft>
            <NavTitle>ToDo App</NavTitle>
            <NavRight>
                <Link panelOpen="left">
                    <span class="material-icons">
                        menu
                    </span>
                </Link>
            </NavRight>
        </Navbar>
        <List noHairlinesMd form onSubmit={(e) => DoAddNewTask(e)}>
            <ListInput
                outline
                label="Title"
                name="title"
                floatingLabel
                type="text"
                placeholder="Title"
                validate
                clearButton
            >
            </ListInput>
            <ListInput
                outline
                label="Description"
                name="description"
                floatingLabel
                type="text"
                placeholder="Description"
                validate
                clearButton
            >
            </ListInput>
            <ListInput
                outline
                label="Task Time"
                name="tasktime"
                floatingLabel
                type="datetime-local"
                placeholder="Task Time"
                validate
                clearButton
            >
            </ListInput>
            <Block>
                <Row>
                    <Col>
                        <Button fill type="submit">Create Task</Button>
                    </Col>
                </Row>
            </Block>
        </List>
    </Page >)
}