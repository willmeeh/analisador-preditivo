import { getFirstsFromG } from './first';
import { d1 } from '../data-sets';

it('get firsts of d1 data set', () => {
    const { grammar } = d1;
    const firsts = getFirstsFromG(grammar);
    console.log('firsts', firsts);
});