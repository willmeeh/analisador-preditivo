import React, { Component, Fragment } from 'react';
import { Card } from 'antd';

import { getFirstsFromG } from '../../services/first';
import { getFollowsFromG } from '../../services/follow';
import { generateTabularPredictiveTable } from '../../services/tabular-predictive-table';
import { newFormat } from '../../services/convertToNewFormat';

export default class PredictiveTable extends Component {

    formatPredictiveTable = (all) => {
        let productionsList = all.productions;
        let terminalList = all.terminalList;

        if (productionsList !== undefined && undefined !== terminalList) {

            const newGramar = newFormat(productionsList, terminalList);
            const followList = getFollowsFromG(newGramar);
            const firstList = getFirstsFromG(newGramar);

            console.log('newGramar:', newGramar, 'followList:', followList, 'firstList:', firstList);

            const tabularPredictiveTable = generateTabularPredictiveTable(newGramar, firstList, followList);
            console.log(tabularPredictiveTable)
            return tabularPredictiveTable;
        }

        return {};
    };

    render() {
        const cardStyle = {
            textAlign: 'left',
        };
        return (
            <Fragment>
                <Card style={cardStyle} title={<b>Predictive Table</b>}>
                    <div className="loop-follow">
                        {
                            Object.entries(this.formatPredictiveTable(this.props.all)).map(([key, value], index) => (
                                <div key={key + index} id={index + key}>
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