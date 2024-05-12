import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


const CreateArticle = () => {
    const [titre, setTitre] = useState('');  
    const wysiwygRef = useRef(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    // eslint-disable-next-line no-unused-vars
    const [selectedAuteurs, setSelectedAuteurs] = useState([]);
    useEffect(() => {
        fetchCategories();
        if (wysiwygRef.current) {
            const doc = wysiwygRef.current.contentDocument;
            doc.designMode = "on";
            doc.open();
            doc.writeln(`
                <style>
                    *, ::after, ::before {box-sizing: border-box;}
                    :root {tab-size: 4;}
                    html {line-height: 1.15; text-size-adjust: 100%;}
                    body {margin: 0px; padding: 1rem 0.5rem; font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";}
                </style>
                <p>Write with your imagination.</p>
            `);
            doc.close();
        }

    }, []);



    const fetchCategories = async () => {
        try {
            const jwt = Cookies.get('jwt');
            const response = await axios.get('http://localhost:8080/categories', {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            });
            setCategories(response.data); // Assuming the response data is an array of categories
            if (response.data.length > 0) {
                setSelectedCategory(response.data[0].id); // Set default selected category
            }
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };




    const handleSubmit = async () => {
        let contenu = wysiwygRef.current.contentDocument.body.innerHTML; 

    // Remove all <p> and </p> tags from contenu
    contenu = contenu.replace(/<\/?p>/g, '');

    const jwt = Cookies.get('jwt');
    try {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.post('http://localhost:8080/articles/new', {
            titre, 
            contenu,
            categorie:{
                idCategorie: selectedCategory
            },
            auteurs: selectedAuteurs
        }, {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        });
        
        alert('Article created successfully!');
        setTitre(''); 
        wysiwygRef.current.contentDocument.body.innerHTML = '<p>Write something new...</p>';
    } catch (error) {
        console.error('Failed to create article:', error);
        alert('Failed to create article. Please try again.');
    }
};
    return (
        <>
        <div className="flex flex-col items-center justify-center min-w-screen min-h-screen bg-base-200 px-5 py-5">
        <div>
        <select value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)} className="select w-full max-w-xs rounded-xl justify-center mb-11 ">
            <option disabled selected>Choose Categorie</option>
            {categories.map((category) => (
            <option key={category.idCategorie} value={category.idCategorie}>
            {category.nomCategorie}
            </option>
                        ))}
        </select>
        </div>
                <div className="w-full max-w-6xl mx-auto rounded-xl bg-white shadow-lg p-5 text-black">
                    <input
                        type="text"
                        placeholder="Enter Article Title"
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
                        className="w-full mb-4 px-3 py-2 border rounded bg-white" />
                    <div className="border border-gray-200 overflow-hidden rounded-md">
                        <div className="w-full">
                            <iframe ref={wysiwygRef} className="w-full h-96 overflow-y-auto"></iframe>
                        </div>
                    </div>
                    <button onClick={handleSubmit} className="mt-4 btn btn-accent">
                        Submit Article
                    </button>
                </div>
            </div></>
    );
};

export default CreateArticle;
