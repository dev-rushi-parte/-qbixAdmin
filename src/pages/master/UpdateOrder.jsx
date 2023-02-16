import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Anchor } from "../../components/elements";
import { LabelField, LabelTextarea } from "../../components/fields";
import { CardLayout, CardHeader } from "../../components/cards";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/productUpload.json";
import { getLocalData } from "../../Utils/localStorage";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderProvider } from "../../context/Preloader";

export default function UpdateOrder() {

    const [productData, setProductData] = useState({ orderstatus: "", transactionstatus: "", ordermessagefromadmin: "", ordermessage: "" })
    const [status, setStatus] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        fetch(`https://api.hthindia.in/admin/getorders/${id}?admin_jwt=${getLocalData("boxApi")}`)
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

        setLoading(true)

        fetch(`https://api.hthindia.in/admin/orderupdate/${id}?admin_jwt=${getLocalData("boxApi")}`, {
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
                                <Col xl={6}><LabelField value={productData?.orderstatus} onChange={handleChange} name='orderstatus' label="Order Status" option={['pending', 'completed']} fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelField value={productData?.transactionstatus} onChange={handleChange} name='transactionstatus' label="Transaction Status" option={['pending', 'completed']} fieldSize="w-100 h-md" /></Col>
                                <Col xl={12}><LabelTextarea value={productData?.ordermessagefromadmin} onChange={handleChange} name='ordermessagefromadmin' label="Order Message From Admin" fieldSize="w-100 h-text-md" /></Col>

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