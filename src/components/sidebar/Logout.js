import React from "react";
import { Box, Anchor } from "../elements";

export default function Logout({ data, onClick }) {
    return (
        <Box className="mc-sidebar-logout text-center">
            <Anchor
                onClick={onClick}
                href={data?.path}
                icon={data?.icon}
                text={data?.text}
                className="mc-btn primary sm"
            />
        </Box>
    )
}