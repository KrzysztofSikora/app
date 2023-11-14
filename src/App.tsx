import React from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";

import ArticleListPage from "./pages/ArticleListPage";
import EditorPage from "./pages/EditorPage";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import LogoutPage from "./pages/LogoutPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ArticlePage from "./pages/ArticlePage";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/editor" element={<ProtectedRoute ><EditorPage/></ProtectedRoute>}/>
                    <Route path="/editor/:slug" element={<ProtectedRoute><EditorPage/></ProtectedRoute>}/>
                    <Route path="/logout" element={<LogoutPage />}/>
                    <Route path="/profile/:username" element={<ProfilePage/>}/>
                    <Route path="/profile/:username/favorites" element={<ProfilePage/>}/>
                    <Route path="/settings" element={<ProtectedRoute><SettingsPage/></ProtectedRoute>}/>
                    <Route path="/:slug" element={<ArticlePage/>}/>
                    <Route path="/login" element={<LoginRegisterPage/>}/>
                    <Route path="/register" element={<LoginRegisterPage/>}/>
                    <Route path="/" element={<ArticleListPage/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
