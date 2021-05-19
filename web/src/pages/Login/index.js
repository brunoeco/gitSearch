import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from 'axios';

import styles from './styles.module.scss';

export default function Login() {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        const data = {
            username,
            password
        }

        try {
            await api.post('http://localhost:3333/login', data).then(response => {
                localStorage.setItem('userId', response.data.id);
                localStorage.setItem('username', response.data.username);
            })

            history.push('/');
            
        } catch(err) {
            throw err;
        }
    }

    return (
        <div className={styles.main}>
            <form onSubmit={handleLogin} className={styles.form}>
                <Link to='/'>Voltar</Link>

                <h1>Sign In</h1>
                <label htmlFor='username'>Usuário</label>
                <input 
                    id='username' 
                    name='username' 
                    type='text' 
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                
                <label htmlFor='password'>Senha</label>
                <input 
                    id='password' 
                    name='password' 
                    type='password' 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <button>Entrar</button>
                <Link to='/register'>Fazer cadastro</Link>
            </form>
        </div>
    )
}