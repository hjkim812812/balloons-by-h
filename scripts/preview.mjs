import { rmSync } from "node:fs";
import { spawnSync, spawn } from "node:child_process";

rmSync(".next", { recursive: true, force: true });

const build = spawnSync("next", ["build"], { stdio: "inherit", shell: true });
if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const port = process.env.PORT ?? "3000";
const child = spawn("next", ["start", "-p", port], {
  stdio: "inherit",
  shell: true,
});

child.on("exit", (code) => process.exit(code ?? 0));
