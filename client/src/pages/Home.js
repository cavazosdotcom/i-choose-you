//import React, { useState } from 'react';
// import ImageOne from '../images/1st.png';
// import ImageTwo from '../images/2nd.png';
// import ImageThree from '../images/3rd.png';



const Home = () => {
// const [name, setName] = useState('');
// const pokemon = [{name:'John', image:ImageOne, description: "johns image"}, {name:'Bob', image:ImageTwo, description: "Bibs image"}, {name:'Chris', image:ImageThree, description: "  chris image"} ]


  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
        {/* <input value={name} onChange={(e) => setName(e.target.value)}>
        
        </input> */}
        {/* </div>
        <div className="col-12 col-md-8 mb-3">
          {pokemon.filter(pok => pok.name.toLowerCase().includes (name.toLowerCase()) ).map(pok => (
            <div>
            <p>
              {pok.name}
            </p>
            <img src={pok.image}>
            </img>
            <p>
              {pok.description}
            </p>
            </div>
          ))} */}
        </div>
      </div>
    </main>
  );
};

export default Home;
