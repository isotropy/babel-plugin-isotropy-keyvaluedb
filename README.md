Isotropy Babel Plugin for Key-Value-DB
======================================
This module is a babel plugin that transpiles array operations into
corresponding kv-db operations.
It uses isotropy-ast-analyzer-keyvaluedb for AST analysis.

This is part of the isotropy framework (www.isotropy.org).

Include the plugin in .babelrc file.

Plugin configuration:
```
plugins: [
  [
    "transform-to-isotropy-keyvalueb",
    {
      projects: [
        {
          dir: "dist/test",
          modules: [
            {
              source: "fixtures/my-db",
              locations: [
                { name: "todos", connStr: "redis://127.0.0.1:6379" }
              ]
            }
          ]
        }
      ]
    }
  ]
]
```
projects:  
dir: Specify the root of the project.  
modules:  
source: Points to the local db file.  
locations:  
name: The name used to access the connStr specified alongside.  
connStr: The connection string used when the actual database operations take place.  

Example:
```javascript
import myDb from "./my-db";

async function getTodos() {
  // return list of files in /home/docs
  return myDb.todos
}
```
