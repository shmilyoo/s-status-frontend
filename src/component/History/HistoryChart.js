import React from 'react'
import {message} from 'antd'
import {getHistoryChartOption, config} from '../../optionConfig/option'
import echarts from "echarts/lib/echarts";
import 'echarts/lib/chart/line'
import moment from 'moment'
import axios from 'axios'
// import echarts from '../../echarts'

class HistoryChart extends React.Component {
  constructor(props) {
    super(props);
    this.isMore = true;  // 每次只获取指定数目的数据，代表是否获取完毕
    this.start = 0;   // 获取的开始位置时间戳，会随着每次获取发生变化
    this.end = 0;   // 获取的结束时间戳
    this.isFetching = false;    // 是否正在请求，避免拖动datazoom时频繁调取api
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  componentDidMount() {
    this.chart = echarts.init(this.chartContainer);
    this.clearChart();
    this.isMore = false;    // 避免在空图的时候移动datazoom导致发出请求
    window.addEventListener('resize', this.resize)
    this.chart.on('datazoom', (params) => {
      /*
      当使用inside滚动和使用slider滚动/拖动变大小时,产生的事件不同
      在datazoom事件发生，在回调里面打印params字符串：
      当使用inside缩放的时候，产生的params为：
      {"type":"datazoom","batch":[{"dataZoomId":"\u0000\u0000-\u00001","start":0,"end":1.774238498512835,"type":"datazoom","batch":null}]}
      当使用slider缩放或者拖动的时候，产生的params字符串为
      {"type":"datazoom","from":"viewComponent_19_0.4897147372797057","dataZoomId":"\u0000\u0000-\u00000","start":1.3888888888888888,"end":6.496460720735057}
       */
      if (((params.batch && params.batch[0].end > 80) || (params.end && params.end > 80)) && this.isMore && !this.isFetching) {
        this.getData(this.start, this.end)
      }
    })
    this.chart.on('dblclick',(params)=>{
      // 双击某一点的时候，调整所选区域为标准大小，即屏幕显示config.showInScreen个数据
      let getSize = this.getDoubleClickSize(params.dataIndex)
      this.chart.setOption({dataZoom:[{type:'slider',startValue:getSize[0],endValue:getSize[1]}]})
    })
  }

  shouldComponentUpdate() {
    return false
  }

  getDoubleClickSize = (index)=>{
    // 根据双击选择的点的位置，返回显示的范围
    let halfScreen = ~~(config.showInScreen/2)
    if(index > halfScreen)
      return [index-halfScreen,index+halfScreen-1]
    else {
      return [0,config.showInScreen-1]
    }
  }

  resize = () => {
    this.chart.resize();
  };

  startSearch = (start, end) => {
    console.log('start search', start, end)
    this.start = start;
    this.end = end;
    this.isMore = true;
    this.clearChart();
    this.getData(start, end)
  }

  clearChart = () => {
    let option = getHistoryChartOption(this.props.yName, this.props.chartName);
    if(this.props.chartName === 'flow'){
      option.legend = {
        data: ['in_speed','out_speed'],
        textStyle: {
          color: '#aaa'
        }
      }
      option.series[0].name = 'in_speed';
      option.series[1] =
        {
          name: 'out_speed',
          type: 'line',
          symbol: 'rect',
          symbolSize: 5,
          smooth: false,
          sampling:'average',
          itemStyle:{
            normal:{
              color: '#24ffc5'
            }
          },
          data: []
        }
    }
    this.chart.setOption(option);
  }

  getData = (start, end) => {
    this.isFetching = true;
    axios.get(`/api/history/${this.props.chartName}`, {
      params: {
        start,
        end
      },
    }).then((result) => {
      if (result.data['success']) {
        this.updateChart(result.data.data)
      }
      else
        message.error(result.data['message'])
    }).catch((error) => {
      message.error(error.message)
    })
  }

  updateChart = (data) => {
    let len = data.length
    if (len === 0) {
      message.info('所选范围记录数为0')
      return
    }
    if (len < config.numPerRequest)
      this.isMore = false
    // 约定每次最多获取 numPerRequest个数据，当查询结果小于这个值的时候，说明已经查询到底了
    // 将开始查询的时间点设置为上次查询最后一个结果的时间戳+1
    this.start = data[len - 1]['timestamp'] + 1;
    let option = this.chart.getOption();
    if(this.props.chartName === 'flow'){
      for (let i = 0; i < len; i++) {
        option.xAxis[0].data.push(moment.unix(data[i]['timestamp']).format('YYYYMMDD HH:mm:ss'));
        option.series[0].data.push(data[i]['in_speed']);
        option.series[1].data.push(data[i]['out_speed']);
      }
    }
    else{
      for (let i = 0; i < len; i++) {
        option.xAxis[0].data.push(moment.unix(data[i]['timestamp']).format('YYYYMMDD HH:mm:ss'));
        option.series[0].data.push(data[i][this.props.chartName])
      }
    }
    // 更新图标数据前，slider的数据范围
    option.dataZoom = [{
      type: 'slider',
      endValue: option.dataZoom[0].endValue,
      startValue: option.dataZoom[0].startValue
    }]
    this.chart.setOption(option)
    console.log(this.chart.getOption())
    this.isFetching = false;   // 图表更新结束后再设置为可以继续请求，避免性能问题
  }


  render() {
    return (
      <div>
        <div ref={id => {
          this.chartContainer = id
        }} className="history-chart"></div>
      </div>
    )
  }
}

export default HistoryChart