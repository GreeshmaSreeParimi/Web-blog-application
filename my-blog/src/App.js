import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticlesListPage';
import ArticlePage from './pages/ArticlePage';
import NavBar from './NavBar';
import NotfountPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar></NavBar>
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/about" element={<AboutPage/>}></Route>
            <Route path="/articles" element={<ArticleListPage/>}></Route>
            <Route path="/articles/:articleId" element={<ArticlePage/>}></Route>

            {/* path="*" indicates if user hits any route that does not exists routes , the application will be redirected to this page */}
            <Route path="*" element={<NotfountPage/>}></Route>

          </Routes>
        </div>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
