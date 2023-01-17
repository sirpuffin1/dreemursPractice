const Loader = () => {
    const style = { "--value": 70 } as React.CSSProperties
    return (
        <div className="flex justify-center items-center h-screen">
      <div className="animate-spin radial-progress bg-primary text-primary-content border-4 border-primary " style={style}></div>
    </div>
    );
}

export default Loader;