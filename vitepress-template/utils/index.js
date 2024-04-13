// 下划线转驼峰
function underlineToCamel(str) {
  return str.replace(/_(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

module.exports = {
  underlineToCamel,
  sleep,
};
