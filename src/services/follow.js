// import { d7 } from '../data-sets';
import { isTerminal } from '../utils';
import { getFirstsFromG } from './first';

const follow = (terminal, grammar, firsts, follows) => {

    let resultado = [];

    for (const prod in grammar) {
        // if (prod !== terminal) {
        // eslint-disable-next-line no-loop-func

        grammar[prod].forEach((sentencas) => {
            let entrou = false;
            let location = sentencas.indexOf(terminal);

            // if (terminal === 'X') {
            //     console.log(1);
            // }

            if (location !== -1) {

                for (let i = location + 1; i < sentencas.length; i++) {
                    if (isTerminal(sentencas[i])) {
                        entrou = true;
                        resultado.push(sentencas[i]);
                    }
                    break;

                }
                if (entrou === false) {
                    for (let i = location - 1; i >= 0; i--) {
                        if (isTerminal(sentencas[i]) && sentencas[location + 1] !== undefined) {
                            entrou = true;
                            resultado.push(sentencas[i]);
                        }
                        break;

                    }

                }
                if (entrou === false) {
                    for (let i = location; i >= 0; i--) {
                        if (!isTerminal(sentencas[i]) && sentencas[i + 2] === undefined) {
                            entrou = true;
                            if (follows[prod] !== undefined) {
                                resultado.push(...follows[prod]);
                            }
                        }
                        break;

                    }

                }
                if (entrou === false) {
                    for (let i = location; i < sentencas.length; i++) {
                        if (!isTerminal(sentencas[i])) {
                            entrou = true;
                            resultado.push(...firsts[prod]);
                        }
                        break;

                    }
                }
                // } else if (prod == terminal && sentencas.length === 1) {
                //     if(isTerminal(sentencas[0])) {
                //         resultado.push(...sentencas[0]);
                //     }
            }


        });
        // }
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

export const getFollowsFromG = (g) => {
    const firsts = getFirstsFromG(g);
    return getFollows(g, firsts)
}