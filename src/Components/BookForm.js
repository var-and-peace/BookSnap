import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux'
import { addBook } from '../reducers/libraryReducer'

class BookForm extends React.Component {
    render(){
        return (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}>
            <Text>Add a Book!</Text>
          </View>
        )
    }

}

const mapDispatch = (dispatch) => ({
  addBook: (book) => dispatch(addBook(book))
})

export default connect(null, mapDispatch)(Graph)
