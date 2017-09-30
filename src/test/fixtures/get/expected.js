import _isotropyDb from "isotropy-lib-keyvaluedb";


async function getTodos() {
  return await _isotropyDb.get("redis://127.0.0.1:6379", "Get_Eggs");
}
