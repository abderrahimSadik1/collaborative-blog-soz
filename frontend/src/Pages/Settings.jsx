import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function Settings() {
  const [authors, setAuthors] = useState([]);
  const jwt = Cookies.get('jwt');

  useEffect(() => {
    // Fetch authors data from your backend
    const fetchAuthors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auteurs/all', {
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
          }
        });
        setAuthors(response.data);
      } catch (error) {
        console.error('Failed to fetch authors', error);
      }
    };

    fetchAuthors();
  }, []);

  const handleRoleChange = async (index, value) => {
    try {
      const updatedAuthor = authors[index];
      updatedAuthor.role = value;
      await axios.put(`http://localhost:8080/auteurs/${updatedAuthor.idUtilisateur}`, {
        nomComplet: updatedAuthor.nomComplet,
        email: updatedAuthor.email,
        username: updatedAuthor.username,
        role: updatedAuthor.role
      }, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        }
      });
      const response = await axios.get('http://localhost:8080/auteurs/all', {
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        }
      });
      setAuthors(response.data);
      console.log('Role updated successfully');
    } catch (error) {
      console.error('Failed to update role', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/auteurs/${id}`, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        }
      });

      const response = await axios.get('http://localhost:8080/auteurs/all', {
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        }
      });
      setAuthors(response.data);
      console.log('Author deleted successfully');
    } catch (error) {
      console.error('Failed to delete author', error);
    }
  };

  return (
    <div className="bg-base-300 min-h-screen">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-6">Users</h1>
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-left font-bold bg-base-200">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Username</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author, index) => (
                <tr key={author.idUtilisateur} className="">
                  <td className="px-6 py-4">{author.nomComplet}</td>
                  <td className="px-6 py-4">{author.username}</td>
                  <td className="px-6 py-4">{author.email}</td>
                  <td className="px-6 py-4">
                    <select
                      value={author.role}
                      className="border rounded px-3 py-1"
                      onChange={(e) => handleRoleChange(index, e.target.value)}
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleDelete(author.idUtilisateur)}
                      className="text-sm btn btn-error focus:shadow-outline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Settings;
