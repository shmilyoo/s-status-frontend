import React from 'react'
import {cpuOption, memOption,} from '../../optionConfig/option'
import echarts from "echarts/lib/echarts";
// import 'echarts/lib/chart/gauge'

class Performance extends React.Component {


  componentDidMount() {
    this.cpuChart = echarts.init(this.cpu);
    this.memChart = echarts.init(this.mem);
    this.cpuChart.setOption(cpuOption);
    this.memChart.setOption(memOption);
    window.addEventListener('resize',() => {
      this.cpuChart.resize();
      this.memChart.resize();
    })
  }

  shouldComponentUpdate(nextProps,nextState){
    return nextProps.cpu !== this.props.cpu || nextProps.memory !== this.props.memory
  }

  componentDidUpdate() {
    this.cpuChart.setOption({series:[{data: [{value: this.props.cpu, name: 'CPU占用率'}]}]})
    this.memChart.setOption({series:[{data: [{value: this.props.memory, name: '内存占用率'}]}]})
    // let data = []
    // for (let key of Object.keys(this.props.online))
    //   data.push({name:key,value:this.props.online[key]})
    // data.push({name: '南海诸岛', value: NaN})
    // this.map.setOption({series:{data:data}});
  }

  render() {
    return (
      <div className="perf">
        <div ref={cpu=>{this.cpu=cpu}} className="perf-cpu"> </div>
        <div ref={mem=>{this.mem=mem}} className="perf-mem"> </div>
      </div>
    )
  }
}

export default Performance