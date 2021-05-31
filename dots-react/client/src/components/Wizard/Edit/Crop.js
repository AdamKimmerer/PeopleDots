import React, { useState, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';

import './Crop.scss';

const Crop = ({ image }) => {

    const [crop, setCrop] = useState({
        unit: '%',
        width: 100,
        height: 100,
        y: 0,
        x: 0
    })

    useEffect(() => {
        //console.log(crop)
    }, [crop])
    
    return (
        <React.Fragment>
            <div style={{
                maxWidth: "95%",
                maxHeight: "95%",
                margin: "auto"
            }}>
                <ReactCrop
                    src={image}
                    crop={crop}
                    ruleOfThirds
                    onChange={(crop, percentCrop) => setCrop(percentCrop)}
                />
            </div>
        </React.Fragment>
    )
}

export default Crop;