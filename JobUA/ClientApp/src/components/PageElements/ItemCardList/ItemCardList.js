import React from 'react';
import Spinner from 'reactstrap/lib/Spinner';
import ItemCard from '../ItemCard/ItemCard';
import MainItemCard from '../MainItemCard/MainItemCard';
import './ItemCardList.css';

function ItemCardList(props){

    return(
        props.list ?(
            <>
            <div className="itemCardList">
                {
                    props.isMainPage ?
                    (
                        <>
                            {
                                props.isResumePage ?
                                (
                                    props.list.map((vacancy, index) => {
                                        return (
                                            <MainItemCard key={vacancy.vacancyId} vacancy={vacancy} index={index}/>
                                        )
                                    })
                                )
                                :
                                (
                                    
                                    props.list.map((resume, index) => {
                                        return (
                                            <MainItemCard key={resume.resumeId} resume={resume} index={index}/>
                                        )
                                    })
                                )
                            }
                        </>
                    )
                    :
                    (
                        <>
                            {
                                props.isResumePage ?
                                (
                                    props.list.map((resume, index) => {
                                        return (
                                            <ItemCard key={resume.resumeId} resume={resume} index={index}/>
                                        )
                                    })
                                )
                                :
                                (
                                    props.list.map((vacancy, index) => {
                                        return (
                                            <ItemCard key={vacancy.vacancyId} vacancy={vacancy} index={index}/>
                                        )
                                    })
                                )
                            }
                        </>
                    )
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