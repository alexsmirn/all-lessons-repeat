import * as React from 'react';

type ButtonPropsType = {
    title: string
    callBack: () => void
    className?: string
}
export const UniversalButton = ({title, callBack, className}: ButtonPropsType) => {
    return <button className={className} onClick={callBack}>{title}</button>
}

