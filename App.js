import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Image
} from "react-native";

//Library
import { Avatar, SearchBar } from "react-native-elements";

//Component
import ImageCarousel from "./components/ImageCarousel";

//const
const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

//style
//import DEFAULT_COLOR from "./color";
import mainStyle from "./styles/styles";

//Icons
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      search: "",
      news: [
        { title: "title 1", location: "location 1" },
        { title: "title 2", location: "location 2" },
        { title: "title 3", location: "location 3" },
        { title: "title 4", location: "location 4" },
        { title: "title 5", location: "location 5" },
        { title: "title 6", location: "location 6" },
        { title: "title 7", location: "location 7" },
        { title: "title 8", location: "location 8" },
      ]
    };
  }

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    //Animation
    const animatedHeaderHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: "clamp"
    });
    const animatedHeaderBgColor = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: ["transparent", "transparent", "#0f2b59"],
      extrapolate: "clamp"
    });
    const FadeOutOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    });
    const FadeOutTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [-50, 0, 0],
      extrapolate: "clamp"
    });
    const animatedGoBackBtnBgColor = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: ["rgba(0, 0, 0, 0.3)", "transparent", "transparent"],
      extrapolate: "clamp"
    });

    return (
      <View style={[mainStyle.container, mainStyle.middleCenter]}>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
          ])}
        >
          <ImageCarousel>
            <ImageBackground
              // source={require('./images/logo-og.png')}
              source={{ uri: "https://facebook.github.io/react/logo-og.png" }}
              style={{ width: "100%", height: "100%" }}
            />
            <TouchableOpacity
              // onPress={() => this.props.navigation.goBack(null)}
              style={mainStyle.closeBtn}
            >
              <Ionicons
                name="md-arrow-back"
                size={30}
                style={{ color: "#fff" }}
              />
            </TouchableOpacity>
          </ImageCarousel>
          <View style={[mainStyle.container]}>
            <View style={[mainStyle.box, mainStyle.middleCenter]}>
              <Text style={[mainStyle.text, mainStyle.body2]}>Test</Text>
              <Text style={[mainStyle.text, mainStyle.body1]}>Test</Text>
            </View>
            <View style={[mainStyle.box]}>
              <SearchBar
                placeholder="Type Here To Search"
                lightTheme
                round
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}
                searchIcon={
                  <View>
                    <Image
                      source={require("./images/logo-og.png")}
                      style={{ width: 15, height: 15 }}
                    />
                  </View>
                }
                noIcon
              />
            </View>
          </View>
          {this.renderNewsList()}
        </ScrollView>
        <Animated.View
          style={[
            styles.animatedHeader,
            {
              height: animatedHeaderHeight,
              backgroundColor: animatedHeaderBgColor
            }
          ]}
        >
          <Animated.View
            style={[
              styles.animatedBackBtn,
              { backgroundColor: animatedGoBackBtnBgColor }
            ]}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack(null)}
            >
              <Ionicons
                name="md-arrow-back"
                size={30}
                style={{ color: "#fff" }}
              />
            </TouchableOpacity>
          </Animated.View>
          <Animated.Text
            style={[
              styles.animatedJobLabel,
              {
                opacity: FadeOutOpacity,
                transform: [{ translateY: FadeOutTranslate }]
              }
            ]}
          >
            Title 1
          </Animated.Text>
        </Animated.View>
      </View>
    );
  }

  renderNewsList() {
    return (
      <View style={[mainStyle.container]}>
        <FlatList
          data={this.state.news}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) =>
            this.renderNewsItem(item, this.props.navigation)
          }
          keyExtractor={(data, index) => index.toString()}
        />
      </View>
    );
  }

  renderNewsItem(item, navigation) {
    // if (item.requestTime) {
    //   date = new Date(item.requestTime).toLocaleDateString();
    //   time = new Date(item.requestTime).toLocaleTimeString();
    // }

    console.log(`\n[task list] item: ${JSON.stringify(item, null, "    ")}`);
    return (
      <TouchableOpacity style={[mainStyle.content]}>
        <View style={[mainStyle.columnBox]}>
          <View style={[mainStyle.box]}>
            <Avatar
              rounded
              source={{
                uri: "https://facebook.github.io/react/logo-og.png"
              }}
            />
          </View>
          <View style={[mainStyle.box, mainStyle.middleLeft, { flex: 8 }]}>
            <Text style={[mainStyle.text, mainStyle.body2]}>{item.title}</Text>
            <Text style={[mainStyle.text, mainStyle.caption]}>
              {item.location}
            </Text>
          </View>
        </View>
        <View style={[mainStyle.rowBox]}>
          <Text style={[mainStyle.text, mainStyle.body2]}>Test</Text>
          <Text style={[mainStyle.text, mainStyle.body1]}>Test</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  animatedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    overflow: "hidden",
    alignItems: "center",
    marginBottom: 5
  },
  animatedJobLabel: {
    position: "absolute",
    top: 18,
    left: 60,
    color: "#fff",
    fontSize: 18
  },
  animatedBackBtn: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20
  }
});
