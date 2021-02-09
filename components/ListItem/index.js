import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import styles from './style';

const ListItem = (props) => {
    return (
        <TouchableOpacity onPress={() => props.deleteGoal(props.goal.id)}>
            <View style={styles.listItem}>
                <Text>{props.goal.value}</Text>
            </View>
        </TouchableOpacity>
    );
};



export default ListItem;