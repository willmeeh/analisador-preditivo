import { getFirstsFromG } from './first';
import datasets from '../data-sets';

const createTest = (datasetKey) => {
    it(`get firsts of data set ${datasetKey}`, () => {
        const { grammar, firsts } = datasets[datasetKey];
        const generatedFirsts = getFirstsFromG(grammar);
        if (firsts) {
            expect(generatedFirsts).toEqual(firsts);
        }
    });
}

// createTest('d2');
for (const datasetKey in datasets) {
    createTest(datasetKey);
}
