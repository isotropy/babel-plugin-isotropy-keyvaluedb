import _isotropyDb from "isotropy-lib-keyvaluedb";


async function getTodos(who) {
  return await _isotropyDb.get("redis://127.0.0.1:6379", "Task");
}
