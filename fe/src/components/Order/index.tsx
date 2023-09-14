import {Container} from './styles';
import {OrdersBoard} from './OrdersBoard/index';
import { Order } from '../../types/Orders';

const orders: Order[] = [
  {
		"_id": "64d9867aa490cdd04c6869fb",
		"table": "3",
		"status": "WAITING",
		"products": [
			{
				"product": {
					"name": "Pizza quatro queijos",
					"imagePath": "1691970722970- quatro-queijos.png",
					"price": 60,
				},
				"quantity": 2,
				"_id":  "64d9867aa490cdd04c6869fc",
			}
		],
	}
];

export function Orders(){
  return(
    <>
    <Container>
     <OrdersBoard
      icon="🕥"
      title="Fila de espera"
      orders={orders}
     />
     <OrdersBoard
     icon="👨🏾‍🍳"
     title="Em preparaçāo"
     orders={[]}
     />
     <OrdersBoard
     icon="✅"
     title="Concluído"
     orders={[]}
     />
    </Container>
    </>
  );
}
