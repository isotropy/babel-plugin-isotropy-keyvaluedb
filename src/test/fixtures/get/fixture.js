import myDb from "../my-db";

async function getTodos() {
  return myDb.todos.find(todo => todo.key === "Get_Eggs");
}
