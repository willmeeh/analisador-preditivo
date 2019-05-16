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

export const generateTabularPredictiveTable = (g, firsts = null, follows = null) => {
    const predictiveTable = _initPredictiveTable(g);
    if (!firsts) {
        firsts = getFirstsFromG(g);
    }
    // @TODO: Chamar função para obter os follows
    // const follows = getFollowsFromG(g);
    // const follows = {};

    for (const key in g) {
        const productions = g[key];

        const row = predictiveTable[key]
        productions.forEach((production) => {
            const firstSymbol = production[0];
            if (isTerminal(firstSymbol)) {
                row[firstSymbol] = productions;
            }
            else {
                const symbolFirsts = firsts[firstSymbol];
                symbolFirsts.forEach((first) => {
                    if (first !== 'empty') {
                        row[first] = productions;
                    }
                    else {
                        const symbolFollows = follows[firstSymbol];
                        symbolFollows.forEach((follow) => {
                            row[follow] = productions;
                        });
                    }
                })
            }
        });
    }

    return predictiveTable;
}

// import { d7 } from '../data-sets';
// const result = generateTabularPredictiveTable(d7.grammar, d7.follows)
// console.log('result', result);