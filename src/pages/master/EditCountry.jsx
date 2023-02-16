import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Box, Anchor, Button, Image, Input, Label, Icon, Text } from "../../components/elements";
import { LabelField, LabelTextarea } from "../../components/fields";
import { CardLayout, CardHeader } from "../../components/cards";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/productUpload.json";
import { getLocalData } from "../../Utils/localStorage";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderProvider } from "../../context/Preloader";

export default function EditCountry() {

    const [productData, setProductData] = useState({ countryname: "", deliveryamount: "", packackagingcharges: "", taxamount: "" })
    const [status, setStatus] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        // setLoading(true)


        fetch(`https://api.hthindia.in/admin/get_one_country/${id}?admin_jwt=${getLocalData("boxApi")}`)
            .then((res) => res.json())
            .then((res) => {
                setProductData(res.data[0])
                console.log(res.data[0])
                setLoading(false)

            })

    }, [status])



    const handleChange = (e) => {
        const { name, value } = e.target;

        setProductData(prevState => ({
            ...prevState,
            [name]: value
        }));

    }


    const handelSubmit = () => {
        // console.log(productData)
        setLoading(true)

        fetch(`https://api.hthindia.in/admin/editcountry/${id}?admin_jwt=${getLocalData("boxApi")}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        })
            .then((res) => res.json())
            .then((res) => {
                setStatus(prv => !prv)
                setLoading(false)
                navigate(-1)

            })

    }

    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title={'Order Edit'}>

                        </Breadcrumb>
                    </CardLayout>
                </Col>
                <LoaderProvider loading={loading}>

                    <Col xl={12}>
                        <CardLayout>
                            <CardHeader title="basic information" dotsMenu={data?.dotsMenu} />
                            <Row>
                                <Col xl={6}><LabelField value={productData?.countryname} onChange={handleChange} name='countryname' type="text" label="country name" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelField value={productData?.deliveryamount} onChange={handleChange} name='deliveryamount' type="text" label="delivery amount" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelField value={productData?.packackagingcharges} onChange={handleChange} name='packackagingcharges' type="text" label="packing charges" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelField value={productData?.taxamount} onChange={handleChange} name='taxamount' type="text" label="tax amount" fieldSize="w-100 h-md" /></Col>

                            </Row>
                        </CardLayout>
                    </Col>

                    <Col xl={12}>
                        <CardLayout>

                            <Anchor
                                disabled
                                onClick={handelSubmit}
                                className="mc-btn w-100 primary mt-5"
                                text="Update"
                                icon="cloud_upload"
                                href="#"
                            />
                        </CardLayout>
                    </Col>
                </LoaderProvider>
            </Row>
        </PageLayout>
    )
}