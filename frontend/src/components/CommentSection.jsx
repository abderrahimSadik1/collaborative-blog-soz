import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function CommentSection({ articleId }) {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    useEffect(() => {
        fetchComments();
    }, [articleId]);  // Ensure to include articleId as a dependency

    const fetchComments = async () => {
        if (!articleId) {
            return;
        }
        try {
            const jwt = Cookies.get('jwt');
            const response = await axios.get(`http://localhost:8080/comments/article/${articleId}`, {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            });
            setComments(response.data);
        } catch (error) {
            console.error('Failed to fetch comments:', error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        const jwt = Cookies.get('jwt');
        try {
            const response = await axios.post('http://localhost:8080/comments', {
                contenu: commentText,
                article: { idArticle: articleId },
                // Removed the replyTo reference
            }, {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            });
            setComments([...comments, response.data]);
            setCommentText("");
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <section className="bg-white dark:bg-base-300 py-8 lg:py-16 antialiased">
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                        Discussion ({comments.length})
                    </h2>
                </div>
                <form className="mb-6" onSubmit={handleCommentSubmit}>
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <label htmlFor="comment" className="sr-only">Your comment</label>
                        <textarea id="comment" rows="6"
                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                            placeholder="Write a comment..."
                            value={commentText}
                            onChange={e => setCommentText(e.target.value)}
                            required></textarea>
                    </div>
                    <button type="submit"
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Post comment
                    </button>
                </form>
                {comments.map(comment => (
                    <article key={comment.id} className="p-6 text-base bg-white rounded-lg dark:bg-gray-900 mb-4">
                        <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                    <img className="mr-2 w-6 h-6 rounded-full" src="https://picsum.photos/200" alt="Profile"/>
                                    {comment.auteur?.nomComplet}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <time dateTime={comment.date} title={new Date(comment.date).toLocaleDateString()}>
                                        {new Date(comment.date).toLocaleDateString()}
                                    </time>
                                </p>
                            </div>
                            {/* Removed the reply button */}
                        </footer>
                        <p className="text-gray-500 dark:text-gray-400">{comment.contenu}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default CommentSection;
