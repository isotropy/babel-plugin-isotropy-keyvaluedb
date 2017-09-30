Isotropy Babel Plugin for Key-Value-DB
======================================
This module is a babel plugin that transpiles array operations into
corresponding kv-db operations.
It uses isotropy-ast-analyzer-db for AST analysis.

This is part of the isotropy framework (www.isotropy.org).

Include the plugin in .babelrc file.

Plugin configuration:
```
plugins: [
  [
    "transform-to-isotropy-fs",
    {
      projects: [
        {
          dir: "src/fs",
          modules: [
            {
              source: "my-fs",
              locations: [{ name: "docs", path: "/home/docs" }]
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
source: Points to the fs file.  
locations:  
name: The name used to access the path specified alongside.  
path: The path at which the actual filesystem operations will take place.  

Example:
```javascript
import myFs from "./my-fs";

async function getFiles() {
  // return list of files in /home/docs
  return myFs.docs
}
```
