class Note {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number, title: string, content: string, createdAt: Date,updatedAt: Date) {
        this.id = id;
        this.title = title;
        this.description = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export default Note;