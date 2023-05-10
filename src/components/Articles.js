import React, { useState } from 'react';
import axios from "axios"
const Articles = ({ article }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState("");

    const handleDelete = () => {

        axios.delete('http://localhost:3004/articles/' + article.id)
        window.location.reload()
    }

    const handleEditing = () => {
        const data = {
            author: article.author,
            content: editedContent ? editedContent : article.content,
            date: article.date,
            updatedDate: Date.now(),

        }
        axios.put('http://localhost:3004/articles/' + article.id, data)
        .then(() =>{setIsEditing(false);})
        .catch((error) => console.log(error))
        
    } 


    const dateFormater = (date) => {
        let newDate = new Date(date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        });
        return newDate;


    }
    return (
        <article className="article" style={{background:isEditing?"#1e90ff":"white"}}>
            <div className='card-header'>
                <h3>{article.author}</h3>
                <em>Posté le {dateFormater(article.date)}</em>
            </div>

            {
                isEditing ?
                    <textarea
                    defaultValue={editedContent? editedContent:article.content}
                    onChange={(e) => setEditedContent(e.target.value)}
                    autoFocus
                    ></textarea>
                    : <p>{editedContent? editedContent:article.content}</p>}
            <div className='btn-container'>
                {
                    isEditing ?
                        <button onClick={() => {
                            handleEditing()

                        }
                        }
                        >Valider</button>
                        : <button
                        style={{background:"#61dafb", color:"black" }}
                        onClick={() => setIsEditing(true)}>Edit</button>
                }

                <button 
                style={{background:"#f00020", color:"white"}}
                onClick={
                    () => {
                        if (window.confirm("Voulez-vous vraiment supprimer cet article ?")){
                        handleDelete()}
                    }

                }>Supprimer</button>
            </div>
        </article>
    );
};

export default Articles;