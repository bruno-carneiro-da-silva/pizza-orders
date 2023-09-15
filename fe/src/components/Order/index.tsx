import {Container} from './styles';
import {OrdersBoard} from './OrdersBoard/index';
import { Order } from '../../types/Orders';
import { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import socketIo  from 'socket.io-client';

export function Orders(){
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket'],
    });
    socket.on('newOrder', (orders) => {
      setOrders((prevState) => prevState.concat(orders));
    })
  }, []);

  useEffect(() => {
    api.get('/orders')
    .then(({ data }) => {
      setOrders(data);
    });
  }, []);

  const waiting = orders.filter((order) => order.status === 'WAITING');
  const inProduction = orders.filter((order) => order.status === 'IN_PROGRESS');
  const done = orders.filter((order) => order.status === 'DONE');

  function handleCancelOrder(orderId: string){
    setOrders((prevState) => prevState.filter((order) => order._id !== orderId));
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']){
    setOrders((prevState) => prevState.map((order) => (
      order._id === orderId
      ? {...order, status}
      : order
    )));
  }
  return(
    <>
    <Container>
    <OrdersBoard
      icon="🕥"
      title="Fila de espera"
      orders={waiting}
      onCancelOrder={handleCancelOrder}
      onChangeOrderStatus={handleOrderStatusChange}
    />
    <OrdersBoard
      icon="👨🏾‍🍳"
      title="Em preparaçāo"
      orders={inProduction}
      onCancelOrder={handleCancelOrder}
      onChangeOrderStatus={handleOrderStatusChange}
    />
    <OrdersBoard
      icon="✅"
      title="Concluído"
      orders={done}
      onCancelOrder={handleCancelOrder}
      onChangeOrderStatus={handleOrderStatusChange}
    />
    </Container>
    </>
  );
}
