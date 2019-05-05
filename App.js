import React from 'react';
import { Dimensions, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import ConnectFour from './ConnectFour';

const gridSize = Dimensions.get('window').width / 7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  grid: {
    margin: 1,
    height: gridSize,
    width: gridSize,    
  },
  text: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },
});

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
    const grids = this.connectFour.board.getGrids();
    return (
      <View>
        {grids.map((row, rowIndex) => (
          <View
            style={{ flexDirection: 'row' }}
            key={`row-${rowIndex}`}
          >
            {row.map((piece, colIndex) => (
              <TouchableOpacity
                activeOpacity={1}
                key={`row-${colIndex}`}
                onPress={this.handlePiecePress.bind(this, colIndex)}
                style={[
                  styles.grid,
                  {
                    backgroundColor: piece ? piece.color : 'gray',
                  },
                ]}
              />
            ))}
          </View>
        ))}
      </View>
    );
  }

  render() {
    const { winner } = this.state;
    return (
      <View style={styles.container}>
        
        {this.renderBord()}

        {winner
          ? <Text style={styles.text}>
              winner: {winner.color}
            </Text>
          : null
        }
      </View>
    );
  }
}

