import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';

const UpdateArticle = () => {
    const { id } = useParams();
    const [titre, setTitre] = useState('');
    const [username, setUsername] = useState('');
    const [auteurs, setAuteurs] = useState([]);
    const wysiwygRef = useRef(null);

    useEffect(() => {
        fetchArticleDetails();
    }, []);

    const fetchArticleDetails = async () => {
        try {
            const jwt = Cookies.get('jwt');
            const response = await axios.get(`http://localhost:8080/articles/${id}`, {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            });
            const { titre, contenu, auteurs } = response.data;
            setTitre(titre);
            setAuteurs(auteurs);
            if (wysiwygRef.current) {
                const doc = wysiwygRef.current.contentDocument;
                doc.designMode = "on";
                doc.body.innerHTML = contenu;
            }
        } catch (error) {
            console.error('Failed to fetch article details:', error);
        }
    };

    const format = (cmd, param) => {
        wysiwygRef.current.contentDocument.execCommand(cmd, false, param || null);
    };

    const handleAddAuteur = async () => {
        try {
            const jwt = Cookies.get('jwt');
            console.log(username);
            const response = await axios.get(`http://localhost:8080/auteurs/${username}`, {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            });

            const idUtilisateur = response.data.idUtilisateur;
            await axios.get(`http://localhost:8080/articles/add/${id}/${idUtilisateur}`, {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            });
            fetchArticleDetails();
            setUsername('');
        } catch (error) {
            console.error('Failed to add auteur:', error);
            alert('Failed to add auteur. Please try again.');
        }
    };

    const handleSubmit = async () => {
        const contenu = wysiwygRef.current.contentDocument.body.innerHTML;
        const jwt = Cookies.get('jwt');

        try {
            await axios.put(`http://localhost:8080/articles/${id}`, {
                titre,
                contenu,
            }, {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            });

            alert('Article updated successfully!');
        } catch (error) {
            console.error('Failed to update article:', error);
            alert('Failed to update article. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-w-screen min-h-screen bg-base-200 px-5 py-5">
            <div className="w-full max-w-6xl mx-auto rounded-xl bg-white shadow-lg p-5 text-black">
                <input type="text" placeholder="Enter Article Title" value={titre} onChange={(e) => setTitre(e.target.value)} className="w-full mb-4 px-3 py-2 border rounded bg-white" />
                <div className="border border-gray-200 overflow-hidden rounded-md">
                    <div className="w-full flex border-b border-gray-200 text-xl text-gray-600">
                        <button className="toolbar-button" onClick={() => format('bold')}>
                            <i className="mdi mdi-format-bold"></i>
                        </button>
                        <button className="toolbar-button" onClick={() => format('italic')}>
                            <i className="mdi mdi-format-italic"></i>
                        </button>
                    </div>
                    <iframe ref={wysiwygRef} className="w-full h-96 overflow-y-auto"></iframe>
                </div>
                <button onClick={handleSubmit} className="mt-4 btn btn-accent">
                    Update Article
                </button>
            </div>

            <div className="w-full max-w-6xl mx-auto rounded-xl bg-white shadow-lg p-5 mt-5 text-black">
                <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full mb-4 px-3 py-2 border rounded bg-white" />
                <button onClick={handleAddAuteur} className="btn btn-accent">
                    Add Auteur
                </button>
            </div>

            <div className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                {auteurs.map(auteur => (
                    <div key={auteur.id} className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src="https://picsum.photos/200" alt={auteur.username} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {auteur.nomComplet}
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {auteur.username}
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                {/* Render whatever data you want here */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpdateArticle;
