import React, { useState } from "react";
//import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const ScanForm = () => {
  const [status, setStatus] = useState("Queued");
  const [repository, setRepository] = useState("");
  const [type ,setType] = useState("");
  const [ruleId, setRuleId] = useState("");
  const [path, setPath] = useState("");
  const [line, setLine] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("High");
  const [queuedAt, setQueuedAt] = useState("");
  const [scanningAt, setScanningAt] = useState("");
  const [finishedAt, setFinishedAt] = useState("");

  const [showForm, setShowForm] = useState(false);
  

   const navigate = useNavigate();

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleRepositoryNameChange = (event) => {
    setRepository(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleRuleIdChange = (event) => {
    setRuleId(event.target.value);
  };

  const handlePathChange = (event) => {
    setPath(event.target.value);
  };

  const handleLineChange = (event) => {
    setLine(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSeverityChange = (event) => {
    setSeverity(event.target.value);
  };
  const handleQueuedAtChange = (event) => {
    setQueuedAt(event.target.value);
  };

  const handleScanningAtChange = (event) => {
    setScanningAt(event.target.value);
  };

  const handleFinishedAtChange = (event) => {
    setFinishedAt(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/');
    Swal.fire({
        title: 'Form Submitted',
        text: 'Form has been created successfully!',
        icon: 'successs',
    })
        const data = {
            status,
            repository,
            findings: 
              [{ 
                type,
                ruleId,
                location: { 
                  path, 
                  positions: { 
                    begin: { 
                      line 
                    } 
                  } 
                }, 
                metadata: { 
                  description, severity } }],
            queuedAt,
            scanningAt,
            finishedAt
        };

        fetch("http://localhost:4000/results",{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("Success:", data);
              })
              .catch((error) => {
                console.error("Error:", error);
              });       

    };

  return (
    
    <form >
      <label>
        Status:
        <select value={status} onChange={handleStatusChange}>
          <option value="Queued">Queued</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Success">Success</option>
          <option value="Failure">Failure</option>
        </select>
      </label>
      <br />
      <label>
        Repository Name:
        <input
          type="text"
          value={repository}
          onChange={handleRepositoryNameChange}
        />
      </label>
      <br />
      <>
      <button id ="btn-form" onClick={(e) => {
        e.preventDefault();
        setShowForm(!showForm)}}>Findings</button>
      {showForm && 
        <form >
          <label>
            Type:
            <input 
            type="text"
            value={type}
            onChange={handleTypeChange}
            />
            
          </label><br />
          <label>
            Rule ID:
            <input 
            type="text"
            value={ruleId}
            onChange={handleRuleIdChange}
            />
          </label><br />
          <label>
            Path:
            <input 
            type="text"
            value={path}
            onChange={handlePathChange}
            />
          </label><br />
          <label>
            Line:
            <input 
            type="text"
            value={line}
            onChange={handleLineChange}
            />
          </label><br />
          <label>
            Description:
            <input 
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            />
          </label><br />
          <label>
            Severity:
          <select value={severity} onChange={handleSeverityChange}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
          </label>
          
        </form>
        }
        </>
        <br /><br /><br />
      
      <label>
        Queued At:
        <input
          type="datetime-local"
          value={queuedAt}
          onChange={handleQueuedAtChange}
        />
      </label>
      <br />
      <label>
        Scanning At:
        <input
          type="datetime-local"
          value={scanningAt}
          onChange={handleScanningAtChange}
        />
      </label>
      <br />
      <label>
        Finished At:
        <input
          type="datetime-local"
          value={finishedAt}
          onChange={handleFinishedAtChange}
        />
      </label>
      <br />
      <button onClick={handleSubmit} type="submit" >Submit</button>
    </form>
  );
};

export default ScanForm;