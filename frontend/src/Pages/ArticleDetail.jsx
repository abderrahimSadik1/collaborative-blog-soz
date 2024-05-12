import { useState,useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './../api/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';


function ArticleDetail() {
  const { isAdmin } = useContext(AuthContext);
  const [article, setArticle] = useState(null);
  const { id } = useParams(); 
  const navigate = useNavigate();
  const user = Cookies.get('user');

  useEffect(() => {
    
    const fetchArticle = async () => {
      try {
        const jwt = Cookies.get('jwt');
        const response = await axios.get(`http://localhost:8080/articles/${id}`,{
          headers: {
              'Authorization': `Bearer ${jwt}`,
              'Content-Type': 'application/json'
          }
        });
        setArticle(response.data);
      } catch (error) {
        console.error('Failed to fetch article', error);
      }
    };

    fetchArticle();
  }, [id]);

  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        const jwt = Cookies.get('jwt');
        // eslint-disable-next-line no-unused-vars
        const response = await axios.delete(`http://localhost:8080/articles/${id}`, {
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
          }
        });
        navigate('/');
      } catch (error) {
        console.error('Failed to delete article', error);
      }
    }
  };

  if (!article) {
    return <div className="flex justify-center items-center h-screen">
      <div className="text-lg">Loading...</div>
    </div>;
  }


  const isAuthor = article.auteurs.some(auteur => auteur.username === user);

  return (
    <>
      <div className="bg-base-200 flex flex-col items-center justify-center py-10">
        <div className="card w-full lg:w-2/3 bg-base-100 shadow-xl image-full">
          <div className="card-body">
            <h2 className="card-title text-4xl">{article.titre}</h2>
            <p className="text-sm text-gray-500">{new Date(article.datePublication).toLocaleDateString()}</p>
            {article.auteurs && (
              <p className="font-bold text-lg">
                By {article.auteurs.map(auteur => auteur.nomComplet).join(', ')}
              </p>
            )}
            <p>{article.contenu}</p>
          </div>
        </div>
        <div className="flex mt-6">
          {(isAdmin || isAuthor)  && (
            <>
              <Link to={`/UpdateArticle/${id}`} className="bg-green-600 text-white font-semibold py-2 px-5 text-sm mr-4 inline-flex items-center group">
                Update
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-2 delay-100 duration-200 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <button onClick={handleDelete} className="bg-red-600 text-white font-semibold py-2 px-5 text-sm inline-flex items-center group">
                Delete
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-2 delay-100 duration-200 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
      <CommentSection articleId={id} />
    </>
  );
}

export default ArticleDetail;
