import React, { Component } from 'react';
import './App.css';
import { Row, Col } from 'antd'

import GrammarForm from './modules/grammar-form/GrammarForm'

import GlcGrAnalyzer from './modules/helpers/glc-gr-analyzer/GlcGrAnalyzer'
import Productions from './modules/helpers/productions/Productions'
import Grammar from './modules/helpers/grammar/Grammar'
import First from './modules/first/First';
import Follow from './modules/follow/Follow';
import PredictiveTable from './modules/predictiveTable/PredictiveTable';
import VerificadorSentenca from './modules/verificador-sentenca/VerificadorSentenca'


class App extends Component {
  state = {
    productions: [],
    terminalList: [],
    nonTerminalList: [],
    all: {}
  }

  handleProductionsChange = (productions, terminalList, nonTerminalList) => {
    this.setState({ productions });
    this.setState({ terminalList });
    this.setState({ nonTerminalList })
    const all = {
      productions,
      terminalList,
      nonTerminalList
    }
    this.setState({ all })
  };

  render() {
    return (
      <div className="App">
        <Row style={{ background: '#ECECEC', padding: '30px' }} >
          <Col md={16}>
            <GrammarForm handleProductionsChange={this.handleProductionsChange} />
          </Col>
          <Col md={8}>
            <Row>
              <Col md={24}>
                <GlcGrAnalyzer productionsList={this.state.productions} />
              </Col>
              <Col md={24}>
                <Productions productionsList={this.state.productions} />
              </Col>
              <Col md={24}>
                <Grammar productionsList={this.state.productions} />
              </Col>
            </Row>
          </Col>
          <Col md={8}>
            <First all={this.state.all}></First>
          </Col>
          <Col md={8}>
            <Follow all={this.state.all}></Follow>
          </Col>
          <Col md={24}>
            <PredictiveTable all={this.state.all}></PredictiveTable>
          </Col>
          <Col md={24}>
            <VerificadorSentenca all={this.state.all}></VerificadorSentenca>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;