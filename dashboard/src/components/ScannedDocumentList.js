import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


//IMPORT REACT-ICONS FOR ICONS
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";

const ScannedDocumentList = () => {
  const [scans, setScans] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    fetch("http://localhost:4000/results")
      .then((response) => response.json())
      .then((data) => {
        setScans(data);
        //console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // CODE TO DELETE THE DATA FROM DATABASE 
  const deleteData = (Id) =>{
    if (window.confirm('Are you sure you want to delete this item?')) {
      fetch(`http://localhost:4000/delete/${Id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      //console.log(data);
      getAllData();
    })
    .catch(err => console.error(err));
    }
   }
   //UPDATE THE DATA 
   const updateData = (Id)=>{
    const id = Id.toString();
    //console.log(id);
      navigate("/update/"+id);
   }

   const getFindings = (Id)=>{
      const id = Id.toString();
      console.log(id);
      navigate(`/details/${id}`);
   }
    // console.log(scans);
  return (
    <div>
      <h2>List Of Scanned Document</h2>

      <table className="table-container">
        <thead>
          <tr>
            <th>Repository Name</th>
            <th>Scanning Status</th>
            <th>Findings</th>
            <th>Timestamp</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {scans &&
            scans.map((scan) => (
              <tr key={scan._id}>
                <td>{scan.repository}</td>
                <td>{scan.status}</td>
                <td>{scan.findings.length}</td>
                {/* {console.log(scan.findings[0].location.position.begin)} */}
                <td>
                  {scan.status === "Queued"
                    ? scan.queuedAt
                    : scan.status === "In-Progress"
                    ? scan.scanningAt
                    : scan.status === "Success"
                    ? scan.finishedAt
                    :"NA"}
                </td>
                <td id="icons">
                  <AiOutlineEdit onClick={() => updateData(scan._id)}/>
                  <MdDeleteOutline onClick={() => deleteData(scan._id)}/>
                  <BsInfoCircle onClick={()=>getFindings(scan._id)}/>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScannedDocumentList;
