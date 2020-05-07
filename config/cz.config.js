module.exports = {
  types: [
    {
      value: 'WIP',
      name: '💪  WIP:      进行中的工作',
    },
    {
      value: 'feat',
      name: '✨  feat:     新特性',
    },
    {
      value: 'fix',
      name: '🐞  fix:      修复缺陷',
    },
    {
      value: 'refactor',
      name: '🛠  refactor: 代码重构（即不是新增功能，也不是修改缺陷的代码变动）',
    },
    {
      value: 'docs',
      name: '📚  docs:     文档修改',
    },
    {
      value: 'chore',
      name: '🗯  chore:    其他修改（例如：修改了npm包或修改了打包配置文件）',
    },
    {
      value: 'style',
      name: '💅  style:    代码格式修改',
    },
    {
      value: 'revert',
      name: '⏪  revert:   回滚代码',
    },
  ],
  scopes: [],
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
};