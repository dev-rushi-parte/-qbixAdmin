import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Box, Anchor } from "../../components/elements";
import { CardLayout, CardHeader } from "../../components/cards";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/productUpload.json";
import { getLocalData } from "../../Utils/localStorage";
import { LoaderProvider } from "../../context/Preloader";

export default function SliderImage() {

    const [productData, setProductData] = useState()
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)


        fetch(`https://qbix54.onrender.com/admin/allslider?admin_jwt=${getLocalData("boxApi")}`)
            .then((res) => res.json())
            .then((res) => {
                setProductData(res.data)
                console.log(res.data)
                setLoading(false)

            })

    }, [])



    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title={'Slider Images'}>

                        </Breadcrumb>
                    </CardLayout>
                </Col>
                <LoaderProvider loading={loading}>



                    <Row xl={12}>
                        <CardLayout>
                            <CardHeader title="media &amp; published" dotsMenu={data?.dotsMenu} />

                            {productData?.map((item, i) => (
                                <div style={{ display: 'flex', marginTop: '20px' }} key={i}>
                                    <div>
                                        <img className="object-fit-contain" src={item?.sliderimage} alt='img' />
                                    </div>
                                    <div style={{ marginTop: '190px' }} className=' w-100 p-2 '>
                                        <Box className="mc-table-action">
                                            <Anchor
                                                href={`/slider_img_edit${item._id}`}
                                                title="Edit"
                                                className="material-icons edit mc-btn w-100 primary mt-5 fs-6 ">edit</Anchor>
                                        </Box>
                                    </div>
                                </div>

                            ))}


                        </CardLayout>
                    </Row>
                </LoaderProvider>
            </Row>
        </PageLayout>
    )
}