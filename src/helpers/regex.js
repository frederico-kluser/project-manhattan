const regex = {
  only_numbers: /^[0-9]*$/,

  test: (value, rule) => !!rule.only_numbers.exec(value),
  adjut: (value, rule, extension = '') => (rule.exec(value) !== null ? value + extension : value),
};

window.regex = regex;
