import React from 'react';
import { App, Panel, View, List, ListItem } from 'framework7-react';
import Routes from './Routes'
import './panel.css'

export default () => (<App routes={Routes}>
    <Panel resizable left cover>
    <List>
      <ListItem title="New Task" link="/newtask/" panelClose></ListItem>
      <ListItem title="My Tasks" link="/tasks/" panelClose></ListItem>
      <ListItem title="Profile" link="/profile/" panelClose></ListItem>
      <ListItem title="Test" link="/taskdetail/12/" panelClose></ListItem>
      <ListItem title="Sign Out" link="/login/" panelClose></ListItem>
    </List>
    </Panel>
    <View url="/" main>

    </View>
  </App>
);