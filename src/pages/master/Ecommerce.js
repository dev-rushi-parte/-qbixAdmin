import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Breadcrumb } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/ecommerce.json";
import { Box, Item, Anchor } from "../../components/elements";
import { EcommerceCard, SalesCard, ProductsCard, RevenueCard, ClientsCard, ActivityCard, OrdersCard } from "../../components/cards";
import { getLocalData, SaveTheToken } from "../../Utils/localStorage";
import { useNavigate } from "react-router-dom";
import { LoaderProvider } from "../../context/Preloader";


export default function Ecommerce() {
    const navigate = useNavigate()
    const [state, setState] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (!getLocalData("boxApi")) {
            navigate("/login")
        }
        else {

            fetch(`https://qbix54.onrender.com/admin/allusers?admin_jwt=${getLocalData("boxApi")}`)
                .then((res) => res.json())
                .then((res) => {

                    SaveTheToken("allusers", res.data.length)
                    setState(prv => !prv)
                    setLoading(false)

                })




            fetch(`https://qbix54.onrender.com/admin/allorders?admin_jwt=${getLocalData("boxApi")}`)
                .then((res) => res.json())
                .then((res) => {
                    if (res.message) {
                        SaveTheToken("allorders", 0)
                        setLoading(false)

                    }
                    else {
                        SaveTheToken("allorders", res.data.length)
                        setState(prv => !prv)
                        setLoading(false)
                    }

                })
            fetch(`https://qbix54.onrender.com/admin/allproduct?admin_jwt=${getLocalData("boxApi")}`)
                .then((res) => res.json())
                .then((res) => {
                    if (res.message) {
                        SaveTheToken("allproducts", 0)
                        setLoading(false)

                    } else {
                        setLoading(false)
                        SaveTheToken("allproducts", res.data.length)
                        setState(prv => !prv)
                    }

                })

        }
    }, [])


    return (


        <PageLayout>
            <Row>
                <Col xl={12}>
                    <Box className="mc-card">
                        <Breadcrumb title={data?.pageTitle}>

                        </Breadcrumb>
                    </Box>
                </Col>
                <LoaderProvider loading={loading}>
                    <Col xs={12} xl={8}>
                        <Row xs={1} sm={2}>
                            {/* {data?.heros?.map((item, index) => ( */}
                            <Col >
                                <EcommerceCard
                                    icon={"account_circle"}
                                    // trend={'trending_up'}
                                    title={"total users"}
                                    number={getLocalData('allusers')}
                                    variant={"green"}
                                // percent={item.percent}
                                // compare={item.compare}
                                // dotsMenu={item.dotsMenu}
                                />
                            </Col>
                            <Col >
                                <EcommerceCard
                                    icon={"shopping_cart"}
                                    // trend={'trending_down'}
                                    title={"total orders"}
                                    number={getLocalData('allorders')}
                                    variant={"purple"}
                                // percent={item.percent}
                                // compare={item.compare}
                                // dotsMenu={item.dotsMenu}
                                />
                            </Col>
                            <Col >
                                <EcommerceCard
                                    icon={"shopping_bag"}
                                    // trend={'trending_down'}
                                    title={"total products"}
                                    number={getLocalData('allproducts')}
                                    variant={"blue"}
                                // percent={item.percent}
                                // compare={item.compare}
                                // dotsMenu={item.dotsMenu}
                                />
                            </Col>
                            {/* ))} */}
                        </Row>
                    </Col>
                    <Col xs={12} xl={4}>
                        <SalesCard
                            title={"Total Revenue"}
                            amount={"₹40000"}
                            // percent={data?.sales.percent}
                            // trendIcon={data?.sales.trendIcon}
                            // dotsMenu={data?.sales.dotsMenu}
                            compare={"₹40000"}
                        // chart={data?.sales.chart}
                        />
                    </Col>
                    <Col xl={12}>
                        <ProductsCard
                            title={data?.products.title}
                            dotsMenu={data?.products.dotsMenu}
                            table={data?.products.table}
                        />
                    </Col>
                </LoaderProvider>

                {/* <Col xl={8}>
                    <RevenueCard
                        title={data?.revenue.title}
                        field={data?.revenue.field}
                        report={data?.revenue.report}
                        chart={data?.revenue.chart}
                    />
                </Col> */}
                {/* <Col xl={4}>
                    <OrdersCard
                        title={data?.orders.title}
                        dotsMenu={data?.orders.dotsMenu}
                        items={data?.orders.items}
                    />
                </Col> */}
                {/* <Col xl={6}>
                    <ClientsCard
                        title={data?.clients.title}
                        dotsMenu={data?.clients.dotsMenu}
                        table={data?.clients.table}
                    />
                </Col> */}
                {/* <Col xl={6}>
                    <ActivityCard
                        title={data?.activity.title}
                        dotsMenu={data?.activity.dotsMenu}
                        items={data?.activity.items}
                    />
                </Col> */}
            </Row>
        </PageLayout>
    );
}
