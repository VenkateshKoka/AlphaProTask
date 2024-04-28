import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(request) {
    // const jsonDirectory = path.join(process.cwd(), 'data');
    try {
        const fileContents = await fs.readFile(process.cwd() + '/src/data/events.json', 'utf8');
        const eventsData = JSON.parse(fileContents);
        return NextResponse.json(eventsData);
    } catch (e) {
        return NextResponse.json({
            success: false,
            data: "koka ----jaffa"
        })
    }
}