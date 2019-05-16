import { getFirstsFromG } from './first';
import datasets from '../data-sets';

const createTest = (datasetKey) => {
    const { grammar, firsts } = datasets[datasetKey];
    if (firsts) {
        it(`get firsts of data set ${datasetKey}`, () => {
        const generatedFirsts = getFirstsFromG(grammar);
            expect(generatedFirsts).toEqual(firsts);
        });
    }
}

// createTest('d2');
for (const datasetKey in datasets) {
    createTest(datasetKey);
}
