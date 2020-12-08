export class Comments {
    comentario_padre?: string;
    fecha: Date;
    userId: string;
    noticia: string;
    comentario:string;
    comentarioId?: string;
}

export class CommentsTreeNode {
    fecha: Date;
    userId: string;
    noticia: string;
    comentario:string;
    comentarioId?: string;
    children: CommentsTreeNode[];
}

