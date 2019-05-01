import React from 'react';
import { Dimensions, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import ConnectFour from './ConnectFour';

const gridSize = Dimensions.get('window').width / 7;

export default class App extends React.Component {
  connectFour = new ConnectFour();

  state = {
    winner: null,
  }

  handlePiecePress = (col) => {
    this.connectFour.addPiece(col);
    this.setState({ winner: this.connectFour.getWinner() });
  }

  renderBord() {
    const { currentPlayer } = this.connectFour;
    const board = this.connectFour.board.getBoard();
    
    return (
      <View>
        {board.map((row, rowIndex) => {
          let content = row.map((item, colIndex) => (
            <View style={{ }}>
              <TouchableOpacity
                onPress={() => {
                  this.handlePiecePress(colIndex);
                }}
                style={{
                  margin: 1,
                  height: gridSize,
                  width: gridSize,
                  backgroundColor: (board[rowIndex] && board[rowIndex][colIndex]) ? board[rowIndex][colIndex].color : 'gray' ,
                }}
              />
            </View>
          ))
          return (
            <View style={{  flexDirection: 'row' }}>
              {content}
            </View>
          )
        })}
      </View>
    )
  }


  render() {
    const { winner } = this.state;
    return (
      <View style={styles.container}>
        
        {this.renderBord()}

        {winner
          ? <Text style={{ fontSize: 30, color: 'red', textAlign: 'center' }}>
              winner: {winner.color}
            </Text>
          : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
