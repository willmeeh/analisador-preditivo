import React, { Component, Fragment } from 'react';
import { Card, Table, Button } from 'antd';

import { getFirstsFromG } from '../../services/first';
import { getFollowsFromG } from '../../services/follow';
import { generateTabularPredictiveTable } from '../../services/tabular-predictive-table';
import { newFormat } from '../../services/convertToNewFormat';

export default class PredictiveTable extends Component {

    state = {
        columns: [],
        dataSource: []
    }

    updateState = () => {
        console.log(this.props.all);
        this.formatPredictiveTable(this.props.all);
    }

    formatPredictiveTable = (all) => {
        let productionsList = all.productions;
        let terminalList = all.terminalList;

        const columns = [];
        const dataSource = [];

        if (productionsList !== undefined && undefined !== terminalList) {

            const newGramar = newFormat(productionsList, terminalList);
            const followList = getFollowsFromG(newGramar);
            const firstList = getFirstsFromG(newGramar);

            console.log('newGramar:', newGramar, 'followList:', followList, 'firstList:', firstList);

            const tabularPredictiveTable = generateTabularPredictiveTable(newGramar, firstList, followList);
            console.log(tabularPredictiveTable);

            columns.push({
                title: 'Prod',
                dataIndex: 'Prod',
                key: 'Prod',
            });
            terminalList.forEach((item) => {
                columns.push({
                    title: item,
                    dataIndex: item,
                    key: item,
                })
            })

            for (var property in tabularPredictiveTable) {
                let linha = {};
                linha['Prod'] = property;
                // eslint-disable-next-line no-loop-func
                terminalList.forEach((item) => {
                    if (tabularPredictiveTable[property][item] !== undefined) {
                        linha[item] = property + " -> " + tabularPredictiveTable[property][item].join("");
                    }
                });
                dataSource.push(linha);
            }

            this.setState({
                columns,
                dataSource
            })


            return '';
        }

        return '';
    };

    render() {
        const cardStyle = {
            textAlign: 'left',
        };
        return (
            <Fragment>
                <Card style={cardStyle} title={<b>Predictive Table</b>}>
                    <Button onClick={this.updateState} type="primary">Update</Button>
                    <Table dataSource={this.state.dataSource} columns={this.state.columns} />
                </Card>
            </Fragment>
        );
    }
}