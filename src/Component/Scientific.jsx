import React from "react";
import { Back } from "./back";

const Scientific = () => {
    return (
        <div style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}>
           <Back/>
            <iframe
                src="https://scientific-calculator-weld-omega.vercel.app/" // Replace with the desired URL
                width="100%"
                height="100%"
                style={{ border: "none" }}
                title="Example Website"
            />
        </div>
    );
};

export default Scientific;

