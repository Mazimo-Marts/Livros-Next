import ControleEditora from "@/classes/controle/ControleEditora"
import Livro from "@/classes/modelo/Livros";

const controleEditora = new ControleEditora();


interface LinhaLivroProps {
    livro: Livro;
    excluir: () => void;
}

export const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {

    const {livro, excluir} = props;
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);
    return ( 
        <tr>
            <td>
                <div>
                    <div>
                        {livro.titulo}
                        <br />
                        <button className="btn btn-danger btn-sm mt-2" onClick={excluir}>
                        Excluir
                        </button>
                    </div>
                </div>
            </td>
            <td>{livro.resumo}</td>
            <td>{nomeEditora}</td>
            <td>
                <ul>
                    {livro.autores.map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>
        </tr>
    )
}