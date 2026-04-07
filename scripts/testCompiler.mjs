const API_URL = "https://api.onlinecompiler.io/api/run-code-sync/";
const API_KEY = "fc6a1256935d6d33ad4d0d4e1cc7c5c1";

const tests = [
  {
    name: "Python",
    compiler: "python-3.14",
    code: 'a, b = map(int, input().split())\nprint(a + b)',
    input: "2 3",
    expected: "5",
  },
  {
    name: "C",
    compiler: "gcc-15",
    code: '#include <stdio.h>\nint main(){int a,b;scanf("%d %d",&a,&b);printf("%d",a+b);return 0;}',
    input: "2 3",
    expected: "5",
  },
  {
    name: "C++",
    compiler: "g++-15",
    code: '#include <iostream>\nusing namespace std;\nint main(){int a,b;cin>>a>>b;cout<<a+b;return 0;}',
    input: "2 3",
    expected: "5",
  },
  {
    name: "Java",
    compiler: "openjdk-25",
    code: 'import java.util.Scanner;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    System.out.println(sc.nextInt() + sc.nextInt());\n  }\n}',
    input: "2 3",
    expected: "5",
  },
  {
    name: "JavaScript (Deno)",
    compiler: "typescript-deno",
    code: 'const buf = new Uint8Array(1024);\nconst n = Deno.stdin.readSync(buf);\nconst input = new TextDecoder().decode(buf.subarray(0, n)).trim();\nconst [a, b] = input.split(" ").map(Number);\nconsole.log(a + b);',
    input: "2 3",
    expected: "5",
  },
];

async function runTest(test) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY,
      },
      body: JSON.stringify({
        compiler: test.compiler,
        code: test.code,
        input: test.input,
      }),
    });
    const data = await res.json();
    const output = (data.output || "").trim();
    const pass = output === test.expected;
    console.log(
      `${pass ? "✅" : "❌"} ${test.name} (${test.compiler}): output=${JSON.stringify(output)} expected=${JSON.stringify(test.expected)} status=${data.status} time=${data.time}s`
    );
    if (data.error) console.log(`   error: ${data.error}`);
  } catch (err) {
    console.log(`❌ ${test.name}: FETCH ERROR - ${err.message}`);
  }
}

console.log("Testing OnlineCompiler.io API with all 5 languages...\n");
for (const test of tests) {
  await runTest(test);
}
console.log("\nDone.");
