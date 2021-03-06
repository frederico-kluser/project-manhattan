const regex = {
  onlyNumbers: /^(-?)[0-9]*$/,
  getSizeType: value => value.replace(/(-?)(.?)[0-9]/g, ''),

  test: (value, rule) => !!rule.exec(value),
  insertSizeType: (value, rule, extension) =>
    rule.exec(value) !== null ? value + extension : value,
};

export default regex;
