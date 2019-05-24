import React, { Component, Fragment } from './node_modules/react';
import { Card, Table, Button, Input } from './node_modules/antd';

import { getFirstsFromG } from '../../services/first';
import { getFollowsFromG } from '../../services/follow';
import { generateTabularPredictiveTable } from '../../services/tabular-predictive-table';
import { testSentenceInPredictiveTableData } from '../../services/verificador-sentenca';
import { newFormat } from '../../services/convertToNewFormat';

export default class VerificadorSentenca extends Component {

    state = {
        columns: [],
        dataSource: [],
        initSymbol: 'E',
        sentence: 'a + a + a $',
    }

    handleChangeInitSymbol = (event) => {
        this.setState({ initSymbol: event.target.value });
    }

    handleChangeSentence = (event) => {
        this.setState({ sentence: event.target.value });
    }

    updateState = () => {
        this.formatverificadorSentenca(this.props.all);
    }

    formatverificadorSentenca = (all) => {
        let productionsList = all.productions;
        let terminalList = all.terminalList;
        let nonTerminalList = all.nonTerminalList;

        const dataSource = [];

        if (productionsList !== undefined && undefined !== terminalList) {

            const newGramar = newFormat(productionsList, terminalList, nonTerminalList);
            const followList = getFollowsFromG(newGramar);
            const firstList = getFirstsFromG(newGramar);

            // console.log('newGramar:', newGramar, 'followList:', followList, 'firstList:', firstList);

            const tabularPredictiveTable = generateTabularPredictiveTable(newGramar, firstList, followList);
            // console.log(tabularPredictiveTable);

            const tabelaFinal = testSentenceInPredictiveTableData(this.state.initSymbol, tabularPredictiveTable, this.state.sentence);
            console.log(tabelaFinal);

            const columns = [
                {
                    title: 'Linha',
                    dataIndex: 'linha',
                    key: 'linha',
                },
                {
                    title: 'Pilha',
                    dataIndex: 'pilha',
                    key: 'pilha',
                },
                {
                    title: 'Entrada',
                    dataIndex: 'entrada',
                    key: 'entrada',
                },
                {
                    title: 'Saída',
                    dataIndex: 'saida',
                    key: 'saida',
                },
            ];

            let tamanho = tabelaFinal.pilha.length;
            for (let index = 0; index < tamanho; index++) {
                console.log("Linha: ", index);
                console.log("Pilha: ", JSON.stringify(tabelaFinal.pilha[index]));
                console.log("Entrada: ", JSON.stringify(tabelaFinal.entrada[index]));
                console.log("Saída: ", JSON.stringify(tabelaFinal.saida[index]));
                console.log("\n");
                dataSource.push({
                    linha: index,
                    pilha: JSON.stringify(tabelaFinal.pilha[index]),
                    entrada: JSON.stringify(tabelaFinal.entrada[index]),
                    saida: JSON.stringify(tabelaFinal.saida[index])
                });

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
                <Card style={cardStyle} title={<b>Verificador Sentenca</b>}>
                    <label>Tem que separar por espaço:</label>
                    <hr></hr>
                    <label>initSymbol</label>
                    <Input value={this.state.initSymbol} onChange={this.handleChangeInitSymbol} placeholder="initSymbol" />
                    <label>sentence</label>
                    <Input value={this.state.sentence} onChange={this.handleChangeSentence} placeholder="sentence" />
                    <Button onClick={this.updateState} type="primary">Update</Button>
                    <Table dataSource={this.state.dataSource} columns={this.state.columns} />
                </Card>
            </Fragment>
        );
    }
}