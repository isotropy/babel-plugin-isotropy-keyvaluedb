import template from "babel-template";

export function put() {
  return template(`LIB_DB.put(CONN_STR, { key: KEY, value: VALUE });`);
}

export function get() {
  return template(`LIB_DB.get(CONN_STR, DATA);`);
}

export function del() {
  return template(`LIB_DB.del(CONN_STR, DATA);`);
}

export function update() {
  return template(``);
}
