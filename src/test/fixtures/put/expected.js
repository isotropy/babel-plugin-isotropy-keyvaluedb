import _isotropyDb from "isotropy-lib-keyvaluedb";


async function putTodo() {
  await _isotropyDb.put("redis://127.0.0.1:6379", { Get_Eggs: "Get liek 2" });
}
