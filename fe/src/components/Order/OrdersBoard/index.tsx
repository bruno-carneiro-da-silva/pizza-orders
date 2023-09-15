import {Board, OrderContainer} from './styles';
import { toast } from 'react-toastify';
import {OrderModal} from '../../OrderModal/index';
import { useState } from 'react';
import { Order } from '../../../types/Orders';
import { api } from '../../../utils/api';

interface OrdersBoardProps{
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onChangeOrderStatus: (orderId: string, status: Order['status']) => void;
}
export function OrdersBoard({icon, title, orders, onCancelOrder, onChangeOrderStatus}: OrdersBoardProps){

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null)
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenOrder(order: Order){
    setSelectedOrder(order);
    setIsModalVisible(true);
  }

  function handleCloseModal(){
    setSelectedOrder(null);
    setIsModalVisible(false);
  }

  async function handleChangeOrderStatus(){
    setIsLoading(true);

    const status = selectedOrder?.status === 'WAITING' ? 'IN_PROGRESS' : 'DONE';
    await api.patch(`/orders/${selectedOrder?._id}`, {status});

    toast.success(`Pedido da mesa ${selectedOrder?.table} teve status alterado!`);
    onChangeOrderStatus(selectedOrder!._id, status);
    setIsLoading(false);
    setIsModalVisible(false);
  }
  async function handleCancelOrder(){
    setIsLoading(true);
    await api.delete(`/orders/${selectedOrder?._id}`);

    toast.success(`Pedido da mesa ${selectedOrder?.table} foi cancelado!`);
    setIsLoading(false);
    setIsModalVisible(false);
    onCancelOrder(selectedOrder!._id);
  }
  return(
    <>
     {/* WAITING */}
     <Board>
    <OrderModal
    visible={isModalVisible}
    order={selectedOrder}
    onClose={handleCloseModal}
    onCancelOrder={handleCancelOrder}
    isLoading={isLoading}
    onChangeOrderStatus={handleChangeOrderStatus}
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
