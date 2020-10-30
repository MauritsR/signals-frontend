module.exports = {
  plugins: ['promise', 'sonarjs', 'unicorn'],
  extends: ['eslint:all', 'plugin:sonarjs/recommended', 'plugin:unicorn/recommended'],
  rules: {
    // proposed rules
    'default-param-last': 'error',
    'func-names': 'error',
    'id-length': 'error',
    'init-declarations': 'error',
    'line-comment-position': 'error',
    'max-len': ['error', { code: 120, tabWidth: 2, ignoreUrls: true, comments: 140 }],
    'new-cap': 'error',
    'no-implicit-coercion': 'error',
    'no-import-assign': 'error',
    'no-magic-numbers': 'error', // Except for tests
    'no-negated-condition': 'error',
    'no-promise-executor-return': 'error',
    'no-use-before-define': 'error',
    'no-warning-comments': 'error',
    'prefer-named-capture-group': 'error',
    'prefer-regex-literals': 'error',
    'require-atomic-updates': 'error',
    'require-unicode-regexp': 'error',
    'sonarjs/no-collapsible-if': 'error',
    'sonarjs/no-duplicate-string': 'error',
    'sonarjs/no-identical-functions': 'error',
    'sonarjs/no-small-switch': 'error',
    'unicorn/catch-error-name': 'error',
    'unicorn/no-abusive-eslint-disable': 'error',
    'unicorn/no-zero-fractions': 'error', // Auto-fix available
    'unicorn/prefer-add-event-listener': 'error',
    'unicorn/prefer-includes': 'error', // Has autofix but breaks test
    'unicorn/prefer-text-content': 'error', // Has autofix but breaks snapshots test
    'unicorn/prevent-abbreviations': 'error',

    // promise
    'promise/always-return': 'error',
    'promise/avoid-new': 'error',
    'promise/catch-or-return': 'error',
    'promise/no-callback-in-promise': 'error',
    'promise/no-native': 'off',
    'promise/no-nesting': 'error',
    'promise/no-new-statics': 'error',
    'promise/no-promise-in-callback': 'error',
    'promise/no-return-in-finally': 'error',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'promise/prefer-await-to-callbacks': 'error',
    'promise/valid-params': 'error',

    // sonarjs
    'sonarjs/cognitive-complexity': 'off',

    // unicorn
    'unicorn/import-index': 'error',
    'unicorn/prefer-number-properties': 'error',
    'unicorn/throw-new-error': 'error',
    'unicorn/prefer-optional-catch-binding': 'error',
    'unicorn/better-regex': 'error',

    // disabled rules
    'brace-style': 'off',
    'capitalized-comments': 'off',
    'class-methods-use-this': 'error',
    'function-call-argument-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'max-lines': 'off',
    'max-lines-per-function': 'off',
    'max-params': 'off',
    'max-statements': 'off',
    'max-statements-per-line': 'off',
    'multiline-comment-style': 'off',
    'multiline-ternary': 'off',
    'newline-per-chained-call': 'off',
    'no-confusing-arrow': 'off',
    'no-inline-comments': 'off',
    'no-invalid-this': 'error',
    'no-restricted-syntax': 'off',
    'no-ternary': 'off',
    'no-undefined': 'off',
    'no-underscore-dangle': ['off', { allow: ['_display', '_links'] }],
    'object-property-newline': 'off',
    'operator-linebreak': 'off',
    'prefer-destructuring': 'off',
    'sort-imports': 'off',
    'sort-keys': 'off',
    'unicorn/consistent-function-scoping': 'off', // Breaks on react hooks
    'unicorn/explicit-length-check': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/new-for-builtins': 'off',
    'unicorn/no-fn-reference-in-iterator': 'off',
    'unicorn/no-nested-ternary': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-process-exit': 'off',
    'unicorn/no-reduce': 'off',
    'unicorn/prefer-node-append': 'off',
    'unicorn/prefer-node-remove': 'off',
    'unicorn/prefer-query-selector': 'off',
    'unicorn/prefer-set-has': 'off',
    'unicorn/prefer-spread': 'error',
    'unicorn/prefer-string-slice': 'off',

    // rules
    'accessor-pairs': 'error',
    'array-bracket-newline': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'array-callback-return': 'error',
    'array-element-newline': ['error', { ArrayExpression: 'consistent' }],
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': 'error',
    'block-scoped-var': 'error',
    'block-spacing': 'error',
    // 'comma-dangle': ['error', { arrays: 'always-multiline', objects: 'always-multiline', imports: 'always-multiline', exports: 'never', functions: 'never' }],
    'comma-dangle': ['error', { arrays: 'always-multiline', objects: 'always-multiline', imports: 'always-multiline', functions: 'never' }],
    'comma-spacing': 'error',
    'comma-style': 'error',
    'computed-property-spacing': ['error', 'never'],
    'consistent-return': 'error',
    'default-case': ['error', { commentPattern: '^no default$' }],
    'dot-location': ['error', 'property'],
    'dot-notation': 'error',
    'eol-last': 'error',
    'func-call-spacing': ['error', 'never'],
    'func-name-matching': 'error',
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'function-paren-newline': ['error', 'multiline-arguments'],
    'generator-star-spacing': ['error', 'after'],
    'getter-return': 'error',
    'guard-for-in': 'error',
    'key-spacing': ['error', { beforeColon: false }],
    'keyword-spacing': ['error', { before: true, after: true }],
    'linebreak-style': ['error', 'unix'],
    'lines-between-class-members': 'error',
    'max-depth': ['error', 5],
    'max-nested-callbacks': ['error', 4],
    'new-parens': 'error',
    'no-alert': 'error',
    'no-array-constructor': 'error',
    'no-await-in-loop': 'error',
    'no-caller': 'error',
    'no-compare-neg-zero': 'error',
    'no-cond-assign': ['error', 'except-parens'],
    'no-console': 'error',
    'no-const-assign': 'error',
    'no-constructor-return': 'error',
    'no-control-regex': 'error',
    'no-delete-var': 'error',
    'no-div-regex': 'error',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-duplicate-imports': ['error', { includeExports: true }],
    'no-else-return': 'error',
    'no-empty-character-class': 'error',
    'no-empty-pattern': 'error',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-ex-assign': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-extra-parens': 'error',
    'no-extra-semi': 'error',
    'no-fallthrough': 'error',
    'no-floating-decimal': 'error',
    'no-func-assign': 'error',
    'no-implied-eval': 'error',
    'no-invalid-regexp': 'error',
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-mixed-operators': 'error',
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-multiple-empty-lines': 'error',
    'no-nested-ternary': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-symbol': 'error',
    'no-new-wrappers': 'error',
    'no-obj-calls': 'error',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-proto': 'error',
    'no-prototype-builtins': 'error',
    'no-regex-spaces': 'error',
    'no-restricted-properties': ['error', { object: 'require', property: 'ensure' }, { object: 'System', property: 'import' }],
    'no-return-await': 'error',
    'no-script-url': 'error',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow': 'error',
    'no-shadow-restricted-names': 'error',
    'no-sparse-arrays': 'error',
    'no-tabs': 'error',
    'no-template-curly-in-string': 'error',
    'no-this-before-super': 'error',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-undef': 'error',
    'no-undef-init': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unreachable': 'error',
    'no-unused-expressions': 'error',
    'no-unused-labels': 'error',
    'no-unused-vars': 'error',
    'no-useless-call': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    'no-useless-constructor': 'error',
    'no-useless-escape': 'error',
    'no-useless-rename': ['error', { ignoreDestructuring: false, ignoreImport: false, ignoreExport: false }],
    'no-useless-return': 'error',
    'no-var': 'error',
    'no-void': 'error',
    'no-whitespace-before-property': 'error',
    'no-with': 'error',
    'object-curly-newline': ['error', { consistent: true }],
    'object-curly-spacing': ['error', 'always'],
    'object-shorthand': 'error',
    'one-var': ['error', 'never'],
    'operator-assignment': ['error', 'always'],
    'padded-blocks': ['error', 'never'],
    'padding-line-between-statements': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-promise-reject-errors': 'error',
    'prefer-rest-params': 'error',
    'prefer-template': 'error',
    'quote-props': ['error', 'as-needed'],
    'require-await': 'error',
    'require-yield': 'error',
    'rest-spread-spacing': 'error',
    'semi-style': 'error',
    'sort-vars': 'error',
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': ['error', { words: true, nonwords: false }],
    'spaced-comment': ['error', 'always'],
    'symbol-description': 'error',
    'template-curly-spacing': 'error',
    'template-tag-spacing': 'error',
    'unicode-bom': ['error', 'never'],
    'use-isnan': 'error',
    'valid-typeof': 'error',
    'vars-on-top': 'error',
    'wrap-iife': ['error', 'inside'],
    camelcase: 'error',
    complexity: ['error', 30],
    curly: ['error', 'multi-line', 'consistent'],
    eqeqeq: ['error', 'smart'],
    indent: ['error', 2, { SwitchCase: 1, MemberExpression: 1 }],
    quotes: ['error', 'single', { avoidEscape: true }],
    radix: 'error',
    semi: 'error',
    strict: ['error', 'never'],
    yoda: ['error', 'never'],
  },
};
