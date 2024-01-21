import React, { FC, ButtonHTMLAttributes } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color: string;
    hoverColor: string;
    text: string;
    icon?: IconProp;
}

const Button: FC<ButtonProps> = ({ color, hoverColor, text, icon, onClick }) => {
    let classes = `bg-${color}-500 hover:bg-${hoverColor}-700 text-white font-bold rounded-full w-10 h-10 mr-1 p-1`;

    if(color == 'red'){
        classes ='bg-red-500 hover:bg-red-700 text-white font-bold rounded-full w-10 h-10 mr-1 p-1'
    }
    
    return (
        <button className={classes} onClick={onClick} title={text}>
            {icon && <FontAwesomeIcon icon={icon}/>}
        </button>
    );
};

export default Button;