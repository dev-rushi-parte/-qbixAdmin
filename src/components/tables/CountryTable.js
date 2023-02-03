import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Button, Text, Box, Icon, Heading, Anchor } from "../elements";



export default function CountryTable({ thead, tbody }) {

    const [data, setData] = useState([]);

    const [blockModal, setBlockModal] = React.useState(false);

    useEffect(() => { setData(tbody) }, [tbody]);



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
                                    checked={ data?.filter((item)=> item.isChecked !== true).length < 1 } 
                                    onChange={ handleCheckbox } 
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
                            <Td title="id">
                                <Box className="mc-table-check">
                                    {/* <Input 
                                        type="checkbox" 
                                        name={item.name} 
                                        checked={ item?.isChecked || false }
                                        onChange={ handleCheckbox } 
                                    /> */}
                                    <Text>#{index + 1}</Text>
                                </Box>
                            </Td>
                            <Td title={'item.name'}>
                                <Box className="mc-table-profile">
                                    <Text>{item.countryname}</Text>
                                </Box>
                            </Td>

                            <Td title={item.deliveryamount}>{item.deliveryamount}</Td>
                            <Td title={item.packackagingcharges}>{item.packackagingcharges}</Td>

                            <Td title={item.taxamount}>{item.taxamount}</Td>
                            <Td>
                                <Box className="mc-table-action">
                                    {/* <Anchor href={`/user-profile${item._id}`} title="View" className="material-icons view">{"visibility"}</Anchor> */}
                                    <Anchor href={`/country_edit${item._id}`} title="Edit" className="material-icons edit">{"edit"}</Anchor>
                                    {/* <Button title="Delete" className="material-icons delete" onClick={() => handelShow(item._id)}>delete</Button> */}
                                    {/* <Button title="Block" className="material-icons delete" onClick={() => setBlockModal(true)}>{"delete"}</Button> */}
                                </Box>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>


            <Modal show={blockModal} onHide={() => setBlockModal(false)}>
                <Box className="mc-alert-modal">
                    <Icon type="new_releases" />
                    <Heading as="h3">are your sure!</Heading>
                    <Text as="p">Want to delete this user's?</Text>
                    <Modal.Footer>
                        <Button type="button" className="btn btn-secondary" onClick={() => setBlockModal(false)}>nop, close</Button>
                        <Button type="button" className="btn btn-danger" onClick={() => setBlockModal()}>yes, delete</Button>
                    </Modal.Footer>
                </Box>
            </Modal>
            {/* <Modal show={blockModal} onHide={() => setBlockModal(false)}>
                <Box className="mc-alert-modal">
                    <Icon type="new_releases" />
                    <Heading as="h3">are your sure!</Heading>
                    <Text as="p">Want to block this user's account?</Text>
                    <Modal.Footer>
                        <Button type="button" className="btn btn-secondary" onClick={() => setBlockModal(false)}>nop, close</Button>
                        <Button type="button" className="btn btn-danger" onClick={() => setBlockModal(false)}>yes, block</Button>
                    </Modal.Footer>
                </Box>
            </Modal> */}
        </Box>
    )
}