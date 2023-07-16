import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
function App() {
  useEffect(() => {
    fetch("http://localhost:4000/admin/allAdmins/", {
            method: "GET",
            // headers: {
            //     "Authorization": "Bearer " + localStorage.getItem("token")
            // }
        }).then((data) => {
      console.log(data);
    }

    );

  }, [])


  return (
    <div className="App">

    </div>
  );
}

export default App;
