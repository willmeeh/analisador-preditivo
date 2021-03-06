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
        },
        follows: {
            S: ['$'],
            B: ['$'],
            D: ['b']
        }
    },
    d2: {
        grammar: {
            Z: [
                ['X', 'Y', 'Z'],
                ['d']
            ],
            X: [
                ['Y'],
                ['a']
            ],
            Y: [
                ['c'],
                ['empty']
            ],
        },
        firsts: {
            Z: [ 'c', 'empty', 'a', 'd' ],
            Y: [ 'c', 'empty' ],
            X: [ 'c', 'empty', 'a' ]
        },
        follows: {
            Z: ['$'],
            Y: ['c', 'd', 'a' ],
            X: ['c', 'd', 'a' ]
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
        },
        follows: {
            S: ['$'],
            A: [')'],
            B: [':', ')' ],
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
        },
        follows: {
            S: ['$'],
            A: [')'],
            X: [')'],
            B: [';'],
        }
    },
    d5: {
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
    d6: {
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
        },
        predictiveTable: {
            E: {
                'a': ['T', 'EL'],
            },
            EL: {
                '+': ['+', 'T', 'EL'],
                '$': ['empty'],
            },
            T: {
                'a': ['a'],
            }
        },
        sentences: [
            {
                value: 'a + a + a $',
                expected: false
            },
        ]
    },
    d7: {
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
        // predictiveTable: {
        //     E: {
        //         'a': ['T', 'EL'],
        //         '(': ['T', 'EL'],
        //     },
        //     EL: {
        //         '+': ['+', 'T', 'EL'],
        //         ')': ['empty']
        //     },
        //     T: {
        //         'a': ['F', 'TL'],
        //         '(': ['F', 'TL'],
        //     },
        //     TL: {
        //         '+': ['empty'],
        //         '*': ['*', 'F', 'TL'],
        //         ')': ['empty'],
        //         '$': ['empty'],
        //     },
        //     F: {
        //         'a': ['a'],
        //         '(': ['(', 'E', ')']
        //     }
        // }
    },
    d8: {
        grammar: {
            S: [ 
                ['a', 'S', 'a'], 
                ['A']
            ],
            A: [ 
                ['b', 'B']
            ],
            B: [ 
                ['c', 'B', 'c'],
                ['c']
            ]
        },
        firsts: {
            S: ['a', 'b'],
            A: ['b'],
            B: ['c']
        },
        follows: {
            S: ['$', 'a'], 
            A: ['$', 'a'], 
            B: ['$', 'a', 'c']
        }
    },
    d9: {
        grammar: {
            S: [ 
                ['c', 'A', 'a'] 
            ],
            A: [ 
                ['c', 'B'], 
                ['B'] 
            ],
            B: [ 
                ['b', 'c', 'B'], 
                ['empty'] 
            ]
        },
        firsts: {
            A: ['b', 'c', 'empty'],
            B: ['b', 'empty'],
            S: ['c'],
        },
        follows: {
            A: ['a'],
            B: ['a'],
            S: ['$'],
        },
        predictiveTable: {
            A: {
                a: ['B'],
                b: ['B'],
                c: ['c', 'B']
            },
            B: {
                a: ['empty'],
                b: ['b', 'c', 'B']
            },
            S: {
                c: ['c', 'A', 'a']
            }
        }
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

// convertGramar(grammars.d9.grammar);
