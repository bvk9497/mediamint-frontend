import logo from "./logo.svg";
import "./App.scss";
import View from "./Components/View/View";
import Edit from "./Components/Edit/Edit";
import { useEffect, useState } from "react";
import axios from "axios";
import Create from "./Components/Create/Create";

function App() {
  const [isView, setView] = useState(true);

  const [data, setData] = useState();
  const [editID, setEditID] = useState();

  const [reload, setReload] = useState("");

  const loadData = async () => {
    try {
      const data = await axios.get(`http://localhost:5000/`);
      console.log(data);
      setData(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, [reload]);

  const [editFiledata, setEditFileData] = useState();
  const updateEdit = (ID) => {
    setEditID(ID);
    setView(false);
    let a = data.filter((item) => item.ID === ID);
    console.log(a);
    setEditFileData(a);
  };
  useEffect(() => {}, [editID, isView]);

  const closeEdit = () => {
    setView(true);
    setReload("reload");
  };

  const reloadOnCreate = () => {
    setReload("reload");
  };

  return (
    <div className="App">
      {isView && <Create getAction={reloadOnCreate} />}
      {isView ? (
        <View getItemtobeEdited={updateEdit} data={data} />
      ) : (
        <Edit editID={editID} data={editFiledata} getAction={closeEdit} />
      )}
    </div>
  );
}

export default App;
