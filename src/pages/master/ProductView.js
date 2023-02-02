import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Anchor, Box, Item, Text, Icon, List, Image, Heading, Button } from "../../components/elements";
import { CustomerReview, RatingAnalytics } from "../../components/review";
import { Breadcrumb, DivideTitle } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import LabelTextarea from "../../components/fields/LabelTextarea";
import CardLayout from "../../components/cards/CardLayout";
import data from "../../data/master/productView.json";
import { useParams } from "react-router-dom";
import { getLocalData } from "../../Utils/localStorage";
import { LoaderProvider } from "../../context/Preloader";

export default function ProductView() {
    const { id } = useParams();
    console.log(id)
    const [loading, setLoading] = useState(false)

    const [productData, setproductData] = useState()

    console.log(productData)
    useEffect(() => {
        setLoading(true)
        fetch(`https://qbix54.onrender.com/admin/getproduct/${id}?admin_jwt=${getLocalData("boxApi")}`)
            .then((res) => res.json())
            .then((res) => {
                setproductData(res.data[0])
                console.log(res)
                setLoading(false)


            })
    }, [])
    console.log(productData?.productimage1 == "")
    return (
        <PageLayout>
            <CardLayout className="mb-4">
                <Breadcrumb title={data?.pageTitle}>

                </Breadcrumb>
            </CardLayout>
            <LoaderProvider loading={loading}>

                <CardLayout className="p-lg-5">
                    <Row>
                        <Col xl={5}>
                            <DivideTitle title="product gallery" className="mb-4" />
                            <Box className="mc-product-view-gallery">
                                {/* {data?.gallery.map((item, index) => ( */}
                                {productData?.productimage1 == "" ? "" : <Image src={productData?.productimage1} alt={productData?.producttitle} />}
                                {productData?.productimage2 == "" ? "" : <Image src={productData?.productimage2} alt={productData?.producttitle} />}
                                {productData?.productimage3 == "" ? "" : <Image src={productData?.productimage3} alt={productData?.producttitle} />}
                                {productData?.productimage4 == "" ? "" : <Image src={productData?.productimage4} alt={productData?.producttitle} />}
                                {/* <Image src={productData?.productimage2} alt={productData?.producttitle} />
                                <Image src={productData?.productimage3} alt={productData?.producttitle} />
                                <Image src={productData?.productimage4} alt={productData?.producttitle} /> */}
                                {/* ))} */}
                            </Box>
                        </Col>
                        <Col xl={7}>
                            <DivideTitle title="product details" className="mb-4" />
                            <Box className="mc-product-view-info-group">
                                <Heading as="h2" className="mc-product-view-info-title">{productData?.producttitle}</Heading>

                                <Box className="mc-product-view-meta">
                                    <Icon type={'store'} />
                                    <Heading as="h5">{'Category'}</Heading>
                                    <Text as="span">:</Text>
                                    <Text as="p">{productData?.productcategoryname}</Text>


                                </Box>
                                <Box className="mc-product-view-meta">
                                    <Icon type={'store'} />
                                    <Heading as="h5">{'Variation'}</Heading>
                                    <Text as="span">:</Text>
                                    <Text as="p">{productData?.productvariation}</Text>
                                </Box>
                                <Box className="mc-product-view-meta">
                                    <Icon type={'store'} />
                                    <Heading as="h5">{'Variation Type'}</Heading>
                                    <Text as="span">:</Text>
                                    <Text as="p">{productData?.variationtype}</Text>
                                </Box>
                                <Box className="mc-product-view-meta">
                                    <Icon type={'store'} />
                                    <Heading as="h5">{'Price'}</Heading>
                                    <Text as="span">:</Text>
                                    <Text as="p">{productData?.productprice}</Text>
                                </Box>
                                <Box className="mc-product-view-meta">
                                    <Icon type={'store'} />
                                    <Heading as="h5">{'isvariable'}</Heading>
                                    <Text as="span">:</Text>
                                    <Text as="p">{productData?.isvariable}</Text>
                                </Box>
                                <Box className="mc-product-view-meta">
                                    <Icon type={'store'} />
                                    <Heading as="h5">{'Product Status'}</Heading>
                                    <Text as="span">:</Text>
                                    <Text as="p">{productData?.productstatus}</Text>
                                </Box>

                            </Box>
                        </Col>
                        <Col xl={12}>
                            <DivideTitle title="product specifications" className="mt-5 mb-4" />
                            <Box className="mc-product-view-descrip">
                                <Text>{productData?.specifications}</Text>
                            </Box>
                        </Col>
                        <Col xl={12}>
                            <DivideTitle title="product description" className="mt-5 mb-4" />
                            <Box className="mc-product-view-descrip">
                                <Text>{productData?.productdescription}</Text>
                            </Box>
                        </Col>
                        {/* <Col xl={12}>
                        <DivideTitle title="rating analytics" className="mt-5 mb-4" />
                        <RatingAnalytics
                            graphLine={data?.rating.item}
                            graphScore={data?.rating.score}
                            graphStar={data?.rating.icon}
                            grapTitle={data?.rating.total}
                            graphText={data?.rating.text}
                        />
                    </Col> */}
                        {/* <Col xl={12}>
                        <DivideTitle title="customer reviews" className="mt-5 mb-4" />
                        <CustomerReview data={data?.review} />
                    </Col>
                    <Col xl={12}>
                        <DivideTitle title="review reply form" className="mt-3 mb-4" />
                        <LabelTextarea placeholder="Write here..." fieldSize="w-100 h-text-xl" />
                        <Button className="mc-btn mc-review-form-btn primary">drop your replies</Button>
                    </Col> */}
                    </Row>
                </CardLayout>
            </LoaderProvider>
        </PageLayout>
    )
}