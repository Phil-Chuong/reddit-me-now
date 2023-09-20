import React from 'react';
import './Card.css';

function Card() {
    return(
        <article>
            <div className='card-parent-container'>
                <div className='post-title'>
                    <h2 >Title of Feed goes here!</h2>
                </div>
                <div className='post-img'>
                    <img src="https://images.hdqwalls.com/wallpapers/supergirl-flying-in-space-by.jpg" alt='supergirl'/>
                </div>
                <div className='likes-comments'>  
                    <p>Likes & comments goes here!!</p>                 
                </div>
                <div className='post-details'>
                    <p>Post details goes here!!</p>
                </div>  
            </div>             
        </article>
    )
};

export default Card;