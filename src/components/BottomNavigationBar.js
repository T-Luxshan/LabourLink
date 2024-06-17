import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Login from '../screens/authentication/Login';


const MusicRoute = () => console.log("m");

const AlbumsRoute = () => console.log("m");

const RecentsRoute = () => console.log("m");

const NotificationsRoute = () => console.log("m");

const BottomNavigationBar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Favorites', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    { key: 'albums', title: 'Albums', focusedIcon: 'album' },
    { key: 'recents', title: 'Recents', focusedIcon: 'history' },
    { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    notifications: NotificationsRoute,
  });

  return (
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        style={{zIndex:9999}}
      />
  );
};

export default BottomNavigationBar;