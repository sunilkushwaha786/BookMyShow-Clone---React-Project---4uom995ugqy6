function deBounce(callBack,delay=2000) {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callBack();
        },delay)
    }
}

export default deBounce;