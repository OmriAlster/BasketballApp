import React, { useState } from 'react';
import { View, TextInput, Button, Modal } from 'react-native';
import styles from './style';

const inputContainer = (props) => {

    const [inputText, setInputText] = useState('');

    const onTextChange = (text) => {
        setInputText(text);
    };
    const onAddPress = () => {
        props.addListItem(inputText);
        setInputText('');
    };
    const onCancelPress = () => {
        props.onCancelPress();
        setInputText('');
    };

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Course Goal"
                    style={styles.textBoxInput}
                    onChangeText={onTextChange}
                    value={inputText}
                />
                <View style={styles.buttens}>
                    <Button title="CANCEL" color="red" onPress={onCancelPress} />
                    <Button title="ADD" onPress={onAddPress} />
                </View>
            </View>
        </Modal>
    );
};

export default inputContainer;