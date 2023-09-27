//state manager
import { proxy } from 'valtio';

const state = proxy ({
  intro: true,
  color: '#33CCFF',
  isLogoTexture: true,
  isfullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
  product: false,
  productId: 1,
  shirtQuantity: 0,
  shoeQuantity: 0,
  checkout: [],
  loading: false,
});

export default state;
//#EFBD48
//#62CFEB
//#00B2EE
//#33CCFF