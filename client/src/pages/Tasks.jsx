import React, { useEffect, useState } from 'react';
import { App, Panel, View, Page, Block, Navbar, Row, Col, Button, Link, NavLeft, NavRight, NavTitle, Card, Segmented, Subnavbar, Searchbar, List, theme, ListItem } from 'framework7-react';
import { f7ready } from "framework7-react";

export default () => {
  const [data, setData] = useState();
  useEffect(() => {
    f7ready((f7) => {
      const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        //body: JSON.stringify(formData)
      }
      fetch("https://auhz40r9vl.execute-api.us-east-2.amazonaws.com/test/getalltasks?user_id=2", opts).then(response => response.json()).then(data => {
        //setData(data);
        //alert(data);
      });
    })
  }, []);
  return (
    <Page name="tasks">
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
        <Subnavbar inner={false}>
          <Searchbar
            searchContainer=".search-list"
            searchIn=".item-title"
            disableButton={!theme.aurora}
          ></Searchbar>
        </Subnavbar>
      </Navbar>
      <Segmented raised round tag="p" className='TaskStatus'>
        <Button round active>Active</Button>
        <Button round>Completed</Button>
      </Segmented>
      <List className="search-list searchbar-found">
      <ListItem >
              <Card
                title="My Assignment"
                content="My Assignment task 2"
                footer="2022/10/24 10:12"
              ></Card>
            </ListItem>
            <ListItem>
              <Card
              title="Test"
              content="Test Task"
              footer="2022/10/24 16:25"
              ></Card>
            </ListItem>
        {
        /*  data.data.map((item) => {
            <ListItem title={ item.title } link={ '/taskdetail/'+item.id }>
              <Card
                title={ item.title }
                content={ item.description }
                footer={ item.tasktime }
              ></Card>
            </ListItem>
          })*/
      }
      </List>
    </Page>
  )
}