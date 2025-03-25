export type TaskTypeOld = {
    id: string;
    kind: string;
    name: string;
    dueDate: Date;
    dueTime: Date;
    priority: number | null;
    status: string;
};

export type TaskType = {
    id: string;
    kind: string;
    name: string;
    dueDate: Date;
    priority: number;
    status: string;
};