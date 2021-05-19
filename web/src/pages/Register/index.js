import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from 'axios';

import styles from './styles.module.scss';

export default function Register() {
    const [ name, setName ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        if(name === '' || username === '' || password === ''){
            alert('Preencha todos os campos!');
        }

        const data = {
            name,
            username,
            password
        }

        try {
            await api.post('http://localhost:3333/register', data).then(response => {
                alert(response.data.message);
            });

            history.push('/login');

        } catch(err) {
            throw err;
        }
    }

    return (
        <div className={styles.main}>
            <form onSubmit={handleRegister} className={styles.form}>
                <Link to='/'>Voltar</Link>

                <h1>Sign Up</h1>
                <label htmlFor='name'>Nome</label>
                <input 
                    id='name' 
                    name='name' 
                    type='text' 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                
                <label htmlFor='username'>Usuário</label>
                <input 
                    id='username' 
                    name='username' 
                    type='text' 
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    minLength={4}
                    required
                />
                
                <label htmlFor='password'>Senha</label>
                <input 
                    id='password' 
                    name='password' 
                    type='password' 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    minLength={5}
                    required
                />

                <button>Cadastrar</button>
                <Link to='/login'>Fazer login.</Link>
            </form>
        </div>
    )
}