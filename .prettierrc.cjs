module.exports = {
    trailingComma: 'es5',
    tabWidth: 2,
    printWidth: 80,
    useTabs: false,
    semi: true,
    singleQuote: true,
    quoteProps: 'as-needed',
    bracketSpacing: true,
    arrowParens: 'always',
    jsxBracketSameLine: false,
    jsxSingleQuote: true,
    endOfLine: 'lf',
    // tailwindConfig: './tailwind.config.js',
    overrides: [
        {
            files: '.prettierrc',
            options: {
                parser: 'json',
            },
        },
    ],
};