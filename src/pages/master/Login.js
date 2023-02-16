import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Form, Heading, Button, Anchor, Image, Text } from "../../components/elements";
import IconField from "../../components/fields/IconField";
import Logo from "../../components/Logo";
import data from "../../data/master/login.json";
import { SaveTheToken } from "../../Utils/localStorage";

export default function Login() {

    const [userData, setuserData] = useState({ "email": "", "password": "" })
    const navigate = useNavigate()
    const handelData = (e) => {
        const { value, name } = e.target
        setuserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handelLogin = async (event) => {
        event.preventDefault()
        console.log(userData)
        await fetch('https://api.hthindia.in/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                SaveTheToken("boxApi", res.adminjwt)
                navigate("/")
            })
    }
    return (
        <Box className="mc-auth">
            <Image
                src={data?.pattern.src}
                alt={data?.pattern.alt}
                className="mc-auth-pattern"
            />
            <Box className="mc-auth-group">
                <Logo
                    src={data?.logo.src}
                    alt={data?.logo.alt}
                    href={data?.logo.path}
                    className="mc-auth-logo"
                />
                <Heading as="h4" className="mc-auth-title">{data?.title}</Heading>

                <Form onSubmit={handelLogin} className="mc-auth-form">
                    {data?.input.map((item, index) => (
                        <IconField
                            required={true}
                            onChange={handelData}
                            key={index}
                            name={item.name}
                            icon={item.icon}
                            type={item.type}
                            option={item.option}
                            classes={item.fieldSize}
                            placeholder={item.placeholder}
                            passwordVisible={item.passwordVisible}
                        />
                    ))}
                    <Button className={`mc-auth-btn ${data?.button.fieldSize}`} type={data?.button.type}>{data?.button.text}</Button>
                    <Anchor className="mc-auth-forgot" href={data?.forgot.path}>{data?.forgot.text}</Anchor>

                </Form>
                <Box className="mc-auth-navigate">
                    <Text as="span">{data?.navigate.title}</Text>
                    <Anchor href={data?.navigate.path}>{data?.navigate.text}</Anchor>
                </Box>
            </Box>
        </Box>
    );
}