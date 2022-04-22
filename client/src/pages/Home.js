
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TEAM } from "../utils/mutations";
import React, { useEffect, useState } from "react";
import { QUERY_TEAMS } from "../utils/queries";
import TeamCard from "../components/TeamCard";


const Home = () => {
// const [name, setName] = useState('');
// const pokemon = [{name:'John', image:ImageOne, description: "johns image"}, {name:'Bob', image:ImageTwo, description: "Bibs image"}, {name:'Chris', image:ImageThree, description: "  chris image"} ]



  const [addTeam, { error }] = useMutation(ADD_TEAM)

  const getTeams = useQuery(QUERY_TEAMS)


  const userTeams = getTeams.data?.teamList || [];
  console.log(userTeams)

  const [inputValue, setInputValue] = useState('')
  // const [teams, setTeams] = useState([])
  // const [isLoading, setLoading] = useState(true)
  
  // setTeams([...userTeams]);

  function handleSearch(e) {
    // e.preventDefault();
    // here you can get the inputValue
    // console.log(inputValue)
    addTeam({variables: {game: "game", teamName: inputValue}})
    window.location.reload();
  }
  
  

//   useEffect(() => {
//     setLoading(!userTeams) 
// }, [userTeams])

// TODO: edit onClick for add button to form submit when adding a team
  return (
    <main>
      <div className="flex-row justify-center">

        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Team Name" aria-label="Team Name" aria-describedby="button-addon2" onChange={(e) => setInputValue(e.target.value)}></input>
          <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleSearch}>Add</button>
        </div>
        {getTeams.loading ? (
        <div>Loading...</div>
        ) : (
        <ul>
          {userTeams.map((team) => {
            return <TeamCard key={team.teamName} team={team}/>
          })}
        </ul>
        )}

        {/* <div className="col-12 col-md-8 mb-3">
          Content Here
        </div> */}

      </div>
    </main>
  );
};

export default Home;
