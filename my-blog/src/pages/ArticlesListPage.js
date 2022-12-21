import articles from "./article-content";
import ArticleListComponent from "../components/ArticleListComponent";

const ArticleListPage = () => {

    return (
        <>
            <h1>Articles</h1>
            <ArticleListComponent articles={articles}></ArticleListComponent>
        </>
    
    );

}

export default ArticleListPage;