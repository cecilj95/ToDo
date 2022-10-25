import React, { useState, useEffect } from 'react';
import { Page, Navbar, Link, NavLeft, NavRight, NavTitle, List, ListInput, Button, Block, Col, Row, f7 } from 'framework7-react';
import { f7ready } from "framework7-react";


export default (props) => {

  const [tasktitle, Settasktitle] = useState();
  const [taskdesc, Settaskdesc] = useState();
  const [tasktime, Settasktime] = useState();
  useEffect(() => {
    f7ready((f7) => {
      //alert(props.taskid);
      //.navigate('/tasks/');
      const userID = localStorage.getItem("Auth"); // Edit This with the userid wheather it comes from cookie or localstorage
      fetch("https://auhz40r9vl.execute-api.us-east-2.amazonaws.com/test/gettask?user_id=2&id=" + props.taskid)
        .then((response) => response.json())
        .then((data) => {
          //   Password = data.user.password;
          Settasktitle(data[0].title);
          Settaskdesc(data[0].description);
          Settasktime(data[0].tasktime);
        });
    });
  }, []);
  const DoUpdateTask = (e) => {
    e.preventDefault();
    const formData = f7.form.convertToData(e.target);
    var taskid = props.taskid;
    const opts = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      //body: JSON.stringify(formData)
    }
    fetch("https://auhz40r9vl.execute-api.us-east-2.amazonaws.com/test/updatetask?user_id=2&id=" + taskid + "&title=" + formData.title + "&description=" + formData.description + "&tasktime=" + formData.tasktime, opts).then(() => {
      f7.dialog.alert("Task updated", "To Do");
    });
  }
  const DoRemoveTask = (e) => {
    var taskid = props.taskid;
    const opts = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      //body: JSON.stringify(formData)
    }
    fetch("https://auhz40r9vl.execute-api.us-east-2.amazonaws.com/test/removetask?id=" + taskid + "&user_id=2", opts).then(() => {
      f7.dialog.alert("Task removed", "To Do");
    });
  }
  const SetCompleteTask = (e) => {
    var taskid = props.taskid;
    const opts = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      //body: JSON.stringify(formData)
    }
    fetch("https://auhz40r9vl.execute-api.us-east-2.amazonaws.com/test/completetask?id=" + taskid + "&user_id=2", opts).then(() => {
      f7.dialog.alert("Task completed", "To Do");
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
    <List noHairlinesMd form onSubmit={(e) => DoUpdateTask(e)}>
      <ListInput
        outline
        label="Title"
        name="title"
        floatingLabel
        type="text"
        placeholder="Title"
        validate
        clearButton
        value={tasktitle}
        onChange={(e) => Settasktitle(e.target.value)}
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
        value={taskdesc}
        onChange={(e) => Settaskdesc(e.target.value)}
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
        value={tasktime}
        onChange={(e) => Settasktime(e.target.value)}
      >
      </ListInput>
      <Block>
        <Row>
          <Col>
            <Button fill type="submit">Update Task</Button>
            <br></br>
            <Button fill colorTheme='red' onClick={(e) => { DoRemoveTask() }}>Remove Task</Button>
            <br></br>
            <Button fill colorTheme='green' onClick={(e) => { SetCompleteTask() }}>Complete Task</Button>
          </Col>
        </Row>
      </Block>
    </List>
  </Page >)
}