import React from 'react';

const ErrorNotice = ({ children }: { children: React.ReactNode }) => {
    return (
        <div
            className={
                'bg-red-200 text-red-900 p-4 border border-3 border-red-900 flex items-center'
            }
        >
            {children}
        </div>
    );
};

export default ErrorNotice;
