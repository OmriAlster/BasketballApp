import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    inputContainer: {
        // borderColor: 'black',
        padding: 5,
        // borderWidth: 2,
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        width: '100%'
    },
    textBoxInput: {
        width: '80%',
        // flex: 1,
        padding: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        margin: 10
    },
    buttens: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default styles;