import myDb from "../my-db";

async function deleteTodos() {
  myDb.todos = myDb.todos.filter(todo => !(todo.key === "Get_Eggs"));
}
