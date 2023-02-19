import axios from "axios";
import { useState } from "react"
export default function Columns(props) {
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true)


    axios.post("http://localhost:8080/dextrus/" + props.catalog + "/" + props.schema + "/" + props.table, props.body)
        .then((response) => {
            setColumns(response.data.map((column) => column.columnName))
            console.log(response.data)
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
        })
    return (
        <div col-cnt>
            {
                loading ? (<div>loading...</div>) :
                    (
                        columns.map(column => (
                            <div>
                                <div className="col-display"><i class="bi bi-columns"></i>{column}</div>
                            </div>
                        )
                        )
                    )
            }
        </div>
    )
}