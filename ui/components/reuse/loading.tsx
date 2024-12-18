"use client";

import AnimatedCircularProgressBar from "../ui/animated-circular-progress-bar";


export function CircularProgressBar({value}:{value:number}) {
    // const [value, setValue] = useState(0);
    // useEffect(() => {
    //     const handleIncrement = (prev: number) => {
    //         if (prev === 100) {
    //             return 0;
    //         }
    //         return prev + 10;
    //     };
    //     setValue(handleIncrement);
    //     const interval = setInterval(() => setValue(handleIncrement), 2000);
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <AnimatedCircularProgressBar
            max={100}
            min={0}
            value={value}
            gaugePrimaryColor="rgb(79 70 229)"
            gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
        />
    );
}