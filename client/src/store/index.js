//state manager
import { proxy } from 'valtio';

const state = proxy ({
  intro: true,
  color: '#1DBAE2',
  isLogoTexture: true,
  isfullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
  product: true,
  productId: 1,
  shirtQuantity: 0,
  shoeQuantity: 0,
  checkout: [],
});

export default state;
//#EFBD48
//#63d4c0
//#20DFB8
//
//