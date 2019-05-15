import { isTerminal } from '../utils';

const _getFirst = (g, prod) => {
    for (symbol of prod) {
        if (isTerminal(symbol)) {
                return symbol;
        }
        else {
            const firsts = [];
            for (productions of g[symbol]) {
                firsts.push(_getFirst(g, productions));
            }
            return firsts;
        }
    }
}

const _treeToArray = (arr, strArrAccumulator = []) => {
    for (item of arr) {
        if (item instanceof Array) {
            return _treeToArray(item, strArrAccumulator)
        }
        else {
            strArrAccumulator.push(item);
        }
    }
    return strArrAccumulator;
}

export const getFirstsFromG = (g) => {
    const firsts = {};
    for (const key in g) {
        const productions = g[key];

        let currFirsts = [];
        productions.forEach((prod) => {
            const first = _getFirst(g, prod);
            if (first instanceof Array) {
                const treeAsArray = _treeToArray(first);
                currFirsts = currFirsts.concat(treeAsArray);
            }
            else {
                currFirsts.push(first);
            }
        });
        firsts[key] = currFirsts;
    }
    return firsts;
}
