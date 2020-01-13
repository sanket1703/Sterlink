import React, {Component} from 'react';
import {StyleSheet,Text,View,FlatList,Image, ScrollView, TextInput,TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';

class App extends Component{

  constructor (props){
    super(props);

   
      this.state = {
        dataMov: [],
        dataTV:[],
        dataUMov:[],
        dataATV:[],
        query:"",
        fulldata: [],
        loading: true
      };
    
  }

  componentDidMount()
  {
    
    fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=e36b49b7d3ba8858e4b29c3f1d628937')
    .then ((response)=>response.json())
    .then((responseJson)=>{
      this.setState ({
        loading : false,
        dataMov : responseJson.results,
      })
    })
    .catch((error)=>
    {
      console.log(error)
    });

    fetch('https://api.themoviedb.org/3/tv/popular?api_key=e36b49b7d3ba8858e4b29c3f1d628937&language=en-US&page=1')
    .then ((responset)=>responset.json())
    .then((responsetJson)=>{
      this.setState ({
        loading : false,
        dataTV : responsetJson.results,
      })
    })
    .catch((error)=>
    {
      console.log(error)
    });
    fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=e36b49b7d3ba8858e4b29c3f1d628937&language=en-US&page=1')
    .then ((responsetu)=>responsetu.json())
    .then((responsetuJson)=>{
      this.setState ({
        loading : false,
        dataUMov : responsetuJson.results,
      })
    })
    .catch((error)=>
    {
      console.log(error)
    });
    fetch('https://api.themoviedb.org/3/tv/airing_today?api_key=e36b49b7d3ba8858e4b29c3f1d628937&language=en-US&page=1')
    .then ((responseatv)=>responseatv.json())
    .then((responseatvJson)=>{
      this.setState ({
        loading : false,
        dataATV : responseatvJson.results,
      })
    })
    .catch((error)=>
    {
      console.log(error)
    });
  }

  renderItem = ({item})=>
  {
    return (
      
      <View>
        <TouchableOpacity>
        <Card 
        style = {{backgroundColor : '#ffffff'}}
       
        titleNumberOfLines = {1}
        titleStyle = {{fontSize: 10,height:15,alignSelf:'center'}}
        imageProps = {{resizeMode : 'cover'}}
        image = {{uri:'http://image.tmdb.org/t/p//w185'+item.poster_path}}
        imageStyle={{width:'100%',minWidth:'100%',height: 195}}
        containerStyle = {{ width: 160,height: 195,borderColor:'#141414',flex:1
      }}
        
        ></Card>
        </TouchableOpacity>
        <Text style ={{paddingTop:5,paddingStart:20,color:'white',fontWeight: 'bold'}}>
         {item.vote_average.toString()}
       </Text>
        
      </View>
    );
  }
  handleSearch =(text) => {
    this.setState({query:text});
  };
  

  render()
  {
    return(
      <ScrollView>
      <View style = {{backgroundColor:'#141414'}}>
        <TextInput
        placeholder = "Search movies, tv and more..."
        placeholderTextColor = '#f5f5f5'
       onChangeText = {this.handleSearch}
        style = {styles.input}
        >

        </TextInput>
        <Text style = {styles.names}>
          Upcoming movies
        </Text>
         <FlatList
         
         horizontal
        data = {this.state.dataUMov}
        ketExtractor = {(x2,index2)=>index2.toString()}
        renderItem = {this.renderItem}
        horizontal={true}
         
        ref={el => this.carousel = el}
          onScroll={this.handleScroll}

        />
       <Text style = {styles.names}>
          Airing today 
        </Text>
         <FlatList
         
         horizontal
        data = {this.state.dataATV}
        ketExtractor = {(x2,index2)=>index2.toString()}
        renderItem = {this.renderItem}

        />
        
        <Text style = {styles.names}>
          Trending movies
        </Text>
         <FlatList
        
         horizontal
        data = {this.state.dataMov}
        ketExtractor = {(x2,index2)=>index2.toString()}
        renderItem = {this.renderItem}

        />
        
        
        <Text style = {styles.names}>
          Popular on TV
        </Text>

        
        <FlatList
        horizontal
        data = {this.state.dataTV}
        ketExtractor = {(x,index)=>index.toString()}
        renderItem = {this.renderItem}
        />
        <FlatList
        horizontal
        data = {this.state.data}
        ketExtractor = {(x,index)=>index.toString()}
        renderItem = {this.renderItem}
        />
        
        
     
      </View>
      </ScrollView>
    );
  }
 

}
const styles = StyleSheet.create({
  names:{
    color :'white',fontWeight:'bold',paddingTop:10,paddingLeft:10
  ,fontFamily:'sans-serif-thin',fontSize:15,letterSpacing:0.7
  },
  title:{
    color :'black',
    fontWeight: 'bold'
  },
  rating:{
    color : 'black'
  },
  back: {
    backgroundColor : 'black'
  },
  input :{
    height : 40,
    paddingStart :10,
    paddingTop : 10,
    borderWidth :1,
    textAlignVertical : 'center',
    textDecorationLine : 'none',
    borderRadius : 10,
    opacity: 10,
    textAlignVertical : 'center',
    marginLeft: 10,
    marginRight : 10,
    marginTop: 20,
    opacity: 0.4,
    borderColor: '#f5f5f5'
    

    
  }

    
});
export default App;