export default {
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
        }
    },
    d5: {
        grammar: {
            E: [
                ['T', 'EL'],
            ],
            EL: [
                ['+', 'T', 'EL'],
                ['empty']
            ],
            T: [
                ['F', 'TL']
            ],
            TL: [
                ['*', 'F', 'TL'],
                ['empty']
            ],
            F: [
                ['(', 'E', ')'],
                ['id'],
            ]
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
            S: [ '(', '[', 'a' ],
            A: [ 'a' ],
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
            T: ['+','$']
        }
    }
}
