import { controleEditora } from ".";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'GET') {
            const codEditora = Number(req.query.codEditora);

            const nomeEditora = controleEditora.getNomeEditora(codEditora);

            if (nomeEditora) {
                res.status(200).json({nome: nomeEditora});
            } 
        } else {
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Método ${req.method} não permitido.`);
        };         
    } catch (error) {
        res.status(500).json({mesagem: 'Erro interno do servidor.'});
    }
};