import React from 'react'
import {Link} from 'react-router-dom'
import {Tabs, DatePicker, LocaleProvider, Button} from 'antd'
import HistoryChart from './HistoryChart'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment'
import 'moment/locale/zh-cn';
import 'echarts/lib/component/grid'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/dataZoom'

moment.locale('zh-cn');

const TabPane = Tabs.TabPane
const RangePicker = DatePicker.RangePicker

class History extends React.Component {
  constructor(props) {
    super(props);
    // start,end 都是utc unix时间戳
    this.state = {start: undefined, end: undefined, activeKey: 'online'}
  }

  changeTitle = (title) => {
    this.props.onTitleChange(title)
  }

  tabChange = (key) => {
    if (key !== this.props.match.params.type)
      this.props.history.push(`/history/${key}`)
  }

  pickerChange = (dates) => {
    if(dates.length){
      console.log(dates)
      // change 有可能是点x，把日期消除掉。判断是否有效日期，再进行设置state
      this.setState({start: dates[0].unix(), end: dates[1].unix()});
    }
  }

  btnSearchClick = () => {
    if (this.state.start && this.state.end && ['online', 'cpu', 'memory', 'flow'].indexOf(this.props.match.params.type) >= 0) {
      this.refs[this.props.match.params.type].startSearch(this.state.start, this.state.end)
    }
  }

  componentDidMount() {
    this.changeTitle('查询服务历史状态')
  }

  render() {
    return (
      <div>
        <div id='datePickerArea'>
          {/*<label>请选择时间范围进行检索：</label>*/}
          <LocaleProvider locale={zhCN}>
            <RangePicker
              ranges={{
                '今天': [moment().startOf('day'), moment().endOf('day')],
                '24小时': [moment().add(-24, 'hour'), moment()],
                '本月': [moment().startOf('month'), moment().endOf('month')],
                '30天': [moment().add(-30, 'day'), moment()],
              }}
              showTime format="YYYY/MM/DD HH:mm:ss" onChange={this.pickerChange}
            />
          </LocaleProvider>
          <div><Button className='btnSearch' type='primary' onClick={this.btnSearchClick}>搜索</Button></div>
          <div><Link to='/'><Button type='normal' icon='home'/></Link></div>
        </div>
        <div>
          <Tabs activeKey={this.props.match.params.type} onChange={this.tabChange}>
            <TabPane tab="在线" key="online">
              <HistoryChart ref='online' yName='在线用户' chartName='online'/>
            </TabPane>
            <TabPane tab="CPU" key="cpu">
              <HistoryChart ref='cpu' yName='cpu负载%' chartName='cpu'/>
            </TabPane>
            <TabPane tab="内存" key="memory">
              <HistoryChart ref='memory' yName='内存负载%' chartName='memory'/>
            </TabPane>
            <TabPane tab="流量" key="flow">
              <HistoryChart ref='flow' yName='流量kb/s' chartName='flow'/>
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default History