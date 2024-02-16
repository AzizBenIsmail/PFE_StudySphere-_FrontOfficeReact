import React , {useState} from "react";
// import { Link } from 'react-router-dom'
import {
  TbCircleNumber1,
  TbCircleNumber2,
  TbCircleNumber3,
} from "react-icons/tb";
import { BiBeenHere, BiSolidBeenHere } from "react-icons/bi";
import { useLocation } from "react-router-dom";

export default function FirstStep() {
  const location = useLocation();
  const Step = new URLSearchParams(location.search).get("n");
  const [selectedDomaineactuelle, setSelectedDomaineactuelle] = useState('');
  const [selectedDomainedinteret, setSelectedDomainedinteret] = useState('');

  const sousListes = {
    RH: ['Recruteur', 'Gestionnaire de la paie', 'Responsable des ressources humaines', 'Analyste des avantages sociaux', 'Spécialiste de la formation et du développement'],
    IT: ['Développeur logiciel', 'Administrateur système', 'Ingénieur en sécurité informatique', 'Analyste en assurance qualité', 'Architecte cloud'],
    Architecture: ['Architecte', 'Urbaniste', 'Technicien en bâtiment', 'Designer d\'intérieur', 'Ingénieur structure'],
    Finance: ['Analyste financier', 'Comptable', 'Contrôleur financier', 'Conseiller en investissement', 'Trader'],
    Marketing: ['Chef de produit', 'Responsable marketing digital', 'Analyste de marché', 'Chargé de communication', 'Gestionnaire de marque'],
    Médical: ['Médecin généraliste', 'Infirmier', 'Chirurgien', 'Pharmacien', 'Radiologue'],
    Juridique: ['Avocat', 'Juge', 'Notaire', 'Huissier de justice', 'Conseiller juridique'],
    Éducation: ['Enseignant', 'Professeur d\'université', 'Formateur', 'Conseiller pédagogique', 'Directeur d\'école'],
    Ingénierie: ['Ingénieur civil', 'Ingénieur mécanique', 'Ingénieur électrique', 'Ingénieur en aérospatiale', 'Ingénieur logiciel'],
    Art_et_culture: ['Artiste', 'Écrivain', 'Musicien', 'Acteur', 'Historien d\'art'],
    Vente: ['Commercial', 'Vendeur', 'Chef de secteur', 'Conseiller de vente', 'Représentant commercial'],
    Communication: ['Responsable communication', 'Chargé de relations publiques', 'Community manager', 'Attaché de presse', 'Responsable des événements'],
    Recherche: ['Chercheur', 'Assistant de recherche', 'Technicien de laboratoire', 'Ingénieur de recherche', 'Analyste de données'],
    Consultation: ['Consultant en gestion', 'Consultant en stratégie', 'Consultant financier', 'Consultant en informatique', 'Consultant RH'],
    Logistique: ['Responsable logistique', 'Gestionnaire des stocks', 'Planificateur de production', 'Coordinateur de transport', 'Agent de fret'],
    Transport: ['Chauffeur de camion', 'Pilote d\'avion', 'Mécanicien d\'avion', 'Agent de service à la clientèle', 'Agent de bord'],
    Tourisme: ['Agent de voyage', 'Guide touristique', 'Directeur d\'hôtel', 'Responsable des réservations', 'Animateur touristique']
    // Ajoutez d'autres domaines avec leurs sous-listes ici
  };


  const handleChangeactuelle = (event) => {
    setSelectedDomaineactuelle(event.target.value);
  };

  const handleChangedinteret = (event) => {
    setSelectedDomainedinteret(event.target.value);
  };
  return (
    <>
      <div className=" container mx-auto px-1 h-full ">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-9/12 px-1 ">
            <div className="relative flex flex-col min-w-0 break-words w-full  shadow-lg rounded-lg bg-blueGray-800 border-0">
              <div className="rounded-t  px-6 py-6">
                <div className="text-center ">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    + 150 pt
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <div className="relative">
                    <div className="flex items-center">
                      {Step === "1" ? (
                        <>
                        <BiSolidBeenHere
                          style={{ fontSize: "30px" }}
                          color="#4fa94d"
                        />
                        <BiBeenHere
                          style={{ fontSize: "30px", marginLeft: "410px" }}
                        />
                          <BiBeenHere
                            style={{ fontSize: "30px", marginLeft: "415px" }}
                          />
                        </>
                      ) : Step === "2" ? (
                        <>
                          <BiSolidBeenHere
                            style={{ fontSize: "30px" }}
                            color="#4fa94d"
                          />
                          <BiSolidBeenHere
                            style={{ fontSize: "30px", marginLeft: "410px" }}
                            color="#4fa94d"
                          />
                          <BiBeenHere
                            style={{ fontSize: "30px", marginLeft: "415px" }}
                          />
                        </>
                      ) : (
                        <>
                          <BiSolidBeenHere
                            style={{ fontSize: "30px" }}
                            color="#4fa94d"
                          />
                          <BiSolidBeenHere
                            style={{ fontSize: "30px", marginLeft: "410px" }}
                            color="#4fa94d"
                          />
                          <BiSolidBeenHere
                            style={{ fontSize: "30px", marginLeft: "415px" }}
                            color="#4fa94d"
                          />
                        </>
                      )}
                    </div>

                    <div className="flex items-center justify-between w-full">
                      {Step === "1" ? (
                        <>
                          <TbCircleNumber1
                            style={{ fontSize: "30px" }}
                            className="text-white "
                            color="#4fa94d"
                          />
                          <div
                            className="h-2 w-16 bg-blueGray-200"
                            style={{ width: "50%" }}
                          ></div>

                          <TbCircleNumber2
                            style={{ fontSize: "30px" }}
                            className="text-white "
                          />
                          <div
                            className="h-2 w-16 bg-blueGray-200"
                            style={{ width: "50%" }}
                          ></div>
                          <TbCircleNumber3
                            style={{ fontSize: "30px" }}
                            className="text-white "
                          />
                        </>
                      ) : Step === "2" ? (
                        <>
                          <TbCircleNumber1
                            style={{ fontSize: "30px" }}
                            className="text-white "
                            color="#4fa94d"
                          />
                          <div
                            className="h-2 w-16 bg-lightBlue-500"
                            style={{ width: "50%" }}
                          ></div>
                          <TbCircleNumber2
                            style={{ fontSize: "30px" }}
                            color="#4fa94d"
                            className="text-white "
                          />
                          <div
                            className="h-2 w-16 bg-blueGray-200"
                            style={{ width: "50%" }}
                          ></div>
                          <TbCircleNumber3
                            style={{ fontSize: "30px" }}
                            className="text-white "
                          />
                        </>
                      ) : (
                        <>
                          <TbCircleNumber1
                            style={{ fontSize: "30px" }}
                            className="text-white "
                            color="#4fa94d"
                          />
                          <div
                            className="h-2 w-16 bg-lightBlue-500"
                            style={{ width: "50%" }}
                          ></div>
                          <TbCircleNumber2
                            style={{ fontSize: "30px" }}
                            className="text-white "
                            color="#4fa94d"
                          />
                          <div
                            className="h-2 w-16 bg-lightBlue-500 "
                            style={{ width: "50%" }}
                          ></div>
                          <TbCircleNumber3
                            style={{ fontSize: "30px" }}
                            color="#4fa94d"
                            className="text-white "
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Chaque réponse vous rapproche de votre objectif ! 🚀 </small>
                </div>
                {Step === "1" ? (
                  <>
                <form>
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="domaine-select"
                        >
                          Votre Domaine Actuel
                        </label>
                        <select
                          id="domaine-select"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          onChange={handleChangeactuelle}
                          value={selectedDomaineactuelle}
                        >
                          <option value="">Sélectionnez votre domaine actuel</option>
                          {Object.keys(sousListes).map((domaine) => (
                            <option key={domaine} value={domaine}>{domaine}</option>
                          ))}
                        </select>
                      </div>
                      {/* Afficher la sous-liste si un domaine est sélectionné */}
                      {selectedDomaineactuelle && (
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="sous-liste-select"
                          >
                            {selectedDomaineactuelle}
                          </label>
                          <select
                            id="sous-liste-select"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          >
                            <option value="">Sélectionnez une spécialisation</option>
                            {sousListes[selectedDomaineactuelle].map((specialisation, index) => (
                              <option key={index} value={specialisation}>{specialisation}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="domaine-select"
                        >
                          Objectifs De Carrière
                        </label>
                        <select
                          id="domaine-select"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        >
                          <option value="">votre Objectifs De Carrière</option>
                          <option value="Changer_de_carriere">Changer de carrière</option>
                          <option value="Devenir_un_leader_dans_mon_domaine">Devenir_un_leader_dans_mon_domaine</option>
                          <option value="Explorer_de_nouvelles_opportunites_professionnelles">Explorer_de_nouvelles_opportunites_professionnelles</option>
                          <option value="Diversifier_mes_competences_pour_rester_competitif_sur_le_marche_du_travail">Diversifier_mes_competences_pour_rester_competitif_sur_le_marche_du_travail</option>
                          <option value="Demarrer_ma_propre_entreprise">Demarrer_ma_propre_entreprise</option>
                          <option value="Augmenter_mon_revenu_grace_a_des_competences_specialisees">Augmenter_mon_revenu_grace_a_des_competences_specialisees</option>
                        </select>
                      </div>
                    </div>

                      <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="domaine-select"
                          >
                            Votre Domaine Actuel
                          </label>
                          <select
                            id="domaine-select"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            onChange={handleChangedinteret}
                            value={selectedDomainedinteret}
                          >
                            <option value="">Sélectionnez votre domaine actuel</option>
                            {Object.keys(sousListes).map((domaine) => (
                              <option key={domaine} value={domaine}>{domaine}</option>
                            ))}
                          </select>
                        </div>
                        {/* Afficher la sous-liste si un domaine est sélectionné */}
                        {selectedDomainedinteret && (
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="sous-liste-select"
                            >
                              {selectedDomainedinteret}
                            </label>
                            <select
                              id="sous-liste-select"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            >
                              <option value="">Sélectionnez une spécialisation</option>
                              {sousListes[selectedDomainedinteret].map((specialisation, index) => (
                                <option key={index} value={specialisation}>{specialisation}</option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Competences Deja Acquises
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Exmp: communication , Langues , Conception graphique , Programmation Java"
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Niveau D'experience Professionnelle
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="le nombre d'années travaillées dans votre domaine "
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Objectifs De Carrière
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder=" Exmp : musique , sports , arts , etc "
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          annee_anniversaire
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Domaine d'Intérêt: Informatique, Langues, Finance"
                        />
                      </div>
                    </div>

                  </div>


                  <div className="text-center mt-4">
                    {/* <Link to="/landing"> */}
                    <button
                      className="bg-indigo-500 text-white active:bg-indigo-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      // onclick = {Login()}
                    >
                      Sign In
                    </button>
                    {/* </Link> */}
                  </div>
                </form>
                </>
                ) : Step === "2" ? (
                <>
                  <form>
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            votre Domaine Actuelle
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="votre Domaine Actuelle RH , info , architecture "
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Objectifs De Carrière
                          </label>
                          <input
                            type="email"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="votre Objectifs De Carrière"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Domaine d'interet
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Domaine d'interet : Informatique , Langues , Finance"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Competences Deja Acquises
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue="Jesse"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Niveau D'experience Professionnelle
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Lucky"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Interets Personnels
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Jesse"
                          />
                        </div>
                      </div>

                    </div>


                    <div className="text-center mt-4">
                      {/* <Link to="/landing"> */}
                      <button
                        className="bg-indigo-500 text-white active:bg-indigo-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        // onclick = {Login()}
                      >
                        Sign In
                      </button>
                      {/* </Link> */}
                    </div>
                  </form>
                </>
                ) : (
                <>
                  <form>
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            votre Domaine Actuelle
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="votre Domaine Actuelle RH , info , architecture "
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Objectifs De Carrière
                          </label>
                          <input
                            type="email"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="votre Objectifs De Carrière"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Domaine d'interet
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Domaine d'interet : Informatique , Langues , Finance"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Competences Deja Acquises
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue="Jesse"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Niveau D'experience Professionnelle
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Lucky"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Interets Personnels
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Jesse"
                          />
                        </div>
                      </div>
                    </div>


                    <div className="text-center mt-4">
                      {/* <Link to="/landing"> */}
                      <button
                        className="bg-indigo-500 text-white active:bg-indigo-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        // onclick = {Login()}
                      >
                        Suivant
                      </button>
                      {/* </Link> */}
                    </div>
                  </form>
                </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
