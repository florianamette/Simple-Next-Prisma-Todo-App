// app/api/todos/[id]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const { completed } = await req.json();

        const updatedTodo = await prisma.todo.update({
            where: { id: parseInt(id, 10) },
            data: { completed: Boolean(completed) },
        });
        return NextResponse.json(updatedTodo, { status: 200 });
    } catch (error) {
        console.error(`PUT /api/todos/${params.id} error:`, error);
        return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const deletedTodo = await prisma.todo.delete({
            where: { id: parseInt(id, 10) },
        });
        return NextResponse.json(deletedTodo, { status: 200 });
    } catch (error) {
        console.error(`DELETE /api/todos/${params.id} error:`, error);
        return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
    }
}