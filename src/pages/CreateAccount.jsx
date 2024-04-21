import React, { useRef } from "react";
import Navigation from "../components/navigation";

const CreateAccount = () => {
  const years = [];
  for (let i = 1950; i <= 2024; i++) {
    years.push(i);
  }
  const days = [];
  for (let i = 0; i <= 31; i++) {
    days.push(i);
  }
  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
  const formRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch(
      "http://localhost:8888/social_network/api/inscription.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    //gestion de la reponse du serveur
    if (response.status === 201) {
      window.location.href = "http://localhost:5173/";
      //creation d'un cookie??
    } else {
      //afficher les erreurs
      let result = await response.json();
      //objet pour gerer les message d'erreur eventuels
      console.log("erreur");
    }
  };
  return (
    <div className="bg-slate-50">
      <Navigation />
      <div className="border flex flex-col mx-auto max-w-96 rounded-md shadow bg-white">
        <header className="border-b p-3">
          <h1 className="text-2xl">S'inscrire</h1>
          <h2 className="text-gray-500">C'est rapide et facile. </h2>
        </header>
        <form action="" ref={formRef} onSubmit={handleSubmit} className="p-3">
          <div className="flex gap-3  ">
            <input
              type="text"
              placeholder="Prénom"
              name="prenom"
              className="border rounded p-0.5 w-full mb-3 bg-gray-50 p-1"
            />
            <input
              type="text"
              placeholder="Nom de famille"
              name="nom"
              className="border rounded p-0.5 w-full mb-3 bg-gray-50 p-1"
            />
          </div>
          <input
            type="text"
            placeholder="Numéro ou email"
            name="email"
            className="border rounded p-0.5 w-full mb-3 bg-gray-50 p-1"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            name="mdp"
            className="border rounded p-0.5 w-full mb-3 bg-gray-50 p-1"
          />
          <p className="text-xs mb-1">Date de naissance</p>
          <div className="flex gap-3 ">
            <select
              className="border rounded p-1 w-full mb-3"
              name="day"
              defaultValue={1}
            >
              {days.map((day) => (
                <option key={day} value={day} name="day">
                  {day}
                </option>
              ))}
            </select>
            <select
              className="border rounded p-1 w-full mb-3"
              name="month"
              defaultValue="janvier"
            >
              {months.map((month) => (
                <option
                  key={month}
                  value={months.indexOf(month) + 1}
                  name="month"
                >
                  {month}
                </option>
              ))}
            </select>
            <select
              className="border rounded p-1 w-full mb-3"
              defaultValue={2024}
              name="year"
            >
              {years.map((year) => (
                <option key={year} value={year} name="year">
                  {year}
                </option>
              ))}
            </select>
          </div>
          <p className="text-xs mb-1">Genre</p>
          <div className="flex justify-between gap-3">
            <div className="border rounded w-full flex justify-around p-1">
              <label htmlFor="femme">Femme</label>
              <input type="radio" id="femme" name="sexe" value="f" />
            </div>
            <div className="border rounded w-full flex justify-around p-1">
              <label htmlFor="homme">Homme</label>
              <input type="radio" id="homme" name="sexe" value="h" />
            </div>
            <div className="border rounded w-full flex justify-around p-1">
              <label htmlFor="autre">Autre</label>
              <input type="radio" id="autre" name="sexe" value="a" />
            </div>
          </div>
          <input
            type="submit"
            value="s'inscrire"
            className="rounded border bg-blue-500 text-white w-full mt-5 p-1 hover:cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
