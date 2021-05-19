import React, { useState } from 'react';

import styles from '../../../styles.module.scss';

import searchImage from '../../../../../assets/search.png';

export default function Search(props) {
    const [ search, setSearch ] = useState('');
    const [ lang, setLang ] = useState('');
    const [ sort, setSort ] = useState('stars');
    const [ order, setOrder ] = useState('desc');
    const [ page, setPage ] = useState(1);

    const per_page = 20

    function handleSearch(e){
        e.preventDefault();

        if(search === ''){
            alert('Digite a pesquisa!');

            return;
        }

        var searchData = {
            search,
            lang,
            sort,
            order,
            page,
            per_page
        }

        props.onHandleSearch(searchData);
    }

    return (
        <form className={styles.form}>
            <div className={styles.search}>
                <span onClick={handleSearch}>
                    <img src={searchImage} alt='searchImage' />
                </span>

                <input 
                    placeholder='Pesquise repositórios ...'
                    type='search' 
                    name='search' 
                    id='search'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    required
                ></input>

            </div>

            <div className={styles.filter}>
                <label htmlFor='lang'>Linguagem:</label>
                <input 
                    type='lang' 
                    name='lang' 
                    id='lang'
                    value={lang}
                    onChange={e => setLang(e.target.value)}
                ></input>

                <label htmlFor='sort'>Ordenar por:</label>
                <select 
                    type='sort' 
                    name='sort' 
                    id='sort'
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                >
                    <option value='stars'>Estrelas</option>
                    <option value='updated'>Atualização</option>
                </select>
                
                <label htmlFor='order'>Ordem:</label>
                <select 
                    type='order' 
                    name='order' 
                    id='order'
                    value={order}
                    onChange={e => setOrder(e.target.value)}
                >
                    <option value='desc'>Decrescente</option>
                    <option value='asc'>Crescente</option>
                </select>
            </div>
        </form>
    )
}