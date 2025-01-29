import React from 'react';
import { TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const Header = ({ title, onBackPress }) => {
    const renderBackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={onBackPress} />
    );

    return (
        <TopNavigation
            title={title}
            alignment="center"
            accessoryLeft={onBackPress ? renderBackAction : null}
        />
    );
};
