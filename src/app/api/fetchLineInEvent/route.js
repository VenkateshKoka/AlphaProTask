import fs from 'fs';
import path from 'path';
import readline from "readline";

let lineMapPromises = {}; // Store promises for different files

async function loadJsonData(fileName) {
    const filePath = path.join(process.cwd(), `/src/data/${fileName}.jsonl`);
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    let data = [];
    for await (const line of rl) {
        data.push(JSON.parse(line));
    }
    console.log("-----------------------------------------");
    console.log("reading the JSONL file");
    console.log("-----------------------------------------");
    return data;
    // const fileContent = fs.readFileSync(filePath, 'utf-8');
    // return fileContent.split('\n').map(JSON.parse);
}

async function createLineMap(fileName) {
    const jsonData = await loadJsonData(fileName);
    const map = new Map();
    jsonData.forEach(line => {
        // const data = JSON.parse(line);
        if (line.counter && line.t) {
            map.set(line.counter, line);
        }
    });
    console.log("-----------------------------------------");
    console.log("Creating the HashMap structure");
    console.log("-----------------------------------------");
    return map;
}

export async function GET(request, { params }) {
    const { searchParams } = new URL(request.url)
    const eventId= searchParams.get('eventId');
    const counter= parseInt(searchParams.get('counter'));
    if (!lineMapPromises[eventId]) {
        // Map for this file is not yet being built, so start the process
        lineMapPromises[eventId] = createLineMap(eventId);
    }

    const lineMap = await lineMapPromises[eventId];
    const lineData = lineMap.get(counter) || null;

    if (lineData) {
        return new Response(JSON.stringify(lineData), { status: 200 });
    } else {
        return new Response('Line not found', { status: 404 });
    }
}