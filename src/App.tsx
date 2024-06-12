import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MovieList from './components/MovieList';
import CreateMovie from './components/CreateMovie';
import EditMovie from "./components/EditMovie";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MovieList/>}/>
                <Route path="/create-movie" element={<CreateMovie/>}/> {}
                <Route path="/edit/:eidrCode" element={<EditMovie/>}/>
            </Routes>
        </Router>
    );
}

export default App;