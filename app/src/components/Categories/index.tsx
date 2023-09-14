import { FlatList } from 'react-native';
import { Text } from '../Text';
import {CategoryContainer, Icon} from './styles';
import { useState } from 'react';
import { Category } from '../../types/Category';

interface CategoryProps{
  categories: Category[];
}

export function Categories({categories}: CategoryProps){
  const [selectedCategory, setSelectedCategory] = useState('');
  function handleSelectCategory(categoryId: string){
    const category = selectedCategory === categoryId ? '' : categoryId;
    setSelectedCategory(category);
  }


  return (
    <FlatList
      horizontal
      data={categories}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal: 24}}
      keyExtractor={(category) => category._id}
      renderItem={({item: category}) => {
        const isSelected = selectedCategory === category._id;
        return(
          <CategoryContainer onPress={() => handleSelectCategory(category._id)}>
            <Icon>
              <Text opacity={isSelected ? 1 : 0.5}>
                {category.icon}
              </Text>
            </Icon>

            <Text size={14} weight="600" opacity={isSelected ? 1 : 0.5}>
              {category.name}
            </Text>
          </CategoryContainer>
        );
      }}
    />
  );
}
