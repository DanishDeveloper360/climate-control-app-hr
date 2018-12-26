import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { List, ListItem } from "react-native-elements";

const datas = [
  {
    text: "Kumar Pratik",
    note: "Its time to build a difference . .",
    time: "3:43 pm"
  },
  {
    text: "Kumar Sanket",
    note: "One needs courage to be happy and smiling all time . . ",
    time: "1:12 pm"
  },
  {
    text: "Megha",
    note: "Live a life style that matchs your vision",
    time: "10:03 am"
  },
  {
    text: "Atul Ranjan",
    note: "Failure is temporary, giving up makes it permanent",
    time: "5:47 am"
  },
  {
    text: "Saurabh Sahu",
    note: "The biggest risk is a missed opportunity !!",
    time: "11:11 pm"
  },
  {
    text: "Varun Sahu",
    note: "Wish I had a Time machine . .",
    time: "8:54 pm"
  }
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  text: {
    alignSelf: "center",
    marginBottom: 7
  },
  mb: {
    marginBottom: 15
  }
});

class NHListAvatar extends Component {
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
        const rData = rooms.map(x => {
          return {
            id: x.id,
            text: x.name,
            note: "The humidity of this room is",
            time: "58F"
          };
        });
        this.setState(
          {
            dataSource: rData
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  keyExtractor = (item, index) => index.toString()

  navigateTo(item) {
    this.props.navigation.navigate("Settings",
    {
      roomId: item.id
    });
  }

  render() {
    const { dataSource } = this.state;
    // console.log(dataSource);
    return (
      <View style={styles.container}>
        {/* <List containerStyle={{ marginBottom: 20 }}>
            { this.state.dataSource.map(l => (
              <ListItem key={l.text} subtitle={item.note} title={l.time} />
            ))}
          </List> */}
        <List>
          <FlatList
            data={dataSource}
            keyExtractor={this.keyExtractor}
            renderItem={({ item }) => (
              <ListItem
                subtitle={item.note}
                title={item.text}
                rightTitle={item.time}
                onPress={ this.navigateTo.bind(this, item) }
              />
            )}
          />
        </List>
      </View>

      // <Container style={styles.container}>
      //   <Header>
      //     <Left>
      //       <Button transparent onPress={() => this.props.navigation.goBack()}>
      //         <Icon name="arrow-back" />
      //       </Button>
      //     </Left>
      //     <Body>
      //       <Title>List Avatar</Title>
      //     </Body>
      //     <Right />
      //   </Header>

      //   <Content>

      //   {/* <FlatList
      //     data={dataSource}
      //     renderItem={({item}) => <Text style={styles.item}>{item.text}</Text>}
      //   /> */}

      //   </Content>
      // </Container>
    );
  }
}

export default NHListAvatar;
