import { spawnSync } from 'child_process';

/**
 * Executes the function passed as an argument and properly shuts down the node environment.
 *
 * Any uncaught error or promise rejection will be printed out in the console.
 */
export const runAndHandleErrors = (fn: () => Promise<unknown>) => {
  try {
    fn()
      .then(() => process.exit(0))
      .catch((error) => {
        cliPrint.error(error);
        console.log(error.stack);
        process.exit(1);
      });
  } catch (error) {
    cliPrint.error('' + error);
    console.log((error as Error).stack);
    process.exit(1);
  }
};

/**
 * Run the command passed as an argument in the current shell and stream the output of the command in the CLI.
 */
export const runShellCommand = (command: string) => {
  cliPrint.info(command);
  return spawnSync(command, {
    shell: true,
    stdio: 'inherit',
  });
};

export const cliPrint = {
  info: (text: string) => console.log(text),
  warning: (text: string) => console.warn(text), // Orange color
  error: (text: string) => console.error(text),
};
