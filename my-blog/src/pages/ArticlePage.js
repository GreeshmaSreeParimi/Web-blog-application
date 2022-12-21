import articles from "./article-content";
import { useParams } from "react-router-dom";
import NotfountPage from "./NotFoundPage";

const ArticlePage = () => {
    const params = useParams();
    const articleId = params.articleId;
    // const {articleId} = useParams(); equals to abve two lines of code . Object destructring

    const article = articles.find(article => article.name === articleId);

    if(!article){
        return <NotfountPage/> 
    }

    // react fragment --- <></> --> empty tags to display two or more tags at same time.
    return (
        <>
            <h1>{article.title}</h1>
            {article.content.map((paragraph,index) => (
                <p key ={index}>{paragraph}</p>
            ))}
        </>
    

    );

}

export default ArticlePage;