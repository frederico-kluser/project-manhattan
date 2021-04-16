const regex = {
  only_numbers: /^(-?)[0-9]*$/,

  test: (value, rule) => !!rule.exec(value),
  adjut: (value, rule, extension = '') => (rule.exec(value) !== null ? value + extension : value),
};

export default regex;
