import { Link } from "react-router-dom";


// resuable component to display list of articles in mutiple places.
// this component accepts articles list as part of props.
const ArticleListComponent = ({articles}) =>{

    return (
        <>
            {articles.map(article =>(
                // to={`/articles/`+article.name} this and below implemetation are same.
                <Link key= {article.name} className="article-list-item" to={`/articles/${article.name}`}>
                    <h3>{article.title}</h3>
                    {/* below line gets article's first paragraph first 150 characters */}
                    <p>{article.content[0].substring(0,150)}...</p> 
                </Link>
            ))}
        </>
        
    )

}
export default ArticleListComponent;