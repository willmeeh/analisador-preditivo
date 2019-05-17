import { getFirstsFromG } from './first';
import datasets from '../data-sets';

const createTest = (datasetKey) => {
    const { grammar, firsts } = datasets[datasetKey];
    if (firsts) {
        it(`get firsts of data set ${datasetKey}`, () => {
            const generatedFirsts = getFirstsFromG(grammar);
            for (const firstKey in firsts) {
                expect(generatedFirsts[firstKey]).toEqual(
                    expect.arrayContaining(firsts[firstKey])
                );
            }
        });
    }
}

// createTest('d2');
for (const datasetKey in datasets) {
    createTest(datasetKey);
}
