import { controleLivro } from ".";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
    try{
        if (req.method === 'DELETE') {
            const codigo = Number(req.query.codigo);
            controleLivro.excluir(codigo);
            res.status(200).json({mensagem: 'Livro excluído com sucesso.'});
        } else {
            res.setHeader('Allow', ['DELETE']);
            res.status(405).end(`Método ${req.method} não permitido.`);
        }
    } catch (error) {
        res.status(500).json({mensagem: 'Erro interno do servidor.'});
    }
};