import { FlatList, TouchableOpacity } from 'react-native';
import { CartItemProps } from '../types/CartItem';

import {
  Item,
  ProductContainer,
  Actions,
  Image,
  QuantityContainer,
  ProductsDetails,
  Summary,
  TotalContainer } from './styles';
import { Text } from '../components/Text';
import { formatCurrency } from '../utils/formatCurrency';
import { PlusCircle } from '../components/Icons/PlusCircle';
import { MinusCircle } from '../components/Icons/MinusCircle';
import { Button } from '../components/Button';
import { Product } from '../types/Product';
import { OrderConfirmedModal } from '../OrderConfirmModal';
import { useState } from 'react';

interface CartProps {
  cartItems: CartItemProps[];
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
  onConfirmOrder: () => void;
}
export function Cart({cartItems, onAdd, onDecrement, onConfirmOrder}: CartProps){
  const [isLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  function handleConfirmOrder(){
    setIsModalVisible(true);
  }

  function handleOk(){
    setIsModalVisible(false);
    onConfirmOrder();
  }
  return (
    <>
      <OrderConfirmedModal
        visible={isModalVisible}
        onOk={handleOk}
      />
      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={product => product.product._id}
          showsHorizontalScrollIndicator={false}
          style={{marginBottom: 20, maxHeight: 150}}
          renderItem={({item: cartItem}) => (
            <Item>
              <ProductContainer>
                <Image source={{
                  uri: `http://192.168.1.13:3001/uploads/${cartItem.product.imagePath}`,
                }}/>

                <QuantityContainer>
                  <Text size={14} color="#666">{cartItem.quantity}x</Text>
                </QuantityContainer>

                <ProductsDetails>
                  <Text weight="600" size={14}>{cartItem.product.name}</Text>
                  <Text size={14} color="#666" style={{marginTop: 4}}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProductsDetails>
              </ProductContainer>

              <Actions>
                <TouchableOpacity style={{marginRight: 22}} onPress={() => onAdd(cartItem.product)}>
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">{formatCurrency(total)}</Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho esta vázio</Text>
          )}
        </TotalContainer>

        <Button
          onPress={handleConfirmOrder}
          disabled={cartItems.length === 0}
          loading={isLoading}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
}
