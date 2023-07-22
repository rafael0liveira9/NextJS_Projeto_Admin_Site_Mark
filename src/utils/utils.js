export function regexMoney(i) {
  var v = i.value.replace(/\D/g, "");
  v = (v / 100).toFixed(2) + "";
  v = v.replace(".", ",");
  v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  i.value = v;
  return v;
}

export function regexMoneyText(i) {
  var v = i.replace(/\D/g, "");
  v = (v / 100).toFixed(2) + "";
  v = v.replace(".", ",");
  v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  i = v;
  return v;
}

export function reverseRegexMoney(i) {
  var v = parseFloat(i.value.replace(/\./g, "").replace(",", "."));
  return v;
}
export function reverseRegexMoneyText(i) {
  var v = parseFloat(i.replace(/\./g, "").replace(",", "."));
  return v;
}

export function returnDay(day) {
  const date = new Date(Date.parse(day));

  return `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}/${
    date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }/${date.getFullYear()}`;
}
