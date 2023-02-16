import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { List, Item, Icon, Text, Box, Anchor } from "../../components/elements";
import { Breadcrumb, RoundAvatar, DivideTitle, DuelText } from "../../components";
import { CardLayout, CardHeader, FloatCard, ActivityCard } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/userProfile.json";
import { useParams } from "react-router-dom";
import { getLocalData } from "../../Utils/localStorage";

export default function UserProfile() {
    const { id } = useParams()
    const [userData, setUserData] = useState("")

    useEffect(() => {

        fetch(`https://api.hthindia.in/admin/getusers/${id}?admin_jwt=${getLocalData("boxApi")}`)
            .then((res) => res.json())
            .then((res) => {
                setUserData(res.data[0])
                // console.log(res)

            })
    }, [])
    console.log(userData)



    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title="user profile">

                        </Breadcrumb>
                    </CardLayout>
                </Col>
                <Col xl={12}>
                    <CardLayout>
                        <CardHeader title="user information" dotsMenu={data?.dotsMenu} />
                        <Box className="mc-user-group">
                            <Box className="mc-user-profile">
                                <RoundAvatar
                                    src={data?.profile.src}
                                    alt={data?.profile.alt}
                                    size={data?.profile.size}
                                />
                                <DuelText
                                    title={userData?.fullname}
                                    descrip={userData?.email}
                                    size={data?.profile.size}
                                />
                            </Box>
                            <Box className="mb-4">
                                <DivideTitle title="communication" className="mb-4" />
                                <List className="mc-user-metalist">

                                    <Item >
                                        <Icon>{'phone_in_talk'}</Icon>
                                        <Text as="span">{userData?.mobileno}</Text>
                                    </Item>
                                    <Item >
                                        <Icon>{'feed'}</Icon>
                                        <Text as="span">Register Date: {userData?.registerdate}</Text>
                                    </Item>
                                    <Item >
                                        <Icon>{'map'}</Icon>
                                        <Text as="span">Address: {`${userData?.billingaddress}, ${userData?.state}, ${userData?.country}, ${userData?.pincode}`}</Text>
                                    </Item>
                                    <Item >
                                        <Icon>{'phone_in_talk'}</Icon>
                                        <Text as="span">Alternate Mobile no: {userData?.alternatemobileno}</Text>
                                    </Item>
                                    <Item >
                                        <Icon>{'public'}</Icon>
                                        <Text as="span">Last Login: {`${userData?.lastlogin?.split(" ")[1]} ${userData?.lastlogin?.split(" ")[2]} ${userData?.lastlogin?.split(" ")[3]}`}</Text>
                                    </Item>

                                </List>
                            </Box>
                            {/* <Box className="mb-4">
                                <DivideTitle title={data?.bio.title} className="mb-3" />
                                <Text className="mc-user-bio mb-4">{data?.bio.descrip}</Text>
                            </Box>
                            <Box>
                                <DivideTitle title="elsewhere" className="mb-4" />
                                <Box className="mc-user-social">
                                    {data?.social.map((item, index) => (
                                        <Anchor
                                            key={index}
                                            href={item.path}
                                            text={item.type}
                                            iconClass={item.icon}
                                            className={item.type}
                                        />
                                    ))}
                                </Box>
                            </Box> */}
                        </Box>
                    </CardLayout>
                </Col>
                {/* <Col xl={7}>
                    <Row>
                        {data?.float.map((item, index) => (
                            <Col md={4} lg={4} key={index}>
                                <FloatCard
                                    variant={item.variant}
                                    digit={item.digit}
                                    title={item.title}
                                    icon={item.icon}
                                />
                            </Col>
                        ))}
                        <Col xl={12}>
                            <ActivityCard
                                style={{ height: "540px" }}
                                title={data?.activity.title}
                                dotsMenu={data?.activity.dotsMenu}
                                items={data?.activity.items}
                            />
                        </Col>
                    </Row>
                </Col> */}
            </Row>
        </PageLayout>
    )
}