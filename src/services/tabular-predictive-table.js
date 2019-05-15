import { isTerminal, getAllNonTerminalsFromG } from '../utils';
import { getFirstsFromG } from './first';

const _initPredictiveTable = (g) => {
    const terminals = getAllNonTerminalsFromG(g);
    const predictiveTable = {};
    for (const key in g) {
        predictiveTable[key] = {};
        terminals.forEach((t) => {
            predictiveTable[key][t] = null;
        });
    }

    return predictiveTable;
};

export const generateTabularPredictiveTable = (g) => {
    const predictiveTable = _initPredictiveTable(g);
    const firsts = getFirstsFromG(g);
    // @TODO: Chamar função para obter os follows
    // const follows = getFollowsFromG(g);
    const follows = {};

    for (const key in gramatic) {
        const productions = gramatic[key];

        const row = predictiveTable[key]
        productions.forEach((production) => {
            const firstSymbol = production[0];
            if (isTerminal(firstSymbol)) {
                row[firstSymbol] = { [key]: productions };
            }
            else {
                const symbolFirsts = firsts[firstSymbol];
                symbolFirsts.forEach((first) => {
                    if (first !== 'empty') {
                        row[first] = { [key]: productions };
                    }
                    else {
                        const symbolFollows = follows[firstSymbol];
                        symbolFollows.forEach((follow) => {
                            row[follow] = { [key]: productions };
                        });
                    }
                })
            }
        });
    }

    return predictiveTable;
}
