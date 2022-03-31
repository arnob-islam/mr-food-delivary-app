import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

function FadeInWhenVisible({ children, transition, variants }) {
    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            className='title_head'
            animate={controls}
            initial="hidden"
            transition={transition ? transition : { type: 'spring', stiffness: 700 }}
            variants={variants ? variants : {
                visible: { y: '0' },
                hidden: { y: '-50%' }
            }}
        >
            {children}
        </motion.div>
    );
}


function SectionTitle({ title, transition, variants }) {
    return (
        <div className="section_title">
            <FadeInWhenVisible transition={transition} variants={variants} >
                <div className='title_box'>
                    <h1>
                        {title}
                    </h1>
                </div>
            </FadeInWhenVisible>

        </div>
    );
}
export default SectionTitle