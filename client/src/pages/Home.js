import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, Link } from "react-router-dom";
import { ADD_TEAM } from "../utils/mutations";
import { QUERY_TEAMS } from "../utils/queries";
import Auth from "../utils/auth";
import TeamCard from "../components/TeamCard";

import starters from "../images/starters.png"


const Home = () => {
// const [name, setName] = useState('');
// const pokemon = [{name:'John', image:ImageOne, description: "johns image"}, {name:'Bob', image:ImageTwo, description: "Bibs image"}, {name:'Chris', image:ImageThree, description: "  chris image"} ]
  const navigate = useNavigate();

  const [addTeam, { error }] = useMutation(ADD_TEAM)

  const getTeams = useQuery(QUERY_TEAMS)


  const userTeams = getTeams.data?.teamList || [];
  console.log(userTeams)

  const [inputValue, setInputValue] = useState('')
  // const [teams, setTeams] = useState([])
  // const [isLoading, setLoading] = useState(true)
  
  // setTeams([...userTeams]);
  
  // useEffect(() => {
  //   if(!Auth.loggedIn()){
  //     navigate("/login")
  //   }
  // }, [])

  function handleSearch(e) {
    // e.preventDefault();
    // here you can get the inputValue
    // console.log(inputValue)
    addTeam({variables: {game: "game", teamName: inputValue}})
    window.location.reload();
  }

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  
  

//   useEffect(() => {
//     setLoading(!userTeams) 
// }, [userTeams])

// TODO: edit onClick for add button to form submit when adding a team
  return (
    <main className="h-100">
      <div className="flex-row justify-center text-center h-100">


          {Auth.loggedIn() ? (
            <>
              <div className="input-group mb-3">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Team Name" 
                  aria-label="Team Name" 
                  aria-describedby="button-addon2" 
                  onChange={(e) => setInputValue(e.target.value)}>
                </input>
                <button 
                  className="btn btn-outline-secondary" 
                  type="button" 
                  id="button-addon2" 
                  onClick={handleSearch}>
                  Add
                </button>
              </div>
              {getTeams.loading ? (
              <div>Loading...</div>
              ) : (
              <ul className="p-0 list-unstyled">
                {userTeams.map((team) => {
                  return <li key={team.teamName}><TeamCard team={team}/></li>
                })}
              </ul>
              )}
              </>
              ) : (
              <div className="d-flex flex-column justify-content-around align-items-center h-100">
                <h1>What will you choose?</h1>
                <img className="w-50 " src={starters} alt="Fire red starters"></img>
                <h4 className="my-10">Build your og pokemon dream team</h4>
                <div>
                  <Link className="btn btn-lg btn-info m-2" to="/login">
                    Login
                  </Link>
                  <Link className="btn btn-lg btn-light m-2" to="/signup">
                    Signup
                  </Link>
                </div>
              </div>  
            )}
      </div>
    </main>
  );
};

export default Home;
