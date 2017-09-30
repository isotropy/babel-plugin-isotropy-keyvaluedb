import _isotropyDb from "isotropy-lib-keyvaluedb";


async function deleteTodos() {
  await _isotropyDb.del("redis://127.0.0.1:6379", "Get_Eggs");
}
