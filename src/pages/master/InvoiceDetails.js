import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Box, Text, List, Item, Image, Anchor, Heading } from "../../components/elements";
import { Table, Thead, Tbody, Th, Tr, Td } from "../../components/elements/Table";
import CardLayout from "../../components/cards/CardLayout";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/invoiceDetails.json";
import { useParams } from "react-router-dom";
import { getLocalData } from "../../Utils/localStorage";
import { LoaderProvider } from "../../context/Preloader";

export default function InvoiceDetails() {

    const [orderData, setOrderData] = useState("");
    const [productData, setProductData] = useState([])
    const { id } = useParams();
    console.log(id)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)


        fetch(`https://qbix54.onrender.com/admin/getorders/${id}?admin_jwt=${getLocalData("boxApi")}`)
            .then((res) => res.json())
            .then((res) => {
                setOrderData(res.data[0])
                console.log(res.data[0])
                setLoading(false)

            })

        fetch(`https://qbix54.onrender.com/admin/getorders_product/${id}?admin_jwt=${getLocalData("boxApi")}`)
            .then((res) => res.json())
            .then((res) => {
                setProductData(res.data)
                console.log(res.data)
                setLoading(false)

            })


    }, [])
    console.log(productData)

    let subtotal = orderData?.amount - orderData?.packackagingcharges - orderData?.deliverycharge - orderData?.tax
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
                        <CardLayout className="p-md-5">
                            <Box className="mc-invoice-head">
                                <Image src={data?.logo.src} alt={data?.logo.alt} />
                                <Heading as="h2">{`invoice ${orderData?._id}`}</Heading>
                            </Box>
                            <Box className="mc-invoice-group">
                                <Box className="mc-invoice-recieved">
                                    <Heading as="h6">{data?.recieved.title}</Heading>

                                    <Text>{`${orderData?.userid?.billingaddress}, 
                                ${orderData?.userid?.country}, 
                               Pin Code:- ${orderData?.userid?.pincode}  
                               Mobile No :-${orderData?.userid?.mobileno}   
                               Name: ${orderData?.userid?.fullname}  
                               Email:${orderData?.userid?.email}`}</Text>

                                </Box>
                                <Box className="mc-invoice-shipment">
                                    <Heading as="h6">{data?.shipment.title}</Heading>

                                    <Text>{`${orderData?.deliveryaddress},  
                                ${orderData?.city} 
                                ${orderData?.state} 
                                ${orderData?.country}
                                ${orderData?.pincode}
                                mobile No:${orderData?.mobileno},
                                Alternate No${orderData?.alternateno}`}</Text>
                                </Box>
                            </Box>
                            <Box className="mc-table-responsive">
                                <Table className="mc-table">
                                    <Thead className="mc-table-head">
                                        <Tr>
                                            {data?.table.thead.map((item, index) => (
                                                <Th key={index}>{item}</Th>
                                            ))}
                                        </Tr>
                                    </Thead>
                                    <Tbody className="mc-table-body">
                                        {productData?.map((item, index) => (
                                            <Tr key={index}>
                                                <Td>{index + 1}</Td>
                                                <Td>
                                                    <Box className="mc-table-product sm">
                                                        <Image src={item?.productid?.productimage1} alt={item?.productid?.producttitle} />
                                                        <Text>{item?.productid?.producttitle}</Text>
                                                    </Box>
                                                </Td>
                                                <Td>{item.price}</Td>
                                                {/* <Td>{`item.discount`}</Td> */}
                                                <Td>{item.qty}</Td>
                                                <Td>{item.finalprice}</Td>
                                            </Tr>

                                        ))}
                                    </Tbody>
                                </Table>
                            </Box>
                            <Box className="mc-invoice-list-group">
                                <List className="mc-invoice-list">
                                    {/* {data?.list.map((item, index) => ( */}
                                    <Item >
                                        <Text as="span" className="title">{"subtotal"}</Text>
                                        <Text as="span" className="clone">:</Text>
                                        <Text as="span" className={`digit }`}>{subtotal}</Text>
                                    </Item>
                                    <Item >

                                        <Text as="span" className="title">{"Packing "}</Text>
                                        <Text as="span" className="clone">:</Text>
                                        <Text as="span" className={`digit }`}>{orderData?.packackagingcharges}</Text>
                                    </Item>
                                    <Item >

                                        <Text as="span" className="title">{"shipping"}</Text>
                                        <Text as="span" className="clone">:</Text>
                                        <Text as="span" className={`digit }`}>{orderData?.deliverycharge}</Text>
                                    </Item>
                                    <Item >

                                        <Text as="span" className="title">{"tax"}</Text>
                                        <Text as="span" className="clone">:</Text>
                                        <Text as="span" className={`digit }`}>{orderData?.tax}</Text>
                                    </Item>
                                    <Item >

                                        <Text as="span" className="title">{"total"}</Text>
                                        <Text as="span" className="clone">:</Text>
                                        <Text as="span" className={`digit total }`}>{orderData?.amount}</Text>
                                    </Item>




                                    {/* {item.digit && <Text as="span" className={`digit ${item.addClass ? item.addClass : ""}`}>{item.digit}</Text>} */}
                                    {/* {item.status && <Text as="span" className={`status ${item.variant ? item.variant : ""}`}>{item.status}</Text>} */}


                                </List>
                            </Box>

                            {/* <Box className="mc-invoice-btns">
                            {data?.button.map((item, index) => (
                                <Anchor
                                    key={index}
                                    href={item.path}
                                    icon={item.icon}
                                    text={item.text}
                                    className={item.classes}
                                />
                            ))}
                        </Box> */}
                        </CardLayout>
                    </Col>
                </LoaderProvider>
            </Row>
        </PageLayout>
    )
}