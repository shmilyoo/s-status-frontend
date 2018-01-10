let chartTitleColor = '#aaa';

export let mapOption = {
  // backgroundColor: 'rgba(255,255,255,0.05)',
  title: {
    text: '用户在线地图',
    // subtext: '数据纯属虚构',
    left: 'center',
    top:10,
    textStyle: {
      color: chartTitleColor
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: (params) => isNaN(params.value) ? `${params.name}:0` : `${params.name}:${params.value}`,
  },
  visualMap: {
    type: 'continuous',
    min: 0,
    max: 10,
    show: false,
  },
  series: [
    {
      name: '显示数字',
      type: 'map',
      map: 'china',
      label: {
        normal: {
          show: true,
          formatter: (params) => isNaN(params.value) ? '' : params.value,
          color: '#000363',
          fontSize: 15,
        },
        emphasis: {
          color: 'FFF'
        },
      },
      itemStyle: {
        normal: {
          areaColor: '#aaa',
          borderColor: '#404a59'
        },
      },
      roam: true,
      data: [
        // {name: "安徽", value: 3},
        // {name: "浙江", value: 1},
        // {name: "内蒙古", value: 5},
        // {name: "四川", value: 32},
        // {name: "北京", value: 2},
        // {name: "河北", value: 22, itemStyle: {normal: {areaColor: '#f00'}}},
        {name: '南海诸岛', value: NaN}
      ]
    }
  ]
};

export let cpuOption = {
  grid:{
    top:'10%'
  },
  series: [
    {
      name: 'CPU占用率',
      type: 'gauge',
      radius: '100%',
      title: {
        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontWeight: 'bolder',
          fontSize: 20,
          // fontStyle: 'italic',
          color: chartTitleColor,
          shadowColor: '#fff', //默认透明
          shadowBlur: 10
        }
      },
      detail: {
        // backgroundColor: 'rgba(30,144,255,0.8)',
        // shadowColor: '#fff', //默认透明
        // shadowBlur: 5,
        // offsetCenter: [0, '50%'],       // x, y，单位px
        formatter: '{value}%',
        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontWeight: 'bolder',
          // color: '#F5F5F5'
        },
      },
      axisLine: {            // 坐标轴线
        lineStyle: {       // 属性lineStyle控制线条样式
          // color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
          width: 20,
        }
      },
      data: [{value: 0, name: 'CPU占用率'}]
    }
  ]
};


export let memOption = {
  series: [
    {
      name: '内存占用率',
      type: 'gauge',
      radius: '100%',
      title: {
        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontWeight: 'bolder',
          fontSize: 20,
          // fontStyle: 'italic',
          color: chartTitleColor,
          shadowColor: '#fff', //默认透明
          shadowBlur: 10
        }
      },
      detail: {
        // backgroundColor: 'rgba(30,144,255,0.8)',
        // shadowColor: '#fff', //默认透明
        // shadowBlur: 5,
        // offsetCenter: [0, '50%'],       // x, y，单位px
        formatter: '{value}%',
        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontWeight: 'bolder',
          // color: '#F5F5F5'
        },
      },
      axisLine: {            // 坐标轴线
        lineStyle: {       // 属性lineStyle控制线条样式
          // color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
          color: [[0.2, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']],
          width: 12,
        }
      },
      axisTick: {            // 坐标轴小标记
        length :8,        // 属性length控制线长
        lineStyle: {       // 属性lineStyle控制线条样式
          color: '#FFF'
        }
      },
      splitLine: {           // 分隔线
        length :18,         // 属性length控制线长
        // lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
        //   width:3,
        //   color: '#fff',
        //   shadowColor : '#fff', //默认透明
        //   shadowBlur: 10
        // }
      },
      data: [{value: 0, name: '内存占用率'}]
    }
  ]
};

export let flowOption = {
  tooltip : {
    trigger: 'axis'
  },
  grid:{
    left:30,
    right:30
  },
  legend: {
    data:['cpu','内存','速率in','速率out'],
    textStyle:{
      color:chartTitleColor
    }
  },
  xAxis : [
    {
      type : 'category',
      data : [],
      axisLabel : {
        color:chartTitleColor,
        interval:0,  // 强制显示所有x轴label
        // rotate:45
      },
      nameTextStyle: {
        color:chartTitleColor
      },
      axisLine:{
        lineStyle:{
          color:'#FFF'
        }
      },
      axisTick:{
        alignWithLabel:true,
        lineStyle:{
          color:'#FFF'
        }
      },
    }
  ],
  yAxis : [
    {
      type : 'value',
      name : '速率(kb/s)',
      axisLabel : {
        formatter: '{value}',
        color:chartTitleColor
      },
      nameTextStyle: {
        color:chartTitleColor
      },
      axisLine:{
        lineStyle:{
          color:'#FFF'
        }
      },
      splitLine:{
        show:false
      }
    },
    {
      type : 'value',
      name : '性能(%)',
      max:100,
      axisLabel : {
        formatter: '{value}',
        color:chartTitleColor
      },
      nameTextStyle: {
        color:chartTitleColor
      },
      axisLine:{
        lineStyle:{
          color:'#FFF'
        }
      },
      splitLine:{
        show:false
      }
    }
  ],
  series : [
    {
      name:'cpu',
      type:'line',
      symbol:'circle',
      symbolSize:7,
      smooth: true,
      yAxisIndex:1,
      data:[]
    },
    {
      name:'内存',
      type:'line',
      symbol:'rect',
      smooth: true,
      yAxisIndex:1,
      data:[]
    },
    {
      name:'速率in',
      type:'line',
      smooth: true,
      symbol:'triangle',
      data:[]
    },
    {
      name:'速率out',
      type:'line',
      symbol:'diamond',
      smooth: true,
      data:[]
    }
  ]
};


export let config = {
  socketServerIP: process.env.NODE_ENV==='production'?'127.0.0.1':'localhost',
  socketServerPort: 5000,
};