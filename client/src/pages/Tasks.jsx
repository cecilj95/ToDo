import React, { useEffect, useState } from 'react';
import { App, Panel, View, Page, Block, Navbar, Row, Col, Button, Link, NavLeft, NavRight, NavTitle, Card, Segmented, Subnavbar, Searchbar, List, theme, ListItem } from 'framework7-react';
import { f7ready } from "framework7-react";
import $ from 'jquery'

export default () => {
  const [DataList, setData] = useState([]);
  const [currentstatus, SetCurrentStatus] = useState("active");
  useEffect(() => {
    f7ready((f7) => {
      const opts = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        //body: JSON.stringify(formData)
      }
      fetch("https://auhz40r9vl.execute-api.us-east-2.amazonaws.com/test/getalltasks?user_id=2",
        opts)
        .then(response => response.json())
        .then(data => {
          //alert(JSON.stringify(data));
          //setData(data);
          let htmlres = "";
          for (let q = 0; q < data.length; q++) {
            htmlres += `<a href="/taskdetail/`+data[q].id+`/" class="item-inner" data-status="`+data[q].status+`"><div class="item-title">`+data[q].title+`</div><div class="card"><div class="card-header">`+data[q].title+`</div><div class="card-content card-content-padding">`+data[q].description+`</div><div class="card-footer">`+data[q].tasktime+`</div></div></a>`;
          }
          //alert(htmlres)
          $('.search-list').html(htmlres);
          $('.search-list .item-inner').hide(); $('[data-status="active"]').show();
        });
    });
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
       
      </Navbar>
      <Segmented raised round tag="p" className='TaskStatus'>

        <Button round active={currentstatus == "active"} onClick={(e) => { SetCurrentStatus("active"); $('.search-list .item-inner').hide(); $('[data-status="active"]').show();  }}>Active</Button>
        <Button round active={currentstatus == "completed"} onClick={(e) => { SetCurrentStatus("completed"); $('.search-list .item-inner').hide(); $('[data-status="completed"]').show(); }}>Completed</Button>

      </Segmented>
      <List className="search-list searchbar-found">
      </List>
    </Page>
  )
}