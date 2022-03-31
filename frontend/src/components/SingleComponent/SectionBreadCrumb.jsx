import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

function Animationheading({ children }) {
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
            className='title_head_crumb bread_crumb'
            animate={controls}
            initial="hidden"
            // transition={{ type: '', stiffness: 700 }}
            variants={{
                visible: { x: '0' },
                hidden: { x: '-50%' }
            }}
        >
            {children}
        </motion.div>
    );
}

function AnimationSubtitle({ children }) {
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
            className='title_head_subtitle bread_crumb'
            animate={controls}
            initial="hidden"
            // transition={{ type: 'spring', stiffness: 700 }}
            variants={{
                visible: { y: '0' },
                hidden: { y: '-50%' }
            }}
        >
            {children}
        </motion.div>
    );
}


function SectionBreadCrumb({ title, subTitle }) {
    return (
        <div className="section_title_breadcrum">
            <div className='title_box_breadcrum'>
                <h1>
                    <Animationheading  >
                        {title}
                    </Animationheading>
                </h1>
                {subTitle &&
                    <h5>
                        <AnimationSubtitle>
                            {subTitle}
                        </AnimationSubtitle>
                    </h5>
                }
            </div>

        </div>
    );
}
export default SectionBreadCrumb