const LoadingIndicator = () => {
    return (
        <div className="flex space-x-2 justify-center items-center px-4 pt-1">
            <span className="dot bg-gray-300 w-3 h-3 rounded-full"></span>
            <span className="dot bg-gray-400 w-3 h-3 rounded-full"></span>
            <span className="dot bg-gray-500 w-3 h-3 rounded-full"></span>
        </div>
    );
};

export default LoadingIndicator;
