import React, { useState } from 'react';
import axios from 'axios';
import { DeleteMoviesRequest } from '../types';

const DeleteMovies: React.FC = () => {
    const [eidrCodes, setEidrCodes] = useState<string[]>([]);

    const handleDelete = () => {
        axios.delete('/api/movie/delete-movies', { data: { eidrCodes } })
            .then(response => {
                console.log('Movies deleted:', response.data);
            })
            .catch(error => {
                console.error('Error deleting movies:', error);
            });
    };

    return (
        <div>
            <h1>Delete Movies</h1>
            <input
                type="text"
                value={eidrCodes.join(',')}
                onChange={e => setEidrCodes(e.target.value.split(','))}
                placeholder="Enter eidrCodes separated by comma"
            />
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default DeleteMovies;
