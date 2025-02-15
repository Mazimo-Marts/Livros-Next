import ControleLivro from "@/classes/controle/ControleLivros";
import { NextApiRequest, NextApiResponse } from "next";


export const controleLivro = new ControleLivro

export default (req: NextApiRequest, res: NextApiResponse) => {
    try{
        if (req.method === 'GET') {
            const livros = controleLivro.obterLivros();
            res.status(200).json(livros);
        } else if (req.method === 'POST') {
            const novoLivro = req.body;
            controleLivro.incluir(novoLivro);
            res.status(200).json({mensagem: 'Livro incluído com sucesso.'});
        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Método ${req.method} não permitido.`)
        }
    } catch (error) {
        res.status(500).json({mensagem: 'Erro interno no servidor.'})
    }
}