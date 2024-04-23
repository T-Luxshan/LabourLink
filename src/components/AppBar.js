import * as React from 'react';
import { Appbar } from 'react-native-paper';

const AppBar = ({Title}) => (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => {}} />
      <Appbar.Content title={Title} />
    </Appbar.Header>
);

export default AppBar;
