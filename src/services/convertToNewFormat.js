
export const newFormat = (oldGrammar, terminalsListInput) => {
    const newGrammar = {};

    oldGrammar.forEach(({ nonTerminal, terminalsList }) => {
        if (!newGrammar[nonTerminal]) {
            newGrammar[nonTerminal] = [];
        }

        terminalsList.forEach((terminals) => {
            if (terminalsListInput.includes(terminals)) {
                
                newGrammar[nonTerminal].push([terminals]);
            } else {
                newGrammar[nonTerminal].push(terminals.split(""));
            }
        });


    });

    return newGrammar;
}
