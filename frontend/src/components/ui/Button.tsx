import { type ButtonHTMLAttributes, type DetailedHTMLProps } from 'react';

type BtnStyle = 'default' | 'outlined';
interface ButtonProps
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    btnStyle?: BtnStyle;
}
function Button({ btnStyle = 'default', ...props }: ButtonProps) {
    let cssClass = 'px-4 py-2 flex items-center';

    if (props.disabled) {
        cssClass += ' cursor-not-allowed opacity-50';
    } else {
        cssClass += ' cursor-pointer';
    }

    if (btnStyle === 'default') {
        cssClass +=
            ' bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition-colors';
    } else {
        cssClass +=
            ' text-gray font-semibold rounded-md border border-orange-300 hover:border-orange-500 transition-colors';
    }

    return <button className={cssClass} {...props} />;
}

export default Button;
