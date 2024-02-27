import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';


const SearchBar = () => {

    const [searchQuery, setSearchQuery] = React.useState('');

    return (
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{ marginBottom:80  ,paddingHorizontal:50,marginLeft:20,marginRight:20 }}// Apply the marginBottom directly
              // Add left and right padding
      />
    );
}

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 10, // Add your desired bottom margin
  },
});


