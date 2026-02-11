import { SignJWT, importPKCS8 } from "jose";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const alg = "EdDSA";

const kid = process.env.JWT_KID;
const projectId = process.env.JWT_PROJECT_ID;

const privateKeyPemRaw = process.env.JWT_PRIVATE_KEY;
const privateKeyPath = process.env.JWT_PRIVATE_KEY_PATH;

const outFile = process.env.JWT_OUT_FILE || "src/generated/jwt.json";

function normalizePem(pem) {
  // 兼容 .env 中用 \n 写成单行的情况
  return pem.replace(/\\n/g, "\n").trim();
}

async function loadPrivateKeyPem() {
  if (privateKeyPemRaw) return normalizePem(privateKeyPemRaw);
  if (privateKeyPath) return (await readFile(privateKeyPath, "utf8")).trim();
  throw new Error("Missing JWT_PRIVATE_KEY or JWT_PRIVATE_KEY_PATH");
}

(async () => {
  if (!kid) throw new Error("Missing env JWT_KID");
  if (!projectId) throw new Error("Missing env JWT_PROJECT_ID");

  const privateKeyPem = await loadPrivateKeyPem();

  // iat 回拨 30 秒，exp 15 分钟
  const iat = Math.floor(Date.now() / 1000) - 30;
  const exp = iat + 900;

  const header = { alg, kid };
  const payload = { sub: projectId, iat, exp };

  const privateKey = await importPKCS8(privateKeyPem, alg);
  const token = await new SignJWT(payload)
    .setProtectedHeader(header)
    .sign(privateKey);

  const result = {
    token,
    alg,
    kid,
    projectId,
    iat,
    exp,
    iatISO: new Date(iat * 1000).toISOString(),
    expISO: new Date(exp * 1000).toISOString(),
  };

  const absOut = path.resolve(outFile);
  await mkdir(path.dirname(absOut), { recursive: true });
  await writeFile(absOut, JSON.stringify(result, null, 2) + "\n", "utf8");

  console.log(`[gen-jwt] wrote: ${absOut}`);
  console.log(`[gen-jwt] exp: ${result.expISO}`);
})();