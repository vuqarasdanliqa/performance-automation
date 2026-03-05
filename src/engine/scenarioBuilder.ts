import { ParsedScenario } from "../parser/featureParser";
import fs from "fs";

export function generateK6Test(config: ParsedScenario) {
  const script = `
import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: ${config.vus},
  duration: "${config.duration}",
};

export default function () {
  const res = http.get("${config.baseUrl}${config.path}");
  if (res.status !== ${config.expectedStatus}) {
    throw new Error("Unexpected status");
  }
  sleep(1);
}
`;

  fs.writeFileSync("./k6/generated-test.js", script);
}