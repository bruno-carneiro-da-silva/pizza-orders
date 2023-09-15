import {Container} from './styles';
import {OrdersBoard} from './OrdersBoard/index';
import { Order } from '../../types/Orders';
import { useEffect, useState } from 'react';
import { api } from '../../utils/api';

export function Orders(){
  const [orders, setOders] = useState<Order[]>([]);

  useEffect(() => {
    api.get('/orders')
    .then(({ data }) => {
      setOders(data);
    });
  }, []);

  const waiting = orders.filter((order) => order.status === 'WAITING');
  const inProduction = orders.filter((order) => order.status === 'IN_PROGRESS');
  const done = orders.filter((order) => order.status === 'DONE');

  function handleCancelOrder(orderId: string){
    setOders((prevState) => prevState.filter((order) => order._id !== orderId));
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']){
    setOders((prevState) => prevState.map((order) => (
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
