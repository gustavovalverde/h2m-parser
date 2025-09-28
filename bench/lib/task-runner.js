import { spawn } from "node:child_process";

export function commandTask(name, command, options = {}) {
  return { type: "command", name, command, env: options.env, cwd: options.cwd };
}

export function customTask(name, handler) {
  return { type: "custom", name, handler };
}

export async function runTaskSequence(tasks, context = {}) {
  for (const task of tasks) {
    if (task.type === "command") {
      await runCommandTask(task, context);
    } else if (task.type === "custom") {
      await runCustomTask(task, context);
    } else {
      throw new Error(`Unknown task type: ${task.type}`);
    }
  }
  return context;
}

async function runCommandTask(task, context) {
  const command = typeof task.command === "function" ? task.command(context) : task.command;
  if (!Array.isArray(command) || command.length === 0) {
    throw new Error(`Command task "${task.name}" did not provide a command`);
  }

  console.log(`\n▶️  ${task.name}`);
  await new Promise((resolve, reject) => {
    const child = spawn(command[0], command.slice(1), {
      stdio: "inherit",
      cwd: task.cwd ?? process.cwd(),
      env: { ...process.env, ...task.env },
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${task.name} exited with code ${code}`));
      }
    });
  });
}

async function runCustomTask(task, context) {
  console.log(`\n🔧 ${task.name}`);
  await task.handler(context);
}
