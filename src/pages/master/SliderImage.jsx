import React, { useEffect, useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { Box, Anchor, Icon, Heading, Text, Button } from "../../components/elements";
import { CardLayout, CardHeader } from "../../components/cards";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/productUpload.json";
import { getLocalData } from "../../Utils/localStorage";
import { LoaderProvider } from "../../context/Preloader";

export default function SliderImage() {

    const [productData, setProductData] = useState()
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const [alertModal, setAlertModal] = React.useState(false);

    const handelDeleteId = (id) => {
        console.log(id)
        setDeleteId(id)
        setAlertModal(true)
    }

    const handelDeletet = () => {

        if (deleteId !== "") {
            fetch(`https://api.hthindia.in/admin/slider_img_delete/${deleteId}?admin_jwt=${getLocalData("boxApi")}`, {
                method: "DELETE"
            })
                .then((res) => res.json())
                .then((res) => {
                    // setproductData(res.data[0])
                    console.log(res)
                    setAlertModal(false)
                    setAlertModal(false)
                    setStatus(prv => !prv)


                })
        }
    }
    useEffect(() => {


        setLoading(true)
        fetch(`https://api.hthindia.in/admin/allslider?admin_jwt=${getLocalData("boxApi")}`)
            .then((res) => res.json())
            .then((res) => {
                setProductData(res.data)
                console.log(res.data)
                setLoading(false)

            })

    }, [status])



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
                        <CardLayout >
                            <CardHeader title="media &amp; published" dotsMenu={data?.dotsMenu} />
                            <div style={{ display: 'flex', justifyContent: "space-evenly", marginTop: '20px', width: '100%' }}>
                                {productData?.map((item, i) => (
                                    <div key={i}>
                                        <div>
                                            <img className="object-fit-contain w-75" src={item?.sliderimage} alt='img' />
                                        </div>
                                        <div style={{}} className=' w-75 p-2 '>
                                            <Box className="mc-table-action">
                                                <Anchor
                                                    style={{ fontSize: '12px', fontFamily: "system-ui" }}
                                                    href={`/slider_img_edit${item._id}`}
                                                    title="Edit"
                                                    className="material-icons edit mc-btn w-100 primary mt-5  ">edit</Anchor>
                                                <Anchor
                                                    onClick={() => handelDeleteId(item._id)}
                                                    style={{ fontSize: '12px', fontFamily: "system-ui" }}
                                                    title="Edit"
                                                    className="material-icons delete mc-btn w-100 primary mt-5">Delete</Anchor>
                                            </Box>

                                        </div>
                                    </div>

                                ))}

                            </div>
                            <Box className="mc-table-action" style={{ display: 'flex', justifyContent: "center" }}>
                                <Anchor
                                    style={{ backgroundColor: "black", color: 'white' }}
                                    href={`/slider_img_add`}
                                    title="Add image"
                                    className=" mc-btn w-50 p-2  mt-5 fs-6 ">Add image</Anchor>
                            </Box>

                            <Modal show={alertModal} onHide={() => setAlertModal(false)}>
                                <Box className="mc-alert-modal">
                                    <Icon type="new_releases" />
                                    <Heading as="h3">are your sure!</Heading>
                                    <Text as="p">Want to Delete?</Text>
                                    <Modal.Footer>
                                        <Button type="button" className="btn btn-secondary" onClick={() => setAlertModal(false)}>nop, close</Button>
                                        <Button type="button" className="btn btn-danger" onClick={handelDeletet}>yes, Delete</Button>
                                    </Modal.Footer>
                                </Box>
                            </Modal>
                        </CardLayout>
                    </Row>
                </LoaderProvider>
            </Row >
        </PageLayout >
    )
}