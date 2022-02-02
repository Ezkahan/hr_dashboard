import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Login from "../pages/Auth/Login";
import Companies from "../pages/Companies/Companies";
import CreateCompany from "../pages/Companies/CreateCompany";
import EditCompany from "../pages/Companies/EditCompany";
import ShowCompany from "../pages/Companies/ShowCompany";
import Dashboard from "../pages/Dashboard/Dashboard";
import Education from "../pages/Education/Education";
import Employees from "../pages/Employees/Employees";
import Areas from "../pages/Location/Area/Areas";
import Countries from "../pages/Location/Country/Countries";
import Location from "../pages/Location/Location";
import Towns from "../pages/Location/Town/Towns";
import Addresses from "../pages/Location/Address/Addresses";
import People from "../pages/People/People";
import Schools from "../pages/Schools/Schools";
import Settings from "../pages/Settings/Settings";
import Skills from "../pages/Skills/Skills";
import Vacancies from "../pages/Vacancies/Vacancies";

import Chat from "../pages/Dashboard/Chat";
import AddPerson from "../pages/People/AddPerson";
import EditPerson from "../pages/People/EditPerson";

const WebRoutes = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/company/create" element={<CreateCompany />} />
        <Route path="/company/:id/edit" element={<EditCompany />} />
        <Route path="/company/:id" element={<ShowCompany />} />
        <Route path="/vacancies" element={<Vacancies />} />
        <Route path="/people" element={<People />} />
        <Route path="/person/add" element={<AddPerson />} />
        <Route path="/person/:id/edit" element={<EditPerson />} />
        <Route path="/education" element={<Education />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/location" element={<Location />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/towns" element={<Towns />} />
        <Route path="/areas" element={<Areas />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/chats" element={<Chat />} />
      </Routes>
    </AnimatePresence>
  );
};

export default WebRoutes;
