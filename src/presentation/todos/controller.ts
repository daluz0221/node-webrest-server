import { Request, Response } from "express"


const todos = [
    { id: 1, text: 'Buy milk', createdAt: new Date() },
    { id: 2, text: 'Buy eggs', createdAt: null },
    { id: 3, text: 'Buy bread', createdAt: new Date() },
]


export class TodosController {


    // Dependency Injection
    constructor() {

    }

    public getTodos = (req: Request, res: Response) => {
        return res.json( todos )
    }

    public getTodoById = (req: Request, res: Response) => {
        const id  = +req.params.id
        
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid id, must be a number' })
        }
        const todo = todos.find( todo => todo.id === id )
        if ( !todo ) {
            return res.status(404).json({ message: 'Todo not found' })
        }

        return res.status(200).json( todo )
    }

    public createTodo = (req: Request, res: Response) => {
        
        const {text} = req.body
        if ( !text ) {
            return res.status(400).json({ message: 'Text is required' })
        }

        const newTodo = { id: todos.length + 1, text, createdAt: new Date() }
        todos.push( newTodo )

        res.status(201).json( newTodo )
    };

    public updateTodo = (req: Request, res: Response) => {

        const id = +req.params.id
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid id, must be a number' })
        }

        const todo = todos.find( todo => todo.id === id );
        if ( !todo ) {
            return res.status(404).json({ message: 'Todo not found' })
        }

        const { text, createdAt } = req.body;
     

        todo.text = text || todo.text;
        ( createdAt === 'null' ) ? todo.createdAt = null : todo.createdAt = new Date(createdAt || todo.createdAt );
        // OJO, referencia
        res.json( todo )
    };

    public deleteTodo = (req: Request, res: Response) => {

        const id = +req.params.id
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid id, must be a number' })
        }

        const todo = todos.find( todo => todo.id === id );
        if ( !todo ) {
            return res.status(404).json({ message: 'Todo not found' })
        }

        const index = todos.indexOf( todo );
        todos.splice( index, 1 );

        res.json( todo )
    };

}