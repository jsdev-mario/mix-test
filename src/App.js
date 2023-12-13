import { Button, Spinner, Table } from "reactstrap";
import "./App.css";
import AddProjectModal from "./components/AddProjectModal";
import { useEffect, useState } from "react";
import { projectService } from "./service/FirebaseService";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [projects, setProjects] = useState([]);

  const handleAddProject = () => {
    setIsOpen(true);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const loadProjects = async () => {
    setIsLoading(true);
    const projectList = await projectService.getProjects();
    setProjects(projectList)
    setIsLoading(false);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="App">
      <div className="header">
        <Button onClick={handleAddProject}>Add Project</Button>
      </div>
      <AddProjectModal
        isOpen={isOpen}
        toggle={toggle}
        handleClose={handleClose}
        setIsLoading={setIsLoading}
        loadProjects={loadProjects}
      />
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Type</th>
            <th>Number of Buildings</th>
            <th>Year Built</th>
            <th>Number of Units</th>
            <th>Number of Floors</th>
            <th>Unit Mix File</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((item, index) => (
            <tr key={index}>
              <td>{item.projectName}</td>
              <td>{item.address}</td>
              <td>{item.type}</td>
              <td>{item.numOfBuildings}</td>
              <td>{item.yearBuilt}</td>
              <td>{item.numOfUnits}</td>
              <td>{item.numOfFloors}</td>
              <td>
                {item.unitMixFileUrl && <img src={item.unitMixFileUrl} />}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {isLoading && <div className="spinner-container">
        <Spinner color="light" />
      </div>}
    </div>
  );
}

export default App;
