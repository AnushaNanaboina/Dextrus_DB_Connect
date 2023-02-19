import axios from "axios";
import React from "react";
import { useState } from "react";
import Columns from "./Columns";
import "./CSS/home.css";
export default function Tables(props) {
    const [tabOpen, setTabOpen] = useState(false);
    const [colOpen, setColOpen] = useState(false);
    const [tables, setTables] = useState([]);
    const reqBody = props.body;
    const catalog = props.catalog;
    const schema = props.schema;
    const [selectedTable, setSelectedTable] = useState("");
    const [loading, setLoading] = useState(true);

    const handleTable = () => {
        setTabOpen(!tabOpen);
        axios
            .post("http://localhost:8080/dextrus/" + catalog + "/" + schema, reqBody)
            .then((response) => {
                setTables(
                    response.data
                        .filter((table) => table.tableType === 'BASE TABLE')
                        .map((table) => table.tableName)
                );
                console.log(response.data);
                setLoading(false)
                if (response.data.length === 0) {
                    alert("no tables to display")
                }
            })
            .catch((error) => {
                console.log("error");
                console.log(error);
            });
    };
    const handleColumn = (table) => {
        setSelectedTable(table)
        setColOpen(!colOpen);
    };
    return (
        <div className="table-cnt">
            <div className="tab-head" onClick={handleTable}>
                <span>
                    <i class="bi bi-plus-square"></i>Tables
                </span>
                {tabOpen ? (
                    <i className="bi bi-caret-up toggle-btn"></i>
                ) : (
                    <i className="bi bi-caret-down toggle-btn"></i>
                )}
            </div>
            {tabOpen && (
                <div className="table-content">
                    {
                        loading ? (
                            <div>loading...</div>
                        ) : (
                            tables.map((table) => (
                                <div key={table} className="table-cnt">
                                    <div onClick={() => handleColumn(table)}>
                                        {selectedTable === table}
                                        <i class="bi bi-table"></i>
                                        {table}
                                    </div>
                                    {selectedTable === table && colOpen &&
                                        <div>
                                            <Columns body={reqBody} catalog={catalog} schema={schema} table={table}></Columns>
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
