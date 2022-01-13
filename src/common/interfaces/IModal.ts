export interface IModal {
    isOpen?: boolean,
    children?: React.ReactChild | React.ReactChildren | JSX.Element
    close: () => void
}