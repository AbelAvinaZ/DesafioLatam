module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    globals: {
        'NODE_ENV': 'test',
    },
};