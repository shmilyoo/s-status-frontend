import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom'
import './App.css';
import {Row, Col} from 'antd'
import RealTime from "./component/RealTime"
import io from 'socket.io-client'
import {config} from './optionConfig/option'
import moment from 'moment'

// import 'moment/locale/zh-cn'


class App extends Component {
  constructor(props) {
    super(props);
    // [服务器日期 GMT+8,cpu占比 float，内存占比 float，网卡进入流量 Kb/s，网卡出流量 Kb/s， 在线ip列表[('1.1.1.1','安徽'),...]
    this.state = {dt: 0, cpu: 0, memory: 0, flowIn: 0, flowOut: 0, online: {},localDt:0}
  }

  componentDidMount() {
    this.io = io(config.socketServerIP + ':' + config.socketServerPort);
    this.io.on('backendSend', (status) => {
      clearInterval(this.timerID)
      this.setState({
        dt: status[0],
        cpu: status[1],
        memory: status[2],
        flowIn: status[3],
        flowOut: status[4],
        online: status[5],
        localDt: status[0]
      });
      console.log(moment.unix(status[0]).utc().format())
      this.timerID = setInterval(() => {
        this.tick();
      }, 1000);
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
    if (this.io)
      this.io.close();
  }

  tick() {
    this.setState({
      localDt: this.state.localDt + 1,
    });
  }

  render() {
    return (
      <div className="App">
        <Row>
          <Col span={1}/>
          <Col span={22}>
            <Row>
              <Col span={24}>
                <div className="title">服务状态监视</div>
              </Col>
            </Row>
              <div className="top-status">
                <Row>
                <Col span={2}/>
                <Col span={4}>
                  <div className="status">在线: {Object.values(this.state.online).reduce((a, b) => a + b, 0)}</div>
                </Col>
                <Col span={3}>
                  <div className="status">CPU: {this.state.cpu}%</div>
                </Col>
                <Col span={3}>
                  <div className="status">内存: {this.state.memory}%</div>
                </Col>
                <Col span={5}>
                  <div className="status">流量(in): {this.state.flowIn} Kb/s</div>
                </Col>
                <Col span={5}>
                  <div className="status">流量(out): {this.state.flowOut} Kb/s</div>
                </Col>
                <Col span={2}/>
                </Row>
              </div>
            <Switch>
              <Route path="/history"/>
              <Route path="/" render={() => <RealTime {...this.state} />}/>
            </Switch>
            <Row>
              <div className='foot'>
                服务器时间：{this.state.dt ? moment.unix(this.state.localDt).add(8, 'hour').format('YYYY年M月D日 HH:mm:ss') : ''}
                {/*服务器时间：{this.state.dt?moment.unix(this.state.dt).tz('Asia/Shanghai').format():''}*/}
                {/*服务器时间：{this.state.dt ? (new Date(this.state.dt*1000+3600*8*1000)).toLocaleString() : ''}*/}

              </div>
            </Row>
          </Col>
          <Col span={1}/>
        </Row>
      </div>
    );
  }
}

export default App;
