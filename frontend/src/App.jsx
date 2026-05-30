import { useEffect, useState } from "react";
import axios from "axios";


function App() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/states")
      .then((res) => {
        setStates(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleStateChange = async (e) => {
    const stateCode = e.target.value;

    const res = await axios.get(
      `http://localhost:5000/districts/${stateCode}`
    );

    setDistricts(res.data);
    setSubdistricts([]);
    setVillages([]);
  };

  const handleDistrictChange = async (e) => {
    const districtCode = e.target.value;

    const res = await axios.get(
      `http://localhost:5000/subdistricts/${districtCode}`
    );

    setSubdistricts(res.data);
    setVillages([]);
  };

  const handleSubdistrictChange = async (e) => {
    const subdistrictCode = e.target.value;

    const res = await axios.get(
      `http://localhost:5000/villages/${subdistrictCode}`
    );

    setVillages(res.data);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Village Finder</h1>

      <select onChange={handleStateChange}>
        <option>Select State</option>

        {states.map((state) => (
          <option key={state.code} value={state.code}>
            {state.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <select onChange={handleDistrictChange}>
        <option>Select District</option>

        {districts.map((district) => (
          <option key={district.code} value={district.code}>
            {district.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <select onChange={handleSubdistrictChange}>
        <option>Select Subdistrict</option>

        {subdistricts.map((subdistrict) => (
          <option key={subdistrict.code} value={subdistrict.code}>
            {subdistrict.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <select>
        <option>Select Village</option>

        {villages.map((village) => (
          <option key={village.code} value={village.code}>
            {village.name}
          </option>
        ))}
      </select>
    </div>
  );
}
<div style={{
  width: "400px",
  margin: "50px auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "10px"
}}></div>

export default App;