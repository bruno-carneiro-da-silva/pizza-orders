import { Modal } from 'react-native';
import { Container, OkButton } from './styles';
import { CheckCircle } from '../components/Icons/CheckCircle';
import { Text } from '../components/Text';
import { StatusBar } from 'expo-status-bar';

interface OrderConfirmedModalProps {
  visible: boolean;
  onOk: () => void;
}
export function OrderConfirmedModal({visible, onOk}: OrderConfirmedModalProps){
  return (
    <Modal
      visible={visible}
      animationType='fade'
    >
      <StatusBar style="light" />
      <Container>
        <CheckCircle />

        <Text size={20} weight="600" color="#fff" style={{marginTop: 12}}>Pedido confirmado</Text>
        <Text opacity={0.9} color="#fff" style={{marginTop: 4}}>Pedido entrou na fila de produção</Text>

        <OkButton onPress={onOk}>
          <Text weight="600" color="#D73035">Ok</Text>
        </OkButton>
      </Container>

    </Modal>
  );
}
