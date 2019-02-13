import React, { Component } from 'react';
import {BarChart, Label, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


class NDSIValuesBarChart extends Component {

  render(){

    let data = this.props.results;

    return(
      <div>
        <BarChart width={900} height={600} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name">
            <Label value="NDSI Values" position="insideBottom" offset={2} />
          </XAxis>
          <YAxis>
            <Label value="Value" position="insideLeft" offset={0} />
          </YAxis>
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke='#000' />
          <Bar dataKey="ndsi" fill="#8884d8" />
          <Bar dataKey="biophony" fill="#82ca9d" />
          <Bar dataKey="anthrophony" fill="#e79797" />
        </BarChart>
      </div>
    )
  }
}

export default NDSIValuesBarChart;