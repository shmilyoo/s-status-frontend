import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom'
import './App.css';
import {Row, Col} from 'antd'
import RealTime from "./component/RealTime"
import io from 'socket.io-client'
import {config} from './optionConfig/option'
import moment from 'moment'

class App extends Component {
  constructor(props) {
    super(props);
    // [服务器日期 GMT+8,cpu占比 float，内存占比 float，网卡进入流量 Kb/s，网卡出流量 Kb/s， 在线ip列表[('1.1.1.1','安徽'),...]
    // dt对所有子组件起效，localDt只对本组件的foot栏的时钟起作用，当dt后台服务更新间隔较长时，本地更新localDt，可以让时钟正常显示，
    // 同时避免了子组件不必要的重新渲染
    this.state = {dt: 0, cpu: 0, memory: 0, flowIn: 0, flowOut: 0, online: {}, localDt: 0}
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
      <div id="App">
        <div id="head">
          <Row>
            <Col span={24}>
              <div className="title">服务状态监视</div>
            </Col>
          </Row>
        </div>

        <div id="main">
          <Row>
            <Col span={1}/>
            <Col span={22}>
              <div id="top-status">
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

            </Col>
            <Col span={1}/>
          </Row>
        </div>

        <div id='foot'>
          服务器时间：{this.state.dt ? moment.unix(this.state.localDt).add(moment().utcOffset(), 'm').format('YYYY年M月D日 HH:mm:ss') : ''}
        </div>
      </div>
    );
  }
}

export default App;
