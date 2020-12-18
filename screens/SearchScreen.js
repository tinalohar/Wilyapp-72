import React from 'react';
import { Text, View,TextInput,TouchableOpacity,FlatList,StyleSheet } from 'react-native';
import db from "../config"

export default class Searchscreen extends React.Component {
  constructor(){
    super()
    this.state={
      allTransaction:[],
      search:"",
      lastTransaction:null
  }
  }
  componentDidMount=async()=>{
    var query = await db.collection("transaction").limit(10).get()
    query.docs.map((doc)=>{
      this.setState({
        allTransaction:[],
        lastTransaction:doc
      })
    })
  }

  searchTransaction=async(text)=>{
    var enterText=text.split("")
    if(enterText[0].toUpperCase() ==="B"){
      var query = await db.collection("transaction").where("bookId","==",text).get()
      query.docs.map((doc)=>{
        this.setState({
          allTransaction:[...this.state.allTransaction,doc.data()],
          lastTransaction:doc
        })
      })
    }
    if(enterText[0].toUpperCase()==="S"){
      var query = await db.collection("transaction").where("StudentId","==",text).get()
      query.docs.map((doc)=>{
        this.setState({
          allTransaction:[...this.state.allTransaction,doc.data()],
          lastTransaction:doc
        })
      })
    }
  }
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TextInput 
          style={styles.bar}
          placeholder="Enter Id"
          onChangeText={(text)=>{
           this.setState({
             search:text
           }) 
          }}/>

          <TouchableOpacity
          style={styles.searchButton}
          onPress={()=>{this.searchTransaction(this.state.search)}}>
            <Text>search</Text>
          </TouchableOpacity>

          <FlatList
          data={this.state.allTransaction}
          renderItem={({item})=>{
            <View style={{borderWidth:3}}>
             <Text>{"bookId:"+ item.bookId}</Text>
             <Text>{"StudentkId:"+ item.StudentId}</Text>
             <Text>{"TransactionType:"+ item.transactionType}</Text>
             <Text>{"Date:"+ item.date.toDate()}</Text>
            </View>
          }}
          keyExtractor={(item,index)=>{
            index.toString()
            }}/>

        </View>
      );
    }
  }
  const styles=StyleSheet.create({
    searchBar:{ flexDirection:'row', height:40, width:'auto', borderWidth:0.5, alignItems:'center', backgroundColor:'grey', }, 
    bar:{ borderWidth:2, height:30, width:300, paddingLeft:10,marginTop:200 }, 
    searchButton:{ borderWidth:1, height:30, width:50, alignItems:'center', justifyContent:'center', backgroundColor:'green' }
  })