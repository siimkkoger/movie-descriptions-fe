import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import CreateMovie from './components/CreateMovie';
import UpdateMovie from './components/UpdateMovie';
import DeleteMovies from './components/DeleteMovies';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MovieList />} />
                <Route path="/create-movie" element={<CreateMovie />} />
                <Route path="/update-movie/:eidrCode" element={<UpdateMovie />} />
                <Route path="/delete-movies" element={<DeleteMovies />} />
            </Routes>
        </Router>
    );
}

export default App;