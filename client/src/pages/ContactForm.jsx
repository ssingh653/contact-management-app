import { useEffect, useState } from "react";
import React from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      async function fetchData() {
        try {
          await axios.get("/contacts/" + id).then(({ data }) => {
            console.log("selectedcontact", data);
            setName(data.name);
            setEmail(data.email);
            setPhone(data.phone);
          });
        } catch (err) {
          console.log("Error", err);
        }
      }
      fetchData();
    }
  }, [id]);

  const AddContact = async (ev) => {
    ev.preventDefault();

    if (id) {
      try {
        await axios.put("/contacts/" + id, {
          id,
          name,
          email,
          phone,
        });
        setRedirect(true);
        alert("Contact Updated successfully");
      } catch (e) {
        alert("Contact update failed");
      }
    } else {
      try {
        await axios.post("/contacts", {
          name,
          email,
          phone,
        });
        setRedirect(true);
        alert("Contact Added successfully");
      } catch (e) {
        alert("Contact not added");
      }
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="p-2 text-4xl text-center mb-4 text-white">
          Add a Contact
        </h1>
        <form className="max-w-md mx-auto" onSubmit={AddContact}>
          <input
            type="text"
            placeholder="full name"
            value={name}
            className="w-full border my-1 py-2 px-3 rounded-2xl focus:outline-none shadow-md"
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            className="w-full border my-1 py-2 px-3 rounded-2xl focus:outline-none shadow-md"
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="text"
            placeholder="phone"
            value={phone}
            className="w-full border my-1 py-2 px-3 rounded-2xl focus:outline-none shadow-md"
            onChange={(ev) => setPhone(ev.target.value)}
          />
          <button className="bg-slate-700 hover:bg-slate-600 w-full mt-2 p-4 rounded-md font-bold text-white">
            {id ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
