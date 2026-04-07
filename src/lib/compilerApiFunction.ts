import axios from "axios";

const COMPILER_API_URL = "https://api.onlinecompiler.io/api/run-code-sync/";
const COMPILER_API_KEY = process.env.Compiler_API_KEY || "";

// Map language IDs to onlinecompiler.io compiler identifiers
const languageIdToCompiler: Record<number, string> = {
    50: "gcc-15",        // C
    54: "g++-15",        // C++
    62: "openjdk-25",    // Java
    93: "typescript-deno", // JavaScript / TypeScript
    71: "python-3.14",   // Python
};

export const runCompilerBatch = async (sourceCode: string, languageId: string | number, testCases: [{ input: string, output: string }]) => {
    try {
        const compiler = languageIdToCompiler[Number(languageId)];
        if (!compiler) {
            return {
                success: false,
                result: `Unsupported language ID: ${languageId}`,
            };
        }

        const results = [];

        for (const tc of testCases) {
            try {
                const response = await axios.post(
                    COMPILER_API_URL,
                    {
                        compiler,
                        code: sourceCode,
                        input: tc.input,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: COMPILER_API_KEY,
                        },
                        timeout: 35000,
                    }
                );

                const data = response.data;
                // API response: { output, error, status, exit_code, signal, time, total, memory }
                const actualOutput = (data.output ?? "").trim();
                const expectedOutput = (tc.output ?? "").trim();
                const hasError = data.status === "error" || data.exit_code !== 0;
                const isCompilationError = hasError && (data.error ?? "").toLowerCase().includes("compil");

                let statusDescription = "Accepted";
                let statusId = 3; // Accepted

                if (isCompilationError) {
                    statusDescription = "Compilation Error";
                    statusId = 6;
                } else if (hasError) {
                    statusDescription = "Runtime Error";
                    statusId = 11;
                } else if (actualOutput !== expectedOutput) {
                    statusDescription = "Wrong Answer";
                    statusId = 4;
                }

                results.push({
                    token: "",
                    status: {
                        id: statusId,
                        description: statusDescription,
                    },
                    stdout: data.output ?? null,
                    stderr: data.error && data.error.length > 0 ? data.error : null,
                    compile_output: isCompilationError ? data.error : null,
                    message: null,
                    time: data.time ?? "0",
                    memory: data.memory ? parseInt(data.memory) : 0,
                });
            } catch (err: any) {
                results.push({
                    token: "",
                    status: {
                        id: 13,
                        description: "Internal Error",
                    },
                    stdout: null,
                    stderr: err.response?.data?.error || err.message,
                    compile_output: null,
                    message: err.message,
                    time: "0",
                    memory: 0,
                });
            }
        }

        return {
            success: true,
            result: results,
        };
    } catch (error: any) {
        console.error("Compiler API error:", error.response?.data || error.message);
        return {
            success: false,
            result: error.response?.data?.error || "Compiler API error",
        };
    }
}
