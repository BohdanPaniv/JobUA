import React from 'react';
import Spinner from 'reactstrap/lib/Spinner';
import ItemCard from '../ItemCard/ItemCard';
import './ItemCardList.css';

function ItemCardList({resumeList}){

    return(
        resumeList ?(
            <>
            <div className="itemCardList">
                {
                    resumeList.map((resume, index) => {
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