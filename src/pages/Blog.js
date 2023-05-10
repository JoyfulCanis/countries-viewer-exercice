import React, { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import axios from "axios"
import Articles from '../components/Articles';
const Blog = () => {
    const [blogArticles, setBlogArticles] = useState([]);
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [maClasse, setMaClasse] = useState("red");
    const [error, setError] = useState(false);
    const getData = () =>{
        axios.get("http://localhost:3004/articles")
        .then((articles) => setBlogArticles(articles.data))
        .catch((error) => console.log(error))
    }

    useEffect(() => 
        getData(), [])


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(author.length)
        if (author.length <2) {
            alert("Vous faut indiquer un nom supérieur à 2 caractères.")
        }else{

            if (content.length < 140) {
                setError(true)
            } else { 
                
                axios.post("http://localhost:3004/articles",
                {
                    author: author,
                    //content   =    content: content
                    content,
                    date: Date.now(),
    
                }).catch((error) => console.log(error));
                setError(false);
                setAuthor("");
                setContent("");
                window.location.reload()

            }
        }
        
    };

    return (


        <div className="blog-container">
            <Logo />
            <Navigation />
            <form onSubmit={(e) => handleSubmit(e)}>
                <input 
                type="text" 
                placeholder='Nom'
                onChange={(e) => {
                    setAuthor(e.target.value)
                }}
                value={author}
                />
                <textarea
                    style={{border: error? "1px solid red": "1px solid #61dafb"}}
                    placeholder="Message"
                    onChange={(e) => {
                        setContent(e.target.value)
                        content.length >= 140 ? setMaClasse("green") : setMaClasse("red");
                    }}
                    value={content}
                    ></textarea>


                <input type="submit" value="Envoyer" />
                <span className={maClasse}>{content.length}</span>
                {error ? <p>Veuillez entrer au minimum 140 caractères !</p> : null}

            </form>

            <ul>
                {blogArticles
                .sort((a, b) => b.date - a.date)
                .map((article) =>
                <Articles key={article.id} article={article}/>)}
            </ul>
        </div>


    );
};

export default Blog;