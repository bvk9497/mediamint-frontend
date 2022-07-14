import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./edit.scss";

const Edit = (props) => {
  console.log(props.editID);

  const [value, setValue] = useState(props.data);

  const nameinputRef = useRef();
  const emailinputRef = useRef();
  const maleRef = useRef();
  const femaleRef = useRef();

  let gender;
  const setGender = (e) => {
    gender = e.target.value;
  };

  console.log(value[0].gender);

  useEffect(() => {
    setValue(props.data);
    if (value[0].gender === "male") {
      maleRef.current.checked = true;
    } else if (value[0].gender === "female") {
      femaleRef.current.checked = true;
    }
  }, [props.data, props.editID]);

  const postData = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log(value[0].ID);
    try {
      const data = axios.put(
        `http://localhost:5000/${value[0].ID}`,
        {
          name: nameinputRef.current.value,
          email: emailinputRef.current.value,
          gender: gender,
        },
        config
      );
    } catch (error) {}
  };

  const saveDataAndClose = () => {
    props.getAction();
    postData();
  };
  const justClose = () => {
    props.getAction();
  };

  return (
    <div className="edit">
      <h2>Edit user</h2>
      {props.data && (
        <div className="dataitem">
          <div className="item">
            <label>ID :</label>
            <input value={value[0].ID} readOnly />
          </div>
          <div className="item">
            <label>Name :</label>
            <input defaultValue={value[0].name} ref={nameinputRef} />
          </div>
          <div className="item">
            <label>email :</label>
            <input defaultValue={value[0].email} ref={emailinputRef} />
          </div>
          <div className="item" onChange={setGender}>
            <h4>Gender</h4>
            <input
              type={"radio"}
              id="male"
              value={"male"}
              ref={maleRef}
              name="gender"
            />
            <label htmlFor="male">Male</label>
            <input
              type={"radio"}
              id="female"
              value={"female"}
              ref={femaleRef}
              name="gender"
            />
            <label htmlFor="female">Female</label>
          </div>
          <div className="item">
            <label>status :</label>
            <input value={value[0].status} readOnly />
          </div>
          <div className="item">
            <button type="submit" onClick={saveDataAndClose}>
              Save
            </button>
          </div>
          <div className="item">
            <button type="submit" onClick={justClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
