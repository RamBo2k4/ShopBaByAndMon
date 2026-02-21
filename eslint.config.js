// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import { defineConfig, globalIgnores } from 'eslint/config'

// export default defineConfig([
//   globalIgnores(['dist']),
//   {
//     files: ['**/*.{js,jsx}'],
//     extends: [
//       js.configs.recommended,
//       reactHooks.configs.flat.recommended,
//       reactRefresh.configs.vite
//     ],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//       parserOptions: {
//         ecmaVersion: 'latest',
//         ecmaFeatures: { jsx: true },
//         sourceType: 'module'
//       }
//     },
//     rules: {
//       'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
//       // React
//       'react-refresh/only-export-components': 'warn',
//       'react-hooks/rules-of-hooks': 'error',
//       'react-hooks/exhaustive-deps': 'warn',
//       'react/prop-types': 0,
//       'react/display-name': 0,

//       //Mui
//       'no-restricted-imports': [
//         'error',
//         {
//           'patterns': ['@mui/*/*/*']
//         }
//       ],

//       //Common
//       'no-console': 1,
//       'no-lonely-if': 1,
//       // no if else (if())
//       'no-trailing-spaces': 1,
//       // thua dau cach
//       'no-multi-spaces': 1,
//       // thua nhieu khoang trong
//       'no-multiple-empty-lines': 1,
//       // thua nhieu dong
//       'space-before-blocks': ['error', 'always'],
//       //khong trong giua () {}
//       'object-curly-spacing': [1, 'always'],
//       //when open object have space (co khoang trong o hai dau)
//       'indent': ['warn', 2],
//       //tap space equal 2 (tap bang 2)
//       'semi': [1, 'never'],
//       //not have ;
//       'quotes': ['error', 'single'],
//       //string equal ''
//       'array-bracket-spacing': 1,
//       //arr not space
//       'linebreak-style': 0,
//       //new line windows not equal mac or linux
//       'no-unexpected-multiline': 'warn',
//       //dong ko du qua duoc ket qua
//       'keyword-spacing': 1,
//       //space mid if else
//       'comma-dangle': 1,
//       'comma-spacing': 1,
//       'arrow-spacing': 1
//     }
//   }
// ])

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
a