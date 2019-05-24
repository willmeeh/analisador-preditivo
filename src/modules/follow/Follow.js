import React, { Component, Fragment } from 'react';
import { Card } from 'antd';

import { getFollowsFromG } from '../../services/follow';
import { newFormat } from '../../services/convertToNewFormat';

export default class Follow extends Component {

    formatFollow = (all) => {
        let productionsList = all.productions;
        let terminalList = all.terminalList;
        let nonTerminalList = all.nonTerminalList;

        if (productionsList !== undefined && undefined !== terminalList) {

            const newGramar = newFormat(productionsList, terminalList, nonTerminalList);
            const followList = getFollowsFromG(newGramar);
            return followList;
        }

        return {};
    };

    render() {
        const cardStyle = {
            textAlign: 'left',
        };
        return (
            <Fragment>
                <Card style={cardStyle} title={<b>Follows</b>}>
                    <div className="loop-follow">
                        {
                            Object.entries(this.formatFollow(this.props.all)).map(([key, value], index) => (
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