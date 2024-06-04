type ButtonPropsType = {
    title: string
    callBack: () => void
    className?: string
}
export const Button = ({title, callBack, className}: ButtonPropsType) => {
    return <button className={className} onClick={callBack}>{title}</button>
}