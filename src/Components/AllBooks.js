import React from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux'
import { getBooks } from '../reducers/libraryReducer'
import { setBook } from '../reducers/singleBookReducer'

class AllBooks extends React.Component {
    componentDidMount(){
        this.props.getBooks()
    }
    render(){
        return (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}>
            <Text>Welcome to Your Library!</Text>
            {
                this.props.library.map(book => {
                    return (
                        <Button 
                            title={book.title} 
                            onPress={() => {
                                this.props.setBook(book.id)
                                this.props.navigation.navigate(book.title)
                            }} 
                        />
                    )
                })
            }
          </View>
        )
    }
}

const mapState = state => ({
  library: state.library
})

const mapDispatch = dispatch => ({
  getBooks: () => dispatch(getBooks()),
  setBook: (bookId) => dispatch(setBook(bookId))
})

export default connect(mapState, mapDispatch)(AllBooks) 