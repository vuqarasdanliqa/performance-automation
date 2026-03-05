import fs from "fs";

export interface ParsedScenario {
  baseUrl: string;
  vus: number;
  duration: string;
  path: string;
  expectedStatus: number;
}

export function parseFeature(path: string): ParsedScenario {
  const content = fs.readFileSync(path, "utf8");

  console.log("FEATURE CONTENT:");
  console.log(content);
  
  return {
    baseUrl: content.match(/base URL is "([^"]*)"/)?.[1] || "",
    vus: Number(content.match(/virtual users is (\d+)/)?.[1]) || 1,
    duration: content.match(/duration is "([^"]*)"/)?.[1] || "5s",
    path: content.match(/GET request to "([^"]*)"/)?.[1] || "/",
    expectedStatus: Number(content.match(/response status should be (\d+)/)?.[1]) || 200,
  };
}