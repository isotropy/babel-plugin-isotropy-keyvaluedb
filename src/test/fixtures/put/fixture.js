import myDb from "../my-db";

async function putTodo() {
  myDb.todos = myDb.todos.concat({ key: "Get_Eggs", value: "Get liek 2" });
}
