
export const isTerminal = (symbol) => {
    return !/[A-Z]/g.test(symbol);
}

export const getAllNonTerminalsFromG = (g) => {
    const terminals = [];
    for (const key in g) {
        const productions = g[key];
        productions.forEach((production) => {
            console.log(production);
            production.forEach((symbol) => {
                if (isTerminal(symbol)) {
                    if (terminals.indexOf(symbol) === -1) {
                       terminals.push(symbol);
                    }
                }
            });
        });
    }

    return terminals;
}
