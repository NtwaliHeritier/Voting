import React, { useState } from 'react';

const Form = ({candidate1, candidate2, vote}) => {

  const [candidateId, setCandidateId] = useState(candidate1.id) 

  const handleSubmit = (e) => {
    e.preventDefault();
    vote(candidateId);
  }

  const handleChange = (e) => {
    setCandidateId(e.target.value);
  }

  return ( 
    <div className="w-50" style = {{margin: "0 auto"}}>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{candidate1.name}</td>
            <td>{candidate1.vote}</td>
          </tr>
          <tr>
            <td>{candidate2.name}</td>
            <td>{candidate2.vote}</td>
          </tr>
        </tbody>
      </table>
      <form className="form-group" onSubmit = {handleSubmit}>
        <select className="form-control" onChange = {handleChange}>
          <option value = {candidate1.id}>{candidate1.name}</option>
          <option value = {candidate2.id}>{candidate2.name}</option>
        </select>
        <button className="btn btn-success mt-4">Vote</button>
      </form>
    </div>
   );
}
 
export default Form;