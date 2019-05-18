import { testSentenceInPredictiveTable } from './verificador-sentenca';
import datasets from '../data-sets';

const createTest = (datasetKey) => {
    const {sentences, grammar, predictiveTable } = datasets[datasetKey];
    if (predictiveTable && sentences) {
        it(`get predictive table of data set ${datasetKey}`, () => {
            const initSymbol = Object.keys(grammar)[0];

            sentences.forEach(({ value, expected }) => {
                const result = testSentenceInPredictiveTable(
                    initSymbol, 
                    predictiveTable, 
                    value
                );
                expect(result).toEqual(expected);
            });
            // console.log('generatedTable', generatedTable)
            // console.log('predictiveTable', predictiveTable)
            
        });
    }
}

// createTest('d9');
for (const datasetKey in datasets) {
    createTest(datasetKey);
}


