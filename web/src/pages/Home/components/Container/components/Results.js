import React, { useState } from 'react';

import api from 'axios';

import styles from '../../../styles.module.scss';

import favoriteImage from '../../../../../assets/favorite.png';

export default function Result({ search, results, reloadFavorites, onHandleSearch }) {
    async function handleSave(name, language, description, html_url){
        const data = {
            name,
            language,
            description,
            html_url,
            username: localStorage.getItem('username')
        }

        try {
            await api.post('http://localhost:3333/favorite/', data).then(response => {
                if(response.data.message){
                    alert(response.data.message);
                }
            })

            reloadFavorites();

        }catch(err){
            throw err
        }
    };

    function handleSearch(value){
        var searchData = search;

        searchData.page = Number(searchData.page) + value;

        onHandleSearch(searchData);
    }

    return (
        <div className={styles.results}>
            <div style={search.page ? {} : {display: 'none'}}>
                <span>Página ({search.page}/100)</span>

                <div className={styles.loadPage}>
                    <span className={styles.pageButton} style={search.page == 1 ? {pointerEvents: 'none'} : {}} onClick={() => handleSearch(-1)}>Voltar</span>
                    <span className={styles.pageButton} style={search.page == 100 ? {pointerEvents: 'none'} : {}} onClick={() => handleSearch(1)}>Próx</span>
                </div>
            </div>

            {results.map(result => {
                return (
                    <div key={result.id} className={styles.result}>
                        <h2>{result.name}</h2>
                        <p>{result.language}</p>

                        <p>{result.description ? result.description.slice(0, 200) : ''}...</p>

                        <span className={styles.searchImage}>
                            <img src={result.owner.avatar_url} alt='avatar' />
                        </span>

                        <a href={result.html_url} target='_blank'>Acessar</a>

                        <span className={styles.favoriteImage}>
                            <img onClick={() => handleSave(result.name, result.language, result.description, result.html_url)} src={favoriteImage} alt='favorite' />
                        </span>
                    </div>
                )
            })}
        </div>
    )
}