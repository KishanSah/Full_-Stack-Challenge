import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
const ScannedDocumentDetails = () => {
  const id = useParams();
  const Id = id.id
  const [type ,setType] = useState("");
  const [ruleId, setRuleId] = useState("");
  const [path, setPath] = useState("");
  const [line, setLine] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("");

  useEffect( () => {
    fetch(`http://localhost:4000/results/${Id}`)
      .then((response) => response.json())
      .then((data) => {
        for(let i=0; i<data.findings.length; i++){
          setType(data.findings[i].type);
          setRuleId(data.findings[i].ruleId)     
          setPath(data.findings[i].location.path)
          setLine(data.findings[i].location.positions.begin.line)
          setDescription(data.findings[i].metadata.description)
          setSeverity(data.findings[i].metadata.severity)
        }
        
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
 
   return (
    <div>
      <h1>Finding Details</h1>

      <table className="table-container">
        <thead>
          <tr>
            <th>Type</th>
            <th>RuleID</th>
            <th>Path</th>
            <th>Line No.</th>
            <th>Description</th>
            <th>Severity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{type}</td>
            <td>{ruleId}</td>
            <td>{path}</td>
            <td>{line}</td>
            <td>{description}</td>
            <td>{severity}</td> 
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScannedDocumentDetails;
