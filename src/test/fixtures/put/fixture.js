import myDb from "../my-db";

async function putTodo() {
  myDb.todos = myDb.todos.concat({ Get_Eggs: "Get liek 2" });
}
