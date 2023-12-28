#!/usr/bin/env node
import { sync } from ".";

async function main() {
  try {
    const name = process.argv0;
    await sync(name);

    console.log(`[npmmirror-sync] Sync triggered for package ${name}.`);
  } catch (error) {
    console.error(error);
  }
}

main();
