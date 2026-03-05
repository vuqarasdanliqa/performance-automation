import { parseFeature } from "./parser/featureParser";
import { generateK6Test } from "./engine/scenarioBuilder";
import { execSync } from "child_process";
import path from "path";

const featurePath = path.resolve(__dirname, "../features");
const scenario = parseFeature(featurePath);

generateK6Test(scenario);
console.log(scenario);

const influxdbUrl = "http://{{username}}:{{password}}@localhost:8086/k6";

execSync(
  `k6 run --out influxdb=${influxdbUrl} k6/generated-test.js`,
  { stdio: "inherit" }
);