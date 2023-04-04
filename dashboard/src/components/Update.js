import React,{useEffect,useState} from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';


const Update = () => {
    const id = useParams();
    const Id = id.id;
    // console.log(Id);
    
    //SETTING NEW DATA 
    const [status, setStatus] = useState("");
    const [repository, setRepository] = useState("");
    const [type ,setType] = useState("");
    const [ruleId, setRuleId] = useState("");
    const [path, setPath] = useState("");
    const [line, setLine] = useState("");
    const [description, setDescription] = useState("");
    const [severity, setSeverity] = useState("");
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
    useEffect( () => {
        getAllResult();
      }, []);

      const getAllResult = async ()=>{
        let result = await fetch(`http://localhost:4000/results/${Id}`);
        result = await result.json();
        //console.log(result.findings[0].metadata.severity);

         setStatus(result.status);
         setRepository(result.repository);
         setType(result.findings[0].type);
         setRuleId(result.findings[0].ruleId);
         setPath(result.findings[0].location.path);
         setLine(result.findings[0].location.positions.begin.line);
         setDescription(result.findings[0].metadata.description);
         setSeverity(result.findings[0].metadata.severity);
         setQueuedAt(result.queuedAt);
         setScanningAt(result.scanningAt);
         setFinishedAt(result.finishedAt);

      }
      

      const handleSubmit = async (event) => {
        event.preventDefault();
        navigate('/');
        Swal.fire({
            title: 'Form Updated',
            text: 'Form has been updated successfully!',
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
    
          let resultUpdate= await fetch(`http://localhost:4000/update/${Id}`,{
                method:'PUT',
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                })
                  resultUpdate = resultUpdate.json();       
                console.log(resultUpdate);
    
        };

    return (
        <>
        <div>
            <h1>Update Data</h1>
      </div>
      <div>
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
          setShowForm(!showForm)}}
          >Findings</button>
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
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
    </div>
    </> 
    );
}

export default Update;
