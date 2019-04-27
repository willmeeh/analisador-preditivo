const START = 'start';
const MIDDLE = 'middle';
const END = 'end';

const isTerminal = (symbol) => {
    return !/[A-Z]/g.test(symbol);
}

const getaBb = (symbol) =>{
    const aBb = {
    }

    var state = START;

    let letterArray =symbol.split("");

    letterArray.forEach(letter => {
        if (letter === letter.toLowerCase()) {
            if (state === MIDDLE) {
                state = END;
            } 
            aBb[state] += letter;
        }
        else {
            state = MIDDLE;
            aBb[state] += letter;
        }
    });

    return aBb;
}

const follow = (symbols, termial) => {
    const aBb = getaBb(symbols);

    if (isTerminal(symbols)) {
        // Adicionar terminal na lista
        return {
            termial: symbols
        }
    }

    if (aBb[START] && aBb[MIDDLE] && aBb[END] === undefined) {
        // Adicionar Follow de aBb[MIDDLE] na lista 
        return {
            follow: aBb[MIDDLE]
        }
    }

    if (aBb[END] && aBb[MIDDLE] === termial) {
        // Adicionar terminal na lista
        return {
            termial: aBb[END]
        }
    }

    return undefined;
}

const getFollows = (jsonInput) => {
    let follows = {};
    let first = true;
    let result = undefined;

    for (const key in jsonInput) {
        const prod = jsonInput[key];

        follows[key] = [];

        if (first) {
            follows[key].push('$');
            first = false;

        } else {
            result = follow(prod, key);
            if (result) {
                follows[key].push(result);
            }
        }
    }

    return follows;
}