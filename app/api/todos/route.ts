// app/api/todos/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const todos = await prisma.todo.findMany();
        return NextResponse.json(todos, { status: 200 });
    } catch (error) {
        console.error('GET /api/todos error:', error);
        return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { text } = await req.json();
        if (!text) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }
        const newTodo = await prisma.todo.create({
            data: { text },
        });
        return NextResponse.json(newTodo, { status: 201 });
    } catch (error) {
        console.error('POST /api/todos error:', error);
        return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
    }
}