import { propertyGroups } from 'stylelint-config-clean-order'

const propertiesOrder = propertyGroups.map(properties => ({
  noEmptyLineBetween: true, // 禁止空行
  emptyLineBefore: 'never', // 声明前是否允许空行
  properties, // 需要排序的属性
}))

const scssIgnoreAtRules = [
  'extends',
  'ignores',
  'include',
  'mixin',
  'if',
  'else',
  'media',
  'for',
  'at-root',
  'tailwind',
  'apply',
  'variants',
  'responsive',
  'screen',
  'function',
  'each',
  'use',
  'forward',
  'return',
]

/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-clean-order',
    'stylelint-config-standard-scss',
    'stylelint-config-standard-less',
    'stylelint-config-standard-vue',
  ],
  plugins: ['stylelint-scss', 'stylelint-prettier'],
  rules: {
    'no-duplicate-selectors': [
      true,
      {
        severity: 'warning',
      },
    ], // 重复选择器
    'block-no-empty': true, // 禁止空块
    'selector-class-pattern': null, // 类选择器命名规则
    'no-invalid-double-slash-comments': null, // 禁止无效的双斜杠注释
    // 规则前是否允许空行
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
      },
    ],
    'order/properties-order': [
      propertiesOrder,
      {
        severity: 'warning', // 警告
        unspecified: 'bottomAlphabetical', // 未指定的属性放在最后
      },
    ],
    'scss/at-mixin-pattern': ['^[a-zA-Z][a-zA-Z]*$'], // scss mixin命名规则
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: scssIgnoreAtRules,
      },
    ],
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: scssIgnoreAtRules,
      },
    ],
    'prettier/prettier': true,
  },
  overrides: [
    {
      customSyntax: 'postcss-html',
      files: ['*.(html|vue)', '**/*.(html|vue)'],
      rules: {
        'selector-pseudo-class-no-unknown': [
          true,
          {
            ignorePseudoClasses: ['global', 'deep'],
          },
        ],
        'selector-pseudo-element-no-unknown': [
          true,
          {
            ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'],
          },
        ],
      },
    },
  ],
}
