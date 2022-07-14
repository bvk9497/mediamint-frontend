import React, { useEffect, useState } from "react";
import "./view.scss";
import { CSVLink } from "react-csv";
const View = (props) => {
  const [listdata, setListData] = useState(props?.data);

  const headers = [
    { label: "Id", key: "ID" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Gender", key: "gender" },
    { label: "Status", key: "status" },
  ];

  console.log(props.data);
  useEffect(() => {
    setListData(props.data);
  }, [props.data]);

  const btntoView = (ID) => {
    props.getItemtobeEdited(ID);
  };

  return (
    <div className="view">
      <div className="top">
        <h2>Existing users</h2>
        {listdata && (
          <CSVLink data={listdata} headers={headers} className="export">
            Export to CSV
          </CSVLink>
        )}
      </div>
      {listdata?.map((item, i) => (
        <DataItem data={item} edit={btntoView} key={i} />
      ))}
    </div>
  );
};

const DataItem = ({ data, edit }) => {
  const editBtnHandler = () => {
    edit(data.ID);
  };
  return (
    <div className="dataitem">
      <div className="item">
        <label>ID :</label>
        <p>{data.ID} </p>
      </div>
      <div className="item">
        <label>Name :</label>
        <p>{data.name} </p>
      </div>
      <div className="item">
        <label>email :</label>
        <p>{data.email} </p>
      </div>
      <div className="item">
        <label>gender :</label>
        <p>{data.gender} </p>
      </div>
      <div className="item">
        <label>status :</label>
        <p>{data.status} </p>
      </div>
      <div className="item">
        <button onClick={editBtnHandler}>Edit</button>
      </div>
    </div>
  );
};

export default View;
