import React, { SetStateAction } from "react";

export interface IModal {
    isOpen?: boolean,
    children?: React.ReactChild | React.ReactChildren | JSX.Element
    close: React.Dispatch<SetStateAction<any>> | any
}