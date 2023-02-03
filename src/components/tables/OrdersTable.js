import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Image, Input, Text, Box, Icon, Button, Heading, Anchor } from "../elements";

export default function OrderTable({ thead, tbody }) {
    const [alertModal, setAlertModal] = React.useState(false);
    const [data, setData] = useState([]);

    useEffect(() => { setData(tbody) }, [tbody]);

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

    return (
        <Box className="mc-table-responsive">
            <Table className="mc-table">
                <Thead className="mc-table-head primary">
                    <Tr>
                        <Th>
                            <Box className="mc-table-check">
                                {/* <Input
                                    type="checkbox"
                                    name="allCheck"
                                    checked={data?.filter((item) => item.isChecked !== true).length < 1}
                                    onChange={handleCheckbox}
                                /> */}
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
                            <Td>
                                <Box className="mc-table-check">

                                    <Text>{index + 1}</Text>
                                </Box>
                            </Td>
                            {/* <Td>
                                <Box className="mc-table-profile">
                                    <Image src={ item.src } alt={ item.alt } />
                                    <Text>{ item.name }</Text>
                                </Box>
                            </Td> */}
                            <Td>{item?.userid?.fullname}</Td>
                            <Td>{item?.userid?.email}</Td>
                            <Td>{item?.amount}</Td>
                            <Td><Text className={`mc-table-badge ${item?.transactionstatus === 'completed' ? "green" : "purple"}`}>{item?.transactionstatus}</Text></Td>
                            <Td><Text className={`mc-table-badge ${item?.orderstatus === 'completed' ? "green" : "purple"}`}>{item?.orderstatus}</Text></Td>
                            <Td>{item?.ordermessagefromadmin}</Td>
                            <Td>{item?.orderdate}</Td>
                            <Td>
                                <Box className="mc-table-action">
                                    {item?.transactionstatus === 'completed' ? <Anchor title="View" href={`/invoice-details${item._id}`} className="material-icons view">{'visibility'}</Anchor> : ""}
                                    <Anchor title="Edit" href={`/order${item._id}`} className="material-icons download" download>{'edit'}</Anchor>
                                    {/* <Button title="Delete" className="material-icons delete" onClick={() => setAlertModal(true)}>{'delete'}</Button> */}
                                </Box>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Modal show={alertModal} onHide={() => setAlertModal(false)}>
                <Box className="mc-alert-modal">
                    <Icon type="new_releases" />
                    <Heading as="h3">are your sure!</Heading>
                    <Text as="p">Want to delete this order?</Text>
                    <Modal.Footer>
                        <Button type="button" className="btn btn-secondary" onClick={() => setAlertModal(false)}>nop, close</Button>
                        <Button type="button" className="btn btn-danger" onClick={() => setAlertModal(false)}>yes, delete</Button>
                    </Modal.Footer>
                </Box>
            </Modal>
        </Box>
    )
}