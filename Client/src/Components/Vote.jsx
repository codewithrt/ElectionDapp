import React,{useContext,useState} from "react";
import {ElectionContext} from "../Context/ElectionContext";


const ResultCard = ({candidate, votes}) =>{
  return(
  <>
       <tr>
        <td scope="col" className="white">{candidate}</td>
        <td scope="col" className="white">{votes}</td>
      </tr>
  </>
  )
}


const CondidateCard = ({candidate, id}) => {
  return (
    <>
      <tr>
        <td scope="col">
          {" "}
          <div
            className="form-check"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id={id}
              value={id}
            />
            {/* <label className="form-check-label" htmlFor="flexRadioDefault1"> */}
          </div>
        </td>
        <td scope="col" className="white">{id}</td>
        <td scope="col" className="white">{candidate}</td>
      </tr>
      {/* </label> */}
    </>
  );
};

const Vote = () => {
  const [button, setbutton] = useState(false);
  const {arrays,CurrentAccount,connectWallet,setSelectedCand,onVote,votearray,Showresult} = useContext(ElectionContext)
  console.log(votearray);

  const buttonchange = ()=>{
    if (button == false) {
      setbutton(true)
      Showresult();
    }
    else if (button == true){
      setbutton(false)
    }
  }

 const onSubmit = e =>{
  // e.preventDefault();
   console.log(e);
   if (document.getElementById("1").checked == true) {
     setSelectedCand(1)
     onVote()
     console.log("this checked 1");
   }
   if (document.getElementById("2").checked == true) {
    setSelectedCand(2)
    onVote()
    console.log("this checked 2");
  }
  if (document.getElementById("3").checked == true) {
    setSelectedCand(3)
    onVote()
    console.log("this checked 3");
  }
  e.preventDefault();


 }
  return (
    <>
      <div className="">
        <div className="container" style={{ width: "650px" }}>
          <div className="row">
            <div className="col-lg-12">
              <h1 className="text-center white" >Elections</h1>
              <hr style={{ border: '1px solid white',backgroundColor:'white'}}/>
              <br />
              <div id="loader">
                {/* <p className="text-center">Loading...</p> */}
              </div>
              <div id="content" style={{ display: "relative" }}>
                <form onSubmit={onSubmit}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="white"> <h4> Selected Candidate </h4> </th>
                      <th scope="col" className="white"> <h4># </h4></th>
                      <th scope="col" className="white"> <h4>Name </h4></th>
                    </tr>
                  </thead>
                  <tbody id="candidatesResults">
                    {/* put the card mapping here */}
                    {arrays.map((array)=>{
                      const id = array[0].toNumber();
                    //  console.log(id);
                     const name = array[1].toString();
                    //  console.log(name);
                          // <CondidateCard candidate={name} id={id} />
                       return ( <CondidateCard key={id} candidate={name} id={id} />)
                    })}
                    {/* <CondidateCard candidate='yes' id={0} /> */}
                    
                  </tbody>
                </table>
                <br/>
                <hr style={{ border: '1px solid white',backgroundColor:'white'}} />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100px", display:!CurrentAccount?'none':''}}
                  
                >
                  Vote
                </button>
                </form>
                <p id="accountAddress" className="text-center"></p>
              </div>
              <div>
              <button
                  type="submit"
                  className="btn btn-primary"
                  style={{  display:CurrentAccount?'none':''}}
                  onClick={connectWallet}
                >
                  Connect Wallet To Vote
                </button>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <hr style={{ border: '1px solid white',backgroundColor:'white'}} />
        <br/>
        {/* Election Results */}
        
        {button ? <div className="container" style={{ width: "650px" }}>
          <div className="row">
            <div className="col-lg-12">
              <h1 className="text-center white" >Election Results</h1>
              <hr style={{ border: '1px solid white',backgroundColor:'white'}}/>
              <br />
              <div id="loader">
                {/* <p className="text-center">Loading...</p> */}
              </div>
              <div id="content" style={{ display: "relative" }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="white"> <h4> Candidate </h4> </th>
                      <th scope="col" className="white"> <h4>Votes </h4></th>
                    </tr>
                  </thead>
                  <tbody id="candidatesResults">
                    {votearray.map((array)=>{
                        const votes = array[2].toNumber()
                        console.log(votes);
                        const names = array[1].toString();
                        console.log(names);
                        return(
                        <ResultCard candidate={names} votes={votes} />
                        )
                    })}
                        
                  </tbody>
                </table>
                <br/>
                <hr style={{ border: '1px solid white',backgroundColor:'white'}} />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ display:!CurrentAccount?'none':''}}
                  onClick={buttonchange}
                >
                  Close Results
                </button>
                <p id="accountAddress" className="text-center"></p>
              </div>
            </div>
          </div>
        </div> : <div>
              <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={buttonchange}
                >
                  Show Results
                </button>
              </div>}

       
      </div>
    </>
  );
};

export default Vote;
