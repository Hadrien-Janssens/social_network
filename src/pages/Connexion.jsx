import React, { useRef } from "react";
import { NavLink } from "react-router-dom";

const Connexion = () => {
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    const response = await fetch(
      "http://localhost:8888/social_network/api/connexionUser.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      //recuperer les données users et stocker dans la variable de session
      let user = await response.json();
      console.log(user);
      user = JSON.stringify(user);
      //creer un variable de session
      sessionStorage.setItem("user", user);
      //rediriger vers la page d'accueil
      // window.location.href = "http://localhost:5173/";
    }
  };
  return (
    <div>
      <h1 className="text-blue-500 text-xl font-semibold text-center mt-5">
        Social Network
      </h1>
      <form
        className="flex flex-col max-w-96 mb-20 mx-auto overflow-hidden p-3 "
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="email"
          placeholder="Numéro mobile ou e-mail"
          className="p-2 border rounded shadow-sm m-1 bg-gray-100 placeholder-gray-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          className="p-2 border rounded shadow-sm m-1 bg-gray-100 placeholder-gray-500"
        />
        <input
          type="submit"
          value="Se connecter"
          className="p-2 border rounded m-1 bg-blue-500 text-white font-bold hover:cursor-pointer"
        />
        <a href="/notFound.html" className="text-center">
          Mot de passe oublié ?
        </a>
        <div className="flex justify-center items-center">
          <div className="w-80  border border-slate-400"></div>
          <div className="p-4">ou</div>
          <div className="w-80  border border-slate-400"></div>
        </div>
        <NavLink
          to="/createaccount"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <p
            className="p-2 border rounded m-1 text-center hover:cursor-pointer"
            href=""
          >
            Créer nouveau compte
          </p>
        </NavLink>
      </form>
    </div>
  );
};

export default Connexion;
