import React from 'react'
import {flowOption} from '../../optionConfig/option'
import echarts from "echarts/lib/echarts";
import moment from 'moment'

class Flow extends React.Component {
  constructor(props){
    super(props);
    this.xAxisIntervalNum = 10;
  }

  resize = ()=>{
    this.flowChart.resize();
  };

  componentWillUnmount(){
    window.removeEventListener('resize',this.resize)
  }

  componentDidMount() {
    this.flowChart = echarts.init(this.flow);
    this.flowChart.setOption(flowOption);
    window.addEventListener('resize',this.resize)
  }

  shouldComponentUpdate(nextProps,nextState){
    return nextProps.dt !== this.props.dt
  }

  updateData = (data,value)=>{
    if(data.length >= this.xAxisIntervalNum)
      data.shift();
    data.push(value);
  }

  componentDidUpdate() {
    let option = this.flowChart.getOption();
    if(option.xAxis[0].data.length >=this.xAxisIntervalNum)
      option.xAxis[0].data.shift();
    option.xAxis[0].data.push(moment.unix(this.props.dt).format('HH:mm:ss'));
    this.updateData(option.series[0].data,this.props.cpu);
    this.updateData(option.series[1].data,this.props.memory);
    this.updateData(option.series[2].data,this.props.flowIn);
    this.updateData(option.series[3].data,this.props.flowOut);
    this.flowChart.setOption(option)
  }

  render() {
    return (
      <div>
        <div ref={flow=>{this.flow=flow}} className="flow-chart"> </div>
      </div>
    )
  }
}

export default Flow