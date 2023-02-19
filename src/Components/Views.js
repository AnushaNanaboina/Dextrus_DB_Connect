import axios from "axios";
import React from "react";
import { useState } from "react";
import Columns from "./Columns";
import "./CSS/home.css";
export default function Views(props) {
    const [tabOpen, setTabOpen] = useState(false);
    const [colOpen, setColOpen] = useState(false);
    const [views, setViews] = useState([]);
    const reqBody = props.body;
    const catalog = props.catalog;
    const schema = props.schema;
    const [selectedview, setSelectedview] = useState("");
    const [loading, setLoading] = useState(true)

    const handleview = () => {
        setTabOpen(!tabOpen);
        axios
            .post("http://localhost:8080/dextrus/" + catalog + "/" + schema, reqBody)
            .then((response) => {
                setViews(
                    response.data
                        .filter((view) => view.tableType === 'VIEW')
                        .map((view) => view.tableName)
                );
                console.log(response.data);
                setLoading(false)
                if (response.data.length === 0) {
                    alert("no views to display")
                }
            })
            .catch((error) => {
                console.log("error");
                console.log(error);
            });
    };
    const handleColumn = (view) => {
        setSelectedview(view)
        setColOpen(!colOpen);
    };
    return (
        <div className="view-cnt">
            <div className="view-head" onClick={handleview}>
                <span>
                    <i class="bi bi-plus-square"></i>Views
                </span>
                {tabOpen ? (
                    <i className="bi bi-caret-up toggle-btn"></i>
                ) : (
                    <i className="bi bi-caret-down toggle-btn"></i>
                )}
            </div>
            {tabOpen && (
                <div className="view-content">
                    {
                        loading ? (
                            <div> loading...</div>
                        ) : (
                            views.map((view) => (
                                <div key={view} className="view-cnt">
                                    <div onClick={() => handleColumn(view)} className="view-style">
                                        {selectedview === view}
                                        <i class="bi bi-files"></i>
                                        {view}
                                    </div>
                                    {selectedview === view && colOpen &&
                                        <div className="col-call">
                                            <Columns body={reqBody} catalog={catalog} schema={schema} table={view}></Columns>
                                        </div>
                                    }
                                </div>
                            ))
                        )
                    }
                </div>
            )}
        </div>
    );
}
