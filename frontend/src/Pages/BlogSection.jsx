import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function BlogSection() {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const jwt = Cookies.get('jwt');
  
  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/categories', {
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/articles/all', {
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }
      });
      setArticles(response.data);
    } catch (error) {
      console.error('Failed to fetch articles', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredArticles = articles.filter(article =>
    selectedCategory === null || article.categorie.nomCategorie === selectedCategory
  ).filter(article =>
    article.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.contenu.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-base-200 py-24 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex pr-14">
      <div className='card '> 
      <aside className="w-64 pr-8">
  <h2 className="font-bold text-xl mb-5">Categories</h2>
  <ul>
    {categories.map((category) => (
      <li key={category.idCategorie}>
        <button 
          className={`rounded-md px-3 py-2 ${selectedCategory === category.nomCategorie ? 'bg-base-300' : ''}`} 
          onClick={() => setSelectedCategory(category.nomCategorie)}
        >
          {category.nomCategorie}
        </button>
      </li>
    ))}
  </ul>
</aside>
</div>
        <main className="flex-grow">
          <form className="w-full mx-auto flex">
            <div className="relative flex-grow">
              <input 
                type="search" 
                id="default-search" 
                className="w-full input input-bordered flex items-center gap-2 p-4 pl-10 text-sm  mb-16" 
                placeholder="Search For ..." 
                onChange={handleSearchChange}
              />
              
            </div>
          </form>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-16">From the Blog</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
  <div key={article.idArticle} className="card  bg-base-300 shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="card-body">
      <header className="flex items-center text-sm font-light">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rotate-90 -ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
        </svg>
        <time dateTime={article.datePublication}>
          {new Date(article.datePublication).toLocaleDateString()}
        </time>
        <span className="ml-auto">{article.categorie.nomCategorie}</span>
      </header>
      <h3 className="font-bold text-2xl mt-2">
        <Link to={`/article/${article.idArticle}`} className="hover:underline">
          {article.titre}
        </Link>
      </h3>
      <p className="font-light mt-4 line-clamp-3">
        {article.contenu}
      </p>
    </div>
    <div className="card-actions justify-end">
      <Link to={`/article/${article.idArticle}`} className="btn btn-outline btn-accent mr-3 mb-3 ">
        Read More
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  </div>
))}
          </div>
        </main>
      </div>
    </div>
  );
}
