import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';


export const s = StyleSheet.create({
    container:{
        padding:responsiveHeight(3),
    },
    containerWhite:{
        flex:1,
        backgroundColor:'white',
    },
    text_one:{
        fontSize:responsiveFontSize(2),
        color:'black',
        letterSpacing:0.5,
    },
    headingFirst:{
        fontSize:28,
        color:'black',
    },
    headingSecond:{
        fontSize:12,
        color:'black'
    },
    bgImage:{
        height:responsiveHeight(40),
        width:responsiveWidth(100),
    },
    button1:{
       backgroundColor:'grey',
       width:responsiveWidth(60),
       padding:16,
       alignItems:'center',
       borderRadius:20
    },
    addView:{
       backgroundColor:'black',
       width:responsiveWidth(40),
    //    height:responsiveHeight(10),
       alignItems:'center',
       borderRadius:20,
       padding:responsiveHeight(1),
    },
    button1Text:{
        fontSize:responsiveFontSize(2.5),
        color:'white',
        letterSpacing:0.5,
        // alignItems:'center',
       
        
    },
    label: {
        fontSize: responsiveFontSize(2),
        marginBottom: responsiveHeight(1),
        color: 'black',
        marginTop: responsiveHeight(2.5),
    },
    input: {
        height: responsiveHeight(6),
        borderColor: 'grey',
        borderWidth: 1,
        paddingLeft: responsiveWidth(2),
        borderRadius: 15,
    },

    button: {
        marginTop: responsiveHeight(2),
        backgroundColor: 'black',
        alignItems: 'center',
        padding: responsiveHeight(1.5),
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: responsiveFontSize(2),
    },
    bigHeading:{
        alignSelf:'center',
        fontSize: responsiveFontSize(2.5),
        color:'#2a2c5d',
        letterSpacing:0.5,
    },
    smallpara:{
        alignSelf:'center',
        fontSize: responsiveFontSize(2),
        color:'#2a2c5d',
        letterSpacing:0.5,
    },
    spacebetween:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    spacevenly:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        gap:20,
    },
    red:{
        color:'red',
        letterSpacing:0.5,
    },
    smallheading:{
        color:'#2a2c5d', 
        letterSpacing:0.5,
    },
    profilepic:{
        height: responsiveHeight(8),
        width: responsiveWidth(15),
        borderRadius: 50,
    },
    blackColor:{
        color:'black'
    },
    greyColor:{
        color:'grey'
    },

})