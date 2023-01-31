import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Anchor, Heading, Box, Text, Input, Image, Icon, Button } from "../elements";
import { Link, useNavigate } from "react-router-dom";
import { getLocalData } from "../../Utils/localStorage";

export default function ProductsTable({ thead, tbody, setStatusChange }) {

    const [alertModal, setAlertModal] = useState(false);
    const [data, setData] = useState([]);
    const [deleteId, setDeleteId] = useState()

    const navigate = useNavigate()
    useEffect(() => { setData(tbody) }, [tbody]);
    console.log(data)
    const handleCheckbox = (event) => {
        const { name, checked } = event.target;

        if (name === "allCheck") {
            const checkData = data?.map((item) => {
                return { ...item, isChecked: checked };
            });
            setData(checkData);
        }
        else {
            const checkData = data?.map((item) =>
                item.name === name ? { ...item, isChecked: checked } : item
            );
            setData(checkData);
        }
    }

    const handelShow = (id) => {
        setAlertModal(true)
        setDeleteId(id)
    }
    console.log(deleteId)
    const handelDelete = () => {

        fetch(`https://qbix54.onrender.com/admin/deleteproduct/${deleteId}?admin_jwt=${getLocalData("boxApi")}`, {
            method: "DELETE"
        })
            .then((res) => res.json())
            .then((res) => {
                // setproductData(res.data[0])
                console.log(res)
                setAlertModal(false)
                setStatusChange(prv => !prv)

            })

    }

    return (
        <Box className="mc-table-responsive">
            <Table className="mc-table product">
                <Thead className="mc-table-head primary">
                    <Tr>
                        <Th>
                            <Box className="mc-table-check">
                                <Input
                                    type="checkbox"
                                    name="allCheck"
                                    checked={data?.filter((item) => item.isChecked !== true).length < 1}
                                    onChange={handleCheckbox}
                                />
                                <Text>uid</Text>
                            </Box>
                        </Th>
                        {thead.map((item, index) => (
                            <Th key={index}>{item}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody className="mc-table-body even">
                    {data?.map((item, index) => (
                        <Tr key={index}>
                            <Td title={index + 1}>
                                <Box className="mc-table-check">
                                    <Input
                                        type="checkbox"
                                        name={item.name}
                                        checked={item?.isChecked || false}
                                        onChange={handleCheckbox}
                                    />
                                    <Text>#{index + 1}</Text>
                                </Box>
                            </Td>
                            <Td>
                                <Box className="mc-table-product md">
                                    <Image src={item.productimage1} alt={item.alt} />
                                    <Box className="mc-table-group">
                                        <Heading as="h6">{item.producttitle}</Heading>
                                        <Text>{item.productdescription}</Text>
                                    </Box>
                                </Box>
                            </Td>
                            <Td>{item.productcategoryname}</Td>

                            <Td>
                                <Box className="mc-table-price">

                                    <Text>{item.productprice}</Text>
                                </Box>
                            </Td>
                            <Td>{item.productstatus}</Td>
                            {/* <Td>
                                <Box className="mc-table-rating">
                                    <Icon>{ item.rating.icon }</Icon>
                                    <Heading>{ item.rating.percent }</Heading>
                                    <Text>({ item.rating.number })</Text>
                                </Box>
                            </Td> */}
                            <Td>{item.productvariation}</Td>
                            <Td>{item.variationtype}</Td>
                            <Td>
                                <Box className="mc-table-action">
                                    <Anchor href={`/product-view${item._id}`} title="View" className="material-icons view">visibility</Anchor >
                                    {/* <Anchor href={`/product-edit${item._id}`} title="View" className="material-icons view">brand</Anchor > */}
                                    <Anchor href={`/product-edit${item._id}`} title="Edit" className="material-icons edit">edit</Anchor>
                                    <Button title="Delete" className="material-icons delete" onClick={() => handelShow(item._id)}>delete</Button>
                                </Box>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table >

            <Modal show={alertModal} onHide={() => setAlertModal(false)}>
                <Box className="mc-alert-modal">
                    <Icon type="new_releases" />
                    <Heading as="h3">are your sure!</Heading>
                    <Text as="p">Want to delete this product?</Text>
                    <Modal.Footer>
                        <Button type="button" className="btn btn-secondary" onClick={() => setAlertModal(false)}>nop, close</Button>
                        <Button type="button" className="btn btn-danger" onClick={() => handelDelete()}>yes, delete</Button>
                    </Modal.Footer>
                </Box>
            </Modal>
        </Box >
    );
}