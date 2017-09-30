import myDb from "../my-db";

async function deleteTodos() {
  myDb.todos = myDb.todos.filter(todo => !(Object.keys(todo)[0] === "Get_Eggs"))
}
