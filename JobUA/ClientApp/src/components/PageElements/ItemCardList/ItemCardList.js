import React from 'react';
import Spinner from 'reactstrap/lib/Spinner';
import ItemCard from '../ItemCard/ItemCard';
import './ItemCardList.css';

function ItemCardList({list}){

    return(
        list ?(
            <>
            <div className="itemCardList">
                {
                    list.map((resume, index) => {
                        return (
                            <ItemCard key={resume.resumeId} resume={resume} index={index}/>
                        )
                    })
                }
            </div>
        </>
        )
        :
        (
            <Spinner></Spinner>
        )
    );
}

export default ItemCardList;