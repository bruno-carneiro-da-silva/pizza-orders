import {Board, OrderContainer} from './styles';
import {OrderModal} from '../../OrderModal/index';
import { useState } from 'react';
import { Order } from '../../../types/Orders';

interface OrdersBoardProps{
  icon: string;
  title: string;
  orders: Order[];
}
export function OrdersBoard({icon, title, orders}: OrdersBoardProps){

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null)
  function handleOpenOrder(order: Order){
    setSelectedOrder(order);
    setIsModalVisible(true);
  }

  function handleCloseModal(){
    setSelectedOrder(null);
    setIsModalVisible(false);
  }


  return(
    <>
     {/* WAITING */}
     <Board>
    <OrderModal
    visible={isModalVisible}
    order={selectedOrder}
    onClose={handleCloseModal}
    />

     <header>
       <span>{icon}</span>
       <strong>{title}</strong>
       <span>{orders.length}</span>
     </header>

    {orders.length > 0 && (
      <OrderContainer>
      {orders.map((order) =>(
        <button type='button' key={order._id} onClick={() => handleOpenOrder(order)}>
         <strong>Mesa {order.table}</strong>
         <span>{order.products.length} itens</span>
       </button>
      ))}

     </OrderContainer>
    )}

    </Board>
    </>
  );
}
