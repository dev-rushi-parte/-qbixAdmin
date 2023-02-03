import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Anchor } from "../../components/elements";
import { LabelField } from "../../components/fields";
import { CardLayout, CardHeader } from "../../components/cards";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/productUpload.json";
import { getLocalData } from "../../Utils/localStorage";
import { useNavigate } from "react-router-dom";
import { LoaderProvider } from "../../context/Preloader";

export default function AddSliderImg() {

    const [productData, setProductData] = useState({ sliderimage: "" })
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)



    const handleChange = (e) => {
        const { name, value } = e.target;

        setProductData(prevState => ({
            ...prevState,
            [name]: value
        }));

    }

    console.log(productData)

    const handelSubmit = () => {

        if (productData.sliderimage !== "") {
            setLoading(true)
            fetch(`https://qbix54.onrender.com/admin/slider_img_add/?admin_jwt=${getLocalData("boxApi")}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sliderimage: productData.sliderimage })
            })
                .then((res) => res.json())
                .then((res) => {

                    setLoading(false)
                    navigate(-1)

                })
        }
        else {
            alert("Enter Image Url")

        }

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

                                <Col xl={12}><LabelField value={productData?.sliderimage} onChange={handleChange} name='sliderimage' type="text" label="Slider Image" fieldSize="w-100 h-md" /></Col>

                            </Row>
                        </CardLayout>
                    </Col>

                    <Col xl={12}>
                        <CardLayout>


                            <Anchor
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