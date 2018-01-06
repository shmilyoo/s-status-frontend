import React from 'react'
import {flowOption} from '../../optionConfig/option'
import echarts from "echarts/lib/echarts";
import moment from 'moment'
// import "echarts/lib/chart/line"

class Flow extends React.Component {


  componentDidMount() {
    this.flowChart = echarts.init(this.flow);
    this.flowChart.setOption(flowOption);
    window.addEventListener('resize',() => {
      this.flowChart.resize();
    })
  }

  shouldComponentUpdate(nextProps,nextState){
    return nextProps.dt !== this.props.dt
  }

  updateData = (data,value)=>{
    if(data.length >= 10)
      data.shift();
    data.push(value);
  }

  componentDidUpdate() {
    // this.flowChart.setOption({series:[{data: [{value: this.props.cpu, name: 'CPU占用率'}]}]})
    // this.memChart.setOption({series:[{data: [{value: this.props.memory, name: '内存占用率'}]}]})
    // let data = []
    // for (let key of Object.keys(this.props.online))
    //   data.push({name:key,value:this.props.online[key]})
    // data.push({name: '南海诸岛', value: NaN})
    // this.map.setOption({series:{data:data}});
    let option = this.flowChart.getOption();
    if(option.xAxis[0].data.length >=10)
      option.xAxis[0].data.shift();
    option.xAxis[0].data.push(moment.unix(this.props.dt).add(8, 'hour').format('HH:mm:ss'));
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