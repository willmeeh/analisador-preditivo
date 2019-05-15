(function() {
    // const gramatic = {
    //     E: [
    //         ['T', 'EL']
    //     ],
    //     EL: [
    //         ['+', 'T', 'EL'],
    //         ['empty']
    //     ],
    //     T: [
    //         ['a']
    //     ]
    // };
    // const firsts = {
    //     E: ['a'],
    //     EL: ['+', 'empty'],
    //     T: ['a']
    // }
    // const follows = {
    //     E: ['$'],
    //     EL: ['$'],
    //     T: ['+','$']
    // }

    const gramatic = {
        S: [
            ['(', 'S', ')'],
            ['[', 'S', ']'],
            ['A']
        ],
        A: [
            ['a']
        ]
    };
    const firsts = {
        S: [ '(', '[', 'a' ],
        A: [ 'a' ],
    }
    const follows = {
        S: ['$', ')', ']'],
        A: ['$', ')', ']']
    }

    const isTerminal = (symbol) => {
        return !/[A-Z]/g.test(symbol);
    }
 
    const predictiveTable = {};
    for (const key in gramatic) {
        const productions = gramatic[key];

        console.log(key + ' -> ' + productions);
        const row = {}
        predictiveTable[key] = row;
        productions.forEach((production) => {
            const firstSymbol = production[0];
            console.log('firstSymbol', firstSymbol)
            if (isTerminal(firstSymbol)) {
                row[firstSymbol] = production.join(''); // @TODO: Dar push em uma lista no row[firstSymbol]
            }
            else {
                const symbolFirsts = firsts[firstSymbol];
                console.log('symbolFirsts', symbolFirsts)
                symbolFirsts.forEach((first) => {
                    if (first !== 'empty') {
                        row[first] = production.join(''); // @TODO: Dar push em uma lista no row[firstSymbol]
                    }
                    else {
                        const symbolFollows = follows[firstSymbol];
                        symbolFollows.forEach((follow) => {
                            console.log('follow', follow);
                            row[follow] = production.join(''); // @TODO: Dar push em uma lista no row[firstSymbol]
                        });
                    }
                })
            }
        });

        console.log('\n')
    }

    console.log('predictiveTable', JSON.stringify(predictiveTable, undefined, 4));
})(); 