(function() {
    const q1 = {
        S: [
            ['a', 'B'],
            ['d']
        ],
        B: [
            ['c', 'D', 'b'],
            ['empty']
        ],
        D: [
            ['a'],
            ['empty'] 
        ]
    };
    const q2 = {
        Z: [
            ['X', 'Y', 'Z'],
            ['d']
        ],
        Y: [
            ['c'],
            ['empty']
        ],
        X: [
            ['Y'],
            ['a']
        ]
    };
    const q3 = {
        S: [
            ['(', 'A', ')'],
            ['b']
        ],
        A: [
            ['B', ':', 'A'],
            ['B']
        ],
        B: [
            ['a'],
            ['empty']
        ]
    };
    const q4 = {
        S: [
            ['(', 'A', ')'],
            ['b']
        ],
        A: [
            ['B', 'X']
        ],
        X: [
            [';', 'B', 'X'],
            ['empty']
        ],
        B: [
            ['a'],
            ['empty']
        ]
    }
    const q5 = {
        E: [
            ['T', 'EL'],
        ],
        EL: [
            ['+', 'T', 'EL'],
            ['empty']
        ],
        T: [
            ['F', 'TL']
        ],
        TL: [
            ['*', 'F', 'TL'],
            ['empty']
        ],
        F: [
            ['(', 'E', ')'],
            ['id'],
        ],
//         X: [['a']]
    }
    
    const isTerminal = (symbol) => {
        return !/[A-Z]/g.test(symbol);
    }
    const getFirst = (jsonInput, prod) => {
        for (symbol of prod) {
            if (isTerminal(symbol)) {
                 return symbol;
            }
            else {
                const firsts = [];
                for (productions of jsonInput[symbol]) {
                    firsts.push(getFirst(jsonInput, productions));
                }
                return firsts;
            }
        }
    }
    
    const treeToArray = (arr, strArrAccumulator = []) => {
        for (item of arr) {
            if (item instanceof Array) {
                return treeToArray(item, strArrAccumulator)
            }
            else {
                strArrAccumulator.push(item);
            }
        }
        return strArrAccumulator;
    }

    // @TOOD exportar função
    const getFirsts = (jsonInput) => {
        const firsts = {};
        for (const key in jsonInput) {
            const productions = jsonInput[key];

            let currFirsts = [];
            productions.forEach((prod) => {
                const first = getFirst(jsonInput, prod);
                if (first instanceof Array) {
                    const treeAsArray = treeToArray(first);
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
    
    console.log('getFirsts', getFirsts(q4));
})();