import { ActivityIndicator } from 'react-native';
import {
  Container,
  CategoriesContainer,
  MenuContainer,
  Footer,
  FooterContainer,
  CenteredContainer } from './styles';
import { Header } from '../components/Header';
import { Categories }   from '../components/Categories/index';
import { Menu } from '../components/Menu';
import { Button } from '../components/Button';
import { TableModal } from '../components/TabelModal';
import { useEffect, useState } from 'react';
import { Cart } from '../Cart';
import { CartItemProps } from '../types/CartItem';
import { Product } from '../types/Product';
import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';
import { Category } from '../types/Category';
import { api } from '../utils/api';

export function Main(){
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/products')
    ]).then(([categoriesResponse, productsResponse]) => {
      setCategories(categoriesResponse.data);
      setProducts(productsResponse.data);
      setIsLoading(false);
    });
  }, []);

  //filtering if the category is selected or not and showing the products
  async function handleSelectCategory(categoryId: string){
    const route = !categoryId
      ? '/products'
      : `/categories/${categoryId}/products`;

    setIsLoadingProducts(true);
    const {data} = await api.get(route);
    setProducts(data);
    setIsLoadingProducts(false);
  }

  function handleSaveTable(table: string){
    setSelectedTable(table);
  }

  function handleResetOrder(){
    setSelectedTable('');
    setCartItems([]);
  }

  function handleAddToCart(product: Product){
    // if the table was not selected, show the modal
    if(!selectedTable){
      setIsTableModalVisible(true);
    }

    // getting previous values and setting the new one
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        cartItems => cartItems.product._id === product._id
      );

      if(itemIndex < 0){
        return prevState.concat({
          quantity: 1,
          product,
        });
      }

      //setting the new one and staying with the previous values
      const newCartItems = [...prevState];
      const item = newCartItems[itemIndex];
      newCartItems[itemIndex] = {
        ...item,
        quantity : newCartItems[itemIndex].quantity + 1,
      };
      return newCartItems;
    }) ;
  }

  function handleDecrementCartItem(product: Product){
    setCartItems((prevState) => {
      //looking for the index inside the cart
      const itemIndex = prevState.findIndex(
        cartItems => cartItems.product._id === product._id
      );

      //creates a new array with the previous values
      const item = prevState[itemIndex];
      const newCartItems = [...prevState];


      //removing the itens
      if(item.quantity === 1){
        newCartItems.splice(itemIndex, 1);

        return  newCartItems;
      }

      //setting the new one and staying with the previous values
      newCartItems[itemIndex] = {
        ...item,
        quantity : newCartItems[itemIndex].quantity - 1,
      };
      return newCartItems;
    }) ;
  }
  return(
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {/* Loading elemento for the whole application */}
        {isLoading ? (
          <CenteredContainer>
            <ActivityIndicator color="#D73035" size="large"/>
          </CenteredContainer>
        ):
          <>
            <CategoriesContainer>
              <Categories
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            </CategoriesContainer>

            {/* Just showing the loading after change the category */}
            {isLoadingProducts ? (
              <CenteredContainer>
                <ActivityIndicator color="#D73035" size="large"/>
              </CenteredContainer>
            ): (
              <>
                {products.length > 0 ? (
                  <MenuContainer>
                    <Menu
                      onAddToCart={handleAddToCart}
                      products={products}
                    />
                  </MenuContainer>
                ): (
                  <CenteredContainer>
                    <Empty />

                    <Text color="#666" style={{marginTop: 24}}>
                Nenhum produto foi encontrado
                    </Text>
                  </CenteredContainer>
                )}
              </>
            )}
          </>
        }

      </Container>
      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button
              onPress={()=> setIsTableModalVisible(true)}
              disabled={isLoading}
            >
              Novo Pedido
            </Button>
          )}

          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleDecrementCartItem}
              onConfirmOrder={handleResetOrder}
              selectedTable={selectedTable}
            />
          )}
        </FooterContainer>
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );

}
