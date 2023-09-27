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
//edits
  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className='home' {...slideAnimation('left')} >

          <motion.header {...slideAnimation('down')}>
            <img
              src='./threejs.png'
              alt='logo'
              className='w-20 h-20 object-contain' />
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
                Welcome to <strong>ÉLIER 3D!</strong> Elevate your style with our <strong>revolutionary 3D
                  customization tool</strong>. <br/>
                Create and design fashion that truly stands out.</p>
            </motion.div>

            <motion.div>
            <CustomButton
              type='filled'
              title='SNEAKERS'
              customStyles='w-fit px-4 py-2.5 font-bold text-sm mr-5'
              handleClick={()=>  {
                state.product=false;
                state.productId = 2;

              }}
            />
             <CustomButton
              type='filled'
              title='T-SHIRT'
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
              handleClick={() => {
                state.product = true;
                state.productId = 1;
              }}
            />


            </motion.div>

            <CustomButton
              type='filled'
              title='CUSTOMIZE IT'
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
              handleClick={()=>  state.intro=false}
            />




          </motion.div>


        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home