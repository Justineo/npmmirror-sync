import https from "node:https";

export async function sync(name: string): Promise<void> {
  const options = {
    hostname: "registry-direct.npmmirror.com",
    path: `/-/package/${name}/syncs`,
    method: "PUT",
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let output = "";

      res.setEncoding("utf8");

      res.on("data", (chunk: string) => {
        output += chunk;
      });

      res.on("end", () => {
        try {
          const data = JSON.parse(output.trim());

          if (data.ok === true) {
            resolve();
          } else {
            reject(
              new Error(
                [data.error, data.reason].filter(Boolean).join("\n") ||
                  "unknown error"
              )
            );
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on("error", (e) => {
      reject(e);
    });

    req.end();
  });
}
