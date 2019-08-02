import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Dimensions
} from "react-native";

//const
const width = Dimensions.get('window').width;

class ImageCarousel extends Component {
    render() {
        return (
            <View style={styles.defaultStyle}>
                {this.props.children}
            </View>
        );
    }
}
export default ImageCarousel;

const styles = StyleSheet.create({
    defaultStyle: {
        height: 350,
        width: width,
        backgroundColor: '#555',
    },
});