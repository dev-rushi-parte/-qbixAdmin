import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import ProductsTable from "../../components/tables/ProductsTable";
import { Breadcrumb } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/productList.json";
import { getLocalData, SaveTheToken } from "../../Utils/localStorage";
import { LoaderProvider } from "../../context/Preloader";

export default function ProductList() {
    const [tbody, setTbody] = useState()
    const [status, setStatusChange] = useState(false)
    const [loading, setLoading] = useState(true)

    // let thead = ["product", "category", "brand", "price", "stock", "rating", "order", "sales", "action"],
    useEffect(() => {
        setLoading(true)
        fetch(`https://api.hthindia.in/admin/allproduct?admin_jwt=${getLocalData("boxApi")}`)
            .then((res) => res.json())
            .then((res) => {
                if (res.message) {
                    SaveTheToken("allproducts", 0)
                    setLoading(false)

                }
                else {
                    setTbody(res.data)
                    SaveTheToken("allproducts", res.data.length)
                    console.log(res)
                    setLoading(false)
                }
            })
    }, [status])

    function handleChange(newValue) {
        setStatusChange(newValue);
    }


    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title={data?.pageTitle}>

                        </Breadcrumb>
                    </CardLayout>
                </Col>
                <LoaderProvider loading={loading}>


                    <Col xl={12}>
                        <CardLayout>
                            <Row>

                                <Col xl={12}>
                                    <ProductsTable
                                        thead={data?.product.thead}
                                        tbody={tbody}
                                        handleChange={handleChange}
                                    />
                                    {/* <Pagination /> */}
                                </Col>
                            </Row>
                        </CardLayout>
                    </Col>
                </LoaderProvider>
            </Row>
        </PageLayout>
    );
}
