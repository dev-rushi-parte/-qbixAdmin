import React, { useContext } from "react";
import { MultipleMenu, Logout } from "../components/sidebar";
import { DrawerContext } from "../context/Drawer";
import Section from "../components/elements/Section";
import data from "../data/master/sidebar.json";
import { Image, Input, Text, Box, Icon, Button, Heading, Anchor } from "../components/elements";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function Sidebar() {
    const [alertModal, setAlertModal] = React.useState(false);

    const { drawer } = useContext(DrawerContext);
    const navigate = useNavigate()
    const handelLogout = () => {
        setAlertModal(false)
        window.localStorage.clear();
        window.location.reload();
        navigate("/")
    }
    return (
        <Section as="aside" className={`mc-sidebar thin-scrolling ${drawer ? "active" : ""}`}>
            <MultipleMenu data={data?.navs} />
            <Logout onClick={() => setAlertModal(true)} data={data?.button} />

            <Modal show={alertModal} onHide={() => setAlertModal(false)}>
                <Box className="mc-alert-modal">
                    <Icon type="new_releases" />
                    <Heading as="h3">are your sure!</Heading>
                    <Text as="p">Want to LogOut?</Text>
                    <Modal.Footer>
                        <Button type="button" className="btn btn-secondary" onClick={() => setAlertModal(false)}>nop, close</Button>
                        <Button type="button" className="btn btn-danger" onClick={handelLogout}>yes, LogOut</Button>
                    </Modal.Footer>
                </Box>
            </Modal>
        </Section>
    )
}