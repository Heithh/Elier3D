import state from '../store';
import CustomButton from './CustomButton';

function AddToCart({ handleTabClick, style}) {


  const handleAdd = () => {
    const newItem = {
      id: state.productId,
      quantity: 1,
    };

    const existingItemIndex = state.checkout.findIndex((item) => item.id === newItem.id);

    if (existingItemIndex !== -1) {
      state.checkout[existingItemIndex].quantity++;
    } else {
      state.checkout.push(newItem);
    }

    handleTabClick('add');
  };

  return (
    <div className="filepicker-container">
      <div className='mb-10'>Would you like to add the item to the cart?</div>
      <CustomButton
  type="filled"
  title="ADD TO CART"
  handleClick={handleAdd}
  customStyles="text-xs "
      />
    </div>
  );
}

export default AddToCart;
