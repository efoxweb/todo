import { type HTMLProps } from 'react';

function Container({
    children,
    className,
    ...props
}: HTMLProps<HTMLDivElement>) {
    let cssClassName = 'container mx-auto max-w-xl';

    if (className) {
        cssClassName += ` ${className}`;
    }

    return (
        <div {...props} className={cssClassName}>
            {children}
        </div>
    );
}

export default Container;
