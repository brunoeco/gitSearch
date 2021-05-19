import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from 'axios';

import styles from '../styles.module.scss';

export default function Favorite(props) {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');

    const [ favorites, setFavorites ] = useState([]);

    useEffect(async () => {
        try {
            await api.get(`http://localhost:3333/favorite/${userId}`)
                .then(response => {
                    setFavorites(response.data);
                })
        }catch(err){
            throw err;
        }
    }, [userId, props.reload])

    function handleLogout(){
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
    }

    return (
        <div className={styles.favorite}>
            <div style={userId ? {display: 'none'} : {}}>
                <span>
                    <h1>GitSearch</h1>
                </span>

                <div className={styles.loginDiv}>
                    <Link to='Register'>
                        Cadastrar
                    </Link>

                    <Link to='Login'>
                        Já possui uma conta?
                    </Link>
                </div>
            </div>

            <div style={userId ? {} : {display: 'none'}}>
                <span>
                    <h1>GitSearch</h1>
                </span>

                

                <div className={styles.favoriteList}>
                    <h2>
                        Favoritos
                    </h2>
                    <div>
                        {favorites.map(favorite => {
                            return (
                                <div className={styles.favoriteItem} key={favorite.id}>
                                    <h2>{favorite.repo_name}</h2>
                                    <p>{favorite.repo_language}</p>
                                    <p>{favorite.repo_description}</p>
                                    <a href={favorite.repo_url}>Acessar</a>
                                </div>
                            )
                        })}
                    </div>
                </div>

                
                <div className={styles.username}>
                    <h3>{username}</h3>
                    <button onClick={handleLogout}>Sair</button>
                </div>
            </div>
        </div>
    )
}