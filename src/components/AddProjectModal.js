import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
} from "reactstrap";
import "./style.css";
import { useState } from "react";
import { fileService, projectService } from "../service/FirebaseService";

import iconPicture from "../assets/icon_picture.png";

export default function AddProjectModal({
  isOpen,
  toggle,
  handleClose,
  setIsLoading,
  loadProjects
}) {
  const [step, setStep] = useState(1);

  const [projectName, setProjectName] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [numOfBuildings, setNumOfBuildings] = useState(0);
  const [yearBuilt, setYearBuilt] = useState(0);
  const [numOfUnits, setNumOfUnits] = useState(0);
  const [numOfFloors, setNumOfFloors] = useState(0);
  const [unitMixFile, setUnitMixFile] = useState(null);
  const [floorPlans, setFloorPlans] = useState([]);

  const formTitle = () => {
    if (step == 1) {
      return "Enter Your Project Details";
    } else if (step == 2) {
      return "Upload Your Unit Mix";
    } else if (step == 3) {
      return "Upload Floor Plans";
    }
  };

  const onPrev = () => {
    setStep(step - 1 > 0 ? step - 1 : step);
  };

  const onNext = () => {
    if (step === 3) {
    }
    setStep(step + 1 < 5 ? step + 1 : step);
  };

  const initValues = () => {
    setProjectName("");
    setAddress("");
    setType("");
    setNumOfBuildings(0);
    setYearBuilt(0);
    setNumOfUnits(0);
    setNumOfFloors(0);
    setUnitMixFile(null);
    setFloorPlans([]);
    setStep(1);
  };

  const getProjectValues = (unitMixFileUrl) => {
    return {
      projectName,
      address,
      type,
      numOfBuildings,
      yearBuilt,
      numOfUnits,
      numOfFloors,
      unitMixFileUrl,
      floorPlans,
    };
  };

  const initAndAddProject = async () => {
    setIsLoading(true);

    let unitMixFileUrl = "";
    if(unitMixFile) {
      unitMixFileUrl = await fileService.uploadFile(unitMixFile);
    }
    const projectValues = getProjectValues(unitMixFileUrl);
    await projectService.addProject(projectValues);
    setIsLoading(false);
    loadProjects();

    handleClose();

    initValues();
  }

  const goToProject = async () => {
    initAndAddProject();
  };

  const goToPortfolio = () => {
    initAndAddProject();
  };

  const getFloorPlanValue = (index, key) => {
    if (floorPlans[index] && floorPlans[index][key]) {
      return floorPlans[index][key];
    }

    return "";
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="project-modal">
      <ModalBody className="project-modal-body">
        <div className="content">
          <div className="title">Add New Project</div>
          <div className="d-flex content-box">
            <div className="left-box">
              <div className={`circle active`}>1</div>
              <div>Building ID</div>
              <div className="virtical-line" />
              <div className={`circle ${step > 1 ? "active" : ""}`}>2</div>
              <div>Unit Mix</div>
              <div className="virtical-line" />
              <div className={`circle ${step > 2 ? "active" : ""}`}>3</div>
              <div>Floor Plans</div>
            </div>
            <div className="right-box">
              {step < 4 && <div className="lbl-step">Step {step}</div>}
              {step === 4 && <div className="title">You're all Done!</div>}
              <div className="title">{formTitle()}</div>
              {step == 1 && (
                <Form className="form-box">
                  <FormGroup>
                    <Label for="txtName">Name</Label>
                    <Input
                      id="txtName"
                      name="name"
                      placeholder="The Carlyle"
                      value={projectName}
                      onChange={(e) => {
                        setProjectName(e.target.value);
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="txtAddress">Address</Label>
                    <Input
                      id="txtAddress"
                      name="address"
                      placeholder="35 East 76th Street, #3006"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="txtType">Type</Label>
                    <Input
                      id="txtType"
                      name="type"
                      placeholder="Residential"
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="txtNumOfBuildings">Number of Buildings</Label>
                    <Input
                      id="txtNumOfBuildings"
                      name="numOfBuildings"
                      placeholder="31"
                      value={numOfBuildings}
                      onChange={(e) => {
                        setNumOfBuildings(e.target.value);
                      }}
                      type="number"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="txtYearBuilt">Year Built</Label>
                    <Input
                      id="txtYearBuilt"
                      name="yearBuilt"
                      placeholder="1929"
                      value={yearBuilt}
                      onChange={(e) => {
                        setYearBuilt(e.target.value);
                      }}
                      type="number"
                    />
                  </FormGroup>
                </Form>
              )}
              {step == 2 && (
                <Form className="form-box">
                  <FormGroup>
                    <Label for="txtNumOfUnits">Number of Units</Label>
                    <Input
                      id="txtNumOfUnits"
                      name="numOfUnits"
                      placeholder="200"
                      value={numOfUnits}
                      onChange={(e) => {
                        setNumOfUnits(e.target.value);
                      }}
                      type="number"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="txtNumOfFloors">Number of Floors</Label>
                    <Input
                      id="txtNumOfFloors"
                      name="numOfFloors"
                      placeholder="15"
                      value={numOfFloors}
                      onChange={(e) => {
                        setNumOfFloors(e.target.value);
                        let floorPlanArray = [];
                        for (let i = 0; i < e.target.value; i++) {
                          floorPlanArray.push({
                            type: "",
                            units: "",
                            file: null,
                          });
                        }
                        setFloorPlans(floorPlanArray);
                      }}
                      type="number"
                    />
                  </FormGroup>
                  <FormGroup className="mt-30">
                    <Label for="txtUnitMixFile">Upload Unit Mix File</Label>
                    <Input
                      id="txtUnitMixFile"
                      name="unitMixFile"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          console.log("===== file: ", file.name);
                          setUnitMixFile(file);
                        }
                      }}
                    />
                  </FormGroup>
                </Form>
              )}
              {step == 3 && (
                <div>
                  <div className="input-row">
                    <div>Type</div>
                    <div># of Units</div>
                    <div>Upload Floor Plan</div>
                  </div>
                  <div className="floor-plans-box">
                    {floorPlans.map((item, index) => (
                      <div className="input-row" key={index}>
                        <div>
                          <Input
                            placeholder="A"
                            index={index}
                            value={getFloorPlanValue(index, "type")}
                            onChange={(e) => {
                              const idx = e.target.getAttribute("index");
                              const cloneFloorPlans = Object.assign(
                                [],
                                floorPlans
                              );
                              cloneFloorPlans[idx]["type"] = e.target.value;
                              setFloorPlans(cloneFloorPlans);
                            }}
                          />
                        </div>
                        <div>
                          <Input
                            className="w-50 ml-8"
                            placeholder="14"
                            index={index}
                            value={getFloorPlanValue(index, "units")}
                            onChange={(e) => {
                              const idx = e.target.getAttribute("index");
                              const cloneFloorPlans = Object.assign(
                                [],
                                floorPlans
                              );
                              cloneFloorPlans[idx]["units"] = e.target.value;
                              setFloorPlans(cloneFloorPlans);
                            }}
                          />
                        </div>
                        <div>
                          <div className="btn-file" index={index} onClick={(e) => {
                            const idx = e.target.getAttribute("index");
                            const inputElement = document.getElementById(`btn_file_${idx}`);
                            console.log("===== inputElement: ", inputElement);
                            if(inputElement) {
                              inputElement.click();
                            }
                          }}>
                            <img className="btn-file-icon" src={iconPicture} index={index} />
                          </div>
                          <Input
                            id={`btn_file_${index}`}
                            className="btn-file-input"
                            type="file"
                            index={index}
                            onChange={(e) => {
                              const idx = e.target.getAttribute("index");
                              const file = e.target.files[0];
                              if (file) {
                                const cloneFloorPlans = Object.assign(
                                  [],
                                  floorPlans
                                );
                                cloneFloorPlans[idx]["file"] = e.target.value;
                              }
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {step == 4 && (
                <div className="box-done">
                  <div className="image-view"></div>
                  <div>Now Let Us Do Our Magic...</div>
                  <div>We will notify you by email</div>
                </div>
              )}
              <div className="mt-30">
                {step > 1 && step < 4 && (
                  <Button className="btn-p mr-4" onClick={onPrev}>
                    Previous Step
                  </Button>
                )}
                {step < 4 && (
                  <Button className="btn-p ml-4" onClick={onNext}>
                    Next Step
                  </Button>
                )}
                {step == 4 && (
                  <Button className="btn-p mr-4" onClick={goToProject}>
                    Go to Project
                  </Button>
                )}
                {step == 4 && (
                  <Button className="btn-p ml-4" onClick={goToPortfolio}>
                    Go to Portfolio
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
