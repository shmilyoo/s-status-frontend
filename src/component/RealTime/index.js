import React from 'react'
import Map from './Map'
import Performance from "./Performance";
import Flow from "./Flow";
import {Row, Col} from 'antd'

class RealTime extends React.Component {

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