import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Import OrbitControls

import { Environment, Center } from '@react-three/drei';

import Shoe from './Shoe';
import CameraRig from './CameraRig';

const CanvasShoe = () => {
  return (
    <Canvas
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

<CameraRig>
        <Center>
          <Shoe />
        </Center>
        </CameraRig>

    </Canvas>
  )
}

export default CanvasShoe ;