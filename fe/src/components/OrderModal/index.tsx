import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../types/Orders';
import { formatCurrency } from '../../utils/formatCurrency';
import { Overlay, ModalBody, OrderDetails, Actions } from "./styles"

interface OrderModalProps{
  visible: boolean;
  order: Order | null;
  onClose: () => void;

}

export function OrderModal({ visible, order, onClose }: OrderModalProps ){
  if(!visible || !order){
    return null;
  }

  const total = order.products.reduce((total, {product, quantity}) =>{
    return total + (product.price * quantity);
  },0);

  return(
    <>
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>

          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="close-icon"/>
          </button>
        </header>

        <div className="status-container">
           <small>Status do pedido</small>
           <div>
            <span>
              {order.status === 'WAITING' && '🕥'}
              {order.status === 'IN_PROGRESS' && '👨🏾‍🍳'}
              {order.status === 'DONE' && '✅'}
            </span>
             <strong>
              {order.status === 'WAITING' && 'Fila de espera'}
              {order.status === 'IN_PROGRESS' && 'Em preparaçāo'}
              {order.status === 'DONE' && 'Pronto!'}
            </strong>
           </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>
          <div className="order-itens">
          {order.products.map(({_id, product, quantity}) =>(
            <div className="item" key={_id}>
              <img
              src={`http://localhost:3001/uploads/${product.imagePath}`}
              alt={product.name}
              width="56"
              height="28.51"
              />

              <span className="quantity">
                 {quantity} x
              </span>

              <div className="product-details">
                 <strong>{product.name}</strong>
                 <span>{formatCurrency(product.price)}</span>
              </div>

            </div>
          ))}
          </div>

          <div className="total">
            <strong>Total</strong>
            <span>{formatCurrency(total)}</span>
          </div>
        </OrderDetails>

        <Actions>
          <button type="button" className="primary">
            <span>👨🏾‍🍳</span>
            <strong>Iniciar Preparaçāo</strong>
          </button>
          <button type="button" className="secondary">
            <strong>Cancelar pedido</strong>
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
    </>
  );
}
