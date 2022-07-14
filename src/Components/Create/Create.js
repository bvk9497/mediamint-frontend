import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./create.scss";
const Create = (props) => {
  const [reset, setReset] = useState("");
  const [name, setName] = useState();
  const [emain, setEmail] = useState();

  const IDinputRef = useRef();
  const nameinputRef = useRef();
  const emailinputRef = useRef();
  //   const maleRef = useRef();
  //   const femaleRef = useRef();

  let gender;
  const setGender = (e) => {
    gender = e.target.value;
  };

  const postData = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const data = axios.post(
        `http://localhost:5000/`,
        {
          ID: IDinputRef.current.value,
          name: nameinputRef.current.value,
          email: emailinputRef.current.value,
          gender: gender,
          status: "active",
        },
        config
      );

      console.log(data);
    } catch (error) {}
  };

  const saveDataAndClose = () => {
    setName(nameinputRef.current.value);
    setEmail(emailinputRef.current.value);
    props.getAction();
    if (
      nameinputRef.current.value.length === 0 ||
      emailinputRef.current.value.length === 0 ||
      gender === null
    ) {
      alert("please fill all the details");
      setReset("");
      return;
    }
    postData();
  };

  let value;
  const genRandomValue = () => {
    value = Math.floor(Math.random() * 100);
    IDinputRef.current.value = value;
  };

  console.log(value, reset);

  const ClearData = () => {
    nameinputRef.current.value = "";
    emailinputRef.current.value = "";
    gender = null;
    setReset(`reset${value}`);
  };

  useEffect(() => {
    genRandomValue();
  }, [reset]);

  return (
    <div className="create">
      <h2>Create User</h2>
      <div className="item">
        <label>ID :</label>
        <input ref={IDinputRef} readOnly />
      </div>
      <div className="item">
        <label>Name :</label>
        <input ref={nameinputRef} />
      </div>
      <div className="item">
        <label>email :</label>
        <input ref={emailinputRef} />
      </div>
      <div className="item" onChange={setGender}>
        <h4>Gender</h4>
        <input
          type={"radio"}
          id="male"
          value={"male"}
          //   ref={maleRef}
          name="gender"
        />
        <label htmlFor="male">Male</label>
        <input
          type={"radio"}
          id="female"
          value={"female"}
          //   ref={femaleRef}
          name="gender"
        />
        <label htmlFor="female">Female</label>
      </div>
      <div className="item">
        <label>status :</label>
        <input value={"active"} readOnly />
      </div>
      <div className="item">
        <button type="submit" onClick={saveDataAndClose}>
          Save
        </button>
      </div>
      <div className="item">
        <button type="submit" onClick={ClearData}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default Create;
