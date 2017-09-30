import getAnalyzers from "../../isotropy-ast-analyzer-keyvaluedb";
import * as mapper from "./mappers";
import * as template from "./templates";
import * as t from "babel-types";

export default function(opts) {
  let analyzers;
  // Specifies the isotropy keyvaluedb library
  const libDbSource = t.StringLiteral("isotropy-lib-keyvaluedb");
  let libDbIdentifier;

  const replacer = (analysis, path) => {
    /*
      Based  on  the  analysis  from  the  analyzer  module  (_analysis),
      the appropriate code translation is created by calling the template
      with the corresponding mapper function which is inturn fed with the
      result  of  the  analysis (the first argument). This  code  is  then
      turned  into  an  await  expr.  The  mapper  function  also  takes
      the  libDbIdentifier  variable  and  the  basePath  from the  config
    */
    path.replaceWith(
      t.awaitExpression(
        template[analysis.operation]()(
          mapper[analysis.operation](
            analysis,
            t.identifier(libDbIdentifier),
            t.stringLiteral(analysis.source.module)
          )
        ).expression
      )
    );
    path.skip();
  };

  return {
    plugin: {
      pre() {
        analyzers = getAnalyzers();
      },
      visitor: {
        ImportDeclaration: {
          exit(path, state) {
            const analysis = analyzers.meta.analyzeImportDeclaration(
              path,
              state
            );
            if (analysis) {
              libDbIdentifier = path.scope.generateUidIdentifier("isotropyDb")
                .name;
              /*
                Inserts statement:
                * isotropy Db lib module import
              */
              path.replaceWith(
                t.importDeclaration(
                  [t.importDefaultSpecifier(t.identifier(libDbIdentifier))],
                  libDbSource
                )
              );
              path.skip();
            }
          }
        },

        AssignmentExpression: {
          exit(path, state) {
            let analysis = analyzers.write.analyzeAssignmentExpression(
              path,
              state
            );
            if (analysis) replacer(analysis.value, path);
          }
        },

        CallExpression: {
          exit(path, state) {
            let analysis = analyzers.read.analyzeCallExpression(path, state);
            if (analysis) replacer(analysis.value, path);
          }
        }
      }
    }
  };
}
