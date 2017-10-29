import should from "should";
import * as babel from "babel-core";
import fs from "fs";
import path from "path";
import transformToIsotropyKeyValueDB from "../transform-to-isotropy-keyvaluedb";
import sourceMapSupport from "source-map-support";

sourceMapSupport.install();

describe("isotropy-ast-analyzer-db", () => {
  function run([description, dir, opts]) {
    it(`${description}`, () => {
      const fixturePath = path.resolve(
        __dirname,
        "fixtures",
        dir,
        `fixture.js`
      );
      const outputPath = path.resolve(__dirname, "fixtures", dir, `output.js`);
      const expected = fs
        .readFileSync(__dirname + `/fixtures/${dir}/expected.js`)
        .toString();

      const opts = {
        plugins: [
          [
            transformToIsotropyKeyValueDB(),
            {
              projects: [
                {
                  dir: "dist/test",
                  modules: [
                    {
                      source: "dist/test/fixtures/my-db",
                      databases: {
                        todos: { connection: "redis://127.0.0.1:6379" }
                      }
                    }
                  ]
                }
              ]
            }
          ],
          "syntax-object-rest-spread"
        ],
        parserOpts: {
          sourceType: "module",
          allowImportExportEverywhere: true
        },
        babelrc: false
      };

      const babelResult = () => babel.transformFileSync(fixturePath, opts);
      return dir.includes("error")
        ? should(babelResult).throw(Error)
        : (() => {
            const actual = babelResult().code + "\n";
            actual.should.deepEqual(expected);
          })();
    });
  }

  const tests = [
    ["put", "put"],
    ["put-error", "put-error"],
    ["get", "get"],
    ["get-ulta", "get-ulta"],
    ["get-error", "get-error"],
    ["del", "del"],
    ["del-error", "del-error"],
    ["non-specific-read-error", "non-specific-read-error"],
    ["non-specific-write-error", "non-specific-write-error"]
    // ["update", "update"],
  ];

  for (const test of tests) {
    run(test);
  }
});
