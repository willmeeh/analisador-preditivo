(function() {
    const gramatic = {
        E: [
            ['T', 'EL']
        ],
        EL: [
            ['+', 'T', 'EL'],
            ['empty']
        ],
        T: [
            ['a']
        ]
    };
    const firsts = {
        E: ['a'],
        EL: ['+', 'empty'],
        T: ['a']
    }
    const follows = {
        E: ['$'],
        EL: ['$'],
        T: ['+','$']
    }

    // const gramatic = {
    //     S: [
    //         ['(', 'S', ')'],
    //         ['[', 'S', ']'],
    //         ['A']
    //     ],
    //     A: [
    //         ['a']
    //     ]
    // };
    // const firsts = {
    //     S: [ '(', '[', 'a' ],
    //     A: [ 'a' ],
    // }
    // const follows = {
    //     S: ['$', ')', ']'],
    //     A: ['$', ')', ']']
    // }

    const isTerminal = (symbol) => {
        return !/[A-Z]/g.test(symbol);
    }

    const getAllNonTerminalsFromG = (g) => {
        const terminals = [];
        for (const key in g) {
            const productions = g[key];
            productions.forEach((production) => {
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

    const initPredictiveTable = (g) => {
        const terminals = getAllNonTerminalsFromG(g);
        console.log('terminals', terminals);
        const predictiveTable = {};
        for (const key in g) {
            predictiveTable[key] = {};
            terminals.forEach((t) => {
                predictiveTable[key][t] = [];
            });
        }

        return predictiveTable;
    };
 
    const predictiveTable = initPredictiveTable(gramatic);
    console.log('predictiveTable', predictiveTable);


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

    console.log('predictiveTable', JSON.stringify(predictiveTable, undefined, 4));
})(); 