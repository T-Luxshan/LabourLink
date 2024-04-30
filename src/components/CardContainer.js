import React from 'react';
import { Card, Text } from 'react-native-paper';

const CardContainer = ({content }) => (
  <Card>
    <Card.Content>
      {/* <Text variant="titleLarge">{title}</Text> */}
      <Text variant="bodyMedium">{content}</Text>
    </Card.Content>
  </Card>
);

export default CardContainer;
