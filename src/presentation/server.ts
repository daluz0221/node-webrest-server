import express from 'express';
import path from 'path';

interface Options {
    port: number;
    public_path: string;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;

    constructor(private options: Options) {
        const { port, public_path } = options;
        this.port = port;
        this.publicPath = public_path;
    }

    async start() {


        //* Middlewares


        //* Public folder
        this.app.use(express.static(this.publicPath));

        //* Routes
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname, `../../${ this.publicPath }/index.html`);
            res.sendFile(indexPath);
            return;
            
        })
        
        this.app.listen(8080, ()=>{
            console.log('Server is running on port 8080');   
        });
        
    }

}