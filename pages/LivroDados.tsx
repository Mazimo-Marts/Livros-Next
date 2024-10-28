import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import { Menu } from '../componentes/Menu'
import ControleEditora from '../classes/controle/ControleEditora'
import { useRouter } from 'next/router';

const controleEditora = new ControleEditora();
const baseURL = '/api/livros';

const LivroDados = () => {  
    const [titulo, setTitulo] = useState<string>('');
    const [resumo, setResumo] = useState<string>('');
    const [autores, setAutores] = useState<string>('');
    const [codEditora, setCodEditora] = useState<number>(0);
    const [opcoes, setOpcoes] = useState<{ value: number; text: string }[]>([]);
    const router = useRouter(); 

    useEffect(() => {
        const editoras = controleEditora.getEditoras().map(editora => ({
            value: editora.codEditora,
            text: editora.nome,
        }));
        setOpcoes(editoras);
    }, []);

    const incluirLivro = async (livro: any) => {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(livro),
        });
        return response.ok;
    };

    const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCodEditora(Number(event.target.value));
    };

    const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        const livro = {
            codigo: 0, 
            codEditora,
            titulo,
            resumo,
            autores: autores.split('\n')
        };

        const sucesso = await incluirLivro(livro);
        if (sucesso) {
            router.push('/livrolista?added=true'); 
        } else {
            alert('Erro ao incluir o livro.');
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Adicionar Livro</title>
                <meta name='description' content='Formulário para adicionar livro' />
                <link rel='icon' href='/favicon.ico'/>
            </Head>
    
            <Menu />
    
            <main className={styles.main}>
                <h1>Dados do Livro</h1>
        
                <form onSubmit={incluir}>
                    <div className='mb-3'>
                        <label className='form-label'>Título</label>
                        <input
                        type='text'
                        className='form-control'
                        value={titulo}
                        onChange={(x) => setTitulo(x.target.value)}
                        required
                        />
                    </div>
        
                    <div className='mb-3'>
                        <label className='form-label'>Resumo</label>
                        <textarea className='form-control'
                        rows={3}
                        value={resumo}
                        onChange={(x) => setResumo(x.target.value)}
                        required
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Editora</label>
                        <select
                        className='form-select'
                        value={codEditora}
                        onChange={tratarCombo}
                        >
                        {opcoes.map((editora) => (
                            <option key={editora.value} value={editora.value}>
                            {editora.text}
                            </option>
                        ))}
                        </select>
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Autores (1 por linha)</label>
                        <textarea className='form-control'
                            rows={3}
                            value={autores}
                            onChange={(x) => setAutores(x.target.value)}
                            required
                        />
                    </div>
        
                    <button type='submit' className='btn btn-primary'>
                        Salvar Dados
                    </button>
                </form>
            </main>
        </div>
      );
    };
    
    export default LivroDados;