// import React from 'react';
// import { Text, View } from 'react-native';
// import { connect } from 'react-redux'
// import { addBook } from '../reducers/libraryReducer'
// import {useForm} from 'react-hook-form'

// export default function BookForm(props) {
//     const { register, handleSubmit } = useForm();
//     const onSubmit = data => console.log(data);
     
//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <input name='title' ref={register}/>
//             <input name='author' ref={register}/>
//             <input type='submit'/>
//         </form>
//     );
//   }


// const mapDispatch = (dispatch) => ({
//   addBook: (book) => dispatch(addBook(book))
// })

// export default connect(null, mapDispatch)(BookForm)


import React from "react";
import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

export default function BookForm() {
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        style={styles.input}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="title"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.title && <Text>This is required.</Text>}

      <Controller
        control={control}
        style={styles.input}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="author"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.author && <Text>This is required.</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
    input: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1
    },
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center'
    }
  })
