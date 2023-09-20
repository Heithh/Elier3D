//state manager
import { proxy } from 'valtio';

const state = proxy ({
  intro: true,
  color: '#62CFEB',
  isLogoTexture: true,
  isfullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
  product: false,
  productId: 1,
  shirtQuantity: 0,
  shoeQuantity: 0,
  checkout: [],
});

export default state;
//#EFBD48
//#62CFEB