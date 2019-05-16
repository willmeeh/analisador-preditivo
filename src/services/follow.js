const d7 = {
    grammar: {
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
    },
    firsts: {
        E: ['a'],
        EL: ['+', 'empty'],
        T: ['a']
    }
};

const isTerminal = (symbol) => {
    return !/[A-Z]/g.test(symbol);
}

const follow = (terminal, grammar, firsts, follows) => {

    let resultado = [];

    for (const prod in grammar) {
        if (prod !== terminal) {
            // eslint-disable-next-line no-loop-func
            let entrou = false;
            grammar[prod].forEach((sentencas) => {
                let location = sentencas.indexOf(terminal);
                if (location !== -1) {

                    for (let i = location; i < sentencas.length; i++) {
                        if (isTerminal(sentencas[i])) {
                            entrou = true;
                            resultado.push(sentencas[i]);
                            break;
                        }
                    }
                    if (entrou === false) {
                        for (let i = location; i >= 0; i--) {
                            if (isTerminal(sentencas[i])) {
                                entrou = true;
                                resultado.push(sentencas[i]);
                                break;
                            }
                        }
                    }
                    if (entrou === false) {
                        for (let i = location; i >= 0; i--) {
                            if (!isTerminal(sentencas[i])) {
                                entrou = true;
                                resultado.push(...follows[prod]);
                                break;
                            }
                        }
                    }
                    if (entrou === false) {
                        for (let i = location; i < sentencas.length; i++) {
                            if (!isTerminal(sentencas[i])) {
                                entrou = true;
                                resultado.push(...firsts[sentencas[i]]);
                                break;
                            }
                        }
                    }
                }


            });
        }
    }
    return resultado.filter(function (item) {
        return item !== 'empty'
    })
}

const getFollows = (grammar, firsts) => {

    let first = true;

    let follows = {

    }

    for (const prod in grammar) {
        if (!follows[prod]) {
            follows[prod] = [];
        }

        follows[prod] = follow(prod, grammar, firsts, follows);

        if (first === true) {
            follows[prod].push('$');
            first = false;
        }
    }

    return follows;
}



console.log(getFollows(d7.grammar, d7.firsts));






















// const follow = (symbols, termial) => {
//     const aBb = getaBb(symbols);

//     if (isTerminal(symbols)) {
//         // Adicionar terminal na lista
//         return {
//             termial: symbols
//         }
//     }

//     if (aBb[START] && aBb[MIDDLE] && aBb[END] === undefined) {
//         // Adicionar Follow de aBb[MIDDLE] na lista 
//         return {
//             follow: aBb[MIDDLE]
//         }
//     }

//     if (aBb[END] && aBb[MIDDLE] === termial) {
//         // Adicionar terminal na lista
//         return {
//             termial: aBb[END]
//         }
//     }

//     return undefined;
// }

// const getFollows = (jsonInput) => {
//     let follows = {};
//     let first = true;
//     let result = undefined;

//     for (const key in jsonInput) {
//         const prod = jsonInput[key];

//         follows[key] = [];

//         if (first) {
//             follows[key].push('$');
//             first = false;

//         } else {
//             result = follow(prod, key);
//             if (result) {
//                 follows[key].push(result);
//             }
//         }
//     }

//     return follows;
// }