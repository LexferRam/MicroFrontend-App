import React from 'react'

import Parallax from 'components/material-kit-pro-react/components/Parallax/Parallax'

import parallaxViewStyle from './parallaxViewStyle'

export default function ParallaxView(props) {
    return (
        <Parallax
            image={props.image}
            className={parallaxViewStyle.parallax}
        >
            {props.children}
        </Parallax>
    )
}
