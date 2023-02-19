import { useState } from 'react';
import axios from 'axios';
import Schemas from './Schemas';
import './CSS/home.css'
import { useLocation } from 'react-router-dom';
export default function Home() {

    const location = useLocation();
    const requsetBody = location.state;
    const [catOpen, setCatOpen] = useState(false);
    const [scheOpen, setScheOpen] = useState(false);
    const [selectedCat, setSelectedCat] = useState('');
    const [catalogs, setCatalogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleCatalog = () => {
        setCatOpen(!catOpen)
        if (catalogs.length === 0) {
            axios.post("http://localhost:8080/dextrus/", requsetBody)
                .then((response) => {
                    setCatalogs(response.data);
                    console.log(response.data);
                    setLoading(false)
                })
                .catch((error) => {
                    alert("something went wrong");
                    console.log(error)
                })
        }
    }
    const handleSchema = (catalog) => {
        setScheOpen(!scheOpen);
        setSelectedCat(catalog);
        console.log(selectedCat);
    };
    return (
        <div>
            <div className="cat-main">
                <div className="cat-head" onClick={handleCatalog}>
                    <span> <i className="bi bi-journal"></i>Catalogs{catOpen ? <i className="bi bi-caret-up toggle-btn"></i> : <i className="bi bi-caret-down toggle-btn"></i>}</span>
                </div>
                {
                    catOpen && (
                        <div className="cat-cnt" >

                            {
                                loading ? (
                                    <div>loading...
                                    </div>
                                ) : (
                                    catalogs.map((catalog) => (
                                        <div key={catalog} className="catalog-cnt" >
                                            <div onClick={() => handleSchema(catalog)}>
                                                {selectedCat === catalog && scheOpen ? <i className="bi bi-database-dash"></i> : <i className="bi bi-database-add"></i>}
                                                {catalog}
                                            </div>
                                            {selectedCat === catalog && scheOpen && (
                                                <div><Schemas body={requsetBody} catalog={selectedCat} />
                                                </div>
                                            )
                                            }
                                        </div>
                                    ))
                                )}
                        </div>
                    )}
            </div>
        </div>
    )

}