import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import axios from "axios";
import ContactList from "./pages/ContactList";
import ContactForm from "./pages/ContactForm";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ContactList />} />
        <Route path="/contacts" element={<ContactForm />} />
        <Route path="/contacts/:id?" element={<ContactForm />} />
      </Route>
    </Routes>
  );
}

export default App;
