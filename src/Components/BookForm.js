import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux'
import { addBook } from '../reducers/libraryReducer'
import {useForm} from 'react-hook-form'


class BookForm extends React.Component {
  add(book){
    // this.props.addBook(book)
    console.log('Book test-> ', book);
  }
  render(){
    const {register, handleSubmit, setValue} = useForm();
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Text>Add a Book!</Text>
          <form onSubmit={handleSubmit(add)}>
            <input name='title' ref={register({required: true})}/>
            <input name='author' ref={register({required: true})}/>
            <input name='isbn' ref={register}/>
            <input name='coverImage' ref={register}/>
            <input name='genre' ref={register}/>
            <input name='year' ref={register}/>
            <input name='unread' ref={register}/>
            <input name='isReading' ref={register}/>
            <input name='rating' ref={register}/>
            <input name='isFavorite' ref={register}/>
            <input name='pageNumber' ref={register}/>
            {errors.exampleRequired && <span>This field is required</span>}
            <input type='submit'/>
          </form>
        </View>
      )
  }

}

const mapDispatch = (dispatch) => ({
  addBook: (book) => dispatch(addBook(book))
})

export default connect(null, mapDispatch)(BookForm)
