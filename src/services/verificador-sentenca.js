// import { arthur_d1 } from '../data-sets';


const escreverTabelafinal = (tabelaFinal) => {

    let tamanho = tabelaFinal.pilha.length;

    console.log("pilha \t\t", "entrada \t\t");

    for (let index = 0; index < tamanho; index++) {
        console.log("Linha: ", index);
        console.log("Pilha: ", JSON.stringify(tabelaFinal.pilha[index]));
        console.log("Entrada: ", JSON.stringify(tabelaFinal.entrada[index]));
        console.log("Saída: ", JSON.stringify(tabelaFinal.saida[index]));
        console.log("\n");

    }

    
    let teste = tabelaFinal.entrada[tamanho-1].join() + tabelaFinal.pilha[tamanho-1].join();
    if (teste === '$$') {
        console.log("Aceita");
        alert("Aceita");
    } else {
        console.log("Rejeita");
        alert("Rejeita");
    }

}

const verificarSentenca = (pilha, entrada, tabelaPreditivaTabular) => {
    let tabelaFinal = {
        pilha: [],
        entrada: [],
        saida: []
    }

    tabelaFinal.pilha.push([...pilha]);
    tabelaFinal.entrada.push([...entrada]);
    tabelaFinal.saida.push([]);

    let encontrouNaTabela = true;

    while (encontrouNaTabela) {
        encontrouNaTabela = false;

        let letraEntrada = entrada.shift();
        let topoPilha = pilha.pop();

        if (letraEntrada === topoPilha && letraEntrada !== '$') {
            tabelaFinal.pilha.push([...pilha]);
            tabelaFinal.entrada.push([...entrada]);
            tabelaFinal.saida.push([]);
            encontrouNaTabela = true;
        } else {
            // Percore as nao terminais
            for (const naoTerminalTabela in tabelaPreditivaTabular) {
                if (topoPilha === naoTerminalTabela) {
                    for (const letraTabela in tabelaPreditivaTabular[topoPilha]) {
                        if (letraEntrada === letraTabela) {
                            entrada.unshift(letraEntrada);
                            let tabelaPreditivaTabularTmp = [...tabelaPreditivaTabular[topoPilha][letraEntrada]];
                            pilha.push(...tabelaPreditivaTabularTmp.reverse());
                            pilha = pilha.filter(e => e !== 'empty');
                            tabelaFinal.pilha.push([...pilha]);
                            tabelaFinal.entrada.push([...entrada]);

                            let sentenca = {};
                            sentenca[topoPilha] = [...tabelaPreditivaTabularTmp];

                            tabelaFinal.saida.push(sentenca);
                            encontrouNaTabela = true;
                        }
                    }
                }
            }
        }
    }
    
    escreverTabelafinal(tabelaFinal);
    return tabelaFinal;
}

export const testSentenceInPredictiveTable = (
    initSymbol,
    predictiveTable,
    sentence
) => {
    if (sentence && typeof sentence !== 'array') {
        sentence = sentence.split(' ');
    }
    return verificarSentenca(["$", initSymbol], sentence, predictiveTable);
}

export const testSentenceInPredictiveTableData = (
    initSymbol,
    predictiveTable,
    sentence
) => {
    if (sentence && typeof sentence !== 'array') {
        sentence = sentence.split(' ');
    }
    console.log(["$", initSymbol], sentence, predictiveTable);
    return verificarSentenca(["$", initSymbol], sentence, predictiveTable);
}
// verificarSentenca(["$", "E"], ["a", "+", "a", "+", "a", "$"], arthur_d1);