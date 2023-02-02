import React, { useEffect, useState } from "react";
import Box from "../elements/Box";
import CardHeader from "./CardHeader";
import ProductsTable from "../tables/ProductsTable";
import { getLocalData, SaveTheToken } from "../../Utils/localStorage";
import { LoaderProvider } from "../../context/Preloader";

export default function ProductsCard({ title, dotsMenu, table }) {
    const [tbody, setTbody] = useState()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch(`https://qbix54.onrender.com/admin/allproduct?admin_jwt=${getLocalData("boxApi")}`)
            .then((res) => res.json())
            .then((res) => {
                setTbody(res.data)
                console.log(res.data)
                setLoading(false)
                SaveTheToken("allproducts", res.data.length)

            })
    }, [])
    return (
        <LoaderProvider loading={loading}>
            <Box className="mc-card">
                <CardHeader title={title} dotsMenu={dotsMenu} />
                {/* <Row xs={1} sm={2} xl={4} className="mb-4">
                {table.filter.map((item, index) => (
                    <Col key={index}>
                        <LabelField
                            type={item.type}
                            label={item.label}
                            option={item.option}
                            placeholder={item.placeholder}
                            labelDir="label-col"
                            fieldSize="w-100 h-md"
                        />
                    </Col>
                ))}
            </Row> */}
                <ProductsTable thead={table.thead} tbody={tbody} />
                {/* <Pagination /> */}
            </Box>
        </LoaderProvider>
    )
}