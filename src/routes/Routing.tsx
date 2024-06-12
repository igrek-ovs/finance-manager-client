import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SingInForm from "../components/auth/SingInForm";
import AboutProjectForm from "../components/AboutProjectForm";
import { MyGroupsForm } from "../components/MyGroupsForm";
import SingUpForm from "../components/auth/SingUpForm";
import GroupMainForm from "../components/GroupMainForm";
import CategoriesForm from "../components/CategoriesForm";

const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<SingInForm />} />
                <Route path="/register" element={<SingUpForm />} />
                <Route path="/about" element={<AboutProjectForm />} />
                <Route path="/mygroups" element={<MyGroupsForm />} />
                <Route path="/group/:id" element={<GroupMainForm />} />
                <Route path="/categories" element={<CategoriesForm />} />
            </Routes>
        </Router>
    );
}

export default Routing;
