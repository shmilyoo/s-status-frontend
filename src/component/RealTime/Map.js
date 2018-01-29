import React from 'react'
import {mapOption} from "../../optionConfig/option";
// import echarts from 'echarts/lib/echarts'
// import 'echarts/lib/chart/map'
import 'echarts/map/js/china' // 引入中国地图
import echarts from '../../echarts'

class Map extends React.Component {

  componentDidMount() {
    let option = mapOption;
    this.map = echarts.init(this.id);
    this.map.setOption(option);
    window.addEventListener('resize',this.resize)
  }

  resize = ()=>{
    this.map.resize();
  };

  componentWillUnmount(){
    window.removeEventListener('resize',this.resize)
  }

  shouldComponentUpdate(nextProps){
    return nextProps.online !== this.props.online
  }

  componentDidUpdate() {
    let data = []
    for (let key of Object.keys(this.props.online))
      data.push({name:key,value:this.props.online[key]})
    data.push({name: '南海诸岛', value: NaN})
    this.map.setOption({series:{data:data}});
  }

  render() {
    return (
      <div ref={id => {
        this.id = id
      }} className="map">
      </div>
    )
  }
}

export default Map