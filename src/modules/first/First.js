import React, { Component, Fragment } from 'react';
import { Card } from 'antd';

import { getFirstsFromG } from '../../services/first';
import { newFormat } from '../../services/convertToNewFormat';

export default class First extends Component {

    formatFirst = (all) => {
        let productionsList = all.productions;
        let terminalList = all.terminalList;
        let nonTerminalList = all.nonTerminalList;

        if (productionsList !== undefined && undefined !== terminalList) {

            const newGramar = newFormat(productionsList, terminalList, nonTerminalList);
            const firstList = getFirstsFromG(newGramar);
            return firstList;
        }

        return {};
    };

    render() {
        const cardStyle = {
            textAlign: 'left',
        };
        return (
            <Fragment>
                <Card style={cardStyle} title={<b>Firsts</b>}>
                    <div className="loop-container">
                        {
                            Object.entries(this.formatFirst(this.props.all)).map(([key, value], index) => (
                                <div key={key+index} id={index+key}>
                                    {key} : {JSON.stringify(value)}
                                </div>
                            ))
                        }
                    </div>
                </Card>
            </Fragment>
        );
    }
}