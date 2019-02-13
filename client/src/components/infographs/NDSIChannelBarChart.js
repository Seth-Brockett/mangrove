import React, { Component } from 'react';
import {BarChart, Bar, Label, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


class NDSIChannelBarChart extends Component {

  render(){

    let data = this.props.results;

    return(
      <div>
        <BarChart width={900} height={600} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name">
            <Label value="Channel" position="insideBottom" offset={2} />
          </XAxis>
          <YAxis>
            <Label value="Variable" position="insideLeft" offset={0} />
          </YAxis>
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke='#000' />
          <Bar dataKey="leftChannel" fill="#8884d8" />
          <Bar dataKey="rightChannel" fill="#82ca9d" />
        </BarChart>
      </div>
    )
  }
}

export default NDSIChannelBarChart;