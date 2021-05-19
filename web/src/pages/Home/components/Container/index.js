import React, { useState } from 'react';

import api from 'axios';

import Search from './components/Search';
import Result from './components/Results';

import styles from '../../styles.module.scss';

export default function Container(props) {
    const [ searchData, setSearchData ] = useState({});
    const [ results, setResults ] = useState([]);

    async function handleSearch(data) {
        var q;
        
        if(data.lang !== ''){
            q = data.search + 'language:' + data.lang;
        }else{
            q = data.search;
        }

        console.log(q)

        await api.get('https://api.github.com/search/repositories', {
            headers: {
                Accept: 'application/vnd.github.v3+json',
            },

            params: {
                q,
                sort: data.sort,
                order: data.order,
                per_page: data.per_page,
                page: data.page
            }
        }).then(response => {
            setResults(response.data.items);
            setSearchData(data);
        })

    }

    return (
        <div className={styles.container}> 
            <Search 
                onHandleSearch={(data) => {handleSearch(data)}} 
            />
            <Result 
                onHandleSearch={(data) => {handleSearch(data)}}
                search={searchData}
                results={results} 
                reloadFavorites={props.handleReload}
            />
        </div>
    )
}
