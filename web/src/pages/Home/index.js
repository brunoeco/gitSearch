import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';

import Favorite from './components/Favorite';
import Container from './components/Container';


export default function Home() {
    const [ reload, setReload ] = useState();

    function reloadFavorites(){
        setReload('recarregando...');
    }

    return (
        <div className={styles.main}>
            <Favorite reload={reload} />
            <Container handleReload={reloadFavorites} />
        </div>
    )
}