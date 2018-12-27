import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { List, ListItem } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  text: {
    alignSelf: "center",
    marginBottom: 5
  },
  mb: {
    marginBottom: 15
  }
});

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false
    };
  }

  componentDidMount() {
    fetch("http://145.24.222.236:8080/api/rooms")
      .then(response => response.json())
      .then(rooms => {
        this.setState(
          {
            dataSource: rooms
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  keyExtractor = (item, index) => index.toString();

  navigateTo(item) {
    this.props.navigation.navigate("Settings", {
      roomId: item.id
    });
  }

  render() {
    const { dataSource } = this.state;
    return (
      <View style={styles.container}>
        <List>
          <FlatList
            data={dataSource}
            keyExtractor={this.keyExtractor}
            renderItem={({ item }) => (
              <ListItem
                title={item.name}
                onPress={this.navigateTo.bind(this, item)}
              />
            )}
          />
        </List>
      </View>
    );
  }
}

export default RoomList;
