export interface ShellResult {
	exitCode: number;
	stdout: string;
	stderr: string;
}

export async function runShell(cmd: string, args: string[], cwd: string): Promise<ShellResult> {
	const proc = Bun.spawn({ cmd: [cmd, ...args], cwd, stdout: "pipe", stderr: "pipe" });
	const stdout = await new Response(proc.stdout).text();
	const stderr = await new Response(proc.stderr).text();
	await proc.exited;
	return { exitCode: proc.exitCode ?? -1, stdout, stderr };
}
