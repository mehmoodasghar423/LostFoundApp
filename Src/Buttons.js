import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const Button1Content = () => {
  return (
    <View>
      <Text>Button 1 Content</Text>
      {/* Additional components specific to Button 1 */}
    </View>
  );
};

const Button2Content = () => {
  return (
    <View>
      <Text>Button 2 Content</Text>
      {/* Additional components specific to Button 2 */}
    </View>
  );
};

const Button3Content = () => {
  return (
    <View>
      <Text>Button 3 Content</Text>
      {/* Additional components specific to Button 3 */}
    </View>
  );
};

const App = () => {
  const [selectedButton, setSelectedButton] = useState('button1');

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

  const renderButtonContent = () => {
    if (selectedButton === 'button1') {
      return <Button1Content />;
    } else if (selectedButton === 'button2') {
      return <Button2Content />;
    } else if (selectedButton === 'button3') {
      return <Button3Content />;
    }
    return null;
  };

  return (
    <View>
    
    
    <View style={styles.buttons}>
      <TouchableOpacity
        style={[styles.button, selectedButton === 'button1' && styles.selectedButton]}
        onPress={() => handleButtonPress('button1')}
      >
        <Text style={selectedButton === 'button1' ? styles.selectedButtonText : styles.buttonText}>Button 1</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, selectedButton === 'button2' && styles.selectedButton]}
        onPress={() => handleButtonPress('button2')}
      >
        <Text style={selectedButton === 'button2' ? styles.selectedButtonText : styles.buttonText}>Button 2</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, selectedButton === 'button3' && styles.selectedButton]}
        onPress={() => handleButtonPress('button3')}
      >
        <Text style={selectedButton === 'button3' ? styles.selectedButtonText : styles.buttonText}>Button 3</Text>
      </TouchableOpacity>

      </View>
      <View style={styles.buttonContentContainer}>{renderButtonContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
   marginTop:100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:"row"
  },
  button: {
    padding: 10,
    backgroundColor: '#eee',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  selectedButton: {
    backgroundColor: '#ccc',
  },
  selectedButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContentContainer: {
    marginTop: 20,
  },
});

export default App;
