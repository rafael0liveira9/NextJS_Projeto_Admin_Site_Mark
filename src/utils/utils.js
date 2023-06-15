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
