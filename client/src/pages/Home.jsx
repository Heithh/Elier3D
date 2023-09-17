import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import { CustomButton } from '../components';

import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from "../config/motion";

const Home = () => {
  const snap = useSnapshot(state);
  console.log(state.product)
  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className='home' {...slideAnimation('left')} >

          <motion.header {...slideAnimation('down')}>
            <img
              src='./threejs.png'
              alt='logo'
              className='w-8 h-8 object-contain' />
          </motion.header>

          <motion.div className='home-content' {...headContainerAnimation}>
            <motion.div {...headContainerAnimation}>
              <h1 className='head-text'>
               ÉLIER 3D
              </h1>
            </motion.div>

            <motion.div {...headContainerAnimation}
              className='flex flex-col gap-5' >
              <p className='max-w-md font-normal text-gray-600 text-base'>
                Welcome to Élier 3D! Elevate your style with our <strong>revolutionary 3D
                  customization tool</strong>. <br/>
                Createand design fashion that truly stands out.</p>
            </motion.div>

            <motion.div>
            <CustomButton
              type='filled'
              title='Sneakers'
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
              handleClick={()=> state.product=false}
            />
             <CustomButton
              type='filled'
              title='T-shirt'
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
              handleClick={()=> state.product=true}
            />


            </motion.div>

            <CustomButton
              type='filled'
              title='Customize it'
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
              handleClick={()=> state.intro=false}
            />




          </motion.div>


        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home