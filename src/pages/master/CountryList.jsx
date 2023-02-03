import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { Breadcrumb, Pagination } from "../../components";
import LabelField from "../../components/fields/LabelField";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/CountryList.json";
import { getLocalData } from "../../Utils/localStorage";
import { LoaderProvider } from "../../context/Preloader";
import CountryTable from "../../components/tables/CountryTable";

export default function CountryList() {
    const [tbody, setTbody] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        fetch(`https://qbix54.onrender.com/admin/getcountry?admin_jwt=${getLocalData("boxApi")}`)
            .then((res) => res.json())
            .then((res) => {
                setTbody(res.data)
                console.log(res.data)

                setLoading(false)

            })
    }, [])
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
                    <Col xl={4} key={index}>
                        <FloatCard
                            variant={item.variant}
                            digit={item.digit}
                            title={item.title}
                            icon={item.icon}
                        />
                    </Col>
                ))} */}
                    <Col xl={12}>
                        <CardLayout>
                            {/* <CardHeader title={data?.cardTitle} dotsMenu={data?.dotsMenu} /> */}
                            {/* <Row xs={1} sm={4} className="mb-4">
                            {data?.filter.map((item, index) => (
                                <Col key={index}>
                                    <LabelField
                                        type={item.type}
                                        label={item.label}
                                        option={item.option}
                                        placeholder={item.placeholder}
                                        labelDir="label-col"
                                        fieldSize="w-100 h-sm"
                                    />
                                </Col>
                            ))}
                        </Row> */}
                            <CountryTable
                                thead={data?.table.thead}
                                tbody={tbody}
                            />
                            {/* <Pagination /> */}
                        </CardLayout>
                    </Col>
                </LoaderProvider>

            </Row>

        </PageLayout>
    );
}