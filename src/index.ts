/**
 * @fileoverview Linting rules for Typeorm
 * @author Michael Poulgrain
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

//import requireIndex from "requireindex";
import rules from "./lib/rules";
import configs from "./configs";

const configuration = {
    rules,
    configs,
};
//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------
export = configuration;
// import all rules in lib/rules
//module.exports.rules =
//export const rules = requireIndex(__dirname + "/rules");
