import React from 'react';
import { Button } from '@ui-kitten/components';

export const CustomButton = ({ text, onPress, appearance = 'filled', status = 'primary' }) => (
    <Button style={{ marginVertical: 8 }} appearance={appearance} status={status} onPress={onPress}>
        {text}
    </Button>
);
