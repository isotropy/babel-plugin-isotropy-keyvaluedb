import myDb from "../my-db";

async function getTodos() {
  return myDb.todos.find(todo => Object.keys(todo)[0] === "Get_Eggs");
}
