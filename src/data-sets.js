const grammars = {
    arthur_d1: {
        'E': {
            'a': ['T', 'EL'],
        },
        'EL': {
            '+': ['+', 'T', 'EL'],
            '$': ['empty'],
        },
        'T': {
            'a': ['a'],
        }
    },
    d1: {
        grammar: {
            S: [
                ['a', 'B'],
                ['d']
            ],
            B: [
                ['c', 'D', 'b'],
                ['empty']
            ],
            D: [
                ['a'],
                ['empty']
            ]
        },
        firsts: {
            S: ['a', 'd'],
            B: ['c', 'empty'],
            D: ['a', 'empty']
        }
    },
    d2: {
        grammar: {
            Z: [
                ['X', 'Y', 'Z'],
                ['d']
            ],
            Y: [
                ['c'],
                ['empty']
            ],
            X: [
                ['Y'],
                ['a']
            ]
        },
        firsts: {
            Z: [ 'c', 'empty', 'a', 'd' ],
            Y: [ 'c', 'empty' ],
            X: [ 'c', 'empty', 'a' ]

        }
    },
    d3: {
        grammar: {
            S: [
                ['(', 'A', ')'],
                ['b']
            ],
            A: [
                ['B', ':', 'A'],
                ['B']
            ],
            B: [
                ['a'],
                ['empty']
            ]
        },
        firsts: {
            S: ['(', 'b'],
            A: ['a', 'empty'],		
            B: ['a', 'empty'],
        }
    },
    d4: {
        grammar: {
            S: [
                ['(', 'A', ')'],
                ['b']
            ],
            A: [
                ['B', 'X']
            ],
            X: [
                [';', 'B', 'X'],
                ['empty']
            ],
            B: [
                ['a'],
                ['empty']
            ]
        },
        firsts: {
            S: ['(', 'b'],
            A: ['a', 'empty'],
            X: [';', 'empty'],
            B: ['a', 'empty'],
        }
    },
    d5: {
        grammar: {
            E: [
                ['T', 'EL'],
            ],
            EL: [
                ['+', 'T', 'EL'],
                ['-', 'T', 'EL'],
                ['empty']
            ],
            T: [
                ['F', 'TL']
            ],
            TL: [
                ['*', 'F', 'TL'],
                ['/', 'F', 'TL'],
                ['empty']
            ],
            F: [
                ['(', 'E', ')'],
                ['a'],
            ]
        },
        firsts: {
            E: ['(', 'a'],
            EL: ['+', '-', 'empty'],
            T: ['(', 'a'],
            TL: ['*', '/', 'empty'],
            F: ['(', 'a']
        }
    },
    d6: {
        grammar: {
            S: [
                ['(', 'S', ')'],
                ['[', 'S', ']'],
                ['A']
            ],
            A: [
                ['a']
            ]
        },
        firsts: {
            S: ['(', '[', 'a'],
            A: ['a'],
        },
        follows: {
            S: ['$', ')', ']'],
            A: ['$', ')', ']']
        }
    },
    d7: {
        grammar: {
            E: [
                ['T', 'EL']
            ],
            EL: [
                ['+', 'T', 'EL'],
                ['empty']
            ],
            T: [
                ['a']
            ]
        },
        firsts: {
            E: ['a'],
            EL: ['+', 'empty'],
            T: ['a']
        },
        follows: {
            E: ['$'],
            EL: ['$'],
            T: ['+', '$']
        }
    },
    d8: {
        grammar: {
            E: [['T', 'EL']],
            EL: [['+', 'T', 'EL'], ['empty']],
            T: [['F', 'TL']],
            TL: [['*', 'F', 'TL'], ['empty']],
            F: [['(', 'E', ')'], ['a']]
        },
        firsts: {
            E: ['(', 'a'],
            EL: ['+', 'empty'],
            T: ['(', 'a'],
            TL: ['*', 'empty'],
            F: ['(', 'a'],
        },
        follows: {
            E: ['$', ')'],
            EL: ['$', ')'],
            T: ['+', ')', '$'],
            TL: ['+', ')', '$'],
            F: ['*', '+', ')', '$'],
        },
    }
};

export default grammars;

// https://mikedevice.github.io/first-follow/
const convertGramar = (g) => {
    for (const initOfSentence in g) {
        for (const symbols of g[initOfSentence]) {
            const str = `${initOfSentence} -> ${symbols.join(' ')}`;
            console.log(str.replace('empty', 'ε'));
        }
    }
}

// convertGramar(grammars.d2.grammar);