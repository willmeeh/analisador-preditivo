import { generateTabularPredictiveTable } from './tabular-predictive-table';
import datasets from '../data-sets';

const createTest = (datasetKey) => {
    const { grammar, firsts, follows, predictiveTable } = datasets[datasetKey];
    if (firsts && follows && predictiveTable) {
        it(`get predictive table of data set ${datasetKey}`, () => {
            const generatedTable = generateTabularPredictiveTable(grammar, null, follows);
            // console.log('generatedTable', generatedTable)
            // console.log('predictiveTable', predictiveTable)
            expect(generatedTable).toEqual(predictiveTable);
        });
    }
}

// createTest('d9');
for (const datasetKey in datasets) {
    createTest(datasetKey);
}
