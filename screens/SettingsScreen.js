
import React from 'react';
import { View } from 'react-native';
import { LineChart, YAxis, Grid } from 'react-native-svg-charts';
import 'react-native-svg';

export default class SettingsScreen extends React.Component {
  // {"id":68,"room_id":2,"temperature":22,"humidity":44,"record_date":"2018-12-04T09:23:39.000Z"}

  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false
    };
  }

  componentDidMount() {
    fetch("http://145.24.222.236:8080/api/logs")
      .then(response => response.json())
      .then(rooms => {
       
        const rData = rooms.map(x => {
          return {
            id: x.id,
            temperature: x.temperature,
            humidity: x.humidity,
            record_date:  new Date(x.record_date)
          };
        });
        console.log(rData);
        const temperatures = rooms.map(x => x.temperature);
        console.log(temperatures);
        this.setState(
          {
            dataSource: rData,
            temperatures: temperatures
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    // console.log(this.state);
    const data = this.state.temperatures ? this.state.temperatures : [35, 78, -87];
    console.log(this.state);
    console.log(data);
    const contentInset = { top: 5, bottom: 5 }
    return (
      <View style={{ height: 200, marginTop:50 , flexDirection: "row" }}>
        <YAxis
          data={data}
          contentInset={contentInset}
          svg={{
            fill: "grey",
            fontSize: 10
          }}
          numberOfTicks={10}
          formatLabel={value => `${value}ºC`}
        />
        <LineChart
          style={{ flex: 1, marginLeft: 16 }}
          data={data}
          svg={{ stroke: "rgb(134, 65, 244)" }}
          contentInset={contentInset}
        >
          <Grid />
        </LineChart>
      </View>
    );
  }
}
