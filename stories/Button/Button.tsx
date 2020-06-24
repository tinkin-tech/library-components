import * as React from 'react';

interface IProps {
    text: string;
    action: () => void;
    type: 'primary' | 'danger' | 'white' | 'info';
    typeButton?: 'border' | 'text' | 'small';
    icon?: string;
    className?: string;
    disable?: boolean;
}

const Button = (props: IProps) => {
    const {type, text, action, className, disable, typeButton, icon} = props;
    return (
        <a
            className={`button-component flex-row flex-no-wrap flex-middle ${
                disable ? 'disable' : ''
            }
             ${'type-' + type} ${typeButton + '-button'} ${className || ''}`}
            onClick={disable ? () => null : action}
        >
            {/*{icon && (*/}
            {/*    // <span className="flex-column">*/}
            {/*    //     <SvgImport*/}
            {/*    //         icon={icon}*/}
            {/*    //         className={`icon-16x p-r-s icon-style`}*/}
            {/*    //     />*/}
            {/*    // </span>*/}
            {/*)}*/}
            <span className="flex-column">{text}</span>
        </a>
    );
};

export default React.memo(Button);
