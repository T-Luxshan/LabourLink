import * as React from 'react';
import { Card as PaperCard, Text } from 'react-native-paper';

// Rename the custom component to avoid conflict
const CustomCard = ({ title, content }) => ( // Make sure to include title in the props
  <PaperCard>
    <PaperCard.Content>
      <Text variant="titleLarge">{title}</Text> {/* Use the title prop here */}
      <Text variant="bodyMedium">{content}</Text> {/* Use the content prop here */}
    </PaperCard.Content>
  </PaperCard>
);

export default CustomCard;