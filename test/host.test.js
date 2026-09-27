import assert from "node:assert/strict";
import { apply, inject } from "../lib/index.js";

assert.deepEqual(inject, []);
assert.equal(apply(), undefined);

console.log("rc2 host entry is side-effect free");
