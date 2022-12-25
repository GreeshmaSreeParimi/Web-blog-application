import articles from "./article-content";
import { useParams } from "react-router-dom";
import NotfountPage from "./NotFoundPage";
import { useState, useEffect } from "react";
import axios from "axios";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";

const ArticlePage = () => {

    const [articleInfo,setArticleInfo] = useState({upvotes:0,comments :[]});
    const params = useParams();
    const articleId = params.articleId; // const {articleId} = useParams(); equals to abve two lines of code . Object destructring

    useEffect(()=>{
        const loadArticleInfo = async function(){
            // As http://localhost:8000 this is added to proxy in package.json. we can just make a call with end API
            const response = await axios.get(`/api/articles/${articleId}`);
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        }
        loadArticleInfo();
    },[]); // [] indicates array of elements. if anyone of the element changes use effect will be called again. 

    const article = articles.find(article => article.name === articleId);

    const addUpvote = async () => {
        const response = await axios.put(`/api/articles/${articleId}/upvote`);
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    }

   

    if(!article){
        return <NotfountPage/> 
    }

    // react fragment --- <></> --> empty tags to display two or more tags at same time.
    return (
        <>
            <h1>{article.title}</h1>
            <div className="upvotes-section">
                <button onClick={addUpvote}>Upvote</button>
                <p>This article has {articleInfo.upvotes} upvote(s)</p>
            </div>
            {article.content.map((paragraph,index) => (
                <p key ={index}>{paragraph}</p>
            ))}
            <AddCommentForm articleName={articleId} onArticleUpdated={(updatedArticle)=>{setArticleInfo(updatedArticle)}}></AddCommentForm>
            <CommentsList comments={articleInfo.comments}></CommentsList>
            
        </>
    

    );

}

export default ArticlePage;