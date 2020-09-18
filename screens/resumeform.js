import React from 'react'
import ValidationComponent from 'react-native-form-validator'
import { View, StyleSheet,Text,TextInput ,Button,Alert } from 'react-native'
import axios from 'axios'

export default class resumeform extends ValidationComponent {
    state = {
        name: '',
        nickname:'',
        age:'',
        skill:''
    }

    _onSubmit =() => {
        const isValid = this.validate({
            name: {required:true},
            nickname: {required:true},
            age:{required:true,numbers: true},
            skill: {required:true}
        });
        if(isValid){
            const formData = new FormData();
            formData.append('name',this.state.name)
            formData.append('nickname',this.state.nickname)
            formData.append('age',this.state.age)
            formData.append('skill',this.state.skill)
            const config ={
                headers :{'content-type': 'multipart/form-data'}
            }
            axios.post('https://movie-api.igeargeek.com/users/register',formData, config)
            .then((response) =>{
                 Alert.alert(
                'Create success',
                'Click ok go to resume detail page',
                [{
                    test:'OK',
                    onPress: () =>{
                        this.props.navigation.push('ResumeDetail',{id: response.data.id})
                    }
                }]
            )
            }).catch((error) =>{
              console.log('api error',error)
            })
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.getErrorMessages}>
                        {this.getErrorMessages()}
                    </Text>
                </View>
            <View>
                <Text>Full name</Text>
                <TextInput 
                style={styles.TextInput}
                onChangeText={(text) => this.setState({ name : text})}
                value={this.state.name}
                ></TextInput>
            </View>

            <View style={{ marginTop:20}}>
                <Text>Nickname</Text>
                <TextInput 
                style={styles.TextInput}
                onChangeText={(text) => this.setState({ nickname : text})}
                value={this.state.nickname}
                ></TextInput>
            </View>
            <View style={{ marginTop:20}}>
                <Text>Age</Text>
                <TextInput 
                style={styles.TextInput}
                onChangeText={(text) => this.setState({ age : text})}
                value={this.state.age}
                ></TextInput>
            </View>
            <View style={{ marginTop:20}}>
                <Text>Skill</Text>
                <TextInput 
                style={styles.textAreaInput}
                onChangeText={(text) => this.setState({ skill : text})}
                value={this.state.skill}
                multiline={true}
                ></TextInput>
            </View>
                <View style={{ marginTop:20}}>
                  <Button title="Create Resume" onPress={this._onSubmit}></Button>
                </View>
             </View>
        )
    }
}
    const styles = StyleSheet.create({
    container:{
        padding:30, backgroundColor:'white',minHeight:'100%'
    },
    TextInput:{
        height:40, borderColor:'gray', borderWidth: 1
    },
    textAreaInput:{
        height:100,
        borderColor: 'gray',
        borderWidth: 1
    },
    getErrorMessages:{ color: 'red' , marginBottom:20}
})