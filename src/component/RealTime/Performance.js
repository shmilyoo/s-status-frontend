import React from 'react'
import {cpuOption, memOption,} from '../../optionConfig/option'
// import echarts from "echarts/lib/echarts";
// import 'echarts/lib/chart/gauge'
import echarts from '../../echarts'

class Performance extends React.Component {

  resize = ()=>{
    this.cpuChart.resize();
    this.memChart.resize();
  };

  componentWillUnmount(){
    window.removeEventListener('resize',this.resize)
  }

  componentDidMount() {
    this.cpuChart = echarts.init(this.cpu);
    this.memChart = echarts.init(this.mem);
    this.cpuChart.setOption(cpuOption);
    this.memChart.setOption(memOption);
    window.addEventListener('resize',this.resize)
  }

  shouldComponentUpdate(nextProps){
    return nextProps.cpu !== this.props.cpu || nextProps.memory !== this.props.memory
  }

  componentDidUpdate() {
    this.cpuChart.setOption({series:[{data: [{value: this.props.cpu, name: 'CPU占用率'}]}]})
    this.memChart.setOption({series:[{data: [{value: this.props.memory, name: '内存占用率'}]}]})
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