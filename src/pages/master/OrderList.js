import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Item, Anchor } from "../../components/elements";
import { CardLayout, CardHeader, FloatCard } from "../../components/cards";
import { Breadcrumb, Pagination } from "../../components";
import OrdersTable from "../../components/tables/OrdersTable";
import LabelField from "../../components/fields/LabelField";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/orderList.json";
import { getLocalData, SaveTheToken } from "../../Utils/localStorage";
import { LoaderProvider } from "../../context/Preloader";

export default function OrderList() {
    const [tbody, setTbody] = useState()
    const [loading, setLoading] = useState(true)
    const [paymentStatus, setPaymentStatus] = useState("completed")
    useEffect(() => {
        setLoading(true)
        fetch(`https://api.hthindia.in/admin/allorders?admin_jwt=${getLocalData("boxApi")}`)
            .then((res) => res.json())
            .then((res) => {
                if (res.message) {
                    SaveTheToken("allorders", 0)


                }
                else {

                    SaveTheToken("allorders", res.data.length)

                }
            })


        fetch(`https://api.hthindia.in/admin/orderfilter?filter=completed&admin_jwt=${getLocalData("boxApi")}`)
            .then((res) => res.json())
            .then((res) => {
                if (res.message) {
                    SaveTheToken("allorders", 0)
                    setLoading(false)

                }
                else {
                    setTbody(res.data)
                    // console.log(res)
                    SaveTheToken("allorders", res.data.length)
                    setLoading(false)
                }
            })
    }, [])

    const handleStatus = (e) => {
        // console.log(e.target.value)

        setPaymentStatus(e.target.value)
        if (e.target.value !== "select") {
            setLoading(true)
            fetch(`https://api.hthindia.in/admin/orderfilter?filter=${e.target.value}&admin_jwt=${getLocalData("boxApi")}`)
                .then((res) => res.json())
                .then((res) => {
                    setTbody(res.data)
                    // console.log(res.data)
                    setLoading(false)

                })
        }
        else {
            setLoading(true)

            fetch(`https://api.hthindia.in/admin/allorders?admin_jwt=${getLocalData("boxApi")}`)
                .then((res) => res.json())
                .then((res) => {
                    if (res.message) {
                        SaveTheToken("allorders", 0)
                        setLoading(false)

                    }
                    else {
                        setTbody(res.data)
                        // console.log(res)
                        SaveTheToken("allorders", res.data.length)
                        setLoading(false)
                    }
                })
        }

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

                    {/* {data?.float.map((item, index) => (
                    <Col key={ index } xl={3}>
                        <FloatCard 
                            variant = { item.variant }
                            digit = { item.digit }
                            title = { item.title }
                            icon = { item.icon }
                        />
                    </Col>
                ))} */}
                    <Col xl={12}>

                        <CardLayout>
                            <CardHeader
                                title="order information"
                                dotsMenu={data?.dotsMenu}
                            />
                            <Row xs={1} sm={4} className="mb-4">
                                {data?.filter.map((item, index) => (
                                    <Col key={index}>
                                        <LabelField
                                            value={paymentStatus}
                                            onChange={handleStatus}
                                            type={item.type}
                                            label={item.label}
                                            option={item.option}
                                            placeholder={item.placeholder}
                                            labelDir="label-col"
                                            fieldSize="w-100 h-md"
                                        />
                                    </Col>
                                ))}
                            </Row>
                            {tbody?.length >= 1 ?
                                <OrdersTable
                                    thead={data?.table.thead}
                                    tbody={tbody}
                                /> : "No Result Found"}

                            {/* <Pagination /> */}

                        </CardLayout>
                    </Col>
                </LoaderProvider>
            </Row>
        </PageLayout>
    )
}