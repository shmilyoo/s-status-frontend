import React from 'react'
import Map from './Map'
import Performance from "./Performance";
import Flow from "./Flow";
import {Row, Col} from 'antd'
// import 'echarts/lib/component/grid'
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/title'

class RealTime extends React.Component {

  changeTitle = (title)=>{
    this.props.onTitleChange(title)
  }


  componentDidMount() {
    this.changeTitle('服务实时状态监视')
  }

  render() {
    return (
      <div>
        <Row gutter={10}>
          <Col xs={24} sm={24} md={11}>
            <Map online={this.props.online}/>
          </Col>
          <Col xs={24} sm={24} md={13}>
            <Performance cpu={this.props.cpu} memory={this.props.memory}/>
            <Flow dt={this.props.dt} flowIn={this.props.flowIn} flowOut={this.props.flowOut} cpu={this.props.cpu} memory={this.props.memory} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default RealTime