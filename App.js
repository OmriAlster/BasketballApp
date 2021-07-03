<<<<<<< HEAD
import React, { useState } from 'react';
import { Button, View, FlatList } from 'react-native';

import ListItem from './components/ListItem/';
import InputContainer from './components/InputContainer/';
import styles from './style'

const App = () => {
  const [goalsList, setGoalsList] = useState([]);
  const [isVisible, setIsVisible] = useState(false)

  const deleteGoal = (id) => {
    setGoalsList(goalsList.filter(goalItem => goalItem.id !== id))
  };

  const addListItem = (inputText) => {
    if (!inputText) {
      console.log('empty');
      return;
    }
    setGoalsList([...goalsList, { id: Math.random().toString(), value: inputText }]);
    setIsVisible(false);
  };

  const onCancelPress = () => {
    setIsVisible(false);
  };

  return (
    <View style={styles.screen}>
      <InputContainer addListItem={addListItem}  visible={isVisible} onCancelPress={onCancelPress} />
      <Button title="Add New Goal" onPress={() => setIsVisible(true)} />
      <FlatList
        style={styles.goalsList}
        keyExtractor={(item, index) => item.id}
        data={goalsList}
        renderItem={itemData => <ListItem goal={itemData.item} deleteGoal={deleteGoal} />}
      />
    </View>
  );
}

=======
import React, { useState } from 'react';
import { Button, View, FlatList } from 'react-native';

import ListItem from './components/ListItem/';
import InputContainer from './components/InputContainer/';
import styles from './style'

const App = () => {
  const [goalsList, setGoalsList] = useState([]);
  const [isVisible, setIsVisible] = useState(false)

  const deleteGoal = (id) => {
    setGoalsList(goalsList.filter(goalItem => goalItem.id !== id))
  };

  const addListItem = (inputText) => {
    if (!inputText) {
      console.log('empty');
      return;
    }
    setGoalsList([...goalsList, { id: Math.random().toString(), value: inputText }]);
    setIsVisible(false);
  };

  const onCancelPress = () => {
    setIsVisible(false);
  };

  return (
    <View style={styles.screen}>
      <InputContainer addListItem={addListItem}  visible={isVisible} onCancelPress={onCancelPress} />
      <Button title="Add New Goal" onPress={() => setIsVisible(true)} />
      <FlatList
        style={styles.goalsList}
        keyExtractor={(item, index) => item.id}
        data={goalsList}
        renderItem={itemData => <ListItem goal={itemData.item} deleteGoal={deleteGoal} />}
      />
    </View>
  );
}

>>>>>>> 6e98602f8a216b0fcd052601dde493bec41e3c1c
export default App;