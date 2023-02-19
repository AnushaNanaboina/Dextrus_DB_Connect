import React, { useState } from "react";
import axios from "axios";
import './CSS/home.css';
import Tables from "./Tables";
import Views from "./Views";

export default function Schemas(props) {
    const [schemaOpen, setSchemaOpen] = useState(false);
    const [selectedSchema, setSelectedSchema] = useState('');
    const [schemas, setSchemas] = useState([]);
    const catalog = props.catalog;
    const reqBody = props.body;
    const [loading, setLoading] = useState(true);

    if (schemas.length === 0) {
        axios
            .post("http://localhost:8080/dextrus/" + props.catalog, props.body)
            .then((response) => {
                setSchemas(response.data);
                console.log(response.data);
                setLoading(false)
            })
            .catch((error) => {
                console.log("error");
                console.log(error);
            });
    }
    const handleSchema = (schema) => {
        setSelectedSchema(() => schema);
        setSchemaOpen(!schemaOpen);

    }
    return (
        <div >
            <div>
                {
                    loading ? (
                        <div>loading...
                        </div>
                    ) : (
                        schemas.map((schema) => (
                            <div>
                                <div onClick={() => handleSchema(schema)} className="schema-cnt">
                                    {selectedSchema === schema && schemaOpen ? <i class="bi bi-file-earmark-arrow-down"></i> : <i class="bi bi-file-earmark-arrow-up"></i>}
                                    {schema}
                                </div>
                                {schemaOpen && selectedSchema === schema && (
                                    <div className="tab-view-call">
                                        <div>
                                            <Tables body={reqBody} catalog={catalog} schema={selectedSchema} />
                                        </div>
                                        <div>
                                            <Views body={reqBody} catalog={catalog} schema={selectedSchema} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    );
}
