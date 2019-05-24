
export const newFormat = (oldGrammar, terminalsListInput, nonTerminalListInput) => {
    const newGrammar = {};

    console.log(oldGrammar, terminalsListInput, nonTerminalListInput);

    let loop = 0;
    oldGrammar.forEach(({ nonTerminal, terminalsList }) => {
        if (!newGrammar[nonTerminal]) {
            newGrammar[nonTerminal] = [];
        }
        console.log(++loop);
        let list = [];
        terminalsList.forEach((terminals) => {
            console.log(nonTerminal, terminals);

            if (terminalsListInput.includes(terminals)) {
                
                list.push(terminals);
            }else if (nonTerminalListInput.includes(terminals)) {
                list.push(terminals);
            } else {
                list.push(terminals.split(""));
            }
        });



        newGrammar[nonTerminal].push(list);


    });
    console.log(newGrammar);
    return newGrammar;
}
