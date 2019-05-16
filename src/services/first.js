import _ from 'underscore';
import { isTerminal } from '../utils';

const _getFirst = (g, prod) => {
    for (const symbol of prod) {
        if (isTerminal(symbol)) {
                return symbol;
        }
        else {
            const firsts = [];
            for (const productions of g[symbol]) {
                firsts.push(_getFirst(g, productions));
            }
            return firsts;
        }
    }
}

export const getFirstsFromG = (g) => {
    const firsts = {};
    for (const key in g) {
        const productions = g[key];

        let currFirsts = [];
        productions.forEach((prod) => {
            const first = _getFirst(g, prod);
            if (first instanceof Array) {
                const firstFlatten = _.flatten(first);
                currFirsts = currFirsts.concat(firstFlatten);
                
            }
            else {
                currFirsts.push(first);
            }
        });
        firsts[key] = _.uniq(currFirsts);
    }
    return firsts;
}
