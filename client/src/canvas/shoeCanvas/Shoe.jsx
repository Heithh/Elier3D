import React from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

import state from '../../store';

const Shoe = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shoe_baked.glb');

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) => easing.dampC(materials.initialShadingGroup.color, snap.color, 0.25, delta));

  const stateString = JSON.stringify(snap);

  return (
    <group rotation={[Math.PI/2, Math.PI,  -Math.PI/2]}>
      {Object.keys(nodes).map((nodeName) => {
        const node = nodes[nodeName];
        if (node && node.isMesh) {
          return (
            <mesh
              castShadow
              key={nodeName}
              geometry={node.geometry}
              material={materials.initialShadingGroup}
              material-roughness={1}
            >
              {snap.isFullTexture && (
                <Decal
                  position={[0, 0, 0]}
                  rotation={[0, 0, 0]}
                  scale={1}
                  map={fullTexture}
                />
              )}

              {snap.isLogoTexture && (
                <Decal
                  position={[0, 0.04, 0.15]}
                  rotation={[0, 0, 0]}
                  scale={0.15}
                  map={logoTexture}
                  depthTest={false}
                  depthWrite={true}
                />
              )}
            </mesh>
          );
        } else {
          return null;
        }
      })}
    </group>
  );
};



export default Shoe;