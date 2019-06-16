module.exports = {
    verbose: true,
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$',
        '^.+\\.module\\.css$',
        

    ],
    testPathIgnorePatterns:['(Link)\\.test\\.js'],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    setupFiles:[
        "<rootDir>/enzyme-setup.js"
    ]
};